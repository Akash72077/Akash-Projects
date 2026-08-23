import { api, setToken } from './api';
import type { Profile, UserRole } from '@/types';

export interface AppUser { id: string; email: string; }
export interface AuthResponse { token: string; user: AppUser; profile: Profile; }

export async function login(email: string, password: string) {
  const result = await api<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  setToken(result.token); return result;
}
export async function register(email: string, password: string, fullName: string, role: UserRole, department?: string) {
  const result = await api<AuthResponse>('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, full_name: fullName, role, department }) });
  setToken(result.token); return result;
}
export async function getCurrentUser() { return api<{ user: AppUser; profile: Profile }>('/auth/me'); }
export function logout() { setToken(null); }
