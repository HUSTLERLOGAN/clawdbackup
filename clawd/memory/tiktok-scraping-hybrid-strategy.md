# TikTok Scraping — Optimal Hybrid Strategy

**Date:** 2025-02-03  
**Context:** Pakistan team content operations  
**Goal:** Track creator performance + find viral content without burning API budget

---

## **Hybrid Method (Best Cost/Performance)**

### **Layer 1: Free Scraping (No API Cost)**
Use for bulk data collection where speed isn't critical.

**Tools:**
- **yt-dlp** — Download videos + metadata (free, no rate limits)
- **Playwright/Puppeteer** — Browser automation for profile scraping
- **Direct TikTok CDN** — Video downloads without API

**What to scrape:**
- Video files (for editing/repurposing)
- Basic profile info (username, bio, follower count from public page)
- Comments (if you scrape the video page directly)

**Pros:**
- Zero API cost
- No request limits
- Full video access

**Cons:**
- Slower (browser automation takes time)
- Can get blocked (need proxy rotation)
- Less reliable (TikTok changes HTML frequently)

---

### **Layer 2: Paid API (RapidAPI or TikAPI)**
Use for real-time stats and structured data that's annoying to scrape manually.

**What to use API for:**
- Real-time view counts (changes hourly)
- Engagement metrics (likes, shares, comments count)
- Trending data (API gives you this cleanly)
- Hashtag performance (API formats this better than scraping)
- Profile verification status (hard to scrape reliably)

**Pros:**
- Fast, structured JSON responses
- Real-time data
- No blocking/proxy issues
- Reliable format

**Cons:**
- Costs money per request
- Rate limits
- Bandwidth costs if downloading videos via API

---

## **Optimal Workflow (What to Do)**

### **Phase 1: Discovery (Find Viral Content)**
**Goal:** Identify what's working right now.

**Method:**
1. **Use API** for trending data (10-20 requests/day)
   - Get trending videos
   - Get trending hashtags
   - Get top creators in your niche

2. **Free scrape** the actual videos
   - Use yt-dlp to download trending videos (no API cost)
   - Archive for editing team

**Daily cost:** ~50 API requests = stays well under RapidAPI limit

---

### **Phase 2: Creator Tracking (Monitor Performance)**
**Goal:** Track 200-500 creators for content ideas and performance patterns.

**Method:**
1. **Use API** for real-time stats (once per day per creator)
   - Profile stats (followers, total likes, video count)
   - Recent video performance (views, engagement rate)
   - This is 200-500 requests/day (fits RapidAPI Pro easily)

2. **Free scrape** videos when you find winners
   - API tells you which videos are performing
   - yt-dlp downloads only the high-performers (saves bandwidth)

**Daily cost:** 500 API requests (well under RapidAPI 2k/day limit)

---

### **Phase 3: Deep Analysis (When You Find Gold)**
**Goal:** Understand why specific content works.

**Method:**
1. **Use API** for engagement details
   - Comment count trends (is it still getting comments?)
   - Share velocity (how fast is it spreading?)
   - Music/sound tracking (what audio is used?)

2. **Free scrape** for content analysis
   - Download video for editing team
   - Scrape top comments for sentiment analysis
   - Check creator's other videos (see if it's a pattern or one-off)

**Daily cost:** 100-200 extra API requests for deep dives

---

## **Start Here (Week 1 Focus)**

### **What to Scrape First**

#### **1. Trending Content (Daily)**
**Use API:**
- Pull TikTok trending page (10 requests)
- Get trending hashtags in your niche (10 requests)
- Check top 50 trending videos (50 requests)

**Use Free Scraping:**
- Download trending videos with yt-dlp (no API cost)
- Save to archive for editing team

**Total API cost:** ~70 requests/day

---

#### **2. Competitor Tracking (200 Accounts)**
**Use API:**
- Check 200 creator profiles once/day (200 requests)
- Pull each creator's 3 most recent videos (600 requests)

**Use Free Scraping:**
- When you spot a viral video (>1M views), download it with yt-dlp
- Only download top performers (saves bandwidth)

**Total API cost:** 800 requests/day

---

#### **3. Hashtag Research (10 Per Day)**
**Use API:**
- Search 10 hashtags (10 requests)
- Get top 20 posts per hashtag (200 requests)

**Use Free Scraping:**
- Download high-performing videos from hashtag results

**Total API cost:** 210 requests/day

---

### **Week 1 Total Usage**
- Trending: 70 requests/day
- Competitor tracking: 800 requests/day
- Hashtag research: 210 requests/day
- **Total: ~1,100 requests/day**

**Cost with RapidAPI Pro:** $4.99/mo (well under 2k/day limit)

---

## **What NOT to Do (Budget Killers)**

### **❌ Don't use API for:**
- Video downloads (use yt-dlp instead)
- Bulk comment scraping (scrape directly or use API only for comment counts)
- Historical data (scrape once, cache locally, don't re-fetch)

### **❌ Don't scrape manually for:**
- Real-time trending data (too slow, use API)
- Accurate follower counts (TikTok obfuscates this on public pages, use API)
- Engagement rates (calculated from multiple API fields, cleaner via API)

---

## **Tools Stack**

### **API Layer:**
- **RapidAPI TikTok Scraper ($4.99/mo)** — Real-time stats, trending, profiles
- Alternative: **TikAPI Pro ($5.90/mo)** if you scale past 60k requests/month

### **Free Scraping Layer:**
- **yt-dlp** — Video downloads + basic metadata
- **Playwright** (if needed) — Browser automation for edge cases
- **Proxies** (rotating residential) — Avoid blocks on free scraping

### **Data Storage:**
- **Google Sheets** (current setup) — Creator tracking, submission logging
- **Local archive** — Downloaded videos for editing team
- **JSON files** — Cache API responses to avoid re-fetching

---

## **Scaling Path**

### **Current (Week 1-4):**
- Track 200 creators
- Pull trending daily
- Research 10 hashtags/day
- **Cost:** $4.99/mo (RapidAPI)

### **Month 2-3 (Scale Up):**
- Track 500 creators
- Research 30 hashtags/day
- Add comment sentiment analysis
- **Cost:** Still $4.99/mo if you optimize (stay under 2k/day)

### **Month 4+ (Full Scale):**
- Track 1,000+ creators
- Real-time monitoring (check profiles every 6 hours)
- Deep engagement tracking
- **Cost:** Switch to TikAPI ($5.90/mo for 200k requests) or upgrade RapidAPI plan

---

## **Hybrid ROI Breakdown**

| Method | Cost | Speed | Reliability | Best For |
|--------|------|-------|-------------|----------|
| **Free Scraping** | $0 | Slow | Medium | Video downloads, bulk data |
| **API (RapidAPI)** | $4.99/mo | Fast | High | Real-time stats, trending |
| **API (TikAPI)** | $5.90/mo | Fast | High | High-volume operations |
| **Hybrid (Both)** | $4.99/mo | Fast | High | Everything (optimal) |

---

## **Week 1 Action Plan**

### **Day 1: Setup**
1. Sign up for RapidAPI Pro ($4.99/mo)
2. Install yt-dlp on Pakistan team machines
3. Set up Google Sheets tracking (already done)

### **Day 2-7: Data Collection**
**Morning (30 min):**
- API pull: Trending videos (50 requests)
- API pull: Trending hashtags (10 requests)
- Download top 10 trending videos with yt-dlp (free)

**Afternoon (1 hour):**
- API pull: Check 200 competitor profiles (200 requests)
- API pull: Get recent videos from competitors (600 requests)
- Download any viral videos (>1M views) with yt-dlp

**Evening (30 min):**
- API pull: Research 10 hashtags (210 requests)
- Log findings in Google Sheets
- Flag content for editing team

**Total daily API usage:** ~1,100 requests (well under 2k limit)

---

## **Success Metrics (Track These)**

### **Week 1 Goals:**
- ✅ Stay under 2,000 API requests/day (avoid overages)
- ✅ Identify 50+ viral videos (>1M views) in your niche
- ✅ Build database of 200 tracked creators
- ✅ Find 3-5 winning content formats

### **Week 2-4 Goals:**
- ✅ Expand to 500 tracked creators
- ✅ Archive 500+ viral videos (for editing templates)
- ✅ Identify top 20 hashtags that consistently perform
- ✅ Optimize API usage (remove redundant requests)

---

## **Bottom Line**

**Optimal hybrid = API for real-time stats + free scraping for video downloads.**

**Start with:**
1. RapidAPI Pro ($4.99/mo)
2. yt-dlp for video downloads
3. Track 200 creators + trending content
4. Stay under 1,500 requests/day (leaves buffer)

**This gives you everything you need for <$5/month.**

Scale up only when you're consistently hitting the 2k/day limit.
