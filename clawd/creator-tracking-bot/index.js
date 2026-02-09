require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { google } = require('googleapis');

// Discord client setup
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Google Sheets setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

let sheets;

// Validation constants
const BRANDS = ['Genesis', 'AGI Inc', 'BetVikings', 'FOMO', 'PayOut'];
const PLATFORMS = ['TikTok', 'Instagram', 'X', 'YouTube', 'Facebook', 'Threads', 'LinkedIn'];

// Initialize Google Sheets API
async function initSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.SERVICE_ACCOUNT_KEY_PATH,
        scopes: SCOPES,
    });
    const authClient = await auth.getClient();
    sheets = google.sheets({ version: 'v4', auth: authClient });
}

// Helper: Read from sheet
async function readSheet(sheetName, range) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${sheetName}!${range}`,
        });
        return response.data.values || [];
    } catch (error) {
        console.error('Error reading sheet:', error);
        throw error;
    }
}

// Helper: Append to sheet
async function appendToSheet(sheetName, values) {
    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${sheetName}!A:Z`,
            valueInputOption: 'USER_ENTERED',
            resource: { values: [values] },
        });
    } catch (error) {
        console.error('Error appending to sheet:', error);
        throw error;
    }
}

// Helper: Normalize handle (ensure @ prefix)
function normalizeHandle(handle) {
    return handle.startsWith('@') ? handle : `@${handle}`;
}

// Command: /dailytop
async function handleDailyTop(message, args) {
    if (args.length < 4) {
        return message.reply(`❌ **Invalid format.**\n\n**Correct usage:**\n\`/dailytop <link> <views> <brand> <usa%>\`\n\n**Example:**\n\`/dailytop https://tiktok.com/@user/video/123 50000 Genesis 65\``);
    }

    const videoLink = args[0];
    const views = parseInt(args[1]);
    const brand = args[2];
    const usaPercentage = parseInt(args[3]);

    // Validate inputs
    if (isNaN(views) || views < 0) {
        return message.reply('❌ Views must be a positive number.');
    }
    if (isNaN(usaPercentage) || usaPercentage < 0 || usaPercentage > 100) {
        return message.reply('❌ USA percentage must be between 0 and 100.');
    }

    const date = getCurrentDate();
    const creatorName = message.author.username;
    const creatorId = message.author.id;

    try {
        // Get next submission_id
        const submissions = await readSheet('dailytop', 'A:I');
        const submissionId = submissions.length > 1 ? parseInt(submissions[submissions.length - 1][0]) + 1 : 1;

        // Add to dailytop sheet
        await appendToSheet('dailytop', [
            submissionId,
            videoLink,
            views,
            brand,
            usaPercentage,
            date,
            creatorName,
            creatorId,
            getCurrentTimestamp()
        ]);

        message.reply(`✅ Submission recorded!\nVideo Link: ${videoLink}\nViews: ${views}\nBrand: ${brand}\nUSA Percentage: ${usaPercentage}%\nDate: ${date}`);
    } catch (error) {
        console.error('Error in dailytop:', error);
        message.reply('❌ Database temporarily unavailable. Try again in a minute.');
    }
}

// Command: /addaccount
async function handleAddAccount(message, args) {
    if (args.length < 3) {
        return message.reply(`❌ **Invalid format.**\n\n**Correct usage:**\n\`/addaccount <handle> <brand> <platform>\`\n\n**Example:**\n\`/addaccount @cryptoqueen Genesis TikTok\``);
    }

    const handle = normalizeHandle(args[0]);
    const brand = args[1];
    const platform = args[2];

    // Validate brand
    if (!validateBrand(brand)) {
        return message.reply(`❌ Invalid brand. Choose from: ${BRANDS.join(', ')}`);
    }

    // Validate platform
    if (!validatePlatform(platform)) {
        return message.reply(`❌ Invalid platform. Choose from: ${PLATFORMS.join(', ')}`);
    }

    try {
        // Check if account already exists
        const accounts = await readSheet('accounts', 'A:G');
        const existing = accounts.find(row => 
            row[1]?.toLowerCase() === handle.toLowerCase() &&
            row[2]?.toLowerCase() === brand.toLowerCase() &&
            row[3]?.toLowerCase() === platform.toLowerCase()
        );

        if (existing) {
            return message.reply(`❌ This account already exists (ID: ${existing[0]})`);
        }

        // Get next account_id
        const accountId = accounts.length > 1 ? parseInt(accounts[accounts.length - 1][0]) + 1 : 1;

        // Add to sheet
        await appendToSheet('accounts', [
            accountId,
            handle,
            brand,
            platform,
            message.author.id,
            message.author.username,
            getCurrentDate()
        ]);

        message.reply(`✅ Account added!\nHandle: ${handle}\nBrand: ${brand}\nPlatform: ${platform}\nAccount ID: ${accountId}`);
    } catch (error) {
        console.error('Error in addaccount:', error);
        message.reply('❌ Database temporarily unavailable. Try again in a minute.');
    }
}

// Message handler
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const content = message.content.trim();
    
    if (content.startsWith('/tracker')) {
        handleTracker(message);
    } else if (content.startsWith('/dailytop')) {
        const args = content.split(/\s+/).slice(1);
        await handleDailyTop(message, args);
    } else if (content.startsWith('/dailytopbatch')) {
        await handleDailyTopBatch(message);
    } else if (content.startsWith('/addaccount')) {
        const args = content.split(/\s+/).slice(1);
        await handleAddAccount(message, args);
    } else if (content.startsWith('/submit')) {
        const args = content.split(/\s+/).slice(1);
        await handleSubmit(message, args);
    } else if (content.startsWith('/myaccounts')) {
        await handleMyAccounts(message);
    } else if (content.startsWith('/dashboard')) {
        const args = content.split(/\s+/).slice(1);
        await handleDashboard(message, args);
    }
});

// Initialize and start
(async () => {
    try {
        await initSheets();
        console.log('✅ Google Sheets API initialized');
        
        await client.login(process.env.DISCORD_BOT_TOKEN);
    } catch (error) {
        console.error('❌ Startup error:', error);
        process.exit(1);
    }
})();
