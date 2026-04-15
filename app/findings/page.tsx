'use client';

import { useState } from 'react';
import { findings } from '@/data/findings';
import { SeverityBadge } from '@/components/severity-badge';
import { CategoryBadge } from '@/components/category-badge';
import { ChatSlideout } from '@/components/chat-slideout';
import { Search, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type CategoryFilter = 'all' | string;
type SeverityFilter = 'all' | 'high' | 'medium' | 'low';

export default function FindingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState({ title: '', detail: '' });

  const categories = ['all', ...Array.from(new Set(findings.map(f => f.category)))];

  const filtered = findings.filter(f => {
    if (categoryFilter !== 'all' && f.category !== categoryFilter) return false;
    if (severityFilter !== 'all' && f.severity !== severityFilter) return false;
    if (searchQuery && !f.title.toLowerCase().includes(searchQuery.toLowerCase()) && !f.summary.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-[1200px] space-y-6">
      <div>
        <h1 className="text-lg font-bold text-gray-900">Findings & Research</h1>
        <p className="text-sm text-[#6c757d]">What Scale Pilot is investigating, what it has found, and what recommendations came from that research</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6c757d]" />
            <input
              type="text"
              placeholder="Search findings..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-sm bg-[#f5f7fa] border border-[#e2e8f0] rounded-md text-[#1a1a2e] placeholder:text-[#6c757d] focus:outline-none focus:ring-1 focus:ring-[#45a19c]"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                  categoryFilter === cat
                    ? 'bg-[#151c29] text-white border-[#151c29]'
                    : 'bg-white text-[#6c757d] border-[#e2e8f0] hover:border-gray-300'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Severity filter */}
          <div className="flex items-center gap-1.5">
            {(['all', 'high', 'medium', 'low'] as const).map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                  severityFilter === sev
                    ? 'bg-[#151c29] text-white border-[#151c29]'
                    : 'bg-white text-[#6c757d] border-[#e2e8f0] hover:border-gray-300'
                }`}
              >
                {sev === 'all' ? 'All' : sev.charAt(0).toUpperCase() + sev.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-12 text-center">
            <p className="text-[#6c757d] text-sm">No findings match the current filters.</p>
          </div>
        ) : (
          filtered.map(finding => (
            <Link
              key={finding.id}
              href={`/findings/${finding.id}`}
              className={`block bg-white rounded-lg border border-[#e2e8f0] border-l-4 ${
                finding.severity === 'high' ? 'border-l-[#ef4444]' :
                finding.severity === 'medium' ? 'border-l-[#f59e0b]' : 'border-l-[#0d6efd]'
              } p-4 sm:p-5 hover:shadow-sm transition-shadow`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <SeverityBadge severity={finding.severity} />
                    <CategoryBadge category={finding.executionMethod} />
                    <span className="text-xs text-[#6c757d]">{finding.category}</span>
                    <span className="text-xs text-[#6c757d]">
                      {new Date(finding.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#1a1a2e] mb-1.5 leading-snug">{finding.title}</h3>
                  <p className="text-xs text-[#6c757d] leading-relaxed mb-3 line-clamp-2">{finding.summary}</p>

                  {/* Recommended actions preview */}
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">{finding.actions.length} recommended action{finding.actions.length !== 1 ? 's' : ''}</p>
                    <p className="text-xs text-[#6c757d] line-clamp-1">{finding.actions[0]}</p>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-medium text-[#45a19c] flex items-center gap-1">
                      View full analysis <ArrowRight size={12} />
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setChatContext({ title: finding.title, detail: finding.summary });
                        setChatOpen(true);
                      }}
                      className="text-xs font-medium text-[#6c757d] hover:text-[#45a19c] transition-colors flex items-center gap-1"
                    >
                      <MessageSquare size={12} /> Discuss
                    </button>
                  </div>
                </div>

                {/* Confidence indicator */}
                <div className="shrink-0 text-right hidden sm:block">
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                    finding.confidence === 'High' ? 'bg-[#22c55e]/10 text-[#22c55e]' :
                    finding.confidence === 'Medium' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#ef4444]/10 text-[#ef4444]'
                  }`}>
                    {finding.confidence} confidence
                  </span>
                  <p className="text-[10px] text-[#6c757d] mt-1">{finding.dataSources.length} data sources</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <ChatSlideout
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        contextTitle={chatContext.title}
        contextDetail={chatContext.detail}
      />
    </div>
  );
}
