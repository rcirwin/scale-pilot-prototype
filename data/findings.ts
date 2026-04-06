export interface Finding {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
  summary: string;
  narrative: string;
  evidence: { metric: string; current: string; previous?: string; delta?: string }[];
  actions: string[];
  executionMethod: 'Algorithm Orchestration' | 'Direct Action' | 'Campaign Structure' | 'Data Enrichment';
  confidence: 'High' | 'Medium' | 'Low';
  confidenceReason: string;
  dataSources: string[];
  timestamp: string;
}

export const findings: Finding[] = [
  {
    id: 'f1',
    title: 'Out-of-stock ASIN B09BKSP6HK still spending $5.07 on ads',
    severity: 'high',
    category: 'Inventory-Ad Mismatch',
    summary:
      'FBA stock for B09BKSP6HK is 0 units, yet 3 Sponsored Products campaigns containing this ASIN remain active and spent $5.07 in the last 24 hours. Every click is wasted spend with zero chance of conversion.',
    narrative:
      'Scale Pilot cross-referenced your FBA inventory feed against active advertising campaigns and detected that ASIN B09BKSP6HK (Fitness Sandbag 90 lbs) has been out of stock for at least 2 days. Despite this, the campaigns "Sandbags 90 lbs - Exact 1", "Sandbags 90 lbs - Phrase 1", and "Sandbags 90 lbs - Auto" are still serving impressions and accumulating clicks. In the last 24 hours alone, these campaigns generated 47 clicks at $5.07 total spend with zero orders — because there is nothing to buy. If left running, projected weekly waste is approximately $35.',
    evidence: [
      { metric: 'Total Available Stock (FBA)', current: '0 units', previous: '24 units', delta: '-24' },
      { metric: 'Ad Spend (last 24h)', current: '$5.07' },
      { metric: 'Clicks (last 24h)', current: '47' },
      { metric: 'Orders (last 24h)', current: '0' },
      { metric: 'Active Campaigns', current: '3' },
      { metric: 'Projected Weekly Waste', current: '$35.49' },
    ],
    actions: [
      'Pause all campaigns containing ASIN B09BKSP6HK immediately',
      'Set up inventory-linked auto-pause rule to prevent recurrence',
      'Review restock timeline — if restock is within 5 days, consider pausing instead of archiving',
    ],
    executionMethod: 'Direct Action',
    confidence: 'High',
    confidenceReason:
      'Stock level confirmed at 0 via Seller Central API. Ad spend and click data confirmed via Amazon Advertising API. There is no ambiguity — this ASIN cannot convert.',
    dataSources: ['FBA Inventory API', 'Amazon Advertising API', 'Seller Central'],
    timestamp: '2026-04-06T08:15:00Z',
  },
  {
    id: 'f2',
    title: 'B0DYVYQ2DL has only 6.9 days of inventory at current ad-driven velocity',
    severity: 'medium',
    category: 'Inventory Risk',
    summary:
      'ASIN B0DYVYQ2DL (Wine Making Kit Complete) is selling 37.8 units/day with ad support generating $714 in spend over the last 7 days at a healthy 22% ACOS. However, current FBA inventory of 261 units will last only 6.9 days at this velocity.',
    narrative:
      'Your top-performing ASIN B0DYVYQ2DL is at risk of stockout within a week. The product is converting well — 22% ACOS with strong organic + paid sales — but the current sell-through rate of 37.8 units/day against 261 remaining units means you have roughly 6.9 days of inventory left. If no restocking is in transit, you face two bad outcomes: either the listing goes out of stock (losing organic rank and BSR), or you keep spending aggressively on ads that drive faster depletion. Scale Pilot recommends reducing PPC aggressiveness now to extend runway, unless you can confirm a restock shipment arriving within 5 days.',
    evidence: [
      { metric: 'Current FBA Inventory', current: '261 units' },
      { metric: 'Daily Sales Velocity', current: '37.8 units/day' },
      { metric: 'Days of Inventory', current: '6.9 days' },
      { metric: 'Ad Spend (7d)', current: '$714.32' },
      { metric: 'ACOS (7d)', current: '22.1%', previous: '19.8%', delta: '+2.3%' },
      { metric: 'Units Sold via Ads (7d)', current: '189 units' },
      { metric: 'Total Units Sold (7d)', current: '265 units' },
    ],
    actions: [
      'Reduce PPC bid aggressiveness by 30-40% to slow ad-driven velocity',
      'Confirm restock shipment ETA with supplier/3PL',
      'If no restock within 7 days, consider pausing non-brand campaigns to preserve organic rank',
    ],
    executionMethod: 'Algorithm Orchestration',
    confidence: 'High',
    confidenceReason:
      'Inventory count from FBA API is real-time. Sales velocity is calculated from the last 7 days of order data. Days-of-inventory math is straightforward division.',
    dataSources: ['FBA Inventory API', 'Amazon Advertising API', 'Business Reports'],
    timestamp: '2026-04-06T08:15:00Z',
  },
  {
    id: 'f3',
    title: '3 SQP scaling opportunities for B0DYVYQ2DL — $461-$1,394/mo potential',
    severity: 'medium',
    category: 'Growth Opportunity',
    summary:
      'Search Query Performance data shows B0DYVYQ2DL converting at 2-3.6x the marketplace average on 3 high-volume queries where you have no exact-match campaign coverage. Estimated incremental revenue: $461-$1,394/month.',
    narrative:
      'Scale Pilot analyzed your Search Query Performance (SQP) reports and cross-referenced them against your current campaign targeting. Three queries stand out where your ASIN significantly outperforms the marketplace conversion rate but you lack dedicated exact-match campaigns to capture maximum impression share.\n\nThe top opportunity is "wine making supplies and equipment" with 637 weekly searches. Your ASIN converts at 50% on this query versus the marketplace average of 10.8% — a 3.6x advantage. You are currently only reaching this query through broad and auto campaigns with inconsistent visibility.\n\nThe other two queries — "complete wine making kit" (412 searches, 2.8x CVR advantage) and "home wine making starter kit" (289 searches, 2.1x CVR advantage) — show similar patterns of strong conversion without dedicated targeting.',
    evidence: [
      {
        metric: 'Query: "wine making supplies and equipment"',
        current: '637 weekly searches, 50% CVR vs 10.8% marketplace',
      },
      {
        metric: 'Query: "complete wine making kit"',
        current: '412 weekly searches, 38.2% CVR vs 13.6% marketplace',
      },
      {
        metric: 'Query: "home wine making starter kit"',
        current: '289 weekly searches, 29.4% CVR vs 14.1% marketplace',
      },
      { metric: 'Current Exact-Match Coverage', current: '0 campaigns' },
      { metric: 'Estimated Incremental Revenue', current: '$461-$1,394/month' },
    ],
    actions: [
      'Create exact-match Sponsored Products campaign for "wine making supplies and equipment"',
      'Create exact-match Sponsored Products campaign for "complete wine making kit"',
      'Create exact-match Sponsored Products campaign for "home wine making starter kit"',
      'Set initial bids at $1.20 based on current average CPC in this category',
    ],
    executionMethod: 'Campaign Structure',
    confidence: 'Medium',
    confidenceReason:
      'SQP data is directional — Amazon provides conversion rates at the query level but does not guarantee future performance. Revenue estimates assume current conversion rates hold with increased impression share.',
    dataSources: ['Search Query Performance (Brand Analytics)', 'Amazon Advertising API'],
    timestamp: '2026-04-06T08:15:00Z',
  },
  {
    id: 'f4',
    title: "Campaign 'Sandbags 90 lbs - Phrase 1' wasting $72.61/mo with 0 orders",
    severity: 'high',
    category: 'Wasted Spend',
    summary:
      'Campaign "Sandbags 90 lbs - Phrase 1" has spent $72.61 over the last 30 days with 0 orders, 0% conversion rate, and 312 clicks. This campaign has no evidence of being recoverable through optimization.',
    narrative:
      'This campaign has been running for 30 days with consistent spend but zero conversions. Scale Pilot analyzed the search term report and found that the majority of traffic is coming from irrelevant queries like "sandbag workout" and "sand bags for flooding" — neither of which matches the product (fitness sandbags for strength training). The phrase-match targeting is too broad and attracting non-purchase-intent traffic.\n\nAt $72.61/month, this represents pure waste. The search terms driving clicks have no conversion history across your entire account, making optimization through negation insufficient — there simply is not a viable keyword subset within this match type for this product.',
    evidence: [
      { metric: 'Ad Spend (30d)', current: '$72.61' },
      { metric: 'Orders (30d)', current: '0' },
      { metric: 'Clicks (30d)', current: '312' },
      { metric: 'CTR', current: '0.41%' },
      { metric: 'CVR', current: '0%' },
      { metric: 'Irrelevant Search Terms', current: '87% of traffic' },
    ],
    actions: [
      'Pause campaign "Sandbags 90 lbs - Phrase 1" immediately',
      'Reallocate $72.61/mo budget to higher-performing campaigns',
      'Consider exact-match-only strategy for sandbag products going forward',
    ],
    executionMethod: 'Direct Action',
    confidence: 'High',
    confidenceReason:
      '30 days of zero conversions with 312 clicks is statistically conclusive. The search term analysis confirms structural targeting issues that cannot be fixed with bid adjustments alone.',
    dataSources: ['Amazon Advertising API', 'Search Term Report'],
    timestamp: '2026-04-06T08:15:00Z',
  },
  {
    id: 'f5',
    title: 'B0CFKCL2KQ ACOS jumped from 14.18% to 38.50% in 15 days',
    severity: 'medium',
    category: 'Performance Degradation',
    summary:
      'ASIN B0CFKCL2KQ (Resistance Band Set) saw ACOS spike from 14.18% to 38.50% over the last 15 days. Paid efficiency dropped sharply while organic keyword rank data is too sparse to determine if this is a competitive or listing issue.',
    narrative:
      'Scale Pilot detected a significant ACOS regression for ASIN B0CFKCL2KQ. Two weeks ago, this product was running at a healthy 14.18% ACOS — well within your 25% target. As of the most recent 7-day period, ACOS has ballooned to 38.50%, driven primarily by a combination of rising CPCs (+22%) and declining conversion rate (from 12.4% to 7.8%).\n\nThe root cause is not yet clear. Organic keyword rank data for this ASIN is sparse — only 2 keywords are being tracked, which is insufficient to determine whether competitors have displaced your organic position. The CPC increase suggests competitive pressure, but the conversion drop could also indicate a listing quality issue (suppressed reviews, content changes, or Buy Box loss).',
    evidence: [
      { metric: 'ACOS (current 7d)', current: '38.50%', previous: '14.18%', delta: '+24.32%' },
      { metric: 'Average CPC', current: '$1.34', previous: '$1.10', delta: '+$0.24' },
      { metric: 'CVR', current: '7.8%', previous: '12.4%', delta: '-4.6%' },
      { metric: 'Tracked Keywords', current: '2 keywords' },
      { metric: 'Ad Spend (7d)', current: '$287.44', previous: '$198.12', delta: '+$89.32' },
      { metric: 'Orders (7d)', current: '18', previous: '31', delta: '-13' },
    ],
    actions: [
      'Add 8-10 high-volume keywords to organic rank tracking for root cause analysis',
      'Check listing health: review count, Buy Box %, content suppression',
      'Reduce bids by 15-20% on non-brand keywords as an interim measure',
      'Re-evaluate in 7 days once keyword rank data is available',
    ],
    executionMethod: 'Data Enrichment',
    confidence: 'Medium',
    confidenceReason:
      'ACOS and CPC trends are confirmed from advertising data. However, the root cause is uncertain due to insufficient organic keyword rank tracking. The recommended actions are diagnostic rather than conclusive.',
    dataSources: ['Amazon Advertising API', 'Keyword Rank Tracker', 'Seller Central'],
    timestamp: '2026-04-06T08:15:00Z',
  },
];
