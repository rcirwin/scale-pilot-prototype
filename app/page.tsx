'use client';

import { MetricCard } from '@/components/metric-card';
import { FindingCard } from '@/components/finding-card';
import { KPIChart } from '@/components/kpi-chart';
import { ChatInput } from '@/components/chat-input';
import { CategoryBadge } from '@/components/category-badge';
import { findings } from '@/data/findings';
import { dailyKPIs, actionMarkers } from '@/data/kpi-data';
import { actions } from '@/data/actions';
import { recommendations } from '@/data/recommendations';
import { CheckCircle, Clock, XCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const pendingCount = recommendations.filter(r => r.status === 'pending').length;
  const recentActions = actions.slice(0, 6);

  const statusIcon = (status: string) => {
    switch (status) {
      case 'executed': case 'accepted': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* KPI Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard label="Total Sales (7d)" value="$4,930.60" delta="+12.3%" deltaType="positive" />
        <MetricCard label="Ad Spend (7d)" value="$328.35" delta="-5.1%" deltaType="positive" />
        <MetricCard label="ACOS" value="13.7%" delta="-2.4pp" deltaType="positive" />
        <MetricCard label="ROAS" value="4.73x" delta="+0.8x" deltaType="positive" />
        <MetricCard label="Profit (7d)" value="$1,063.59" delta="+18.7%" deltaType="positive" />
        <MetricCard label="Automated ASINs" value="8 / 14" />
      </div>

      {/* KPI Trend Chart */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Performance Trend</h2>
          <span className="text-xs text-[#6c757d]">Scale Pilot actions shown as markers</span>
        </div>
        <KPIChart data={dailyKPIs} markers={actionMarkers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Agent Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[#e2e8f0] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Agent Activity</h2>
            <Link href="/activity" className="text-xs text-[#0d6efd] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentActions.map((action) => (
              <div key={action.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="mt-0.5">{statusIcon(action.status)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-snug">{action.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#6c757d]">{action.timestamp}</span>
                    <CategoryBadge category={
                      action.actionType === 'so_assignment' ? 'Algorithm Orchestration' :
                      action.actionType === 'campaign_create' ? 'Campaign Structure' :
                      action.actionType === 'keyword_track' ? 'Data Enrichment' : 'Direct Action'
                    } />
                  </div>
                  {action.impact && (
                    <span className="text-xs text-green-600 font-medium mt-1 inline-block">{action.impact}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Findings + Pending Recommendations */}
        <div className="lg:col-span-3 space-y-4">
          {pendingCount > 0 && (
            <Link href="/optimizer" className="block bg-white rounded-lg border border-[#e2e8f0] p-4 hover:border-[#45a19c] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{pendingCount} recommendations awaiting review</p>
                    <p className="text-xs text-[#6c757d]">Review in Scale Optimizer</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6c757d]" />
              </div>
            </Link>
          )}

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Today&apos;s Findings</h2>
            <div className="space-y-3">
              {findings.map((finding) => (
                <FindingCard key={finding.id} finding={finding} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4">
        <ChatInput
          onSend={() => { window.location.href = '/chat'; }}
          placeholder="Ask Scale Pilot anything about your account..."
        />
        <p className="text-xs text-[#6c757d] text-center mt-2">AI-generated analysis - verify important data before taking action.</p>
      </div>
    </div>
  );
}
