# MEMORY.md — Long-Term Context

## 2025-02-03 — Discord Tracking Bot Audit

### **What the tracking bot is:**
- **Location:** `/root/clawd/creator-tracking-bot/`
- **Purpose:** Discord bot for Pakistan team to log creator performance → stored in Google Sheets
- **Tech:** Discord.js + Google Sheets API + service account auth

### **Commands status:**
**✅ Working:**
- `/addaccount <handle> <brand> <platform>` — Register creator accounts
- `/dailytop <link> <views> <brand> <usa%>` — Submit daily top video stats

**❌ Broken (functions don't exist):**
- `/submit` — Was deleted mid-development
- `/myaccounts` — Routed but not implemented
- `/dashboard` — Routed but not implemented
- `/tracker` — Routed but not implemented
- `/dailytopbatch` — Routed but not implemented

### **Root cause:**
Someone deleted the handler functions but left the routing logic in place. When users run these commands, the bot tries to call functions that don't exist → crashes or silent failure.

### **Data structure:**
- **Google Sheets with 2 active sheets:**
  - `accounts` — Creator account registry (account_id, handle, brand, platform, creator_id, creator_name, date_added)
  - `dailytop` — Video performance log (submission_id, video_link, views, brand, usa_percentage, date, creator_name, creator_id, timestamp)

### **Supported brands (hardcoded):**
Genesis, AGI Inc, BetVikings, FOMO, PayOut

### **Supported platforms (hardcoded):**
TikTok, Instagram, X, YouTube, Facebook, Threads, LinkedIn

### **Fix required:**
Write the 5 missing handler functions:
1. `handleSubmit()` — Daily stats submission (handle, posts, views)
2. `handleMyAccounts()` — List user's registered accounts
3. `handleDashboard()` — Performance metrics view
4. `handleTracker()` — Unknown purpose (clarify or remove)
5. `handleDailyTopBatch()` — Batch video submission

### **Current deployment:**
- Bot runs via `start.sh`
- Credentials in `.env` (Discord token + Spreadsheet ID + service account key path)
- Google Sheets API initialized on startup

### **Missing features:**
- No duplicate submission prevention
- No QC checks (suspicious spikes, USA% outliers)
- No error recovery (Sheets timeout = generic error message)
- No batch operations
- No validation that submitted handles exist in accounts registry

---

**Status:** Tracking system is functional but incomplete. Core infrastructure works. Main issue is 5 missing command handlers.
