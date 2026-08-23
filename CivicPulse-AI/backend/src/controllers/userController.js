import { publicUser } from '../utils/helpers.js';
export async function profile(req, res) { res.json(publicUser(req.user)); }
