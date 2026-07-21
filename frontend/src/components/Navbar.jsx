import React, { useState, useEffect } from 'react';
import { HeartPulse, Bell, User, ShieldPlus, Stethoscope, UserRoundCheck, LogOut, Sun, Moon } from 'lucide-react';

export default function Navbar({ currentUser, activeRole, onSwitchRole, onOpenAuth, onLogout, notificationCount, onOpenNotifications }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md transition-all shadow-2xs">
      <div className="w-full px-4 sm:px-8 lg:px-12 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Standard Medical Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-sky-600 text-white flex items-center justify-center shadow-xs">
            <HeartPulse className="w-6 h-6 text-sky-400 dark:text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                MediPulse <span className="text-sky-600 font-bold">AI</span>
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase bg-sky-50 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 rounded-full border border-sky-200 dark:border-sky-700">
                Health Cloud
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Smart Clinical Platform</p>
          </div>
        </div>

        {/* Standard Role Switcher */}
        <div className="hidden md:flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-x-1">
          <button
            onClick={() => onSwitchRole('PATIENT')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all btn-minimal ${
              activeRole === 'PATIENT'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserRoundCheck className="w-4 h-4 text-sky-600" />
            <span>Patient Portal</span>
          </button>

          <button
            onClick={() => onSwitchRole('DOCTOR')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all btn-minimal ${
              activeRole === 'DOCTOR'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Doctor Portal</span>
          </button>

          <button
            onClick={() => onSwitchRole('ADMIN')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all btn-minimal ${
              activeRole === 'ADMIN'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldPlus className="w-4 h-4 text-indigo-600" />
            <span>Admin Console</span>
          </button>
        </div>

        {/* Right Menu */}
        <div className="flex items-center space-x-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-amber-400 transition-all btn-minimal shadow-2xs"
            title="Toggle Dark/Light Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-all btn-minimal shadow-2xs"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* User Auth */}
          {currentUser ? (
            <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-700 pl-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.first_name || currentUser.username}</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">{activeRole}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-red-600 border border-slate-200 dark:border-slate-700 transition-all btn-minimal"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-700 text-white font-bold text-xs sm:text-sm transition-all btn-minimal flex items-center space-x-2 shadow-xs"
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
