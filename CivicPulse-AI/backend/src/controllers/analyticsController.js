import { listComplaints } from '../data/repository.js';
import { predictCivicHotspots } from '../services/hotspotPredictionService.js';

export async function overview(_req, res, next) {
  try {
    const all = await listComplaints();
    const byStatus = {}, byCategory = {}, bySeverity = {};
    all.forEach(c => { byStatus[c.status] = (byStatus[c.status]||0)+1; byCategory[c.category]=(byCategory[c.category]||0)+1; bySeverity[c.severity]=(bySeverity[c.severity]||0)+1; });
    res.json({ total: all.length, resolved: all.filter(c=>c.status==='resolved').length, critical: all.filter(c=>c.severity==='critical'&&c.status!=='resolved').length, byStatus, byCategory, bySeverity });
  } catch(e){ next(e); }
}

export async function hotspots(req, res, next) {
  try {
    const requestedDays = Number(req.query.days || 30);
    const days = [7, 30, 90].includes(requestedDays) ? requestedDays : 30;
    const all = await listComplaints();
    const predictions = predictCivicHotspots(all, { days, epsMeters: 1200, minSamples: 2 });
    res.json({
      model: 'DBSCAN spatial clustering + risk scoring',
      generated_at: new Date().toISOString(),
      window_days: days,
      hotspots: predictions,
    });
  } catch (e) { next(e); }
}
