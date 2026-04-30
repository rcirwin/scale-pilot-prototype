export type ContextItemType = 'note' | 'document' | 'voice';

export interface ContextItem {
  id: string;
  type: ContextItemType;
  title: string;
  preview: string;
  asin?: string;
  addedAt: string;
  size?: string;
  pages?: number;
  durationSec?: number;
}

export const contextItems: ContextItem[] = [
  {
    id: 'ctx1',
    type: 'note',
    title: 'Margin & landed-cost targets — B0DYVYQ2DL',
    preview:
      'Wine Making Kit Complete: COGS $18.50, FBA fees $6.20, landed cost ~$24.70. Target net margin 30% before ads, 22% after. Don\'t scale spend if blended margin drops below 18%.',
    asin: 'B0DYVYQ2DL',
    addedAt: '2026-04-28T14:32:00Z',
  },
  {
    id: 'ctx2',
    type: 'document',
    title: 'Wine_Kit_Competitor_Research_Q2.pdf',
    preview:
      '12-page competitive analysis covering 8 main competitors. Includes pricing benchmarks, listing photo audit, A+ content comparison, BSR trajectories, and review velocity.',
    addedAt: '2026-04-22T09:15:00Z',
    size: '2.4 MB',
    pages: 12,
  },
  {
    id: 'ctx3',
    type: 'note',
    title: 'Brand voice & customer persona',
    preview:
      'Tone is friendly, expert, and educational — never condescending. Avoid generic phrases like "best in class". Customers are mostly hobbyists 35-65, gift buyers, and people new to wine making.',
    addedAt: '2026-04-15T11:08:00Z',
  },
  {
    id: 'ctx4',
    type: 'document',
    title: 'Q2_2026_Strategy_Brief.pdf',
    preview:
      'Q2 priority is profit, not top-line growth. Pause anything below 4x ROAS. Brand defense on B0DYVYQ2DL is non-negotiable. Sandbag line is being phased out — no new spend.',
    addedAt: '2026-04-08T16:40:00Z',
    size: '780 KB',
    pages: 4,
  },
  {
    id: 'ctx5',
    type: 'voice',
    title: 'Restock timeline notes — April supplier call',
    preview:
      'B0DYVYQ2DL restock: 1,200 units arriving May 14. B09BKSP6HK discontinued, do not restock. Resistance bands lead time 6 weeks, factor into PPC pacing.',
    addedAt: '2026-04-03T10:22:00Z',
    durationSec: 84,
  },
];
