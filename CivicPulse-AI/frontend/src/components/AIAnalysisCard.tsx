import type { AIAnalysisResult } from '@/types';
import { CATEGORY_LABELS } from '@/lib/constants';
import PriorityGauge from './PriorityGauge';
import SeverityBadge from './SeverityBadge';
import { Sparkles, Building2, Tag } from 'lucide-react';

interface AIAnalysisCardProps {
  result: AIAnalysisResult;
  loading?: boolean;
}

export default function AIAnalysisCard({ result, loading = false }: AIAnalysisCardProps) {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary-600 animate-pulse" />
          <span className="font-semibold text-primary-700">AI Analysis in progress...</span>
        </div>
        <div className="space-y-3">
          <div className="h-4 skeleton rounded" />
          <div className="h-4 skeleton rounded w-3/4" />
          <div className="h-4 skeleton rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-2xl border border-primary-200 p-6 animate-scale-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-display font-bold text-slate-900">AI Analysis</h3>
          <p className="text-xs text-slate-500">Auto-detected from photo and description</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-shrink-0">
          <PriorityGauge score={result.priority_score} />
          <p className="text-center text-xs text-slate-500 mt-1 font-semibold">Priority Score</p>
        </div>

        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">Issue Type:</span>
            <span className="text-sm font-semibold text-slate-900">{CATEGORY_LABELS[result.category]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">Department:</span>
            <span className="text-sm font-semibold text-slate-900">{result.suggested_department}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Severity:</span>
            <SeverityBadge severity={result.severity} size="sm" />
          </div>
          {result.photo_description && <div className="rounded-xl border border-violet-200 bg-white/80 p-3"><div className="text-[11px] font-bold uppercase tracking-wide text-violet-600">Photo description</div><p className="mt-1 text-sm text-slate-700">{result.photo_description}</p></div>}
          <div className="pt-2 border-t border-slate-200">
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1">Complaint summary</div>
            <p className="text-sm text-slate-600 italic">{result.ai_summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
