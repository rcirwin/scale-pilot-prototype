export interface Recommendation {
  id: string;
  title: string;
  category: 'Algorithm Orchestration' | 'Campaign Structure' | 'Data Enrichment' | 'Direct Action';
  priority: 'high' | 'medium' | 'low';
  summary: string;
  reasoning: string;
  currentState: string;
  proposedAction: string;
  expectedImpact: string;
  confidence: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  timestamp: string;
  entity: string;
  entityType: string;
}

export const recommendations: Recommendation[] = [
  {
    id: 'r1',
    title: "Assign 'Ranking Exact' SO to ad group 'Brand - Exact' on 'SP - Brand Defense'",
    category: 'Algorithm Orchestration',
    priority: 'high',
    summary:
      'Organic rank is declining on 3 branded keywords. Assigning the Ranking Exact strategic objective will prioritize impression share and bid aggressively to defend page-1 organic positions.',
    reasoning:
      'Keyword rank tracker shows your branded terms "wine making kit complete", "DYVYQ wine kit", and "complete wine making set" have dropped from positions 3-5 to positions 8-12 over the last 14 days. The Ranking Exact SO is designed to bid aggressively on exact-match keywords to maximize top-of-search impression share, which correlates with organic rank recovery.',
    currentState:
      'Ad group "Brand - Exact" is running with no strategic objective assigned. Bids are static at $0.85. Organic rank on 3 branded keywords declined from avg position 4 to avg position 10.',
    proposedAction:
      'Assign the "Ranking Exact" strategic objective to ad group "Brand - Exact" in campaign "SP - Brand Defense". This will enable dynamic bidding with top-of-search bias and automatic bid escalation targeting 80%+ top-of-search impression share.',
    expectedImpact:
      'Recover organic rank on branded keywords within 7-14 days. Expected ad spend increase of $15-25/week during ranking push, offset by restored organic traffic.',
    confidence: 'High',
    status: 'pending',
    timestamp: '2026-04-06T08:15:00Z',
    entity: 'SP - Brand Defense / Brand - Exact',
    entityType: 'ad_group',
  },
  {
    id: 'r2',
    title: "Assign 'Negative Algorithm' to ad group 'Auto - Discovery' on 'SP - Auto Research'",
    category: 'Algorithm Orchestration',
    priority: 'high',
    summary:
      '12 search terms in the auto campaign have accumulated $340 in spend with 0 orders over 30 days. The Negative Algorithm will automatically negate these and prevent future waste from similar terms.',
    reasoning:
      'Search term analysis of "SP - Auto Research / Auto - Discovery" reveals 12 search terms that have each received 15+ clicks with zero conversions. Total wasted spend across these terms is $340.22 in the last 30 days. Without the Negative Algorithm, these terms will continue to drain budget. The algorithm applies data-driven negation rules based on click-to-conversion thresholds you configure.',
    currentState:
      'No negation algorithm assigned. 12 search terms wasting $340/month. Manual negation has not been performed in 45+ days.',
    proposedAction:
      'Assign the "Negative Algorithm" to ad group "Auto - Discovery" with a threshold of 20 clicks / 0 orders for exact negation and 30 clicks / 0 orders for phrase negation.',
    expectedImpact:
      'Immediate savings of approximately $340/month from known wasted terms. Ongoing protection against new wasteful search terms as they accumulate click data.',
    confidence: 'High',
    status: 'pending',
    timestamp: '2026-04-06T08:15:00Z',
    entity: 'SP - Auto Research / Auto - Discovery',
    entityType: 'ad_group',
  },
  {
    id: 'r3',
    title: "Modify Bidding Rule target ACOS from 30% to 22% on ad group 'Exact - Core'",
    category: 'Algorithm Orchestration',
    priority: 'medium',
    summary:
      'Current ACOS on "Exact - Core" is 14.18%, well below the 30% target. Tightening to 22% will allow the algorithm to bid more aggressively while staying within profitable bounds.',
    reasoning:
      'The bidding algorithm on "Exact - Core" is configured with a 30% target ACOS, but actual ACOS is running at 14.18%. This means the algorithm is being overly conservative — it has headroom to increase bids and capture more impression share while remaining profitable. Lowering the target to 22% (still above current performance) gives the algorithm permission to scale spend on proven keywords.',
    currentState:
      'Ad group "Exact - Core" has a Bidding Rule with target ACOS of 30%. Actual ACOS is 14.18%. The algorithm is underbidding relative to the opportunity.',
    proposedAction:
      'Update the Bidding Rule target ACOS from 30% to 22% on ad group "Exact - Core" in campaign "SP - Wine Kit Manual".',
    expectedImpact:
      'Estimated 20-35% increase in impression share and clicks on high-converting exact-match keywords, with ACOS remaining under 22%. Projected incremental revenue: $200-400/month.',
    confidence: 'Medium',
    status: 'pending',
    timestamp: '2026-04-06T08:15:00Z',
    entity: 'SP - Wine Kit Manual / Exact - Core',
    entityType: 'ad_group',
  },
  {
    id: 'r4',
    title: "Create Single Keyword Campaign for 'wine making supplies and equipment'",
    category: 'Campaign Structure',
    priority: 'medium',
    summary:
      'SQP data shows a 3.6x conversion advantage on this query. Creating a dedicated exact-match campaign ensures maximum visibility and bid control on your highest-opportunity keyword.',
    reasoning:
      'Search Query Performance analysis shows B0DYVYQ2DL converts at 50% on "wine making supplies and equipment" vs the 10.8% marketplace average. This query generates 637 weekly searches. Currently, you reach this query inconsistently through broad and auto campaigns. A dedicated single-keyword campaign provides precise bid control and ensures you never miss impression opportunities on your strongest converting query.',
    currentState:
      'No dedicated campaign for this keyword. Impressions come sporadically from broad-match and auto campaigns. Estimated current impression share: 15-25%.',
    proposedAction:
      'Create a new Sponsored Products campaign "SP - Wine Kit - SKW - wine making supplies" with one ad group containing the single exact-match keyword "wine making supplies and equipment". Set daily budget at $25 and initial bid at $1.20.',
    expectedImpact:
      'Capture 60-80% impression share on a query with 3.6x conversion advantage. Estimated incremental revenue: $580-$890/month at projected 18-22% ACOS.',
    confidence: 'Medium',
    status: 'pending',
    timestamp: '2026-04-06T08:15:00Z',
    entity: 'wine making supplies and equipment',
    entityType: 'keyword',
  },
  {
    id: 'r5',
    title: 'Track 5 new keywords for organic rank on B0CFKCL2KQ',
    category: 'Data Enrichment',
    priority: 'low',
    summary:
      'Only 2 keywords are tracked for B0CFKCL2KQ. With ACOS spiking to 38.50%, organic rank data is critical for root cause analysis but currently insufficient.',
    reasoning:
      'B0CFKCL2KQ experienced a sharp ACOS increase from 14.18% to 38.50%. To determine whether this is caused by organic rank loss (competitors pushing you down in search results) or a listing quality issue, we need organic rank data on the top revenue-driving keywords. Currently, only 2 keywords are tracked — far too few for meaningful analysis. Adding the top 5 search terms by spend will provide the diagnostic data needed within 7 days.',
    currentState:
      'Only 2 keywords tracked for organic rank on B0CFKCL2KQ: "resistance bands" and "workout bands". Missing coverage on high-spend terms like "resistance band set", "exercise bands for working out", and "resistance bands for women".',
    proposedAction:
      'Add these 5 keywords to the keyword rank tracker for ASIN B0CFKCL2KQ: "resistance band set", "exercise bands for working out", "resistance bands for women", "pull up assist bands", "resistance bands set with handles".',
    expectedImpact:
      'Within 7 days, sufficient organic rank data to determine if the ACOS spike is caused by rank loss or listing issues. Enables targeted corrective action.',
    confidence: 'High',
    status: 'pending',
    timestamp: '2026-04-06T08:15:00Z',
    entity: 'B0CFKCL2KQ',
    entityType: 'asin',
  },
  {
    id: 'r6',
    title: "Assign 'Import Algorithm' to 3 auto campaigns for keyword harvesting",
    category: 'Algorithm Orchestration',
    priority: 'medium',
    summary:
      'Three auto campaigns have converting search terms that have not been harvested into manual campaigns. The Import Algorithm automates this extraction process.',
    reasoning:
      'Analysis of search term reports across your 3 active auto campaigns found 8 search terms that have generated 3+ orders each in the last 30 days but do not exist as keywords in any manual campaign. These proven converters are being left in auto campaigns where bid control is limited. The Import Algorithm will automatically identify converting search terms, create them as keywords in designated manual campaigns, and negate them in the auto campaign to prevent cannibalization.',
    currentState:
      '3 auto campaigns running without Import Algorithm. 8 converting search terms identified that should be in manual campaigns. Estimated monthly revenue from these terms: $1,240.',
    proposedAction:
      'Assign the "Import Algorithm" to auto campaigns "SP - Wine Kit Auto", "SP - Resistance Bands Auto", and "SP - Sandbags Auto". Configure with a threshold of 2 orders minimum and destination manual campaigns for each product.',
    expectedImpact:
      'Automated keyword harvesting improves bid precision on proven converters. Expected 10-15% improvement in ACOS on harvested terms due to better bid control in manual campaigns.',
    confidence: 'Medium',
    status: 'accepted',
    timestamp: '2026-04-05T14:30:00Z',
    entity: 'SP - Wine Kit Auto, SP - Resistance Bands Auto, SP - Sandbags Auto',
    entityType: 'campaign',
  },
  {
    id: 'r7',
    title: "Pause campaign 'Sandbags 90 lbs - Phrase 1'",
    category: 'Direct Action',
    priority: 'high',
    summary:
      '$72.61/month in pure waste. 30 days of data with 312 clicks and 0 orders. 87% of traffic from irrelevant search terms. Not recoverable through optimization.',
    reasoning:
      'This campaign has been evaluated for recovery potential and the conclusion is negative. The phrase-match keyword "sandbags 90 lbs" is matching to queries like "sandbag workout", "sand bags for flooding", and "sandbag training exercises" which have fundamentally different purchase intent than the product (fitness sandbags for weight training). Negating individual terms is a game of whack-a-mole — there are hundreds of irrelevant variations. The campaign structure itself is flawed.',
    currentState:
      'Campaign active, spending $2.42/day average. 0 orders in 30 days. 312 clicks, 0% CVR. Budget: $10/day.',
    proposedAction:
      'Pause campaign "Sandbags 90 lbs - Phrase 1" immediately. Do not archive — pause only, in case the product is relaunched with different targeting.',
    expectedImpact:
      'Immediate savings of $72.61/month ($871/year). Zero revenue impact since the campaign produces no orders.',
    confidence: 'High',
    status: 'accepted',
    timestamp: '2026-04-05T16:45:00Z',
    entity: 'Sandbags 90 lbs - Phrase 1',
    entityType: 'campaign',
  },
  {
    id: 'r8',
    title: "Restructure 'Fitness Sandbags - Perpetua - SP - Manual'",
    category: 'Campaign Structure',
    priority: 'medium',
    summary:
      'Legacy Perpetua-created campaign has mixed brand and non-brand keywords in a single ad group, causing non-brand terms to leak budget from brand terms.',
    reasoning:
      'Campaign "Fitness Sandbags - Perpetua - SP - Manual" was originally created by Perpetua and has a single ad group containing both brand keywords (e.g., "DYVYQ sandbag") and generic non-brand keywords (e.g., "fitness sandbag", "heavy sandbag for training"). The non-brand terms have 3x higher CPC and significantly worse ACOS (42% vs 12% for brand). This structure prevents effective budget allocation — the profitable brand terms are being starved of budget by the expensive non-brand terms.',
    currentState:
      'Single ad group with 23 keywords mixing brand and non-brand. Brand keywords: 12% ACOS, $0.45 CPC. Non-brand keywords: 42% ACOS, $1.35 CPC. Daily budget: $15.',
    proposedAction:
      'Split into two campaigns: "SP - Sandbags Brand" (brand keywords only, $8/day budget) and "SP - Sandbags Non-Brand" (generic keywords, $7/day budget with tighter bid controls). Pause original Perpetua campaign.',
    expectedImpact:
      'Brand terms get dedicated budget and bid control. Non-brand terms can be independently optimized or pruned. Expected overall ACOS improvement of 8-12% on this product line.',
    confidence: 'Medium',
    status: 'rejected',
    timestamp: '2026-04-04T10:00:00Z',
    entity: 'Fitness Sandbags - Perpetua - SP - Manual',
    entityType: 'campaign',
  },
];
