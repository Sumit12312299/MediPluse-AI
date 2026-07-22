import React, { useState, useEffect } from 'react';
import { HeartPulse, Bell, User, ShieldPlus, Stethoscope, UserRoundCheck, LogOut, Sun, Moon, Search, Command, Activity, Sparkles } from 'lucide-react';

export default function Navbar({ currentUser, activeRole, onSwitchRole, onOpenAuth, onLogout, notificationCount, onOpenNotifications }) {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/90 dark:border-slate-800 backdrop-blur-xl transition-all shadow-2xs">
      <div className="w-full px-4 sm:px-8 lg:px-12 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Live Engine Chip */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-900 via-sky-950 to-slate-900 dark:from-sky-600 dark:to-teal-600 text-white flex items-center justify-center shadow-md border border-slate-800 dark:border-sky-500">
            <HeartPulse className="w-6 h-6 text-sky-400 dark:text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white">
                MediPulse <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-teal-600">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold hidden sm:block">Enterprise Clinical Operating System</p>
          </div>
        </div>

        {/* Global Quick Search Bar (Integrated in Navbar) */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search OPD token, doctor, test..."
              className="w-full pl-10 pr-10 py-2 rounded-2xl glass-input text-xs font-semibold"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-bold text-slate-400">
              ⌘K
            </span>
          </div>
        </div>

        {/* Floating Segmented Role Portal Switcher */}
        <div className="hidden md:flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 space-x-1 shadow-2xs">
          <button
            onClick={() => onSwitchRole('PATIENT')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all btn-minimal ${
              activeRole === 'PATIENT'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserRoundCheck className="w-4 h-4 text-sky-600" />
            <span>Patient Portal</span>
          </button>

          <button
            onClick={() => onSwitchRole('DOCTOR')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all btn-minimal ${
              activeRole === 'DOCTOR'
                ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Doctor Portal</span>
          </button>

          <button
            onClick={() => onSwitchRole('ADMIN')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all btn-minimal ${
              activeRole === 'ADMIN'
                ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldPlus className="w-4 h-4 text-indigo-600" />
            <span>Admin Console</span>
          </button>
        </div>

        {/* Right Menu Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-amber-400 transition-all btn-minimal shadow-2xs"
            title="Toggle Dark/Light Mode"
          >
            {isDark ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-all btn-minimal shadow-2xs"
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center border-2 border-white dark:border-slate-900">
                {notificationCount}
              </span>
            )}
          </button>

          {/* User Auth Profile Chip */}
          {currentUser ? (
            <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-700 pl-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                  {currentUser.first_name || currentUser.username}
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                </p>
                <p className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">{activeRole}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-red-600 border border-slate-200 dark:border-slate-700 transition-all btn-minimal"
                title="Logout"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm transition-all btn-minimal flex items-center space-x-2 shadow-xs"
            >
              <UserRoundCheck className="w-4 h-4 text-sky-400 dark:text-white" />
              <span>JWT Login</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
