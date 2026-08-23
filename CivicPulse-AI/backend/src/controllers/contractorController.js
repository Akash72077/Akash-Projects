import { listComplaints, updateComplaint } from '../data/repository.js';
export async function assigned(req, res, next) { try { const all = await listComplaints(); res.json(all.filter(c => c.status === 'assigned' || c.status === 'in_progress')); } catch(e){ next(e); } }
export async function accept(req, res, next) { try { const c = await updateComplaint(req.params.id, { status: 'in_progress', assigned_to: req.user.full_name || 'Contractor' }); res.json(c); } catch(e){ next(e); } }
