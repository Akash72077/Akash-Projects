import { api } from './api'; import type { Profile } from '@/types'; export const fetchMyProfile = () => api<Profile>('/users/me');
