import { api } from './api';
import type { HotspotPredictionResponse } from '@/types';

export const fetchAnalytics = () => api<{total:number;resolved:number;critical:number;byStatus:Record<string,number>;byCategory:Record<string,number>;bySeverity:Record<string,number>}>('/analytics/overview');
export const fetchHotspotPredictions = (days: 7 | 30 | 90 = 30) => api<HotspotPredictionResponse>(`/analytics/hotspots?days=${days}`);
