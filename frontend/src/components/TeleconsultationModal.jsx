import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Sparkles, X, Brain, Stethoscope, User, ShieldCheck } from 'lucide-react';

export default function TeleconsultationModal({ appointment, isOpen, onClose }) {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState([
    { sender: 'Dr. Sarah Jenkins', time: '10:31 AM', text: 'Hello Michael! How are you feeling after taking the prescribed beta-blockers?' },
    { sender: 'Michael', time: '10:32 AM', text: 'Good morning Dr. Jenkins. My blood pressure has stabilized at 120/78 today.' },
    { sender: 'AI Scribe', time: '10:32 AM', text: '[AI Real-Time Note]: Vitals confirmed within normal physiological range.' }
  ]);

  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity animate-slide-up"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 animate-slide-up">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shadow-xs">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                Tele-Health Video Suite
              </h3>
              <p className="text-xs text-emerald-300 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> WebRTC Encrypted • Live AI Clinical Scribe
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all btn-minimal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video & AI Transcript Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-[480px]">
          
          {/* Main Video Screen (2 Cols) */}
          <div className="lg:col-span-2 bg-slate-950 p-4 relative flex flex-col justify-between">
            
            {/* Remote Doctor Video Feed */}
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center">
              
              {!isVideoOff ? (
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-sky-600/20 border border-sky-400/40 text-sky-300 mx-auto flex items-center justify-center text-xl font-extrabold shadow-xl animate-pulse-cyan">
                    <Stethoscope className="w-10 h-10 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">{appointment.doctor_name || 'Dr. Sarah Jenkins'}</h4>
                    <span className="text-xs text-emerald-400 font-bold">● Video Stream Connected</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500 font-medium text-xs">
                  <VideoOff className="w-10 h-10 mx-auto mb-2 text-slate-600" />
                  Camera Muted
                </div>
              )}

              {/* Local Patient PIP Video */}
              <div className="absolute bottom-4 right-4 w-28 h-20 rounded-xl bg-slate-800 border border-slate-700 shadow-xl overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <User className="w-5 h-5 text-sky-400 mx-auto" />
                  <span className="text-[10px] text-slate-300 font-bold">You (Michael)</span>
                </div>
              </div>

            </div>

            {/* Video Action Controls Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3 px-4 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-3 rounded-xl transition-all btn-minimal ${
                  isMicMuted ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-3 rounded-xl transition-all btn-minimal ${
                  isVideoOff ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all btn-minimal shadow-md"
                title="End Consultation Call"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* AI Clinical Live Scribe Drawer (1 Col) */}
          <div className="bg-slate-50 border-l border-slate-200 p-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-emerald-600" /> AI Scribe Transcript
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>

              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {liveTranscript.map((t, i) => (
                  <div key={i} className={`p-3 rounded-xl text-xs space-y-1 ${
                    t.sender === 'AI Scribe' 
                      ? 'bg-sky-50 text-sky-950 border border-sky-200/80' 
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-2xs'
                  }`}>
                    <div className="flex items-center justify-between font-bold text-[10px] text-slate-500">
                      <span>{t.sender}</span>
                      <span>{t.time}</span>
                    </div>
                    <p className="font-medium leading-relaxed">{t.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-medium text-center pt-2">
              Gemini AI Clinical Voice Scribe Active
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
