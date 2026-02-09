# Creator Tracking Bot

Discord bot for tracking creator performance metrics using Google Sheets as the database.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in:
     - `DISCORD_BOT_TOKEN`: Your Discord bot token
     - `SPREADSHEET_ID`: Your Google Spreadsheet ID (from URL)
     - `SERVICE_ACCOUNT_KEY_PATH`: Path to your service account JSON key file

3. **Setup Google Sheets:**
   - Create a Google Spreadsheet with 2 sheets named exactly:
     - `accounts`
     - `submissions`
   - Add headers to each sheet (see TRACKING_MASTER_GUIDE.md)
   - Share the spreadsheet with your service account email

4. **Run the bot:**
   ```bash
   node index.js
   ```

## Commands

- `/addaccount <handle> <brand> <platform>` - Register a creator account
- `/submit <handle> <posts> <views>` - Submit daily stats
- `/myaccounts` - List your registered accounts
- `/dashboard [handle|brand]` - View performance metrics

## Supported Brands
- Genesis
- AGI Inc
- BetVikings
- FOMO
- PayOut

## Supported Platforms
- TikTok
- Instagram
- X
- YouTube
- Facebook
- Threads
- LinkedIn
