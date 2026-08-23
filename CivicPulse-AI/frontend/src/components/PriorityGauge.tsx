interface PriorityGaugeProps {
  score: number;
  size?: number;
}

export default function PriorityGauge({ score, size = 120 }: PriorityGaugeProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color = '#3b82f6';
  if (score >= 80) color = '#ef4444';
  else if (score >= 60) color = '#f97316';
  else if (score >= 40) color = '#f59e0b';
  else if (score >= 20) color = '#3b82f6';
  else color = '#64748b';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out, stroke 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-display font-bold text-slate-900">{score}</span>
        <span className="text-xs text-slate-400 font-semibold">/ 100</span>
      </div>
    </div>
  );
}
