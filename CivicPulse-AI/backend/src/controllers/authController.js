import { createUser, findUserByEmail, verifyPassword } from '../data/repository.js';
import { createToken } from '../middleware/authMiddleware.js';
import { publicUser } from '../utils/helpers.js';

export async function register(req, res, next) {
  try {
    const { full_name, email, password, role = 'citizen', department = null } = req.body;
    if (!full_name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
    const user = await createUser({ full_name, email, password, role, department });
    const safe = publicUser(user);
    res.status(201).json({ token: createToken(user), user: { id: safe.id, email: safe.email }, profile: safe });
  } catch (error) {
    if (/already exists/i.test(error.message) || error.code === 11000) return res.status(409).json({ message: 'An account with this email already exists.' });
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email || '');
    if (!user || !(await verifyPassword(user, password || ''))) return res.status(401).json({ message: 'Invalid email or password.' });
    const safe = publicUser(user);
    res.json({ token: createToken(user), user: { id: safe.id, email: safe.email }, profile: safe });
  } catch (error) { next(error); }
}

export async function me(req, res) {
  const safe = publicUser(req.user);
  res.json({ user: { id: safe.id, email: safe.email }, profile: safe });
}
