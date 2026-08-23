import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { navigateTo } from '@/lib/router';
import type { UserRole } from '@/types';
import { Building2, User, Shield, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/constants';

export default function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const { signIn, signUp, user, profile } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRegister = mode === 'register';

  // Redirect if already logged in
  useEffect(() => {
    if (user && profile) {
      navigateTo({ name: profile.role === 'authority' ? 'authority-dashboard' : 'overview' });
    }
  }, [user, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isRegister) {
      const { error } = await signUp(email, password, fullName, role, role === 'authority' ? department : undefined);
      if (error) {
        setError(error);
        setLoading(false);
      } else {
        // The REST auth service signs the user in immediately.
        // The local auth state will redirect
        setLoading(false);
        // Fallback redirect
        setTimeout(() => navigateTo({ name: role === 'authority' ? 'authority-dashboard' : 'overview' }), 500);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
        setLoading(false);
      }
      // On success, auth state change will fire and redirect
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50/30 to-accent-50/30 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative w-full max-w-md">
        <button
          onClick={() => navigateTo({ name: 'landing' })}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <div className="bg-white rounded-3xl shadow-2xl shadow-primary-600/10 border border-slate-200 p-8 animate-scale-in">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-slate-900 text-lg leading-none">CivicPulse AI</div>
              <div className="text-[10px] text-primary-600 font-semibold tracking-wide">AI</div>
            </div>
          </div>

          <h1 className="text-2xl font-display font-bold text-slate-900 mb-1">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-slate-500 text-sm mb-6">
            {isRegister ? 'Join CivicPulse AI to report and track civic issues.' : 'Sign in to manage civic complaints.'}
          </p>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-error-50 border border-error-200 text-error-700 text-sm mb-4 animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    <RoleButton
                      active={role === 'citizen'}
                      onClick={() => setRole('citizen')}
                      icon={<User className="w-5 h-5" />}
                      label="Citizen"
                      desc="Report issues"
                    />
                    <RoleButton
                      active={role === 'authority'}
                      onClick={() => setRole('authority')}
                      icon={<Shield className="w-5 h-5" />}
                      label="Authority"
                      desc="Manage issues"
                    />
                  </div>
                </div>

                {role === 'authority' && (
                  <div className="animate-fade-in-up">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm bg-white"
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isRegister ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                isRegister ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-slate-500">
            {isRegister ? (
              <>
                Already have an account?{' '}
                <button onClick={() => navigateTo({ name: 'auth', mode: 'login' })} className="text-primary-600 font-semibold hover:text-primary-700">
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button onClick={() => navigateTo({ name: 'auth', mode: 'register' })} className="text-primary-600 font-semibold hover:text-primary-700">
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleButton({ active, onClick, icon, label, desc }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
        active
          ? 'border-primary-500 bg-primary-50 text-primary-700'
          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
      }`}
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
      <span className="text-[10px]">{desc}</span>
    </button>
  );
}
