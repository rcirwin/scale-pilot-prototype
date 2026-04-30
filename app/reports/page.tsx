'use client';

import { useState } from 'react';
import {
  FileBarChart,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Download,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { reports, type Report, type ReportPeriod, type ReportAsinPerformance, type ReportHighlight } from '@/data/reports';
import { ActionLogTable } from '@/components/action-log-table';

function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function formatPct(n: number, decimals = 1): string {
  return `${n > 0 ? '+' : ''}${n.toFixed(decimals)}%`;
}

function formatPp(n: number, decimals = 1): string {
  return `${n > 0 ? '+' : ''}${n.toFixed(decimals)}pp`;
}

function deltaColor(value: number, inverse = false): string {
  if (value === 0) return 'text-[#6c757d] bg-[#6c757d]/10';
  const positive = inverse ? value < 0 : value > 0;
  return positive ? 'text-[#22c55e] bg-[#22c55e]/10' : 'text-[#ef4444] bg-[#ef4444]/10';
}

function trendIcon(trend: 'up' | 'down' | 'flat') {
  if (trend === 'up') return TrendingUp;
  if (trend === 'down') return TrendingDown;
  return Minus;
}

function trendColor(trend: 'up' | 'down' | 'flat') {
  if (trend === 'up') return 'text-[#22c55e]';
  if (trend === 'down') return 'text-[#ef4444]';
  return 'text-[#6c757d]';
}

function highlightStyles(type: ReportHighlight['type']) {
  if (type === 'positive') return 'border-l-[#22c55e] bg-[#22c55e]/[0.04]';
  if (type === 'negative') return 'border-l-[#ef4444] bg-[#ef4444]/[0.04]';
  return 'border-l-[#0d6efd] bg-[#0d6efd]/[0.04]';
}

function ReportSummaryCard({ report, expanded, onToggle }: { report: Report; expanded: boolean; onToggle: () => void }) {
  const generatedDate = new Date(report.generatedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
  const revenuePositive = report.accountPerformance.revenue.delta > 0;

  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 hover:bg-[#f8fafb] transition-colors"
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              report.period === 'monthly' ? 'bg-[#0d6efd]/10 text-[#0d6efd]' : 'bg-[#45a19c]/10 text-[#45a19c]'
            }`}>
              <FileBarChart className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-gray-900">{report.label}</h3>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wide ${
                  report.period === 'monthly' ? 'bg-[#0d6efd]/10 text-[#0d6efd]' : 'bg-[#45a19c]/10 text-[#45a19c]'
                }`}>
                  {report.period}
                </span>
              </div>
              <p className="text-[11px] text-[#6c757d] mt-0.5">Generated {generatedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-xs flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6c757d]">Revenue:</span>
              <span className="font-semibold text-gray-900">{formatCurrency(report.accountPerformance.revenue.value)}</span>
              <span className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${deltaColor(report.accountPerformance.revenue.delta)}`}>
                {revenuePositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {formatPct(report.accountPerformance.revenue.deltaPct)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#6c757d]">Saved:</span>
              <span className="font-semibold text-[#22c55e]">{formatCurrency(report.agentImpact.spendSaved)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#6c757d]">Actions:</span>
              <span className="font-semibold text-gray-900">{report.agentImpact.actionsExecuted}</span>
            </div>
            {expanded
              ? <ChevronUp size={16} className="text-[#6c757d]" />
              : <ChevronDown size={16} className="text-[#6c757d]" />
            }
          </div>
        </div>
      </button>

      {expanded && <ReportDetail report={report} />}
    </div>
  );
}

function ReportDetail({ report }: { report: Report }) {
  const ap = report.accountPerformance;

  return (
    <div className="border-t border-[#e2e8f0] animate-fade-in">
      {/* Action bar */}
      <div className="px-5 py-2.5 bg-[#f8fafb] border-b border-[#e2e8f0] flex items-center justify-end gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#6c757d] border border-[#e2e8f0] rounded-md bg-white hover:border-[#45a19c] hover:text-[#45a19c] transition-colors">
          <Download size={12} /> PDF
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#6c757d] border border-[#e2e8f0] rounded-md bg-white hover:border-[#45a19c] hover:text-[#45a19c] transition-colors">
          <Mail size={12} /> Email
        </button>
      </div>

      {/* Agent Impact */}
      <section className="px-5 py-4">
        <h4 className="text-xs font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
          <Sparkles size={13} className="text-[#45a19c]" /> Scale Pilot Impact
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-lg p-3">
            <p className="text-[10px] font-medium text-[#6c757d] uppercase tracking-wide">Wasted Spend Saved</p>
            <p className="text-lg font-bold text-[#22c55e] mt-1">{formatCurrency(report.agentImpact.spendSaved)}</p>
          </div>
          <div className="bg-[#0d6efd]/5 border border-[#0d6efd]/20 rounded-lg p-3">
            <p className="text-[10px] font-medium text-[#6c757d] uppercase tracking-wide">Revenue Added</p>
            <p className="text-lg font-bold text-[#0d6efd] mt-1">{formatCurrency(report.agentImpact.revenueAdded)}</p>
          </div>
          <div className="bg-[#45a19c]/5 border border-[#45a19c]/20 rounded-lg p-3">
            <p className="text-[10px] font-medium text-[#6c757d] uppercase tracking-wide">Actions Executed</p>
            <p className="text-lg font-bold text-[#45a19c] mt-1">{report.agentImpact.actionsExecuted}</p>
          </div>
          <div className="bg-[#8b5cf6]/5 border border-[#8b5cf6]/20 rounded-lg p-3">
            <p className="text-[10px] font-medium text-[#6c757d] uppercase tracking-wide">Findings Resolved</p>
            <p className="text-lg font-bold text-[#8b5cf6] mt-1">{report.agentImpact.findingsResolved}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="border border-[#e2e8f0] rounded-md px-3 py-2 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#22c55e] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6c757d] uppercase tracking-wide">Accepted</p>
              <p className="text-xs font-semibold text-gray-900">{report.agentImpact.recommendationsAccepted}</p>
            </div>
          </div>
          <div className="border border-[#e2e8f0] rounded-md px-3 py-2 flex items-center gap-2">
            <XCircle size={14} className="text-[#ef4444] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6c757d] uppercase tracking-wide">Rejected</p>
              <p className="text-xs font-semibold text-gray-900">{report.agentImpact.recommendationsRejected}</p>
            </div>
          </div>
          <div className="border border-[#e2e8f0] rounded-md px-3 py-2 flex items-center gap-2">
            <Clock size={14} className="text-[#f59e0b] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6c757d] uppercase tracking-wide">Expired</p>
              <p className="text-xs font-semibold text-gray-900">{report.agentImpact.recommendationsExpired}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Account Performance */}
      <section className="px-5 py-4 border-t border-[#e2e8f0]">
        <h4 className="text-xs font-semibold text-gray-900 mb-3">Account Performance</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <PerformanceMetric label="Revenue" value={formatCurrency(ap.revenue.value)} delta={formatPct(ap.revenue.deltaPct)} positive={ap.revenue.delta > 0} />
          <PerformanceMetric label="Ad Spend" value={formatCurrency(ap.adSpend.value)} delta={formatPct(ap.adSpend.deltaPct)} positive={ap.adSpend.delta < 0} />
          <PerformanceMetric label="ACOS" value={`${ap.acos.value.toFixed(1)}%`} delta={formatPp(ap.acos.deltaPp)} positive={ap.acos.deltaPp < 0} />
          <PerformanceMetric label="ROAS" value={`${ap.roas.value.toFixed(2)}x`} delta={`${ap.roas.delta > 0 ? '+' : ''}${ap.roas.delta.toFixed(2)}x`} positive={ap.roas.delta > 0} />
          <PerformanceMetric label="Profit" value={formatCurrency(ap.profit.value)} delta={formatPct(ap.profit.deltaPct)} positive={ap.profit.delta > 0} />
          <PerformanceMetric label="Units Sold" value={ap.unitsSold.value.toLocaleString()} delta={formatPct(ap.unitsSold.deltaPct)} positive={ap.unitsSold.delta > 0} />
        </div>
      </section>

      {/* Top ASINs */}
      <section className="px-5 py-4 border-t border-[#e2e8f0]">
        <h4 className="text-xs font-semibold text-gray-900 mb-3">Top ASINs</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e2e8f0] bg-[#f5f7fa]">
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-[#6c757d] uppercase tracking-wide">Product</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-[#6c757d] uppercase tracking-wide">ASIN</th>
                <th className="text-right px-3 py-2 text-[10px] font-semibold text-[#6c757d] uppercase tracking-wide">Revenue</th>
                <th className="text-right px-3 py-2 text-[10px] font-semibold text-[#6c757d] uppercase tracking-wide">Δ Rev</th>
                <th className="text-right px-3 py-2 text-[10px] font-semibold text-[#6c757d] uppercase tracking-wide">ACOS</th>
                <th className="text-right px-3 py-2 text-[10px] font-semibold text-[#6c757d] uppercase tracking-wide">Δ ACOS</th>
                <th className="text-right px-3 py-2 text-[10px] font-semibold text-[#6c757d] uppercase tracking-wide">Units</th>
                <th className="text-center px-3 py-2 text-[10px] font-semibold text-[#6c757d] uppercase tracking-wide">Trend</th>
              </tr>
            </thead>
            <tbody>
              {report.topAsins.map((a: ReportAsinPerformance) => {
                const TIcon = trendIcon(a.trend);
                return (
                  <tr key={a.asin} className="border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#f5f7fa]/50">
                    <td className="px-3 py-2 font-medium text-gray-900">{a.name}</td>
                    <td className="px-3 py-2"><span className="text-[10px] text-[#6c757d] bg-gray-100 px-1.5 py-0.5 rounded font-mono">{a.asin}</span></td>
                    <td className="px-3 py-2 text-right font-medium text-gray-900">{formatCurrency(a.revenue)}</td>
                    <td className={`px-3 py-2 text-right font-medium ${a.revenueDelta > 0 ? 'text-[#22c55e]' : a.revenueDelta < 0 ? 'text-[#ef4444]' : 'text-[#6c757d]'}`}>
                      {formatPct(a.revenueDelta)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-900">{a.acos.toFixed(1)}%</td>
                    <td className={`px-3 py-2 text-right font-medium ${a.acosDelta < 0 ? 'text-[#22c55e]' : a.acosDelta > 0 ? 'text-[#ef4444]' : 'text-[#6c757d]'}`}>
                      {formatPp(a.acosDelta)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-900">{a.units.toLocaleString()}</td>
                    <td className={`px-3 py-2 text-center ${trendColor(a.trend)}`}>
                      <TIcon size={14} className="inline" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-5 py-4 border-t border-[#e2e8f0]">
        <h4 className="text-xs font-semibold text-gray-900 mb-3">Highlights</h4>
        <div className="space-y-2">
          {report.highlights.map((h, i) => (
            <div key={i} className={`border-l-4 ${highlightStyles(h.type)} px-3 py-2.5 rounded-r`}>
              <p className="text-xs font-semibold text-gray-900">{h.title}</p>
              <p className="text-[11px] text-[#6c757d] leading-relaxed mt-0.5">{h.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Actions */}
      <section className="px-5 py-4 border-t border-[#e2e8f0]">
        <h4 className="text-xs font-semibold text-gray-900 mb-3">Agent Actions ({report.agentActions.length})</h4>
        <ActionLogTable actions={report.agentActions} />
      </section>
    </div>
  );
}

function PerformanceMetric({ label, value, delta, positive }: { label: string; value: string; delta: string; positive: boolean }) {
  return (
    <div className="bg-[#f8fafb] border border-[#e2e8f0] rounded-md p-2.5">
      <p className="text-[10px] font-medium text-[#6c757d] uppercase tracking-wide">{label}</p>
      <p className="text-sm font-bold text-gray-900 mt-0.5">{value}</p>
      <p className={`text-[10px] font-medium mt-0.5 ${positive ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{delta}</p>
    </div>
  );
}

export default function ReportsPage() {
  const [filter, setFilter] = useState<ReportPeriod | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(reports[0]?.id || null);

  const filtered = filter === 'all' ? reports : reports.filter(r => r.period === filter);

  const monthlyCount = reports.filter(r => r.period === 'monthly').length;
  const weeklyCount = reports.filter(r => r.period === 'weekly').length;

  return (
    <div className="max-w-[1400px] space-y-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-[#6c757d]">
            Monthly and weekly summaries of agent actions, performance, and account health. Notifications sent automatically when each report is ready.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-white border border-[#e2e8f0] rounded-lg p-0.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'all' ? 'bg-[#45a19c] text-white' : 'text-[#6c757d] hover:text-gray-900'
            }`}
          >
            All ({reports.length})
          </button>
          <button
            onClick={() => setFilter('monthly')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'monthly' ? 'bg-[#45a19c] text-white' : 'text-[#6c757d] hover:text-gray-900'
            }`}
          >
            Monthly ({monthlyCount})
          </button>
          <button
            onClick={() => setFilter('weekly')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'weekly' ? 'bg-[#45a19c] text-white' : 'text-[#6c757d] hover:text-gray-900'
            }`}
          >
            Weekly ({weeklyCount})
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(report => (
          <ReportSummaryCard
            key={report.id}
            report={report}
            expanded={expandedId === report.id}
            onToggle={() => setExpandedId(expandedId === report.id ? null : report.id)}
          />
        ))}
      </div>
    </div>
  );
}
