import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'slate';
  trend?: string;
}

const colorMap = {
  primary: { bg: 'bg-primary-50', icon: 'text-primary-600', ring: 'ring-primary-100' },
  accent: { bg: 'bg-accent-50', icon: 'text-accent-600', ring: 'ring-accent-100' },
  success: { bg: 'bg-success-50', icon: 'text-success-600', ring: 'ring-success-100' },
  warning: { bg: 'bg-warning-50', icon: 'text-warning-600', ring: 'ring-warning-100' },
  error: { bg: 'bg-error-50', icon: 'text-error-600', ring: 'ring-error-100' },
  slate: { bg: 'bg-slate-100', icon: 'text-slate-600', ring: 'ring-slate-200' },
};

export default function StatCard({ icon, label, value, color = 'primary', trend }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 card-lift">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center ring-4 ${c.ring}`}>
          <div className={c.icon}>{icon}</div>
        </div>
        {trend && (
          <span className="text-xs font-semibold text-slate-400">{trend}</span>
        )}
      </div>
      <div className="text-3xl font-display font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}
