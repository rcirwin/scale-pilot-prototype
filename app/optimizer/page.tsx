'use client';

import { useState } from 'react';
import { RecommendationCard } from '@/components/recommendation-card';
import { recommendations } from '@/data/recommendations';

type CategoryFilter = 'all' | 'Algorithm Orchestration' | 'Campaign Structure' | 'Data Enrichment' | 'Direct Action';
type StatusFilter = 'all' | 'pending' | 'accepted' | 'rejected';

export default function OptimizerPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

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

  return (
    <div className="max-w-[1000px] space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Scale Optimizer</h1>
          <p className="text-sm text-[#6c757d]">Scale Pilot recommendations for your account</p>
        </div>
        <div className="text-xs text-[#6c757d]">Recommendations refresh daily</div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Category filter */}
          <div className="flex items-center gap-1.5">
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

          <div className="w-px h-6 bg-[#e2e8f0]" />

          {/* Status filter */}
          <div className="flex items-center gap-1.5">
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
          filtered.map(rec => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))
        )}
      </div>
    </div>
  );
}
