import Link from 'next/link';
import { SeverityBadge } from './severity-badge';
import type { Finding } from '@/data/findings';

interface FindingCardProps {
  finding: Finding;
}

function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

const severityBorderColor = {
  high: 'border-l-[#ef4444]',
  medium: 'border-l-[#f59e0b]',
  low: 'border-l-[#0d6efd]',
};

export function FindingCard({ finding }: FindingCardProps) {
  return (
    <div
      className={`bg-white rounded-lg border border-[#e2e8f0] border-l-4 ${severityBorderColor[finding.severity]} p-4 hover:shadow-sm transition-shadow`}
    >
      <div className="flex items-center gap-2 mb-2">
        <SeverityBadge severity={finding.severity} />
        <span className="text-xs text-[#6c757d]">{timeAgo(finding.timestamp)}</span>
      </div>
      <h3 className="text-sm font-semibold text-[#1a1a2e] mb-1 leading-snug">{finding.title}</h3>
      <p className="text-xs text-[#6c757d] leading-relaxed mb-3 line-clamp-2">{finding.summary}</p>
      <Link
        href={`/findings/${finding.id}`}
        className="text-xs font-medium text-[#45a19c] hover:text-[#3a8a86] transition-colors"
      >
        View Details &rarr;
      </Link>
    </div>
  );
}
