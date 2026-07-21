import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Key, Sparkles, Loader2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('patient@medipulse.ai');
  const [password, setPassword] = useState('patient123');
  const [role, setRole] = useState('PATIENT');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
            className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
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

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-slate-500 hover:text-sky-700 transition-all font-semibold"
            >
              {isRegister ? 'Already have an account? Sign In' : 'New to MediPulse? Create Account'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
