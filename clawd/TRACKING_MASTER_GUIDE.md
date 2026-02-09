# CREATOR TRACKING SYSTEM - FULL IMPLEMENTATION GUIDE
## Google Sheets as Database

---

## OVERVIEW

**Purpose:** Track creator performance metrics (posts & views) across multiple brands using Google Sheets as the backend database.

**Brands:** Genesis, AGI Inc, BetVikings, FOMO, PayOut

**Platforms:** TikTok, Instagram, X (Twitter), YouTube, Facebook, etc.

---

## GOOGLE SHEETS STRUCTURE

You need **2 sheets** in one Google Spreadsheet:

### Sheet 1: "accounts"

| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | account_id | Auto-increment ID | 1, 2, 3... |
| B | handle | Social media username | @cryptoqueen |
| C | brand | Which brand they post for | Genesis |
| D | platform | Social platform | TikTok |
| E | owner | Discord user ID (who registered it) | 6001461431 |
| F | creator_name | Display name (optional) | Sarah Jones |
| G | created_at | When registered | 2026-02-02 |

### Sheet 2: "submissions"

| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | submission_id | Auto-increment ID | 1, 2, 3... |
| B | account_id | Links to accounts sheet | 1 |
| C | handle | Username (for easy lookup) | @cryptoqueen |
| D | brand | Brand name | Genesis |
| E | platform | Platform | TikTok |
| F | posts | Number of posts today | 5 |
| G | views | Total views today | 12500 |
| H | date | Submission date | 2026-02-02 |
| I | submitted_by | Discord user ID | 6001461431 |
| J | created_at | Timestamp | 2026-02-02 11:30:00 |

---

## DISCORD COMMANDS - DETAILED SPECS

### 1. `/addaccount`

**Syntax:** `/addaccount <handle> <brand> <platform>`

**Example:** `/addaccount @cryptoqueen Genesis TikTok`

**What it does:**
1. Validate brand is in allowed list: [Genesis, AGI Inc, BetVikings, FOMO, PayOut]
2. Validate platform is valid: [TikTok, Instagram, X, YouTube, Facebook, Threads, LinkedIn]
3. Check if this handle+brand+platform combo already exists
4. If new, add row to "accounts" sheet
5. Respond with confirmation or error

**Success response:**
```
✅ Account added!
Handle: @cryptoqueen
Brand: Genesis
Platform: TikTok
Account ID: 7
```

**Error responses:**
- "❌ Invalid brand. Choose from: Genesis, AGI Inc, BetVikings, FOMO, PayOut"
- "❌ Invalid platform. Choose from: TikTok, Instagram, X, YouTube, Facebook, Threads, LinkedIn"
- "❌ This account already exists (ID: 3)"

---

### 2. `/submit`

**Syntax:** `/submit <handle> <posts> <views>`

**Example:** `/submit @cryptoqueen 5 12500`

**What it does:**
1. Look up handle in "accounts" sheet
2. If not found, error
3. If found, add row to "submissions" sheet with:
   - account_id from lookup
   - handle, brand, platform from account
   - posts and views from command
   - today's date
   - submitter's Discord ID
   - current timestamp
4. Respond with confirmation

**Success response:**
```
✅ Submission recorded!
Handle: @cryptoqueen
Brand: Genesis
Platform: TikTok
Posts: 5
Views: 12,500
Date: 2026-02-02
```

**Error responses:**
- "❌ Account @cryptoqueen not found. Register it first with /addaccount"
- "❌ Posts must be a number"
- "❌ Views must be a number"

---

### 3. `/myaccounts`

**Syntax:** `/myaccounts`

**What it does:**
1. Get the Discord user's ID
2. Filter "accounts" sheet where owner = user's ID
3. Return list of their accounts

**Success response:**
```
📋 Your Accounts:

1. @cryptoqueen (Genesis - TikTok)
2. @hodlking (AGI Inc - Instagram)
3. @moonboy (FOMO - X)

Total: 3 accounts
```

**If no accounts:**
```
📋 You have no registered accounts.
Use /addaccount <handle> <brand> <platform> to add one.
```

---

### 4. `/dashboard`

**Syntax:** `/dashboard` or `/dashboard <handle>` or `/dashboard <brand>`

**What it does:**
1. If no argument: show summary for user's accounts
2. If handle provided: show stats for that handle
3. If brand provided: show brand-wide stats

**Response (user summary):**
```
📊 Your Dashboard

Total Accounts: 3
Total Posts (all time): 127
Total Views (all time): 458,200

Last 7 Days:
- Posts: 35
- Views: 89,500
- Avg views/post: 2,557

Top Performer: @cryptoqueen (Genesis) - 45,000 views this week
```

**Response (single handle):**
```
📊 Stats for @cryptoqueen (Genesis - TikTok)

All Time:
- Posts: 89
- Views: 312,000
- Avg views/post: 3,506

Last 7 Days:
- Posts: 12
- Views: 45,000

Last 30 Days:
- Posts: 45
- Views: 156,000
```

**Response (brand summary):**
```
📊 Genesis Brand Dashboard

Active Creators: 12
Total Posts (all time): 1,245
Total Views (all time): 4,580,000

Last 7 Days:
- Posts: 156
- Views: 523,000

Top Creators This Week:
1. @cryptoqueen - 45,000 views
2. @hodlmaster - 38,000 views
3. @alphaseeker - 29,000 views
```

---

## GOOGLE SHEETS API SETUP

### Requirements:
1. Google Cloud Project
2. Service Account with Sheets API enabled
3. Service Account Key (.json or .p12 file)
4. Share the spreadsheet with the service account email

### Service Account Key Location:
The .p12 key has been provided. Convert to .json if needed or use directly.

### Authentication Flow:
```python
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = '/path/to/service_account.json'

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

service = build('sheets', 'v4', credentials=credentials)
sheet = service.spreadsheets()
```

### Spreadsheet ID:
Found in the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

---

## VALIDATION RULES

### Brands (exact match, case-insensitive):
- Genesis
- AGI Inc
- BetVikings
- FOMO
- PayOut

### Platforms (exact match, case-insensitive):
- TikTok
- Instagram
- X
- YouTube
- Facebook
- Threads
- LinkedIn

### Handle:
- Must start with @ (or auto-prepend it)
- No spaces
- 1-50 characters

### Posts:
- Integer >= 0
- Max 1000 per submission (sanity check)

### Views:
- Integer >= 0
- Max 100,000,000 per submission (sanity check)

---

## ERROR HANDLING

| Error | Response |
|-------|----------|
| Google Sheets API down | "❌ Database temporarily unavailable. Try again in a minute." |
| Invalid brand | "❌ Invalid brand. Choose from: Genesis, AGI Inc, BetVikings, FOMO, PayOut" |
| Invalid platform | "❌ Invalid platform. Choose from: TikTok, Instagram, X, YouTube, Facebook, Threads, LinkedIn" |
| Account not found | "❌ Account {handle} not found. Register with /addaccount first." |
| Duplicate account | "❌ This account already exists." |
| Invalid number | "❌ Posts/Views must be a valid number." |
| Permission denied | "❌ You don't have permission to modify this account." |

---

## FUTURE ENHANCEMENTS (Phase 2)

1. **Daily Reminders:** Ping creators who haven't submitted today
2. **Leaderboards:** `/leaderboard` - top performers by week/month
3. **CSV Export:** `/export` - download data as CSV
4. **Brand Comparisons:** `/compare Genesis FOMO` - side by side
5. **Graphs:** Generate chart images for dashboard
6. **Duplicate Detection:** Warn if same stats submitted twice same day
7. **Manager Commands:** `/assign`, `/remove` for brand managers

---

## SPREADSHEET TEMPLATE

Create a Google Spreadsheet with these exact headers:

**Sheet 1 name:** accounts

**Row 1:** account_id | handle | brand | platform | owner | creator_name | created_at

**Sheet 2 name:** submissions

**Row 1:** submission_id | account_id | handle | brand | platform | posts | views | date | submitted_by | created_at

---

## WHAT YOU NEED TO PROVIDE TO BUILD THIS

1. **Google Spreadsheet ID** (from URL)
2. **Service Account JSON key** (or confirm .p12 location)
3. **Confirm spreadsheet is shared** with service account email
4. **Discord Bot Token** (move to env variable, not hardcoded)

---

## SUMMARY

| Item | Value |
|------|-------|
| Database | Google Sheets |
| Commands | /addaccount, /submit, /myaccounts, /dashboard |
| Brands | Genesis, AGI Inc, BetVikings, FOMO, PayOut |
| Sheets needed | accounts, submissions |
| Auth | Google Service Account |
