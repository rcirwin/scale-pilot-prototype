import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
}

export function MetricCard({ label, value, delta, deltaType = 'neutral' }: MetricCardProps) {
  const deltaColors = {
    positive: 'text-[#22c55e] bg-[#22c55e]/10',
    negative: 'text-[#ef4444] bg-[#ef4444]/10',
    neutral: 'text-[#6c757d] bg-[#6c757d]/10',
  };

  const DeltaIcon = deltaType === 'positive' ? ArrowUp : deltaType === 'negative' ? ArrowDown : Minus;

  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] p-4">
      <p className="text-xs font-medium text-[#6c757d] uppercase tracking-wide mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-[#1a1a2e]">{value}</span>
        {delta && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full ${deltaColors[deltaType]}`}>
            <DeltaIcon size={12} />
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
