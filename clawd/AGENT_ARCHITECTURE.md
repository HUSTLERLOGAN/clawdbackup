# AGENT ARCHITECTURE — Best Structure for Archive Ops

## Current State (What You Have)

**Environment:** Emergent-hosted VSCode (browser-based code-server)

**Active Systems:**
1. **CLAWD (me)** — Your execution agent (Claude Sonnet 4)
2. **Discord Tracking Bot** (Node.js) — Creator performance tracking via Google Sheets
3. **Python Discord Bot** (legacy, broken token) — Old command system

**File Structure:**
```
/root/clawd/
├── AGENTS.md              # Agent instructions (me)
├── SOUL.md                # Agent personality/style
├── USER.md                # Your profile (Logan)
├── PLAYBOOK.md            # Pakistan team SOPs
├── TRACKING_MASTER_GUIDE.md  # System specs
├── creator-tracking-bot/  # Node.js Discord bot (ACTIVE)
│   ├── index.js           # Main bot logic
│   ├── .env               # Discord token + Google Sheets ID
│   └── service-account-key.json  # Google API auth
├── discord_commands.py    # OLD Python bot (broken token)
├── commands.py            # Stub functions (unused)
└── test.py                # Empty stubs
```

---

## Problems in Current Setup

1. **Two Discord bots** (Python + Node.js) — redundant
2. **Hardcoded tokens in Python bot** — expired, insecure
3. **No database** — Google Sheets is the database (works, but limited)
4. **No unified execution layer** — bots run independently, CLAWD can't control them
5. **No agent hierarchy** — everything is flat

---

## Recommended Architecture (Clean + Scalable)

### Layer 1: CLAWD (Orchestration Agent)
**Role:** Command center. You tell me what to do, I coordinate everything.

**What I control:**
- Read/write files in `/root/clawd`
- Run terminal commands (start bots, deploy code, check logs)
- Edit configuration
- Generate reports
- Train Pakistan team via Discord

**What I don't do directly:**
- Respond to Discord commands from creators (the bot does that)
- Access Google Sheets API directly (bot handles that)

---

### Layer 2: Discord Bot (Execution Layer)
**Tech:** Node.js (already working)

**Role:** Interface with Discord + Google Sheets

**Commands it handles:**
- `/addaccount` — Add creator accounts
- `/submit` — Log daily performance
- `/myaccounts` — Show creator's accounts
- `/dashboard` — Analytics
- `/dailytop` — Submit top-performing video

**Responsibilities:**
- Validate inputs
- Read/write Google Sheets
- Respond to creators instantly
- Escalate errors to managers

**Current State:** ✅ Working (just needs correct token)

---

### Layer 3: Database (Google Sheets)
**Role:** Persistent storage for all tracking data

**Sheets:**
1. **accounts** — Creator account registry
2. **submissions** — Daily performance logs
3. **dailytop** — Top-performing videos

**Why Sheets?**
- Zero setup
- Team can view/edit manually
- Free
- Good enough for < 10k rows

**When to upgrade:** If you hit > 5k submissions or need real-time analytics

---

### Layer 4: Reporting + Analytics (Future)
**Role:** Dashboards, leaderboards, winner identification

**Tech Options:**
- Google Data Studio (connects to Sheets)
- Python scripts I generate
- Weekly manager reports (I draft them automatically)

**Current State:** Manual (managers export from Sheets)

---

## Best File Organization (Clean Structure)

```
/root/clawd/
│
├── agents/                    # Agent configs (CLAWD personality)
│   ├── SOUL.md
│   ├── AGENTS.md
│   └── IDENTITY.md
│
├── docs/                      # Documentation
│   ├── PLAYBOOK.md            # Team SOPs
│   ├── TRACKING_GUIDE.md
│   └── USER.md
│
├── discord-bot/               # Main bot (Node.js)
│   ├── index.js               # Bot logic
│   ├── commands/              # Command handlers
│   │   ├── addaccount.js
│   │   ├── submit.js
│   │   ├── dashboard.js
│   │   └── dailytop.js
│   ├── utils/                 # Helper functions
│   │   ├── sheets.js          # Google Sheets API
│   │   └── validation.js
│   ├── .env                   # Secrets (tokens, IDs)
│   └── package.json
│
├── scripts/                   # Automation scripts
│   ├── backup_sheets.py
│   ├── generate_report.py
│   └── check_bot_health.sh
│
├── memory/                    # CLAWD's memory
│   └── YYYY-MM-DD.md
│
└── logs/                      # Bot logs
    └── discord-bot.log
```

---

## Clean Up Plan (3 Steps)

### Step 1: Kill the Old Python Bot
**Action:**
1. Delete `/root/clawd/discord_commands.py` (expired token, unused)
2. Delete `/root/clawd/commands.py` (stub functions)
3. Delete `/root/clawd/test.py` (empty)

**Why:** They do nothing and confuse the structure.

---

### Step 2: Consolidate the Node.js Bot
**Action:**
1. Rename `/root/clawd/creator-tracking-bot/` → `/root/clawd/discord-bot/`
2. Split `index.js` into modular command files (if it grows beyond 500 lines)
3. Add logging to `/root/clawd/logs/`

**Why:** Cleaner, easier to maintain.

---

### Step 3: Organize Documentation
**Action:**
1. Move all `.md` files into `/root/clawd/docs/` (except `AGENTS.md`, `SOUL.md`, `IDENTITY.md`)
2. Keep agent personality files in `/root/clawd/agents/`

**Why:** Separates "how CLAWD thinks" from "how the system works."

---

## Agent Hierarchy (Who Does What)

| Agent/Bot | Role | Trigger | Response Time |
|-----------|------|---------|---------------|
| **CLAWD (me)** | Orchestration, strategy, reporting | Logan's commands | < 10 seconds |
| **Discord Bot** | Creator interface, data logging | `/commands` in Discord | < 2 seconds |
| **Google Sheets** | Database | API calls from bot | Instant |
| **Pakistan Managers** | Human QC, enforcement | Daily cadence | Hours |

---

## Best Practice: Who Handles What

### Logan asks CLAWD:
- "Generate this week's performance report"
- "Analyze top 10 videos from Genesis"
- "Write a new SOP for editing team"
- "Check if the bot is running"

### Creators ask Discord Bot:
- `/addaccount @user Genesis TikTok`
- `/submit @user 5 12500`
- `/dashboard`

### Managers ask CLAWD (via Logan or Discord):
- "Pull weekly stats for all accounts"
- "Who hasn't submitted today?"
- "Generate leaderboard"

---

## What Should NOT Change

1. **Google Sheets as database** — works fine for now
2. **Node.js bot** — already functional
3. **CLAWD as orchestrator** — I coordinate, bots execute

---

## Next Steps (Pick One)

### Option A: Clean Up Only
1. Delete old Python bot files
2. Organize docs into folders
3. Done in 5 minutes

### Option B: Modularize Bot
1. Clean up (Option A)
2. Split `index.js` into `/commands/` folder
3. Add logging
4. Done in 30 minutes

### Option C: Full Refactor
1. Clean up + modularize
2. Add automated reporting scripts
3. Build dashboard integration
4. Done in 2-3 hours

---

## Bottom Line

**Best structure:**
- CLAWD (orchestration)
- Node.js Discord bot (creator interface)
- Google Sheets (database)
- Clean file organization

**What to do now:**
Tell me which option (A/B/C) and I'll execute it.
