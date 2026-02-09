# Hybrid Tracking System Design (Manual + API Verification)

**Date:** 2025-02-03  
**Context:** Pakistan team manually tracks creators, API verifies their submissions

---

## **The API Plan Logan Found**

**Provider:** (Unknown - need to confirm which API this is)  
**Plan:** Pro $9.99/mo

### **Limits:**
- 500 video downloads/day
- 200,000 requests/month (~6,667/day)
- 600 requests/min rate limit
- $0.02 per extra video download
- $0.0002 per extra request

---

## **Current System (Manual)**

### **How it works now:**
1. Pakistan team manually tracks 200-500 creators
2. They check profiles/videos daily
3. They log stats in Google Sheets (via Discord bot)
4. **No verification** (trust-based)

### **Problems:**
- No way to verify if stats are accurate
- Team could fat-finger numbers
- Can't auto-detect viral videos
- Manual work = slow + error-prone

---

## **Hybrid System Design (Manual + API Verification)**

### **Goal:**
- Pakistan team still does manual work (adds accounts, logs data)
- API **verifies** their submissions automatically
- System flags discrepancies

---

## **Workflow:**

### **1. Account Registration (Manual)**
Pakistan team adds creator accounts via Discord:
```
/addaccount @username Genesis TikTok
```
- Stored in Google Sheets `accounts` tab
- **API call:** Verify account exists + get initial stats (1 request)

---

### **2. Daily Submission (Manual)**
Team submits stats via Discord:
```
/submit @username 5 1200000
```
(5 posts, 1.2M views)

---

### **3. Verification (Automated via API)**

**When team submits stats, bot automatically:**

#### **Step 1: Check if account exists in system**
- Query Google Sheets `accounts` tab (no API cost)

#### **Step 2: API verification call**
- **Endpoint:** Get user profile + recent videos
- **Data fetched:**
  - Current follower count
  - Total video count
  - Last 3 videos (views, likes, comments)
- **Cost:** 1 request per submission

#### **Step 3: Compare submitted vs actual**
- **If discrepancy >10%:** Flag for review
- **If match:** Auto-approve submission

#### **Step 4: Store verified data**
- Save to Google Sheets `submissions` tab
- Include both manual submission + API verification
- Flag any mismatches

---

## **API Usage Breakdown**

### **Scenario: 500 Creators Tracked Daily**

#### **Daily Operations:**

| Task | Requests/Day | Calculation |
|------|--------------|-------------|
| **Morning: Bulk verification** | 500 | Check all 500 creators once/day (profile + recent videos) |
| **Team submissions** | ~50 | Team manually submits ~50 updates/day, each verified via API |
| **Trending check** | 10 | Pull trending content once/day |
| **Hashtag research** | 200 | Research 10 hashtags × 20 videos each |
| **Total** | **~760/day** | Well under 6,667/day limit |

#### **Monthly Total:**
- 760/day × 30 = **22,800 requests/month**
- **Under 200k/month limit** ✅
- No overages needed

---

## **Video Downloads (500/day limit)**

### **When to download videos:**
- Only download **viral videos** (>1M views)
- Team flags winners, API downloads
- Estimated: 10-20 videos/day (editing team needs files)
- **Under 500/day limit** ✅

---

## **Optimal System Architecture**

### **Option 1: Full Verification (Recommended)**

**How it works:**
1. Pakistan team does manual tracking
2. Every submission auto-verified via API
3. Discrepancies flagged (>10% difference)
4. Manager reviews flagged submissions

**Pros:**
- Catches errors/fraud immediately
- Builds trust in data
- No extra work for team (automatic)

**Cons:**
- Uses more API requests
- Team might feel "watched"

**API cost:** ~50 verifications/day = 1,500/month (within limits)

---

### **Option 2: Spot Check Verification**

**How it works:**
1. Pakistan team submits stats manually
2. Bot randomly verifies 20% of submissions
3. If discrepancy found, verify all from that user

**Pros:**
- Lower API usage
- Less invasive
- Catches systemic errors

**Cons:**
- Might miss one-off errors
- Less real-time accuracy

**API cost:** ~10 verifications/day = 300/month (very cheap)

---

### **Option 3: Smart Verification**

**How it works:**
1. Bot learns typical patterns for each creator
2. Only verifies when stats seem unusual
3. Example: If @creator usually gets 50k views/video, but team submits 500k, auto-verify

**Pros:**
- Efficient API usage
- Catches anomalies
- Builds trust over time

**Cons:**
- Requires learning period (2-4 weeks)
- More complex to build

**API cost:** ~30 verifications/day = 900/month

---

## **Recommended Setup for $9.99/mo API**

### **Phase 1: Onboarding (Week 1-2)**
- Team adds all 500 accounts via `/addaccount`
- API pulls initial stats for each (500 requests)
- Establish baseline data

### **Phase 2: Daily Operations**
**Morning (automated):**
- API checks all 500 creators (profiles + recent videos)
- Flags any major changes (new viral video, follower spike)
- Posts alerts to Discord

**Throughout day (team-driven):**
- Team submits stats via `/submit`
- Bot verifies 100% of submissions initially
- After 2 weeks, switch to smart verification (only verify unusual submissions)

**Evening (automated):**
- Pull trending content (10 requests)
- Research top hashtags (200 requests)
- Download flagged viral videos for editing team

---

## **Enhanced Discord Bot Commands**

### **For Pakistan Team:**

**Current commands:**
- `/addaccount @username brand platform`
- `/submit @username posts views`
- `/myaccounts`

**New commands:**
- `/verify @username` — Force manual verification via API
- `/trending` — Show today's trending videos
- `/hashtag #challenge` — Research hashtag performance
- `/stats` — Show API usage for the month

---

### **For Managers:**

**New commands:**
- `/flagged` — Show all submissions with discrepancies
- `/accuracy @username` — Show submission accuracy for team member
- `/apiusage` — Current API usage stats

---

## **Data Structure Update**

### **Google Sheets: `submissions` tab**

Current columns:
```
submission_id | account_handle | posts | views | date | submitter
```

**Add verification columns:**
```
... | verified | api_follower_count | api_video_count | api_recent_views | discrepancy | status
```

**Status values:**
- `verified` — API confirmed stats match
- `flagged` — >10% discrepancy, needs review
- `manual` — Submitted before verification system

---

## **Cost Breakdown**

### **$9.99/mo API Plan:**

**Estimated monthly usage:**
- Profile checks: 500 creators × 30 days = 15,000 requests
- Verification calls: 50 submissions/day × 30 = 1,500 requests
- Trending/hashtag research: 210 requests/day × 30 = 6,300 requests
- **Total: ~22,800 requests/month**
- **Video downloads: ~300/month** (only viral content)

**Cost:** $9.99/mo flat (no overages)

---

## **Is This Enough?**

### **✅ YES, for hybrid model**

**Why:**
- 200k requests/month >> 22k actual usage
- 500 video downloads/day >> 10-20 actual downloads
- 600/min rate limit = can batch operations

**You have 9x buffer before hitting limits.**

---

## **What to Change in Current System**

### **1. Add Verification Layer**
- Every `/submit` triggers API verification
- Compare manual vs API data
- Flag discrepancies >10%

### **2. Auto-Discovery**
- Morning API sweep finds viral videos automatically
- Posts alerts: "🔥 @creator just hit 2M views on latest video"
- Team doesn't miss breakout content

### **3. Smart Alerts**
- Bot posts to Discord when:
  - Creator gains >10k followers overnight
  - Video goes viral (>1M views)
  - Hashtag trending in your niche

### **4. Quality Control Dashboard**
- Weekly report: Team member accuracy rates
- Flags accounts with frequent discrepancies
- Shows most-submitted creators

### **5. Automated Trending Intel**
- Daily trending content report
- Top 10 hashtags in your niche
- Competitive analysis (track competitor accounts)

---

## **Implementation Priority**

### **Week 1: Core Verification**
1. Add verification to `/submit` command
2. Log discrepancies to Google Sheets
3. Manual review process for flagged submissions

### **Week 2: Smart Alerts**
1. Morning sweep for viral videos
2. Discord alerts for breakout content
3. Trending content daily report

### **Week 3: Quality Control**
1. Accuracy tracking per team member
2. Weekly QC reports
3. Auto-approval for trusted submitters

### **Week 4: Advanced Features**
1. Hashtag research automation
2. Competitor tracking
3. Predictive alerts (detect growth patterns)

---

## **Bottom Line**

**$9.99/mo API plan is MORE than enough.**

**Usage:**
- 22k/month out of 200k limit (11% utilization)
- 10-20 downloads/day out of 500 limit (4% utilization)

**Optimal system:**
1. Pakistan team does manual work (adds accounts, spots content)
2. API verifies everything automatically
3. Discrepancies flagged for manager review
4. No extra work for team (happens in background)

**This gives you:**
- Verified data accuracy
- Automated viral content discovery
- QC metrics for team performance
- All for $9.99/mo

**Do it.**
