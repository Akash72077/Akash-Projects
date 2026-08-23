import path from 'path';
import fs from 'fs/promises';
import { createComplaint as repoCreate, getComplaint, getSupportInfo, listComplaints, toggleComplaintSupport, updateComplaint } from '../data/repository.js';
import { haversineDistance } from '../services/locationService.js';
import { classifyComplaint } from '../services/complaintClassificationService.js';
import { notifyStatusChange } from '../services/notificationService.js';
import { analyzeCivicImage } from '../services/aiVisionService.js';
import { findAutomaticDuplicate, groupComplaints } from '../services/complaintGroupingService.js';

export async function list(req, res, next) {
  try {
    const data = await listComplaints({ status: req.query.status, category: req.query.category, severity: req.query.severity });
    res.json(data);
  } catch (e) { next(e); }
}

export async function feed(req, res, next) {
  try {
    let data = await listComplaints({ status: req.query.status, category: req.query.category, severity: req.query.severity });
    const search = String(req.query.q || '').trim().toLowerCase();
    const area = String(req.query.area || '').trim().toLowerCase();
    const scope = req.query.scope === 'nearby' ? 'nearby' : 'all';
    const sort = String(req.query.sort || 'newest');
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);
    const radius = Number(req.query.radius || 5000);

    if (search) {
      data = data.filter((c) => [c.title, c.description, c.ai_summary, c.location_text, c.area]
        .some((value) => String(value || '').toLowerCase().includes(search)));
    }
    if (area) data = data.filter((c) => String(c.area || '').toLowerCase() === area);

    data = data.map((c) => {
      if (Number.isFinite(latitude) && Number.isFinite(longitude) && c.latitude != null && c.longitude != null) {
        return { ...c, distance_meters: Math.round(haversineDistance(latitude, longitude, c.latitude, c.longitude)) };
      }
      return c;
    });

    if (scope === 'nearby' && Number.isFinite(latitude) && Number.isFinite(longitude)) {
      data = data.filter((c) => c.distance_meters != null && c.distance_meters <= radius);
    }

    if (sort === 'nearby' && Number.isFinite(latitude) && Number.isFinite(longitude)) {
      data.sort((a, b) => (a.distance_meters ?? Number.MAX_SAFE_INTEGER) - (b.distance_meters ?? Number.MAX_SAFE_INTEGER));
    } else if (sort === 'priority') {
      data.sort((a, b) => b.priority_score - a.priority_score);
    } else if (sort === 'supported') {
      data.sort((a, b) => (b.supporter_count || 0) - (a.supporter_count || 0));
    } else {
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    res.json(data);
  } catch (e) { next(e); }
}


export async function grouped(req, res, next) {
  try {
    const radius = Math.max(30, Math.min(300, Number(req.query.radius || 100)));
    const data = await listComplaints();
    res.json(groupComplaints(data, radius));
  } catch (e) { next(e); }
}

export async function areas(_req, res, next) {
  try {
    const data = await listComplaints();
    const values = [...new Set(data.map((c) => c.area).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    res.json(values);
  } catch (e) { next(e); }
}

export async function byUser(req, res, next) {
  try {
    const data = await listComplaints();
    res.json(data.filter(c => c.user_id === req.params.userId));
  } catch (e) { next(e); }
}

export async function detail(req, res, next) {
  try {
    const c = await getComplaint(req.params.id);
    if (!c) return res.status(404).json({ message: 'Complaint not found.' });
    res.json(c);
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const payload = { ...req.body, user_id: req.user.id || req.user._id?.toString() };
    const all = await listComplaints();
    const match = findAutomaticDuplicate(payload, all, 100);

    if (match) {
      const rootId = match.complaint.duplicate_of || match.complaint.id;
      payload.duplicate_of = rootId;
    }

    const c = await repoCreate(payload);

    res.status(201).json({ ...c, auto_grouped: !!payload.duplicate_of, grouped_into: payload.duplicate_of || null, duplicate_distance_meters: match ? Math.round(match.distanceMeters) : null });
  } catch (e) { next(e); }
}

export async function updateStatus(req, res, next) {
  try {
    const c = await updateComplaint(req.params.id, {
      status: req.body.status,
      ...(req.body.after_repair_photo_url !== undefined ? { after_repair_photo_url: req.body.after_repair_photo_url } : {}),
      ...(req.body.assigned_to !== undefined ? { assigned_to: req.body.assigned_to } : {})
    });
    if (!c) return res.status(404).json({ message: 'Complaint not found.' });
    await notifyStatusChange(c);
    res.json(c);
  } catch (e) { next(e); }
}

export async function support(req, res, next) {
  try {
    const userId = req.user.id || req.user._id?.toString();
    const result = await toggleComplaintSupport(req.params.id, userId);
    if (!result) return res.status(404).json({ message: 'Complaint not found.' });
    res.json({ supported: result.supported, count: result.complaint.supporter_count, complaint: result.complaint });
  } catch (e) { next(e); }
}

export async function supportInfo(req, res, next) {
  try {
    const userId = req.user?.id || req.user?._id?.toString();
    res.json(await getSupportInfo(req.params.id, userId));
  } catch (e) { next(e); }
}

export async function duplicates(req, res, next) {
  try {
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);
    const radius = Number(req.query.radius || 300);
    const category = req.query.category;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || !category) return res.status(400).json({ message: 'latitude, longitude and category are required.' });
    const all = await listComplaints({ category });
    const matches = all.filter(c => c.status !== 'resolved' && c.latitude != null && c.longitude != null)
      .map(c => ({ complaint: c, distanceMeters: haversineDistance(latitude, longitude, c.latitude, c.longitude) }))
      .filter(x => x.distanceMeters <= radius)
      .sort((a,b) => a.distanceMeters - b.distanceMeters);
    res.json(matches);
  } catch (e) { next(e); }
}

export async function uploadPhoto(req, res) {
  if (!req.file) return res.status(400).json({ message: 'Image file required.' });
  res.status(201).json({ url: `/uploads/${path.basename(req.file.path)}` });
}

export async function analyze(req, res) {
  const description = req.body.description || '';
  const filename = req.body.filename || req.file?.originalname || '';

  if (req.file) {
    try {
      const buffer = await fs.readFile(req.file.path);
      const vision = await analyzeCivicImage({ buffer, mimeType: req.file.mimetype, description });

      if (vision.configured) {
        if (vision.identifiable && vision.result) {
          return res.json({ couldNotIdentify: false, result: vision.result, source: 'gemini-vision' });
        }
        return res.json({
          couldNotIdentify: true,
          result: null,
          photo_description: vision.result?.photo_description || '',
          message: 'The AI could not confidently identify a civic issue in this photo. Please describe the issue.'
        });
      }
    } catch (error) {
      console.warn('Vision AI analysis failed:', error.message);
      if (!description.trim()) {
        return res.json({
          couldNotIdentify: true,
          result: null,
          message: `Image AI could not complete the analysis: ${error.message}`
        });
      }
    } finally {
      await fs.unlink(req.file.path).catch(() => {});
    }
  }

  // Text fallback uses only citizen-provided text. The filename is never treated as image understanding.
  const result = classifyComplaint(description, '');
  if (!result) {
    return res.json({
      couldNotIdentify: true,
      result: null,
      message: process.env.GEMINI_API_KEY
        ? 'We could not clearly identify the problem. Please describe the issue.'
        : 'Vision AI is not configured yet. Add GEMINI_API_KEY to backend/.env, or describe the issue manually.'
    });
  }
  res.json({ couldNotIdentify: false, result, source: 'text-fallback' });
}
