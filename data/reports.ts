import { actions, type ActionEntry } from './actions';

export type ReportPeriod = 'weekly' | 'monthly';

export interface ReportAsinPerformance {
  asin: string;
  name: string;
  revenue: number;
  revenueDelta: number;
  acos: number;
  acosDelta: number;
  units: number;
  trend: 'up' | 'down' | 'flat';
}

export interface ReportHighlight {
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  detail: string;
}

export interface Report {
  id: string;
  period: ReportPeriod;
  label: string;
  startDate: string;
  endDate: string;
  generatedAt: string;
  status: 'ready' | 'in_progress';

  agentImpact: {
    spendSaved: number;
    revenueAdded: number;
    actionsExecuted: number;
    findingsResolved: number;
    recommendationsAccepted: number;
    recommendationsRejected: number;
    recommendationsExpired: number;
  };

  accountPerformance: {
    revenue: { value: number; delta: number; deltaPct: number };
    adSpend: { value: number; delta: number; deltaPct: number };
    acos: { value: number; deltaPp: number };
    roas: { value: number; delta: number };
    profit: { value: number; delta: number; deltaPct: number };
    unitsSold: { value: number; delta: number; deltaPct: number };
  };

  topAsins: ReportAsinPerformance[];
  highlights: ReportHighlight[];
  agentActions: ActionEntry[];
}

const sampleActions = actions.slice(0, 6);
const sampleActionsMonth = actions.slice(0, 12);

export const reports: Report[] = [
  {
    id: 'r-w-2026-04-21',
    period: 'weekly',
    label: 'Week of Apr 21–27, 2026',
    startDate: '2026-04-21',
    endDate: '2026-04-27',
    generatedAt: '2026-04-28T06:00:00Z',
    status: 'ready',
    agentImpact: {
      spendSaved: 1847,
      revenueAdded: 3120,
      actionsExecuted: 14,
      findingsResolved: 6,
      recommendationsAccepted: 9,
      recommendationsRejected: 2,
      recommendationsExpired: 1,
    },
    accountPerformance: {
      revenue: { value: 34910, delta: 5210, deltaPct: 17.5 },
      adSpend: { value: 2298, delta: -145, deltaPct: -5.9 },
      acos: { value: 13.7, deltaPp: -2.4 },
      roas: { value: 4.73, delta: 0.8 },
      profit: { value: 7445, delta: 1170, deltaPct: 18.7 },
      unitsSold: { value: 1142, delta: 178, deltaPct: 18.5 },
    },
    topAsins: [
      {
        asin: 'B0DYVYQ2DL',
        name: 'Wine Making Kit Complete',
        revenue: 14820,
        revenueDelta: 18.2,
        acos: 22.1,
        acosDelta: 2.3,
        units: 412,
        trend: 'up',
      },
      {
        asin: 'B0CFKCL2KQ',
        name: 'Resistance Band Set',
        revenue: 6210,
        revenueDelta: -8.4,
        acos: 38.5,
        acosDelta: 24.3,
        units: 218,
        trend: 'down',
      },
      {
        asin: 'B0E1SAMPLE',
        name: 'Yoga Mat Premium',
        revenue: 5840,
        revenueDelta: 11.2,
        acos: 14.2,
        acosDelta: -1.5,
        units: 192,
        trend: 'up',
      },
      {
        asin: 'B0D4EXAMPLE',
        name: 'Pull Up Bar Doorway',
        revenue: 4720,
        revenueDelta: 6.8,
        acos: 18.4,
        acosDelta: 0.5,
        units: 168,
        trend: 'up',
      },
      {
        asin: 'B0F2TESTID',
        name: 'Jump Rope Speed Pro',
        revenue: 3320,
        revenueDelta: -2.1,
        acos: 21.0,
        acosDelta: 1.2,
        units: 152,
        trend: 'flat',
      },
    ],
    highlights: [
      {
        type: 'positive',
        title: 'B0DYVYQ2DL revenue up 18.2% — 3 new SKW campaigns harvesting SQP wins',
        detail:
          'Scale Pilot launched single-keyword exact-match campaigns on the top 3 SQP queries. Combined revenue contribution: $2,180 this week.',
      },
      {
        type: 'negative',
        title: 'B0CFKCL2KQ ACOS spike from 14.2% to 38.5%',
        detail:
          'CPC up 22%, CVR down 4.6pp. Added 5 keywords to organic rank tracking; root cause analysis ongoing.',
      },
      {
        type: 'positive',
        title: '3 out-of-stock campaigns paused on B09BKSP6HK',
        detail:
          'Saved $35.49 in projected weekly waste. Inventory-linked auto-pause rule now active.',
      },
    ],
    agentActions: sampleActions,
  },
  {
    id: 'r-w-2026-04-14',
    period: 'weekly',
    label: 'Week of Apr 14–20, 2026',
    startDate: '2026-04-14',
    endDate: '2026-04-20',
    generatedAt: '2026-04-21T06:00:00Z',
    status: 'ready',
    agentImpact: {
      spendSaved: 1231,
      revenueAdded: 2480,
      actionsExecuted: 11,
      findingsResolved: 4,
      recommendationsAccepted: 7,
      recommendationsRejected: 1,
      recommendationsExpired: 1,
    },
    accountPerformance: {
      revenue: { value: 29700, delta: 1820, deltaPct: 6.5 },
      adSpend: { value: 2443, delta: 78, deltaPct: 3.3 },
      acos: { value: 16.1, deltaPp: -0.4 },
      roas: { value: 3.93, delta: 0.18 },
      profit: { value: 6275, delta: 410, deltaPct: 7.0 },
      unitsSold: { value: 964, delta: 52, deltaPct: 5.7 },
    },
    topAsins: [
      {
        asin: 'B0DYVYQ2DL',
        name: 'Wine Making Kit Complete',
        revenue: 12530,
        revenueDelta: 8.4,
        acos: 19.8,
        acosDelta: -0.6,
        units: 348,
        trend: 'up',
      },
      {
        asin: 'B0CFKCL2KQ',
        name: 'Resistance Band Set',
        revenue: 6780,
        revenueDelta: 2.1,
        acos: 14.2,
        acosDelta: 0.4,
        units: 238,
        trend: 'flat',
      },
      {
        asin: 'B0E1SAMPLE',
        name: 'Yoga Mat Premium',
        revenue: 5250,
        revenueDelta: 4.8,
        acos: 15.7,
        acosDelta: -0.8,
        units: 173,
        trend: 'up',
      },
    ],
    highlights: [
      {
        type: 'positive',
        title: 'Negative Algorithm prevented $340 of wasted spend',
        detail:
          '12 wasteful search terms negated across 4 ad groups. Auto-discovery converging on cleaner targeting.',
      },
      {
        type: 'neutral',
        title: '1 recommendation expired without review',
        detail:
          'Brand Defense SO assignment for B0DYVYQ2DL — re-flagged for this week.',
      },
    ],
    agentActions: actions.slice(6, 11),
  },
  {
    id: 'r-m-2026-03',
    period: 'monthly',
    label: 'March 2026',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    generatedAt: '2026-04-01T06:00:00Z',
    status: 'ready',
    agentImpact: {
      spendSaved: 6420,
      revenueAdded: 11240,
      actionsExecuted: 47,
      findingsResolved: 18,
      recommendationsAccepted: 31,
      recommendationsRejected: 6,
      recommendationsExpired: 4,
    },
    accountPerformance: {
      revenue: { value: 128400, delta: 14820, deltaPct: 13.0 },
      adSpend: { value: 9870, delta: -680, deltaPct: -6.4 },
      acos: { value: 14.8, deltaPp: -3.1 },
      roas: { value: 4.42, delta: 0.61 },
      profit: { value: 27680, delta: 4920, deltaPct: 21.6 },
      unitsSold: { value: 4218, delta: 462, deltaPct: 12.3 },
    },
    topAsins: [
      {
        asin: 'B0DYVYQ2DL',
        name: 'Wine Making Kit Complete',
        revenue: 52380,
        revenueDelta: 22.4,
        acos: 20.1,
        acosDelta: -1.8,
        units: 1462,
        trend: 'up',
      },
      {
        asin: 'B0CFKCL2KQ',
        name: 'Resistance Band Set',
        revenue: 24180,
        revenueDelta: 4.2,
        acos: 17.8,
        acosDelta: 1.2,
        units: 854,
        trend: 'flat',
      },
      {
        asin: 'B0E1SAMPLE',
        name: 'Yoga Mat Premium',
        revenue: 21640,
        revenueDelta: 9.8,
        acos: 15.4,
        acosDelta: -1.1,
        units: 712,
        trend: 'up',
      },
      {
        asin: 'B0D4EXAMPLE',
        name: 'Pull Up Bar Doorway',
        revenue: 18920,
        revenueDelta: 14.6,
        acos: 18.0,
        acosDelta: -0.4,
        units: 678,
        trend: 'up',
      },
      {
        asin: 'B0F2TESTID',
        name: 'Jump Rope Speed Pro',
        revenue: 11280,
        revenueDelta: 7.2,
        acos: 19.6,
        acosDelta: 0.2,
        units: 512,
        trend: 'up',
      },
    ],
    highlights: [
      {
        type: 'positive',
        title: '$6,420 saved through wasted-spend elimination',
        detail:
          '14 underperforming campaigns paused or restructured, 87 negative keywords added across the account.',
      },
      {
        type: 'positive',
        title: '$11,240 incremental revenue from new SKW campaigns',
        detail:
          '6 single-keyword exact-match campaigns launched on high-CVR SQP queries. Average ROAS 5.8x.',
      },
      {
        type: 'positive',
        title: 'ACOS improved 3.1pp month-over-month',
        detail:
          'Driven by Bidding Algorithm tuning, CPC discipline, and structural campaign cleanup.',
      },
      {
        type: 'negative',
        title: 'B0CFKCL2KQ trending unfavorably entering April',
        detail:
          'ACOS uptick in last 7 days of March. Diagnostic keyword tracking added — full root cause expected by mid-April.',
      },
    ],
    agentActions: sampleActionsMonth,
  },
  {
    id: 'r-m-2026-02',
    period: 'monthly',
    label: 'February 2026',
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    generatedAt: '2026-03-01T06:00:00Z',
    status: 'ready',
    agentImpact: {
      spendSaved: 4830,
      revenueAdded: 8410,
      actionsExecuted: 39,
      findingsResolved: 14,
      recommendationsAccepted: 24,
      recommendationsRejected: 8,
      recommendationsExpired: 5,
    },
    accountPerformance: {
      revenue: { value: 113580, delta: 6240, deltaPct: 5.8 },
      adSpend: { value: 10550, delta: 320, deltaPct: 3.1 },
      acos: { value: 17.9, deltaPp: -0.5 },
      roas: { value: 3.81, delta: 0.18 },
      profit: { value: 22760, delta: 1810, deltaPct: 8.6 },
      unitsSold: { value: 3756, delta: 184, deltaPct: 5.2 },
    },
    topAsins: [
      {
        asin: 'B0DYVYQ2DL',
        name: 'Wine Making Kit Complete',
        revenue: 42810,
        revenueDelta: 11.2,
        acos: 21.9,
        acosDelta: -0.3,
        units: 1198,
        trend: 'up',
      },
      {
        asin: 'B0CFKCL2KQ',
        name: 'Resistance Band Set',
        revenue: 23210,
        revenueDelta: 1.8,
        acos: 16.6,
        acosDelta: -0.4,
        units: 822,
        trend: 'flat',
      },
      {
        asin: 'B0E1SAMPLE',
        name: 'Yoga Mat Premium',
        revenue: 19710,
        revenueDelta: 6.3,
        acos: 16.5,
        acosDelta: -0.6,
        units: 644,
        trend: 'up',
      },
    ],
    highlights: [
      {
        type: 'positive',
        title: 'First full month with all 6 ASINs on Scale Pilot',
        detail:
          'Onboarding stabilized — agent now operating with full account context.',
      },
      {
        type: 'neutral',
        title: '5 recommendations expired without review',
        detail:
          'Most expired in the SQP scaling category. Consider raising daily review cadence.',
      },
    ],
    agentActions: actions.slice(0, 8),
  },
];
