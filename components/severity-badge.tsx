interface SeverityBadgeProps {
  severity: 'high' | 'medium' | 'low';
}

const severityConfig = {
  high: {
    bg: 'bg-[#ef4444]/10',
    text: 'text-[#ef4444]',
    label: 'High',
  },
  medium: {
    bg: 'bg-[#f59e0b]/10',
    text: 'text-[#f59e0b]',
    label: 'Medium',
  },
  low: {
    bg: 'bg-[#0d6efd]/10',
    text: 'text-[#0d6efd]',
    label: 'Low',
  },
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = severityConfig[severity];
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
