import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Profile, UserRole } from '@/types';
import { getCurrentUser, login, logout, register, type AppUser } from '@/services/authService';
import { getToken } from '@/services/api';

interface AuthContextValue {
  session: { user: AppUser } | null;
  user: AppUser | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: UserRole, department?: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null); const [profile, setProfile] = useState<Profile | null>(null); const [loading, setLoading] = useState(true);
  const refreshProfile = useCallback(async () => { if (!getToken()) { setUser(null); setProfile(null); return; } try { const data = await getCurrentUser(); setUser(data.user); setProfile(data.profile); } catch { logout(); setUser(null); setProfile(null); } }, []);
  useEffect(() => { refreshProfile().finally(() => setLoading(false)); }, [refreshProfile]);
  const signIn = useCallback(async (email:string,password:string) => { try { const data = await login(email,password); setUser(data.user); setProfile(data.profile); return {error:null}; } catch(e){ return {error:e instanceof Error?e.message:'Login failed'}; } }, []);
  const signUp = useCallback(async (email:string,password:string,fullName:string,role:UserRole,department?:string) => { try { const data=await register(email,password,fullName,role,department); setUser(data.user); setProfile(data.profile); return {error:null}; } catch(e){ return {error:e instanceof Error?e.message:'Registration failed'}; } }, []);
  const signOut = useCallback(async () => { logout(); setUser(null); setProfile(null); }, []);
  return <AuthContext.Provider value={{session:user?{user}:null,user,profile,loading,signUp,signIn,signOut,refreshProfile}}>{children}</AuthContext.Provider>;
}
export function useAuth(){ const ctx=useContext(AuthContext); if(!ctx) throw new Error('useAuth must be used within AuthProvider'); return ctx; }
