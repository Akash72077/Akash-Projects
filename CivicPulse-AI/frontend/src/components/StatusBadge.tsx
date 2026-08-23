import type { ComplaintStatus } from '@/types';
import { STATUS_LABELS, STATUS_ORDER, STATUS_COLORS } from '@/lib/constants';
import { Check } from 'lucide-react';

interface StatusBadgeProps {
  status: ComplaintStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const c = STATUS_COLORS[status];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${c.bg} ${c.text} ${c.border} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}

interface StatusTimelineProps {
  current: ComplaintStatus;
}

export function StatusTimeline({ current }: StatusTimelineProps) {
  const currentIndex = STATUS_ORDER.indexOf(current);

  return (
    <div className="flex items-center w-full">
      {STATUS_ORDER.map((status, idx) => {
        const isComplete = idx <= currentIndex;
        const isCurrent = idx === currentIndex;
        const c = STATUS_COLORS[status];
        return (
          <div key={status} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                  isComplete
                    ? `${c.bg} ${c.border} ${c.text}`
                    : 'bg-white border-slate-200 text-slate-300'
                } ${isCurrent ? 'ring-4 ring-offset-1 ' + c.border.replace('border', 'ring') : ''}`}
              >
                {isComplete && !isCurrent ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>
              <span className={`text-[10px] font-semibold ${isComplete ? c.text : 'text-slate-400'} hidden sm:block`}>
                {STATUS_LABELS[status]}
              </span>
            </div>
            {idx < STATUS_ORDER.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 -mt-5 rounded-full transition-all ${idx < currentIndex ? c.dot : 'bg-slate-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
