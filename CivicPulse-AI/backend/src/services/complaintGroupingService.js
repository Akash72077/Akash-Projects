import { haversineDistance } from './locationService.js';

const severityRank = { low: 1, medium: 2, high: 3, critical: 4 };
const severityBase = { low: 32, medium: 50, high: 68, critical: 82 };

function daysPending(createdAt) {
  const ms = Date.now() - new Date(createdAt).getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}

function rootIdFor(complaint, byId) {
  let current = complaint;
  const seen = new Set();
  while (current?.duplicate_of && !seen.has(current.id)) {
    seen.add(current.id);
    const next = byId.get(current.duplicate_of);
    if (!next) break;
    current = next;
  }
  return current?.id || complaint.id;
}

export function calculateGroupPriority(reports) {
  if (!reports.length) return 0;
  const strongestSeverity = reports.reduce((best, item) =>
    severityRank[item.severity] > severityRank[best] ? item.severity : best, reports[0].severity);
  const supporters = reports.reduce((sum, item) => sum + (item.supporter_count || item.supporters?.length || 0), 0);
  const oldestDays = Math.max(...reports.map((item) => item.status === 'resolved' ? 0 : daysPending(item.created_at)));
  const reportBoost = Math.min(12, Math.max(0, reports.length - 1) * 3);
  const supportBoost = Math.min(8, Math.floor(Math.log2(1 + supporters) * 2));
  const ageBoost = Math.min(8, oldestDays);
  const currentMax = Math.max(...reports.map((item) => Number(item.priority_score) || 0));
  return Math.min(100, Math.max(currentMax, severityBase[strongestSeverity] + reportBoost + supportBoost + ageBoost));
}

function maxDistanceFromRoot(root, reports) {
  if (root.latitude == null || root.longitude == null) return 0;
  return Math.round(Math.max(0, ...reports.map((item) => {
    if (item.latitude == null || item.longitude == null) return 0;
    return haversineDistance(root.latitude, root.longitude, item.latitude, item.longitude);
  })));
}

function distinctAffectedCitizens(reports) {
  const ids = new Set();
  for (const report of reports) {
    if (report.user_id) ids.add(String(report.user_id));
    for (const supporter of report.supporters || []) ids.add(String(supporter));
  }
  return ids.size;
}

export function groupComplaints(complaints, proximityMeters = 100) {
  const active = complaints.filter((c) => c.status !== 'resolved');
  const byId = new Map(active.map((c) => [c.id, c]));
  const groups = new Map();
  const unlinked = [];

  // Explicit duplicate links always win.
  for (const complaint of active) {
    if (complaint.duplicate_of) {
      const rootId = rootIdFor(complaint, byId);
      if (!groups.has(rootId)) groups.set(rootId, []);
      groups.get(rootId).push(complaint);
      const root = byId.get(rootId);
      if (root && !groups.get(rootId).some((x) => x.id === root.id)) groups.get(rootId).push(root);
    } else {
      unlinked.push(complaint);
    }
  }

  // Group remaining complaints if they are the same civic category and physically close.
  for (const complaint of unlinked) {
    if ([...groups.values()].some((items) => items.some((x) => x.id === complaint.id))) continue;

    let matchedRootId = null;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const [rootId, reports] of groups.entries()) {
      const root = reports.find((x) => x.id === rootId) || reports[0];
      if (!root || root.category !== complaint.category) continue;
      if (root.latitude == null || root.longitude == null || complaint.latitude == null || complaint.longitude == null) continue;
      const distance = haversineDistance(root.latitude, root.longitude, complaint.latitude, complaint.longitude);
      if (distance <= proximityMeters && distance < bestDistance) {
        matchedRootId = rootId;
        bestDistance = distance;
      }
    }

    if (matchedRootId) {
      groups.get(matchedRootId).push(complaint);
      continue;
    }

    // Start a new cluster and absorb later same-category reports nearby.
    const rootId = complaint.id;
    const reports = [complaint];
    for (const candidate of unlinked) {
      if (candidate.id === complaint.id || candidate.category !== complaint.category) continue;
      if ([...groups.values()].some((items) => items.some((x) => x.id === candidate.id))) continue;
      if (complaint.latitude == null || complaint.longitude == null || candidate.latitude == null || candidate.longitude == null) continue;
      const distance = haversineDistance(complaint.latitude, complaint.longitude, candidate.latitude, candidate.longitude);
      if (distance <= proximityMeters) reports.push(candidate);
    }
    groups.set(rootId, reports);
  }

  return [...groups.entries()].map(([rootId, rawReports]) => {
    const uniqueMap = new Map(rawReports.map((report) => [report.id, report]));
    const reports = [...uniqueMap.values()].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const root = reports.find((item) => item.id === rootId) || reports[0];
    const severity = reports.reduce((best, item) => severityRank[item.severity] > severityRank[best] ? item.severity : best, root.severity);
    const priority = calculateGroupPriority(reports);
    const supporters = reports.reduce((sum, item) => sum + (item.supporter_count || item.supporters?.length || 0), 0);
    const automaticCount = reports.filter((item) => item.duplicate_of || item.id !== root.id).length;

    return {
      id: `group-${root.id}`,
      root_complaint_id: root.id,
      title: root.title,
      category: root.category,
      severity,
      priority_score: priority,
      base_priority_score: root.priority_score,
      suggested_department: root.suggested_department,
      status: root.status,
      location_text: root.location_text,
      area: root.area,
      latitude: root.latitude,
      longitude: root.longitude,
      photo_url: root.photo_url,
      created_at: root.created_at,
      updated_at: root.updated_at,
      report_count: reports.length,
      duplicate_report_count: automaticCount,
      supporter_count: supporters,
      affected_citizens: distinctAffectedCitizens(reports),
      radius_meters: maxDistanceFromRoot(root, reports),
      root_complaint: { ...root, priority_score: priority },
      reports: reports.map((item) => ({
        ...item,
        distance_from_root_meters: root.latitude != null && root.longitude != null && item.latitude != null && item.longitude != null
          ? Math.round(haversineDistance(root.latitude, root.longitude, item.latitude, item.longitude))
          : null,
        is_root: item.id === root.id,
      })),
    };
  }).sort((a, b) => b.priority_score - a.priority_score || b.report_count - a.report_count);
}

export function findAutomaticDuplicate(newComplaint, complaints, proximityMeters = 100) {
  if (!newComplaint?.category || newComplaint.latitude == null || newComplaint.longitude == null) return null;
  const active = complaints.filter((c) => c.status !== 'resolved' && c.category === newComplaint.category && c.latitude != null && c.longitude != null);
  let best = null;
  for (const candidate of active) {
    const distance = haversineDistance(newComplaint.latitude, newComplaint.longitude, candidate.latitude, candidate.longitude);
    if (distance > proximityMeters) continue;
    if (!best || distance < best.distanceMeters) best = { complaint: candidate, distanceMeters: distance };
  }
  return best;
}
