export interface DailyKPI {
  date: string;
  sales: number;
  spend: number;
  acos: number;
  profit: number;
  orders: number;
  impressions: number;
}

export interface ActionMarker {
  date: string;
  type: 'scale_pilot' | 'manual' | 'automation';
  description: string;
  category: string;
}

// Helper to generate synthetic daily data from Jan 1 to Apr 6 2026
function generateDailyData(): DailyKPI[] {
  const data: DailyKPI[] = [];
  const start = new Date('2026-01-01');
  const end = new Date('2026-04-06');

  let baseSales = 320;
  let baseSpend = 55;

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    const month = d.getMonth();

    // Seasonal trend: slight ramp up over time
    const dayIndex = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const trend = dayIndex * 1.8;

    // Weekend dip
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.82 : 1;

    // Monthly variation
    const monthFactor = month === 0 ? 0.85 : month === 1 ? 0.92 : month === 2 ? 1.05 : 1.1;

    // Random noise
    const noise = () => 0.88 + Math.random() * 0.24;

    const sales = Math.round((baseSales + trend) * weekendFactor * monthFactor * noise() * 100) / 100;
    const spend = Math.round((baseSpend + trend * 0.35) * weekendFactor * monthFactor * noise() * 100) / 100;
    const acos = Math.round((spend / sales) * 10000) / 100;
    const profit = Math.round((sales * 0.35 - spend * 0.15) * noise() * 100) / 100;
    const orders = Math.max(3, Math.round(sales / 28 * noise()));
    const impressions = Math.round((15000 + trend * 80) * weekendFactor * noise());

    data.push({ date: dateStr, sales, spend, acos, profit, orders, impressions });
  }

  // Override the last 30 days with the original hand-tuned data for consistency
  const last30 = [
    { date: '2026-03-08', sales: 412.30, spend: 62.18, acos: 15.08, profit: 128.45, orders: 14, impressions: 18420 },
    { date: '2026-03-09', sales: 387.15, spend: 58.44, acos: 15.10, profit: 112.80, orders: 13, impressions: 17890 },
    { date: '2026-03-10', sales: 521.60, spend: 78.92, acos: 15.13, profit: 164.20, orders: 18, impressions: 22150 },
    { date: '2026-03-11', sales: 498.40, spend: 84.33, acos: 16.92, profit: 148.70, orders: 17, impressions: 23400 },
    { date: '2026-03-12', sales: 445.90, spend: 71.55, acos: 16.04, profit: 135.90, orders: 15, impressions: 20100 },
    { date: '2026-03-13', sales: 378.20, spend: 68.10, acos: 18.01, profit: 104.30, orders: 12, impressions: 19200 },
    { date: '2026-03-14', sales: 356.80, spend: 57.42, acos: 16.10, profit: 98.60, orders: 11, impressions: 16800 },
    { date: '2026-03-15', sales: 482.50, spend: 89.15, acos: 18.48, profit: 141.20, orders: 16, impressions: 24300 },
    { date: '2026-03-16', sales: 534.70, spend: 95.40, acos: 17.84, profit: 162.80, orders: 18, impressions: 26100 },
    { date: '2026-03-17', sales: 612.40, spend: 108.30, acos: 17.68, profit: 189.40, orders: 21, impressions: 28500 },
    { date: '2026-03-18', sales: 578.90, spend: 102.45, acos: 17.70, profit: 174.60, orders: 20, impressions: 27200 },
    { date: '2026-03-19', sales: 491.20, spend: 88.60, acos: 18.04, profit: 142.10, orders: 16, impressions: 23800 },
    { date: '2026-03-20', sales: 423.60, spend: 79.30, acos: 18.72, profit: 118.50, orders: 14, impressions: 21400 },
    { date: '2026-03-21', sales: 389.40, spend: 72.18, acos: 18.54, profit: 105.20, orders: 13, impressions: 19600 },
    { date: '2026-03-22', sales: 567.30, spend: 98.70, acos: 17.40, profit: 172.40, orders: 19, impressions: 26800 },
    { date: '2026-03-23', sales: 645.80, spend: 112.40, acos: 17.41, profit: 198.30, orders: 22, impressions: 29400 },
    { date: '2026-03-24', sales: 598.20, spend: 105.60, acos: 17.65, profit: 180.50, orders: 20, impressions: 27800 },
    { date: '2026-03-25', sales: 432.10, spend: 94.80, acos: 21.94, profit: 108.40, orders: 14, impressions: 25100 },
    { date: '2026-03-26', sales: 401.50, spend: 98.20, acos: 24.45, profit: 88.60, orders: 13, impressions: 26200 },
    { date: '2026-03-27', sales: 378.90, spend: 102.40, acos: 27.03, profit: 72.30, orders: 12, impressions: 27800 },
    { date: '2026-03-28', sales: 345.20, spend: 96.80, acos: 28.04, profit: 58.40, orders: 11, impressions: 26400 },
    { date: '2026-03-29', sales: 412.60, spend: 87.30, acos: 21.16, profit: 112.80, orders: 14, impressions: 23600 },
    { date: '2026-03-30', sales: 478.40, spend: 82.10, acos: 17.16, profit: 148.90, orders: 16, impressions: 22100 },
    { date: '2026-03-31', sales: 523.70, spend: 79.50, acos: 15.18, profit: 168.40, orders: 18, impressions: 21400 },
    { date: '2026-04-01', sales: 556.90, spend: 78.20, acos: 14.04, profit: 182.60, orders: 19, impressions: 21800 },
    { date: '2026-04-02', sales: 612.30, spend: 82.40, acos: 13.46, profit: 201.40, orders: 21, impressions: 22600 },
    { date: '2026-04-03', sales: 589.10, spend: 76.80, acos: 13.04, profit: 196.20, orders: 20, impressions: 21200 },
    { date: '2026-04-04', sales: 634.50, spend: 81.30, acos: 12.82, profit: 212.40, orders: 22, impressions: 22400 },
    { date: '2026-04-05', sales: 672.80, spend: 84.60, acos: 12.57, profit: 224.80, orders: 23, impressions: 23100 },
    { date: '2026-04-06', sales: 648.20, spend: 79.90, acos: 12.33, profit: 218.60, orders: 22, impressions: 22000 },
  ];

  // Replace matching dates
  const last30Dates = new Set(last30.map(d => d.date));
  const filtered = data.filter(d => !last30Dates.has(d.date));
  return [...filtered, ...last30].sort((a, b) => a.date.localeCompare(b.date));
}

export const dailyKPIs: DailyKPI[] = generateDailyData();

export const actionMarkers: ActionMarker[] = [
  // January
  { date: '2026-01-08', type: 'scale_pilot', description: 'Initial campaign audit completed — 3 campaigns flagged for review', category: 'Data Enrichment' },
  { date: '2026-01-15', type: 'manual', description: 'Increased budget on SP - Wine Kit Manual from $10 to $15', category: 'Budget Change' },
  { date: '2026-01-22', type: 'automation', description: 'Bidding Algorithm reduced bids on 6 underperforming keywords', category: 'Bid Optimization' },
  { date: '2026-01-28', type: 'scale_pilot', description: 'Assigned Negative Algorithm to SP - Sandbags Auto', category: 'Algorithm Orchestration' },

  // February
  { date: '2026-02-04', type: 'automation', description: 'Negative Algorithm negated 4 search terms with 0 conversions', category: 'Negation' },
  { date: '2026-02-11', type: 'scale_pilot', description: 'Created exact-match campaign for "fitness sandbag weights"', category: 'Campaign Structure' },
  { date: '2026-02-18', type: 'manual', description: 'Paused 2 underperforming broad match campaigns', category: 'Campaign Management' },
  { date: '2026-02-25', type: 'automation', description: 'Import Algorithm harvested 3 keywords from auto campaigns', category: 'Keyword Harvesting' },

  // March
  { date: '2026-03-04', type: 'scale_pilot', description: 'Detected inventory risk on B0DYVYQ2DL — recommended bid reduction', category: 'Direct Action' },
  { date: '2026-03-08', type: 'automation', description: 'Bidding Algorithm optimized bids across 8 ad groups', category: 'Bid Optimization' },
  { date: '2026-03-12', type: 'scale_pilot', description: 'Assigned Negative Algorithm to SP - Auto Research', category: 'Algorithm Orchestration' },
  { date: '2026-03-15', type: 'scale_pilot', description: 'Created single-keyword campaign for "complete wine making kit"', category: 'Campaign Structure' },
  { date: '2026-03-17', type: 'manual', description: 'Increased daily budget on SP - Wine Kit Manual from $15 to $25', category: 'Budget Change' },
  { date: '2026-03-20', type: 'automation', description: 'Negative Algorithm negated "sandbag workout" and 2 other terms', category: 'Negation' },
  { date: '2026-03-22', type: 'scale_pilot', description: 'Created exact-match campaign for "wine making supplies and equipment"', category: 'Campaign Structure' },
  { date: '2026-03-25', type: 'automation', description: 'Bidding Algorithm reduced bids on 4 underperforming keywords', category: 'Bid Optimization' },
  { date: '2026-03-27', type: 'manual', description: 'Increased daily budget on SP - Wine Kit Manual from $15 to $25', category: 'Budget Change' },
  { date: '2026-03-29', type: 'scale_pilot', description: 'Paused campaign "Sandbags 90 lbs - Phrase 1" — $72.61/mo waste eliminated', category: 'Direct Action' },
  { date: '2026-03-31', type: 'scale_pilot', description: 'Assigned Import Algorithm to 3 auto campaigns', category: 'Algorithm Orchestration' },

  // April
  { date: '2026-04-02', type: 'automation', description: 'Import Algorithm harvested 5 keywords from auto to manual campaigns', category: 'Keyword Harvesting' },
  { date: '2026-04-04', type: 'automation', description: 'Negative Algorithm negated "sand bags for flooding" — 31 clicks, 0 orders', category: 'Negation' },
  { date: '2026-04-05', type: 'scale_pilot', description: 'Assigned Ranking Exact SO to Brand Defense campaign', category: 'Algorithm Orchestration' },
  { date: '2026-04-06', type: 'scale_pilot', description: 'Paused 2 campaigns for out-of-stock ASIN B09BKSP6HK', category: 'Direct Action' },
];
