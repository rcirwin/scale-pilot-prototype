'use client';

import { useState } from 'react';
import { RecommendationCard } from '@/components/recommendation-card';
import { ChatSlideout } from '@/components/chat-slideout';
import { recommendations } from '@/data/recommendations';
import { findings } from '@/data/findings';
import { MessageSquare, ArrowRight, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';

type CategoryFilter = 'all' | 'Algorithm Orchestration' | 'Campaign Structure' | 'Data Enrichment' | 'Direct Action';
type StatusFilter = 'all' | 'pending' | 'accepted' | 'rejected';

export default function OptimizerPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState({ title: '', detail: '' });

  const filtered = recommendations.filter(r => {
    if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  const categories: CategoryFilter[] = ['all', 'Algorithm Orchestration', 'Campaign Structure', 'Data Enrichment', 'Direct Action'];
  const statuses: StatusFilter[] = ['all', 'pending', 'accepted', 'rejected'];

  const counts = {
    pending: recommendations.filter(r => r.status === 'pending').length,
    accepted: recommendations.filter(r => r.status === 'accepted').length,
    rejected: recommendations.filter(r => r.status === 'rejected').length,
  };

  const openChat = (rec: typeof recommendations[0]) => {
    setChatContext({
      title: rec.title,
      detail: `**Category:** ${rec.category}\n**Priority:** ${rec.priority}\n**Entity:** ${rec.entity}\n**Status:** ${rec.status}\n\n**Summary:** ${rec.summary}\n\n**Reasoning:** ${rec.reasoning}\n\n**Expected Impact:** ${rec.expectedImpact}`,
    });
    setChatOpen(true);
  };

  // Find a finding related to a recommendation (simple heuristic)
  const findRelatedFinding = (rec: typeof recommendations[0]) => {
    const recText = (rec.title + rec.summary + rec.entity).toLowerCase();
    return findings.find(f => {
      const fText = (f.title + f.summary + f.actions.join(' ')).toLowerCase();
      const fWords = fText.split(/\s+/).filter(w => w.length > 5);
      return fWords.some(w => recText.includes(w));
    });
  };

  return (
    <div className="max-w-[1100px] space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Scale Optimizer</h1>
          <p className="text-sm text-[#6c757d]">Scale Pilot recommendations for your account</p>
        </div>
        <div className="text-xs text-[#6c757d]">Recommendations refresh daily</div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {/* Category filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[#6c757d] mr-1">Category:</span>
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

          <div className="hidden sm:block w-px h-6 bg-[#e2e8f0]" />

          {/* Status filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[#6c757d] mr-1">Status:</span>
            {statuses.map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                  statusFilter === st
                    ? 'bg-[#151c29] text-white border-[#151c29]'
                    : 'bg-white text-[#6c757d] border-[#e2e8f0] hover:border-gray-300'
                }`}
              >
                {st === 'all' ? `All (${recommendations.length})` : `${st.charAt(0).toUpperCase() + st.slice(1)} (${counts[st as keyof typeof counts] || 0})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-12 text-center">
            <p className="text-[#6c757d] text-sm">No recommendations match the current filters.</p>
          </div>
        ) : (
          filtered.map(rec => {
            const relatedFinding = findRelatedFinding(rec);
            return (
              <div key={rec.id}>
                <RecommendationCard recommendation={rec} />
                {/* Action bar below the card */}
                <div className="flex items-center gap-3 mt-1.5 ml-1 flex-wrap">
                  <button
                    onClick={() => openChat(rec)}
                    className="text-xs text-[#6c757d] hover:text-[#45a19c] transition-colors flex items-center gap-1"
                  >
                    <MessageSquare size={12} /> Discuss with Scale Pilot
                  </button>
                  {relatedFinding && (
                    <Link
                      href={`/findings/${relatedFinding.id}`}
                      className="text-xs text-[#6c757d] hover:text-[#0d6efd] transition-colors flex items-center gap-1"
                    >
                      <SearchIcon size={12} /> View related finding
                    </Link>
                  )}
                </div>
              </div>
            );
          })
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
