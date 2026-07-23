import React, { useState, useEffect } from 'react';
import { X, Mail, MessageSquare, CheckCircle, Bell, RefreshCw, Volume2, VolumeX, ShieldAlert, CreditCard, Pill, Calendar, CheckCheck, Sparkles, Filter } from 'lucide-react';

// Web Audio API Synthesizer Chime for Live Notifications
function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // First tone (E5 - 659Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime);
    gain1.gain.setValueAtTime(0.15, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.3);

    // Second tone (B5 - 987Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, ctx.currentTime + 0.1);
    gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 0.45);
  } catch (err) {
    console.log('Audio playback error:', err);
  }
}

export default function NotificationCenter({ isOpen, onClose, notifications = [], onRefresh }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isMuted, setIsMuted] = useState(false);
  const [readIds, setReadIds] = useState(new Set());

  // Default Mock Notifications if list is empty
  const defaultItems = [
    { id: 101, title: 'Payment Settled (₹800.00)', message: 'OPD Consultation fee paid via UPI (Google Pay). Razorpay TXN: TXN_IND_842109.', type: 'PAYMENT', channel: 'SMS', sent_at: new Date(Date.now() - 500000) },
    { id: 102, title: 'AI Prescription Synthesized', message: 'Gemini AI generated layman voice prescription summary for Dr. Rajesh Sharma OPD.', type: 'PRESCRIPTION', channel: 'EMAIL', sent_at: new Date(Date.now() - 1200000) },
    { id: 103, title: 'OPD Appointment Confirmed', message: 'Your Cardiology slot with Dr. Rajesh Sharma is confirmed for today at 10:30 AM.', type: 'APPOINTMENT', channel: 'SMS', sent_at: new Date(Date.now() - 3600000) },
    { id: 104, title: 'Vitals Alert: Normal Rhythm', message: 'Realtime Bluetooth Telemetry reported normal sinus rhythm at 72 BPM.', type: 'EMERGENCY', channel: 'EMAIL', sent_at: new Date(Date.now() - 7200000) }
  ];

  const itemsList = notifications.length > 0 ? notifications : defaultItems;

  // Play chime on open if not muted
  useEffect(() => {
    if (isOpen && !isMuted) {
      playNotificationChime();
    }
  }, [isOpen, isMuted]);

  if (!isOpen) return null;

  const unreadCount = itemsList.filter(item => !readIds.has(item.id)).length;

  const handleMarkAllRead = () => {
    const allIds = new Set(itemsList.map(item => item.id));
    setReadIds(allIds);
    if (!isMuted) playNotificationChime();
  };

  const handleMarkItemRead = (id) => {
    setReadIds(prev => new Set(prev).add(id));
  };

  // Filter items
  const filteredItems = itemsList.filter(item => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'EMERGENCY') return item.type === 'EMERGENCY' || item.title?.toLowerCase().includes('alert') || item.title?.toLowerCase().includes('sos');
    if (activeFilter === 'PAYMENTS') return item.type === 'PAYMENT' || item.title?.toLowerCase().includes('payment') || item.title?.toLowerCase().includes('fee');
    if (activeFilter === 'PRESCRIPTIONS') return item.type === 'PRESCRIPTION' || item.title?.toLowerCase().includes('prescription') || item.title?.toLowerCase().includes('ai');
    if (activeFilter === 'APPOINTMENTS') return item.type === 'APPOINTMENT' || item.title?.toLowerCase().includes('appointment') || item.title?.toLowerCase().includes('slot');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity animate-slide-up"
        onClick={onClose}
      ></div>

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white border-l border-slate-200 shadow-2xl h-full flex flex-col z-10 animate-modal-pop">
        
        {/* Header */}
        <div className="p-4.5 border-b border-slate-200 bg-slate-900 text-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center relative shadow-xs">
                <Bell className="w-5 h-5 text-sky-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center border-2 border-slate-900 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight flex items-center gap-2">
                  Notification Telemetry
                </h3>
                <p className="text-[11px] text-sky-300 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-300" /> Realtime Twilio SMS & Gateway Logs
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (isMuted) playNotificationChime();
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all btn-minimal ${
                  isMuted ? 'bg-rose-500/20 text-rose-300 border border-rose-400/30' : 'bg-white/10 text-sky-300 hover:bg-white/20'
                }`}
                title={isMuted ? 'Unmute Audio Chime' : 'Mute Audio Chime'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={onRefresh}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all btn-minimal"
                title="Refresh Logs"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all btn-minimal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mark All Read Action */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-slate-400 font-medium text-[11px]">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : '✓ All notifications read'}
            </span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-xs font-extrabold text-teal-300 hover:text-teal-200 flex items-center gap-1 btn-minimal"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark All as Read
              </button>
            )}
          </div>
        </div>

        {/* Filter Categories Bar */}
        <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center space-x-1.5 overflow-x-auto">
          <span className="text-[10px] font-black uppercase text-slate-500 px-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-sky-600" /> Filter:
          </span>
          {[
            { key: 'ALL', label: 'All' },
            { key: 'EMERGENCY', label: 'SOS Alert' },
            { key: 'PAYMENTS', label: 'Payments' },
            { key: 'PRESCRIPTIONS', label: 'AI RX' },
            { key: 'APPOINTMENTS', label: 'OPD Slots' }
          ].map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all btn-minimal ${
                activeFilter === f.key
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notification Cards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isRead = readIds.has(item.id);
              return (
                <div
                  key={item.id || idx}
                  onClick={() => handleMarkItemRead(item.id)}
                  className={`p-4 rounded-2xl border transition-all space-y-2 cursor-pointer ${
                    isRead 
                      ? 'bg-white border-slate-200/80 opacity-75' 
                      : 'bg-white border-sky-300 shadow-sm ring-1 ring-sky-400/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      {item.type === 'EMERGENCY' ? (
                        <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                          <ShieldAlert className="w-4 h-4 animate-pulse" />
                        </div>
                      ) : item.type === 'PAYMENT' ? (
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                          <CreditCard className="w-4 h-4" />
                        </div>
                      ) : item.type === 'PRESCRIPTION' ? (
                        <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
                          <Pill className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
                          <Calendar className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-black text-slate-900 block">{item.title}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{item.channel || 'SMS Gateway'}</span>
                      </div>
                    </div>

                    {!isRead && (
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium pl-1">
                    {item.message}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-semibold">
                    <span className="text-emerald-700 font-bold">✓ Delivered</span>
                    <span>{new Date(item.sent_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 space-y-3">
              <Bell className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-600 text-xs font-bold">No notifications found in {activeFilter} category.</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-3.5 border-t border-slate-200 bg-white text-[11px] text-slate-600 flex items-center justify-between font-bold">
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Twilio SMS & SendGrid SMTP Active
          </span>
          <span className="text-sky-700 font-extrabold">256-Bit Encrypted</span>
        </div>

      </div>
    </div>
  );
}
