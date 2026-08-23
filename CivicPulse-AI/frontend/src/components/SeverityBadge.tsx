import type { Severity } from '@/types';
import { SEVERITY_LABELS, SEVERITY_COLORS } from '@/lib/constants';

interface SeverityBadgeProps {
  severity: Severity;
  size?: 'sm' | 'md';
}

export default function SeverityBadge({ severity, size = 'md' }: SeverityBadgeProps) {
  const c = SEVERITY_COLORS[severity];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-bold border ${c.bg} ${c.text} ${c.border} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${severity === 'critical' ? 'animate-pulse' : ''}`} />
      {SEVERITY_LABELS[severity].toUpperCase()}
    </span>
  );
}
