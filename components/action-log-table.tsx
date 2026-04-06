'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpDown,
  DollarSign,
  Target,
  Hash,
  Layers,
  Cog,
  Crosshair,
} from 'lucide-react';
import type { ActionEntry } from '@/data/actions';

type ActionSource = ActionEntry['source'];
type ActionType = ActionEntry['actionType'];

interface ActionLogTableProps {
  actions: ActionEntry[];
}

const sourceConfig: Record<ActionSource, { bg: string; text: string }> = {
  'Scale Pilot': { bg: 'bg-[#45a19c]/10', text: 'text-[#45a19c]' },
  Manual: { bg: 'bg-[#6c757d]/10', text: 'text-[#6c757d]' },
  Automation: { bg: 'bg-[#0d6efd]/10', text: 'text-[#0d6efd]' },
};

const actionTypeIcons: Record<string, React.ElementType> = {
  bid_change: DollarSign,
  budget_change: DollarSign,
  keyword_action: Target,
  keyword_track: Target,
  campaign_action: Layers,
  campaign_create: Layers,
  algorithm_change: Cog,
  objective_change: Crosshair,
  so_assignment: Cog,
  negation: Crosshair,
  pause: Layers,
};

const actionTypeLabels: Record<string, string> = {
  bid_change: 'Bid Change',
  budget_change: 'Budget Change',
  keyword_action: 'Keyword Action',
  keyword_track: 'Keyword Track',
  campaign_action: 'Campaign Action',
  campaign_create: 'Campaign Create',
  algorithm_change: 'Algorithm Change',
  objective_change: 'Objective Change',
  so_assignment: 'SO Assignment',
  negation: 'Negation',
  pause: 'Pause',
};

const statusColors: Record<string, string> = {
  completed: 'text-[#22c55e]',
  executed: 'text-[#22c55e]',
  in_progress: 'text-[#f59e0b]',
  pending: 'text-[#f59e0b]',
  accepted: 'text-[#22c55e]',
  failed: 'text-[#ef4444]',
  rejected: 'text-[#ef4444]',
  rolled_back: 'text-[#6c757d]',
};

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  executed: 'Executed',
  in_progress: 'In Progress',
  pending: 'Pending',
  accepted: 'Accepted',
  failed: 'Failed',
  rejected: 'Rejected',
  rolled_back: 'Rolled Back',
};

type FilterType = 'all' | ActionSource;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export function ActionLogTable({ actions }: ActionLogTableProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = useMemo(() => {
    return actions.filter((a) => {
      const matchesFilter = filter === 'all' || a.source === filter;
      const matchesSearch =
        !search ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.entity.toLowerCase().includes(search.toLowerCase()) ||
        actionTypeLabels[a.actionType].toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [actions, filter, search]);

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Scale Pilot', value: 'Scale Pilot' },
    { label: 'Manual', value: 'Manual' },
    { label: 'Automation', value: 'Automation' },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0]">
      {/* Search and filters */}
      <div className="p-4 border-b border-[#e2e8f0] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6c757d]" />
          <input
            type="text"
            placeholder="Search actions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8 pl-8 pr-3 text-sm bg-[#f5f7fa] border border-[#e2e8f0] rounded-md text-[#1a1a2e] placeholder:text-[#6c757d] focus:outline-none focus:ring-1 focus:ring-[#45a19c]"
          />
        </div>
        <div className="flex gap-1">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === btn.value
                  ? 'bg-[#45a19c] text-white'
                  : 'bg-[#f5f7fa] text-[#6c757d] hover:bg-[#e2e8f0]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e2e8f0]">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide">Date</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide">Action Type</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide">Entity</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide">Source</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide">Description</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide">Impact</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6c757d] uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((action) => {
              const TypeIcon = actionTypeIcons[action.actionType] || Hash;
              const srcConfig = sourceConfig[action.source];
              return (
                <tr key={action.id} className="border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#f5f7fa]/50">
                  <td className="px-4 py-2.5 text-xs text-[#6c757d] whitespace-nowrap">{formatDate(action.timestamp)}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <TypeIcon size={14} className="text-[#6c757d]" />
                      <span className="text-xs text-[#1a1a2e]">{actionTypeLabels[action.actionType]}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[#1a1a2e] font-medium max-w-[180px] truncate">{action.entity}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${srcConfig.bg} ${srcConfig.text}`}>
                      {action.source}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[#6c757d] max-w-[250px] truncate">{action.description}</td>
                  <td className="px-4 py-2.5 text-xs text-[#1a1a2e]">{action.impact || '—'}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs font-medium ${statusColors[action.status]}`}>
                      {statusLabels[action.status]}
                    </span>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-[#6c757d]">
                  No actions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
