'use client';

import { useState } from 'react';
import { MetricCard } from '@/components/metric-card';
import { KPIChart } from '@/components/kpi-chart';
import { ChatInput } from '@/components/chat-input';
import { ChatSlideout } from '@/components/chat-slideout';
import { ActionLogTable } from '@/components/action-log-table';
import { findings } from '@/data/findings';
import { dailyKPIs, actionMarkers } from '@/data/kpi-data';
import { actions } from '@/data/actions';
import { recommendations } from '@/data/recommendations';
import {
  ArrowRight,
  AlertTriangle,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

const asinOptions = [
  { value: 'all', label: 'All ASINs' },
  { value: 'B0DYVYQ2DL', label: 'B0DYVYQ2DL — Wine Making Kit Complete' },
  { value: 'B0CFKCL2KQ', label: 'B0CFKCL2KQ — Resistance Band Set' },
  { value: 'B09BKSP6HK', label: 'B09BKSP6HK — Fitness Sandbag 90 lbs' },
  { value: 'B0D4EXAMPLE', label: 'B0D4EXAMPLE — Pull Up Bar Doorway' },
  { value: 'B0E1SAMPLE', label: 'B0E1SAMPLE — Yoga Mat Premium' },
  { value: 'B0F2TESTID', label: 'B0F2TESTID — Jump Rope Speed Pro' },
];

export default function Dashboard() {
  const pendingCount = recommendations.filter(r => r.status === 'pending').length;
  const [chatOpen, setChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState({ title: '', detail: '' });
  const [selectedAsin, setSelectedAsin] = useState('all');

  const openChat = (title: string, detail: string) => {
    setChatContext({ title, detail });
    setChatOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top row: KPI cards + ASIN selector */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex-1" />
        {/* ASIN dropdown */}
        <div className="relative">
          <select
            value={selectedAsin}
            onChange={e => setSelectedAsin(e.target.value)}
            className="appearance-none h-[36px] pl-3 pr-8 text-sm bg-white border border-[#e2e8f0] rounded-lg text-[#1a1a2e] focus:outline-none focus:border-[#45a19c] cursor-pointer hover:border-gray-300 transition-colors"
          >
            {asinOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6c757d] pointer-events-none" />
        </div>
      </div>

      {/* KPI Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3">
        <MetricCard label="Total Sales (7d)" value="$4,930.60" delta="+12.3%" deltaType="positive" />
        <MetricCard label="Ad Spend (7d)" value="$328.35" delta="-5.1%" deltaType="positive" />
        <MetricCard label="ACOS" value="13.7%" delta="-2.4pp" deltaType="positive" />
        <MetricCard label="ROAS" value="4.73x" delta="+0.8x" deltaType="positive" />
        <MetricCard label="Profit (7d)" value="$1,063.59" delta="+18.7%" deltaType="positive" />
        <MetricCard label="Automated ASINs" value="8 / 14" />
        <MetricCard label="Scale Pilot ASINs" value="6" delta="Active" deltaType="positive" />
      </div>

      {/* Recommendations awaiting review */}
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

      {/* Performance Trend Chart */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-3 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Performance Trend</h2>
          <span className="text-xs text-[#6c757d]">Scale Pilot actions shown as markers</span>
        </div>
        <KPIChart data={dailyKPIs} markers={actionMarkers} />
      </div>

      {/* Action Log — full width */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Action Log</h2>
          <Link href="/activity" className="text-xs text-[#0d6efd] hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <ActionLogTable actions={actions} />
      </div>

      {/* Today's Findings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">Today&apos;s Findings</h2>
          <Link href="/findings" className="text-xs text-[#0d6efd] hover:underline flex items-center gap-1">
            All findings <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {findings.slice(0, 4).map((finding) => (
            <div
              key={finding.id}
              className={`bg-white rounded-lg border border-[#e2e8f0] border-l-4 ${
                finding.severity === 'high' ? 'border-l-[#ef4444]' :
                finding.severity === 'medium' ? 'border-l-[#f59e0b]' : 'border-l-[#0d6efd]'
              } p-4 hover:shadow-sm transition-shadow`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${
                  finding.severity === 'high' ? 'bg-[#ef4444]/10 text-[#ef4444]' :
                  finding.severity === 'medium' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#0d6efd]/10 text-[#0d6efd]'
                }`}>
                  {finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1)}
                </span>
                <span className="text-xs text-[#6c757d]">{finding.category}</span>
              </div>
              <h3 className="text-sm font-semibold text-[#1a1a2e] mb-1 leading-snug">{finding.title}</h3>
              <p className="text-xs text-[#6c757d] leading-relaxed mb-3 line-clamp-2">{finding.summary}</p>
              <div className="flex items-center gap-3">
                <Link
                  href={`/findings/${finding.id}`}
                  className="text-xs font-medium text-[#45a19c] hover:text-[#3a8a86] transition-colors"
                >
                  View Details &rarr;
                </Link>
                <button
                  onClick={() => openChat(finding.title, finding.summary)}
                  className="text-xs font-medium text-[#6c757d] hover:text-[#45a19c] transition-colors flex items-center gap-1"
                >
                  <MessageSquare size={12} /> Discuss
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-3 sm:p-4">
        <ChatInput
          onSend={() => { window.location.href = '/chat'; }}
          placeholder="Ask Scale Pilot anything about your account..."
        />
        <p className="text-xs text-[#6c757d] text-center mt-2">AI-generated analysis - verify important data before taking action.</p>
      </div>

      {/* Chat Slideout */}
      <ChatSlideout
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        contextTitle={chatContext.title}
        contextDetail={chatContext.detail}
      />
    </div>
  );
}
