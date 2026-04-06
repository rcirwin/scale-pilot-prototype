'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X, Pencil } from 'lucide-react';
import { CategoryBadge } from './category-badge';
import { SeverityBadge } from './severity-badge';
import type { Recommendation } from '@/data/recommendations';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onModify?: (id: string) => void;
}

const statusIndicator: Record<string, { icon: React.ElementType | null; className: string; label: string }> = {
  pending: { icon: null, className: '', label: '' },
  accepted: { icon: Check, className: 'text-[#22c55e] bg-[#22c55e]/10', label: 'Accepted' },
  rejected: { icon: X, className: 'text-[#ef4444] bg-[#ef4444]/10', label: 'Rejected' },
  expired: { icon: null, className: 'text-[#6c757d] bg-[#6c757d]/10', label: 'Expired' },
};

const confidenceColors: Record<string, string> = {
  High: 'bg-[#22c55e]/10 text-[#22c55e]',
  Medium: 'bg-[#f59e0b]/10 text-[#f59e0b]',
  Low: 'bg-[#ef4444]/10 text-[#ef4444]',
  high: 'bg-[#22c55e]/10 text-[#22c55e]',
  medium: 'bg-[#f59e0b]/10 text-[#f59e0b]',
  low: 'bg-[#ef4444]/10 text-[#ef4444]',
};

export function RecommendationCard({ recommendation, onAccept, onReject, onModify }: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const status = statusIndicator[recommendation.status];

  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 hover:shadow-sm transition-shadow">
      {/* Header row */}
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <CategoryBadge category={recommendation.category} />
        <SeverityBadge severity={recommendation.priority} />
        {status.label && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${status.className}`}>
            {status.icon && <status.icon size={12} />}
            {status.label}
          </span>
        )}
      </div>

      {/* Title and summary */}
      <h3 className="text-sm font-semibold text-[#1a1a2e] mb-1 leading-snug">{recommendation.title}</h3>
      <p className="text-xs text-[#6c757d] leading-relaxed mb-2">{recommendation.summary}</p>

      {/* Expected impact */}
      <p className="text-xs font-medium text-[#22c55e] mb-3">{recommendation.expectedImpact}</p>

      {/* Expandable detail section */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs font-medium text-[#6c757d] hover:text-[#1a1a2e] transition-colors mb-3"
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? 'Hide Details' : 'Show Details'}
      </button>

      {expanded && (
        <div className="border-t border-[#e2e8f0] pt-3 mb-3 space-y-3 animate-fade-in">
          {/* Reasoning */}
          <div>
            <p className="text-xs font-semibold text-[#1a1a2e] mb-1">Reasoning</p>
            <p className="text-xs text-[#6c757d] leading-relaxed">{recommendation.reasoning}</p>
          </div>

          {/* Current state vs Proposed */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#f5f7fa] rounded p-3">
              <p className="text-xs font-semibold text-[#6c757d] mb-1">Current State</p>
              <p className="text-xs text-[#1a1a2e]">{recommendation.currentState}</p>
            </div>
            <div className="bg-[#45a19c]/5 rounded p-3">
              <p className="text-xs font-semibold text-[#45a19c] mb-1">Proposed Action</p>
              <p className="text-xs text-[#1a1a2e]">{recommendation.proposedAction}</p>
            </div>
          </div>

          {/* Confidence */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6c757d]">Confidence:</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${confidenceColors[recommendation.confidence] || ''}`}>
              {recommendation.confidence}
            </span>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {recommendation.status === 'pending' && (
        <div className="flex items-center gap-2 border-t border-[#e2e8f0] pt-3">
          <button
            onClick={() => onAccept?.(recommendation.id)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-md transition-colors"
          >
            <Check size={14} />
            Accept
          </button>
          <button
            onClick={() => onReject?.(recommendation.id)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#ef4444] bg-[#ef4444]/10 hover:bg-[#ef4444]/20 rounded-md transition-colors"
          >
            <X size={14} />
            Reject
          </button>
          <button
            onClick={() => onModify?.(recommendation.id)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#6c757d] bg-[#6c757d]/10 hover:bg-[#6c757d]/20 rounded-md transition-colors"
          >
            <Pencil size={14} />
            Modify
          </button>
        </div>
      )}
    </div>
  );
}
