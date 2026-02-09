# API Usage for 50 Accounts — Manual System with Verification

**Date:** 2025-02-03  
**Scenario:** 50 accounts tracked, team manually adds accounts, API tracks daily stats

---

## **What You Want to Track (Per Account, Per Day):**

1. **Posts per day** (how many videos posted today)
2. **Views for the day** (total views gained today across all videos)
3. **Highest view video** (best-performing video)

---

## **API Requests Needed (Per Account)**

### **Method 1: Single Profile + Feed Call**

**Endpoint:** Get user profile + recent feed (combined)

**What it returns:**
- User profile data (follower count, total video count)
- Recent videos (last 10-30 videos with views, likes, timestamps)

**From this data you can calculate:**
- Posts per day (count videos posted today)
- Views for the day (sum views from videos posted today)
- Highest view video (sort by views, take top result)

**Cost:** **1 request per account**

---

### **Method 2: Separate Calls (Less Efficient)**

**Call 1:** Get user profile
- Returns: follower count, total videos

**Call 2:** Get user feed (recent videos)
- Returns: last 30 videos with stats

**Cost:** **2 requests per account**

---

## **Daily API Usage Breakdown**

### **For 50 Accounts:**

| Task | Method 1 (Efficient) | Method 2 (Separate) |
|------|----------------------|---------------------|
| **Morning sweep (all 50 accounts)** | 50 requests | 100 requests |
| **On-demand checks (team queries)** | +10 requests | +20 requests |
| **Total per day** | **60 requests** | **120 requests** |
| **Total per month (30 days)** | **1,800 requests** | **3,600 requests** |

---

## **With Your $9.99/mo Plan:**

**Limits:**
- 200,000 requests/month
- 6,667 requests/day

**Your usage (50 accounts, Method 1):**
- 60 requests/day
- 1,800 requests/month
- **0.9% of limit** ✅

**Your usage (50 accounts, Method 2):**
- 120 requests/day
- 3,600 requests/month
- **1.8% of limit** ✅

---

## **Calculation Details**

### **How to Get "Posts Per Day":**

**API returns:** List of recent videos with timestamps
```json
[
  {"video_id": "123", "views": 50000, "created_at": "2025-02-03T10:00:00Z"},
  {"video_id": "124", "views": 30000, "created_at": "2025-02-03T14:00:00Z"},
  {"video_id": "125", "views": 100000, "created_at": "2025-02-02T18:00:00Z"}
]
```

**Bot logic:**
1. Filter videos posted today (check `created_at` date)
2. Count results
3. **Posts today = 2** (videos 123 and 124)

**API cost:** Already included in the 1 request (user feed)

---

### **How to Get "Views for the Day":**

**From same API response:**
1. Filter videos posted today
2. Sum their view counts
3. **Views today = 50,000 + 30,000 = 80,000**

**API cost:** 0 extra (same request)

---

### **How to Get "Highest View Video":**

**From same API response:**
1. Sort all videos by view count
2. Take top result
3. **Highest video = 100,000 views (video 125)**

**API cost:** 0 extra (same request)

---

## **Important: "Views for the Day" Challenge**

### **Problem:**
TikTok API returns **total views** on a video, not **views gained today**.

**Example:**
- Video posted yesterday: 50,000 views
- Check today: 100,000 views
- **Views gained today = 50,000** (difference)

### **Solution: Store Historical Data**

**You need to track previous view counts:**

#### **Google Sheets Schema:**

**Tab: `video_history`**
```
video_id | account | views | date_checked
123      | @user1  | 50000 | 2025-02-02
123      | @user1  | 100000| 2025-02-03
```

**Bot logic:**
1. API returns current views: 100,000
2. Check yesterday's views from Sheets: 50,000
3. **Views gained today = 100,000 - 50,000 = 50,000**

**API cost:** Still 1 request (just need to store/compare data)

---

## **Alternative: Only Track New Posts**

If you only want to track **views on videos posted today:**

**Simpler approach:**
1. API returns recent videos with timestamps
2. Filter videos posted today
3. Sum their current view counts
4. **Views for today = views on today's new videos**

**No historical tracking needed.**

**Trade-off:** Doesn't count views gained on older videos.

---

## **Recommended Tracking Method**

### **Track Both:**

1. **New post views** (easy)
   - Views on videos posted today
   - 1 API request, no history needed

2. **Total daily views gained** (requires history)
   - Track all videos' view count changes
   - 1 API request + compare with yesterday's data

---

## **API Request Breakdown (Final Count)**

### **Daily Operations (50 Accounts):**

| Task | Requests | Details |
|------|----------|---------|
| Morning sweep (all 50 accounts) | 50 | Get profile + recent videos (1 call per account) |
| On-demand checks (team uses `/verify`) | 10 | Manual verification requests |
| **Total per day** | **60** | |
| **Total per month** | **1,800** | 60 × 30 days |

---

### **What You Get From 60 Requests/Day:**

For each of 50 accounts, daily:
- ✅ Posts per day (count today's videos)
- ✅ Views on new posts (sum views on today's videos)
- ✅ Total views gained today (if you track history)
- ✅ Highest view video (all-time)
- ✅ Follower count change
- ✅ Engagement rate

**Cost:** 1 request per account = 50/day

---

## **Storage in Google Sheets**

### **Tab: `daily_stats`**

**Columns:**
```
date | account | posts_today | views_on_new_posts | total_views_gained | highest_video | highest_views | follower_count
```

**Example row:**
```
2025-02-03 | @creator1 | 3 | 150000 | 250000 | video/123 | 2000000 | 150000
```

---

### **Tab: `video_history`** (for view change tracking)

**Columns:**
```
video_id | account | views | date_checked | timestamp
```

**Example:**
```
video/123 | @creator1 | 1500000 | 2025-02-02 | 1738454400
video/123 | @creator1 | 2000000 | 2025-02-03 | 1738540800
```

---

## **Bot Workflow**

### **Morning Sweep (9 AM EST):**

**For each account:**
1. API call: Get profile + recent videos (1 request)
2. Parse response:
   - Count videos posted today → `posts_today`
   - Sum views on today's videos → `views_on_new_posts`
   - Compare all video views to yesterday → `total_views_gained`
   - Find highest view video → `highest_video`
3. Log to Google Sheets `daily_stats`
4. Update `video_history` with current view counts

**Total API cost:** 50 requests (one per account)

---

### **Discord Report:**

```
📊 Daily Stats (2025-02-03) — 50 Accounts

Top Performers:
1. @creator1 — 3 posts, 250k views gained today
2. @creator2 — 5 posts, 180k views gained today
3. @creator3 — 2 posts, 150k views gained today

🔥 Viral Videos:
- @creator1/video/123 — 2M views (highest)
- @creator4/video/456 — 1.5M views

📈 Growth:
- @creator2 — +5k followers today
- @creator5 — +3k followers today

Total posts today: 45
Total views gained: 1.2M
```

---

## **Scaling Path**

| Accounts | Requests/Day | Monthly | % of 200k Limit |
|----------|--------------|---------|-----------------|
| 50 | 60 | 1,800 | 0.9% ✅ |
| 100 | 110 | 3,300 | 1.7% ✅ |
| 500 | 510 | 15,300 | 7.7% ✅ |
| 1,000 | 1,010 | 30,300 | 15.2% ✅ |
| 5,000 | 5,010 | 150,300 | 75.2% ✅ |

**You can scale to 5,000 accounts before hitting limit.**

---

## **Answer to Logan's Question**

**For 50 accounts, tracking:**
- Posts per day
- Views for the day
- Highest view videos

**API cost:** **60 requests/day** (1,800/month)

**Breakdown:**
- 50 requests = daily sweep (all accounts)
- 10 requests = on-demand checks (team uses `/verify`)

**Usage:** 0.9% of your 200k/month limit

**Cost:** $9.99/mo (no overages)

**Completely fine. You're barely using the API.**
