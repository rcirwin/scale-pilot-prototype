export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatDemo {
  id: string;
  title: string;
  messages: ChatMessage[];
}

export const chatDemos: ChatDemo[] = [
  {
    id: 'demo-wasted-spend',
    title: 'Identify campaigns to pause for wasted spend',
    messages: [
      {
        role: 'user',
        content: 'What campaigns should I pause based on wasted spend?',
      },
      {
        role: 'assistant',
        content: `I analyzed all 14 active campaigns over the last 30 days and found **1 campaign that should be paused immediately** and 2 others worth monitoring.

**Pause immediately: "Sandbags 90 lbs - Phrase 1"**

This campaign has spent **$72.61 in the last 30 days with 0 orders**. It generated 312 clicks at a $0.23 average CPC but has a 0% conversion rate. I looked at the search term report and 87% of the traffic is coming from irrelevant queries — "sandbag workout", "sand bags for flooding", "sandbag for door" — none of which match your product (fitness sandbags for strength training).

This is not a bid optimization problem. The phrase-match keyword "sandbags 90 lbs" is structurally flawed — there are hundreds of irrelevant phrase variations that will keep draining budget no matter how many you negate. My recommendation is to pause this campaign immediately and consider an exact-match-only approach for sandbag products if you want to advertise them.

**Projected savings: $72.61/month ($871/year) with zero revenue impact.**

**Worth monitoring (not yet at pause threshold):**

- **"SP - Resistance Bands - Broad Discovery"** — $48.20 spend, 2 orders, 68.7% ACOS. The Bidding Algorithm already reduced bids last week. Give it 14 more days to see if performance improves before considering a pause.
- **"SP - Sandbags - Auto"** — $31.40 spend, 1 order. Note that ASIN B09BKSP6HK is currently out of stock (0 FBA units), so I have already flagged this for an immediate pause in a separate finding. That recommendation addresses this campaign.

Would you like me to pause "Sandbags 90 lbs - Phrase 1" now?`,
      },
    ],
  },
  {
    id: 'demo-low-inventory',
    title: 'Find ASINs to reduce ad spend due to low inventory',
    messages: [
      {
        role: 'user',
        content: 'Which ASINs should I reduce ad spend on because of low inventory?',
      },
      {
        role: 'assistant',
        content: `I cross-referenced your FBA inventory levels against advertising velocity for all 6 active ASINs. Two products need attention — one is critical and one requires a strategic decision.

**Critical — B09BKSP6HK (Fitness Sandbag 90 lbs): OUT OF STOCK**

This ASIN has **0 units in FBA inventory** and has been out of stock for at least 2 days. Despite this, 3 campaigns ("Sandbags 90 lbs - Exact 1", "Sandbags 90 lbs - Phrase 1", "Sandbags 90 lbs - Auto") are still active and spent **$5.07 in the last 24 hours** on 47 clicks that cannot possibly convert. Every dollar here is pure waste.

I recommend pausing all campaigns containing this ASIN immediately. If you have a restock shipment arriving within 5 days, we can set a reminder to re-enable them. Otherwise, these should stay paused until inventory is confirmed inbound.

**Action needed — B0DYVYQ2DL (Wine Making Kit Complete): 6.9 days of inventory**

This is your top performer — $714 in ad spend over the last 7 days at a healthy 22% ACOS, driving 189 units sold via ads and 265 total. The problem is you only have **261 units left in FBA**, which at the current sell-through rate of 37.8 units/day gives you roughly **6.9 days of inventory**.

This one is a judgment call. If you have a restock shipment arriving within 5 days, you can maintain current spend levels. If not, I recommend reducing PPC bid aggressiveness by 30-40% to slow down the ad-driven velocity and extend your runway. Going out of stock on a product with this kind of organic momentum would cost you far more in lost BSR and keyword ranking than the short-term revenue from aggressive ad spend.

The other 4 ASINs all have 20+ days of inventory at current velocity — no action needed on those.

Would you like me to pause the B09BKSP6HK campaigns and reduce bids on B0DYVYQ2DL?`,
      },
    ],
  },
];
