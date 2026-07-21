import React from 'react';
import { X, Mail, MessageSquare, CheckCircle, Bell, RefreshCw } from 'lucide-react';

export default function NotificationCenter({ isOpen, onClose, notifications, onRefresh }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-white border-l border-slate-200 shadow-2xl h-full flex flex-col z-10">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Notifications & Dispatch Logs</h3>
              <p className="text-[11px] text-slate-500 font-medium">Real-time Email & SMS Gateway Logs</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onRefresh}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-sky-700 hover:bg-slate-50 transition-all"
              title="Refresh Logs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {notifications && notifications.length > 0 ? (
            notifications.map((item, idx) => (
              <div
                key={item.id || idx}
                className="glass-card p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all space-y-2 bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {item.channel === 'EMAIL' ? (
                      <span className="p-1.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                        <Mail className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="p-1.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="w-2.5 h-2.5" /> {item.status || 'SENT'}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium pl-1">{item.message}</p>

                <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                  <span>To: {item.recipient_name || 'Patient'}</span>
                  <span>{new Date(item.sent_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-3">
              <Bell className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-slate-500 text-xs font-medium">No notification logs recorded yet.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200 bg-white text-[11px] text-slate-600 flex items-center justify-between font-medium">
          <span>Twilio SMS & SendGrid SMTP Simulation</span>
          <span className="text-sky-700 font-bold">Active</span>
        </div>

      </div>
    </div>
  );
}
