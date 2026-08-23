import { haversineDistance } from './locationService.js';

const DAY_MS = 24 * 60 * 60 * 1000;
const severityWeight = { low: 1, medium: 2, high: 3, critical: 4 };

function pendingDays(createdAt, now = Date.now()) {
  return Math.max(0, Math.floor((now - new Date(createdAt).getTime()) / DAY_MS));
}

function attentionState(complaint) {
  if (complaint.status === 'resolved') return 'resolved';
  const days = pendingDays(complaint.created_at);
  if (days >= 8) return 'overdue';
  if (days >= 6) return 'delayed';
  if (days >= 3) return 'attention';
  return 'normal';
}

function adminState(complaint) {
  switch (complaint.status) {
    case 'reported': return 'Awaiting authority verification';
    case 'verified': return 'Verified — awaiting assignment';
    case 'assigned': return `Assigned${complaint.assigned_to ? ` to ${complaint.assigned_to}` : ' to department'}`;
    case 'in_progress': return `Work in progress${complaint.assigned_to ? ` — ${complaint.assigned_to}` : ''}`;
    case 'resolved': return 'Resolved and closed';
    default: return 'Pending administrative action';
  }
}

function dbscan(points, epsMeters = 1200, minSamples = 2) {
  const visited = new Set();
  const clustered = new Set();
  const clusters = [];

  const neighbors = (idx) => {
    const p = points[idx];
    const result = [];
    for (let i = 0; i < points.length; i += 1) {
      const q = points[i];
      const d = haversineDistance(p.latitude, p.longitude, q.latitude, q.longitude);
      if (d <= epsMeters) result.push(i);
    }
    return result;
  };

  for (let i = 0; i < points.length; i += 1) {
    if (visited.has(i)) continue;
    visited.add(i);
    const seedNeighbors = neighbors(i);
    if (seedNeighbors.length < minSamples) continue;

    const clusterIndexes = [];
    const queue = [...seedNeighbors];
    while (queue.length) {
      const idx = queue.shift();
      if (!visited.has(idx)) {
        visited.add(idx);
        const nextNeighbors = neighbors(idx);
        if (nextNeighbors.length >= minSamples) {
          for (const n of nextNeighbors) if (!queue.includes(n)) queue.push(n);
        }
      }
      if (!clustered.has(idx)) {
        clustered.add(idx);
        clusterIndexes.push(idx);
      }
    }
    clusters.push(clusterIndexes.map((idx) => points[idx]));
  }
  return clusters;
}

function mostCommon(values) {
  const counts = new Map();
  for (const value of values.filter(Boolean)) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 'Detected Cluster';
}

function categoryBreakdown(cluster) {
  const counts = {};
  for (const c of cluster) counts[c.category] = (counts[c.category] || 0) + 1;
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

function duplicateGroups(cluster) {
  const byId = new Map(cluster.map((c) => [String(c.id), c]));
  const grouped = new Map();
  for (const complaint of cluster) {
    if (!complaint.duplicate_of) continue;
    const rootId = String(complaint.duplicate_of);
    if (!grouped.has(rootId)) grouped.set(rootId, []);
    grouped.get(rootId).push(complaint);
  }
  return [...grouped.entries()].map(([rootId, duplicates]) => {
    const root = byId.get(rootId);
    const rows = root ? [root, ...duplicates] : [...duplicates];
    return {
      root_complaint_id: rootId,
      title: root?.title || duplicates[0]?.title || 'Possible duplicate cluster',
      category: root?.category || duplicates[0]?.category || 'other',
      count: rows.length,
      duplicate_reports: duplicates.length,
      total_supporters: rows.reduce((sum, c) => sum + Number(c.supporter_count || c.supporters?.length || 0), 0),
      complaint_ids: rows.map((c) => String(c.id)),
    };
  }).sort((a, b) => b.count - a.count || b.total_supporters - a.total_supporters);
}

function recommend(cluster, categoryCounts, needsAttention) {
  const top = categoryCounts[0]?.category;
  const department = mostCommon(cluster.map((c) => c.suggested_department));
  if (needsAttention.pending_verification > 0) {
    return {
      title: 'Immediate verification drive recommended',
      reason: `${needsAttention.pending_verification} complaint${needsAttention.pending_verification === 1 ? '' : 's'} in this hotspot still need authority verification.`,
      department,
    };
  }
  if (needsAttention.overdue > 0) {
    return {
      title: 'Escalate overdue complaints',
      reason: `${needsAttention.overdue} complaint${needsAttention.overdue === 1 ? '' : 's'} have been pending for 8+ days.`,
      department,
    };
  }
  const readable = String(top || 'civic').replaceAll('_', ' ');
  return {
    title: 'Preventive field inspection recommended',
    reason: `Repeated ${readable} reports are concentrated in this area and may indicate an emerging infrastructure pattern.`,
    department,
  };
}

export function predictCivicHotspots(allComplaints, { days = 30, epsMeters = 1200, minSamples = 2 } = {}) {
  const now = Date.now();
  const cutoff = now - days * DAY_MS;
  const valid = allComplaints.filter((c) => c.latitude != null && c.longitude != null && new Date(c.created_at).getTime() >= cutoff);
  const clusters = dbscan(valid, epsMeters, minSamples);

  return clusters.map((cluster, index) => {
    const unresolved = cluster.filter((c) => c.status !== 'resolved');
    const categoryCounts = categoryBreakdown(cluster);
    const duplicateClusters = duplicateGroups(cluster);
    const duplicateCount = cluster.filter((c) => !!c.duplicate_of).length;
    const avgSeverity = cluster.reduce((sum, c) => sum + (severityWeight[c.severity] || 1), 0) / Math.max(1, cluster.length);
    const avgPriority = cluster.reduce((sum, c) => sum + Number(c.priority_score || 0), 0) / Math.max(1, cluster.length);
    const supporters = cluster.reduce((sum, c) => sum + Number(c.supporter_count || c.supporters?.length || 0), 0);
    const overdue = unresolved.filter((c) => pendingDays(c.created_at, now) >= 8).length;
    const pendingVerification = unresolved.filter((c) => c.status === 'reported').length;
    const unassigned = unresolved.filter((c) => ['reported', 'verified'].includes(c.status) && !c.assigned_to).length;
    const criticalOpen = unresolved.filter((c) => c.severity === 'critical').length;

    const half = Math.max(1, Math.floor(days / 2));
    const recentCutoff = now - half * DAY_MS;
    const currentPeriod = cluster.filter((c) => new Date(c.created_at).getTime() >= recentCutoff).length;
    const previousPeriod = Math.max(0, cluster.length - currentPeriod);
    const growthPercent = previousPeriod === 0 ? (currentPeriod > 0 ? 100 : 0) : Math.round(((currentPeriod - previousPeriod) / previousPeriod) * 100);

    const densityScore = Math.min(32, cluster.length * 4.2);
    const unresolvedScore = Math.min(18, (unresolved.length / Math.max(1, cluster.length)) * 18);
    const severityScore = Math.min(18, (avgSeverity / 4) * 18);
    const overdueScore = Math.min(14, overdue * 3.5);
    const supportScore = Math.min(10, supporters * 0.35);
    const growthScore = Math.min(8, Math.max(0, growthPercent) * 0.08);
    const riskScore = Math.max(1, Math.min(99, Math.round(densityScore + unresolvedScore + severityScore + overdueScore + supportScore + growthScore)));
    const riskLevel = riskScore >= 80 ? 'critical' : riskScore >= 65 ? 'high' : riskScore >= 45 ? 'moderate' : 'low';

    const center = {
      latitude: cluster.reduce((sum, c) => sum + Number(c.latitude), 0) / cluster.length,
      longitude: cluster.reduce((sum, c) => sum + Number(c.longitude), 0) / cluster.length,
    };
    const radiusMeters = Math.max(...cluster.map((c) => haversineDistance(center.latitude, center.longitude, c.latitude, c.longitude)), 220);
    const area = mostCommon(cluster.map((c) => c.area || String(c.location_text || '').split(',')[0]));

    const needsAttention = {
      pending_verification: pendingVerification,
      unassigned,
      overdue,
      critical_unresolved: criticalOpen,
    };

    const complaintRows = [...cluster]
      .sort((a, b) => {
        const aOver = attentionState(a) === 'overdue' ? 1 : 0;
        const bOver = attentionState(b) === 'overdue' ? 1 : 0;
        if (aOver !== bOver) return bOver - aOver;
        return Number(b.priority_score || 0) - Number(a.priority_score || 0);
      })
      .map((c) => ({
        ...c,
        pending_days: pendingDays(c.created_at, now),
        attention_state: attentionState(c),
        administrative_state: adminState(c),
      }));

    return {
      id: `hotspot-${area.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index + 1}`,
      area,
      center,
      radius_meters: Math.round(radiusMeters),
      risk_score: riskScore,
      risk_level: riskLevel,
      total_complaints: cluster.length,
      open_complaints: unresolved.length,
      average_pending_days: unresolved.length ? Number((unresolved.reduce((sum, c) => sum + pendingDays(c.created_at, now), 0) / unresolved.length).toFixed(1)) : 0,
      average_priority: Math.round(avgPriority),
      supporters,
      duplicate_count: duplicateCount,
      duplicate_clusters: duplicateClusters,
      growth_percent: growthPercent,
      category_breakdown: categoryCounts,
      needs_attention: needsAttention,
      recommended_action: recommend(cluster, categoryCounts, needsAttention),
      complaints: complaintRows,
    };
  }).sort((a, b) => b.risk_score - a.risk_score);
}
