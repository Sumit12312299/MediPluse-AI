import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Key, Sparkles, Loader2, HelpCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('patient@medipulse.ai');
  const [password, setPassword] = useState('patient123');
  const [role, setRole] = useState('PATIENT');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Google OAuth simulator states
  const [showGoogleAuth, setShowGoogleAuth] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      if (isRegister) {
        await onAuthSuccess('register', {
          username,
          password,
          email: username,
          role,
          first_name: firstName,
          last_name: lastName
        });
      } else {
        await onAuthSuccess('login', { username, password });
      }
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Authentication failed');
    }
  };

  const handleGoogleSelectAccount = async (email, defaultRole) => {
    setIsGoogleLoading(true);
    setError('');
    setTimeout(async () => {
      try {
        // Log in patient or doctor depending on selection
        const credentials = defaultRole === 'PATIENT' 
          ? { username: 'patient@medipulse.ai', password: 'patient123' }
          : { username: 'doctor@medipulse.ai', password: 'doctor123' };

        await onAuthSuccess('login', credentials);
        setIsGoogleLoading(false);
        setShowGoogleAuth(false);
        onClose();
      } catch (err) {
        setIsGoogleLoading(false);
        setError('Google Single Sign-On failed.');
      }
    }, 1500);
  };

  const handleQuickFill = (demoRole) => {
    if (demoRole === 'PATIENT') {
      setUsername('patient@medipulse.ai');
      setPassword('patient123');
      setRole('PATIENT');
    } else if (demoRole === 'DOCTOR') {
      setUsername('doctor@medipulse.ai');
      setPassword('doctor123');
      setRole('DOCTOR');
    } else if (demoRole === 'ADMIN') {
      setUsername('admin@medipulse.ai');
      setPassword('admin123');
      setRole('ADMIN');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl z-10 overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-sky-900 to-teal-900 text-white text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-white text-sky-900 mx-auto shadow-md flex items-center justify-center">
            <Lock className="w-6 h-6 text-sky-700" />
          </div>
          <h3 className="font-extrabold text-white text-lg">
            {isRegister ? 'Create MediPulse Account' : 'JWT Secure Authentication'}
          </h3>
          <p className="text-xs text-sky-100 font-medium">Django REST Framework Auth Tokens</p>

          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-sky-100 hover:text-white bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Fill demo accounts */}
        <div className="px-6 pt-4 bg-slate-50">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Quick Fill Demo Accounts:</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('PATIENT')}
              className="py-1.5 px-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold hover:bg-sky-100 transition-all"
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('DOCTOR')}
              className="py-1.5 px-2 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 text-[11px] font-bold hover:bg-teal-100 transition-all"
            >
              Doctor
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('ADMIN')}
              className="py-1.5 px-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-bold hover:bg-purple-100 transition-all"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          {isRegister && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Username / Email</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          {isRegister && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-white"
              >
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Key className="w-4 h-4" />
                <span>{isRegister ? 'Register Account' : 'Authenticate JWT Token'}</span>
              </>
            )}
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="px-3 text-[10px] uppercase font-bold text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Google SSO Button */}
          <button
            type="button"
            onClick={() => setShowGoogleAuth(true)}
            className="w-full py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all flex items-center justify-center space-x-2.5 shadow-2xs cursor-pointer"
          >
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-slate-500 hover:text-sky-700 transition-all font-semibold cursor-pointer"
            >
              {isRegister ? 'Already have an account? Sign In' : 'New to MediPulse? Create Account'}
            </button>
          </div>
        </form>

        {/* Simulated Google OAuth Dialog Popup */}
        {showGoogleAuth && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-40 animate-fade-in">
            <div className="w-full max-w-xs bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 text-center">
              
              <div className="space-y-1">
                <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <h4 className="font-extrabold text-slate-800 text-sm">Sign in with Google</h4>
                <p className="text-[10px] text-slate-500 font-bold">to continue to <strong className="text-sky-600">MediPulse AI</strong></p>
              </div>

              {isGoogleLoading ? (
                <div className="py-6 text-center space-y-2">
                  <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
                  <p className="text-[10px] text-slate-600 font-extrabold">Verifying credentials...</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleGoogleSelectAccount('rahul.verma@gmail.com', 'PATIENT')}
                    className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-sky-500 hover:bg-sky-50/50 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                      RV
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-slate-800 group-hover:text-sky-700">Rahul Verma</p>
                      <p className="text-[9px] text-slate-500 font-medium">rahul.verma@gmail.com</p>
                    </div>
                    <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded group-hover:bg-sky-100 group-hover:text-sky-700">
                      Patient
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGoogleSelectAccount('dr.sarah@medipulse.ai', 'DOCTOR')}
                    className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-teal-500 hover:bg-teal-50/50 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                      SJ
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-slate-800 group-hover:text-teal-700">Dr. Sarah Jenkins</p>
                      <p className="text-[9px] text-slate-500 font-medium">sarah.jenkins@medipulse.ai</p>
                    </div>
                    <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded group-hover:bg-teal-100 group-hover:text-teal-700">
                      Doctor
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowGoogleAuth(false)}
                    className="w-full py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 transition-all mt-3 border border-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
