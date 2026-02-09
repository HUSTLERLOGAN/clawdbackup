# TikAPI Pro Plan Breakdown ($5.90/mo)

**Plan:** Pro  
**Cost:** $5.90/month  
**Date analyzed:** 2025-02-03

---

## **What You Get**

### **1. API Requests: 200,000/month (Hard Limit)**
- **Per day average:** ~6,667 requests
- **Per hour average:** ~278 requests
- **What counts as a request:**
  - Fetching a user profile
  - Getting video details
  - Searching hashtags
  - Checking video stats
  - Each API call = 1 request

**Hard Limit = NO OVERAGES.**  
You hit 200k → API stops working until next billing cycle. No pay-to-continue option.

---

### **2. Rate Limit: Not Specified**
Plan says "Rate Limit -" (likely unlimited or very high for Pro tier).

**What this means:**  
You can burst requests quickly without throttling, but total monthly cap still applies (200k).

---

### **3. Bandwidth: 10GB (10,240MB) base + overages**
- **Base included:** 10GB/month
- **Overage cost:** $0.001 per 1MB = **$1 per GB**

**What counts as bandwidth:**
- Video downloads
- Thumbnail/image downloads
- Profile picture fetches
- Any media returned by the API

**Example costs:**
- Download 100 videos (~5GB) → Uses half your base bandwidth
- Download 1,000 videos (~50GB) → Uses 10GB base + 40GB overage = **$40 extra**
- Just fetching metadata (no video downloads) → Minimal bandwidth usage

---

### **4. Platform Fee: 10% markup**
Every API call goes through TikAPI's infrastructure. They charge a 10% platform fee on top of the $5.90 base.

**Actual monthly cost if you use it normally:** ~$6.49/mo

---

## **Real-World Usage Scenarios**

### **Scenario 1: Metadata Only (No Video Downloads)**
- **Use case:** Scraping profiles, tracking stats, hashtag research
- **Monthly requests:** 200,000
- **Bandwidth:** <100MB (negligible)
- **Cost:** $5.90/mo

**Verdict:** Best value. Maxes out requests, minimal bandwidth.

---

### **Scenario 2: Light Video Downloads**
- **Use case:** Download 10 videos/day for content analysis
- **Monthly requests:** ~50,000 (profile checks + video fetches)
- **Bandwidth:** ~15GB (10GB base + 5GB overage = $5)
- **Cost:** $5.90 + $5 = **$10.90/mo**

**Verdict:** Doable but bandwidth adds up fast.

---

### **Scenario 3: Heavy Video Downloads**
- **Use case:** Archive 100 videos/day
- **Monthly requests:** ~100,000
- **Bandwidth:** ~150GB (10GB base + 140GB overage = $140)
- **Cost:** $5.90 + $140 = **$145.90/mo**

**Verdict:** Wrong plan. Video archiving should use direct TikTok CDN scraping, not paid API.

---

## **Pakistan Team Operations (Your Use Case)**

### **What you're likely doing:**
- Tracking creator stats (views, engagement, follower counts)
- Monitoring brand mentions
- Scraping hashtag performance
- Profile research

### **Estimated monthly usage:**
- **Requests:** 50,000–100,000 (well under 200k limit)
- **Bandwidth:** <1GB (metadata-heavy, not video-heavy)
- **Actual cost:** $5.90/mo (no overages)

**Verdict:** Pro plan is perfect IF you're not bulk-downloading videos.

---

## **Red Flags / Gotchas**

### **1. Hard limit on requests**
Once you hit 200k, API dies until next month. No emergency overages.

**Mitigation:** Track daily usage. Set alert at 150k requests.

---

### **2. Bandwidth can explode costs**
$1/GB sounds cheap until you're downloading 500 videos.

**Mitigation:**  
- Use API for metadata only
- Download videos directly from TikTok CDN (free, no API cost)
- Only use API bandwidth for thumbnails/small assets

---

### **3. No request pooling across months**
Unused requests don't roll over. If you use 100k this month, you lose the other 100k.

**Mitigation:** Batch operations at month-end if needed.

---

## **Comparison: What 200k Requests Actually Buys**

Assuming typical API efficiency:

| Task | Requests Per Action | Monthly Capacity |
|------|---------------------|------------------|
| Fetch user profile | 1 | 200,000 profiles |
| Get video details | 1 | 200,000 videos |
| Track 100 creators daily | ~300/day | Can track for full month |
| Scrape hashtag (top 50 posts) | ~50 | 4,000 hashtag searches |
| Monitor 500 accounts daily | ~500/day | Uses 15k/month (well under limit) |

**Bottom line:** 200k is plenty for monitoring/tracking. Not enough for large-scale archiving.

---

## **Recommendation**

**This plan works IF:**
- You're tracking stats, not downloading videos
- You need <200k API calls/month
- Your Pakistan team uses it for research/monitoring

**Upgrade to higher plan IF:**
- You're hitting the 200k limit
- You need video downloads at scale (but honestly, don't use TikAPI for that—use CDN scraping)

**Cost-saving hack:**
- Use API for data (profiles, stats, engagement)
- Use yt-dlp or TikTok CDN scraping for video downloads (free bandwidth)

---

**Current verdict:** $5.90/mo is solid value for metadata-heavy operations. Just don't use it to download videos in bulk.
