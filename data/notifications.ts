export type NotificationType =
  | 'daily_review'
  | 'weekly_report'
  | 'monthly_report'
  | 'critical_finding'
  | 'action_executed';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  href?: string;
}

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'daily_review',
    title: '4 recommendations awaiting your review',
    description:
      '2 high priority, 1 medium, 1 low — including Brand Defense SO assignment for B0DYVYQ2DL.',
    timestamp: '2026-04-30T07:00:00Z',
    read: false,
    href: '/optimizer',
  },
  {
    id: 'n2',
    type: 'weekly_report',
    title: 'Your weekly report for Apr 21–27 is ready',
    description:
      '$1,847 saved, 14 actions executed, ACOS down 2.4pp. Top mover: B0DYVYQ2DL +18% revenue.',
    timestamp: '2026-04-28T06:00:00Z',
    read: false,
    href: '/reports',
  },
  {
    id: 'n3',
    type: 'critical_finding',
    title: 'Critical finding: B09BKSP6HK out of stock, ads still running',
    description: '$5.07 spent in last 24h on out-of-stock ASIN. Recommend immediate pause.',
    timestamp: '2026-04-29T08:15:00Z',
    read: false,
    href: '/findings/f1',
  },
  {
    id: 'n4',
    type: 'daily_review',
    title: '3 recommendations awaiting your review',
    description: 'Bid adjustments and 1 new SQP scaling opportunity.',
    timestamp: '2026-04-29T07:00:00Z',
    read: true,
    href: '/optimizer',
  },
  {
    id: 'n5',
    type: 'monthly_report',
    title: 'Your March 2026 monthly report is ready',
    description:
      '$6,420 in agent-driven savings, 47 actions, ACOS improved 3.1pp month-over-month.',
    timestamp: '2026-04-01T06:00:00Z',
    read: true,
    href: '/reports',
  },
  {
    id: 'n6',
    type: 'action_executed',
    title: 'Scale Pilot paused 3 campaigns',
    description: 'Sandbags 90 lbs campaigns paused — out-of-stock ASIN B09BKSP6HK.',
    timestamp: '2026-04-29T08:16:00Z',
    read: true,
    href: '/activity',
  },
  {
    id: 'n7',
    type: 'weekly_report',
    title: 'Your weekly report for Apr 14–20 is ready',
    description: '$1,231 saved, 11 actions executed. 1 recommendation expired without review.',
    timestamp: '2026-04-21T06:00:00Z',
    read: true,
    href: '/reports',
  },
];
