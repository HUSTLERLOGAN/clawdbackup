require('dotenv').config();
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function setupSheets() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.SERVICE_ACCOUNT_KEY_PATH,
            scopes: SCOPES,
        });
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        console.log('Setting up Google Sheets...');

        // Add headers to "accounts" sheet
        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: 'accounts!A1:G1',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [['account_id', 'handle', 'brand', 'platform', 'owner', 'creator_name', 'created_at']]
            }
        });
        console.log('✅ Headers added to "accounts" sheet');

        // Add headers to "submissions" sheet
        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: 'submissions!A1:J1',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [['submission_id', 'account_id', 'handle', 'brand', 'platform', 'posts', 'views', 'date', 'submitted_by', 'created_at']]
            }
        });
        console.log('✅ Headers added to "submissions" sheet');

        console.log('\n✅ Setup complete! Your sheets are ready.');
        console.log('\nNext step: Start the bot with: node index.js');
    } catch (error) {
        console.error('❌ Error setting up sheets:', error.message);
        if (error.message.includes('permission')) {
            console.log('\n⚠️  Make sure you shared the spreadsheet with:');
            console.log('   creator-account-data@synthetic-keel-454016-a7.iam.gserviceaccount.com');
        }
    }
}

setupSheets();
