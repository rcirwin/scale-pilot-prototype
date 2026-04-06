'use client';

import { KPIChart } from '@/components/kpi-chart';
import { ActionLogTable } from '@/components/action-log-table';
import { dailyKPIs, actionMarkers } from '@/data/kpi-data';
import { actions } from '@/data/actions';

export default function ActivityPage() {
  return (
    <div className="max-w-[1200px] space-y-6">
      <div>
        <h1 className="text-lg font-bold text-gray-900">Activity &amp; Action Log</h1>
        <p className="text-sm text-[#6c757d]">All PPC actions tracked with KPI correlation</p>
      </div>

      {/* KPI Chart with action markers */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">KPI Trend with Action Markers</h2>
          <div className="flex items-center gap-4 text-xs text-[#6c757d]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#45a19c]" /> Scale Pilot</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-400" /> Manual</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0d6efd]" /> Automation</span>
          </div>
        </div>
        <KPIChart data={dailyKPIs} markers={actionMarkers} />
      </div>

      {/* Action Log Table */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Action Log</h2>
        <ActionLogTable actions={actions} />
      </div>
    </div>
  );
}
