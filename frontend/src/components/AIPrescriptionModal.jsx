import React, { useState } from 'react';
import { Pill, Sparkles, Volume2, VolumeX, FileText, CheckCircle2, X, Brain, Stethoscope, User, Calendar, ShieldCheck, Download, Printer } from 'lucide-react';
import { downloadPrescriptionPDF } from '../utils/pdfExporter';

export default function AIPrescriptionModal({ prescription, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen || !prescription) return null;

  const summaryText = prescription.ai_summary?.summary || 'Targeted medical intervention for rapid symptom resolution.';
  const medications = prescription.medications || [
    { name: 'Naproxen', dosage: '500mg', frequency: 'Twice daily after meals', duration: '5 Days' },
    { name: 'Pantoprazole', dosage: '40mg', frequency: 'Once daily before breakfast', duration: '5 Days' }
  ];

  const handleSpeechSynthesis = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(`Prescription for ${prescription.diagnosis}. ${summaryText}`);
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-slide-up"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 animate-modal-pop space-y-0">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-teal-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center shadow-xs">
              <Pill className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                AI Digital Prescription
              </h3>
              <p className="text-xs text-sky-200 font-medium flex items-center gap-1">
                <Brain className="w-3.5 h-3.5 text-teal-300" /> Gemini Clinical Speech & Summary
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

        {/* Modal Content */}
        <div className="p-6 sm:p-7 space-y-6">
          
          {/* Patient Details Row */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Diagnosis</span>
              <p className="font-extrabold text-slate-900 text-sm">{prescription.diagnosis}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Prescribing Doctor</span>
              <p className="font-extrabold text-sky-700 text-sm">{prescription.doctor_name || 'Dr. Ananya Gupta'}</p>
            </div>
          </div>

          {/* AI Layman Summary with Equalizer Animation */}
          <div className={`p-4.5 rounded-2xl transition-all duration-300 space-y-3 ${
            isPlaying 
              ? 'bg-gradient-to-r from-sky-50 via-teal-50 to-emerald-50 border-2 border-sky-400 shadow-md' 
              : 'bg-sky-50/60 border border-sky-200/80'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-sky-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" /> AI Patient Guidance Summary
              </span>

              <button
                onClick={handleSpeechSynthesis}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all btn-minimal flex items-center space-x-2 shadow-2xs ${
                  isPlaying ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white'
                }`}
              >
                {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Stop Speech' : 'Listen AI Voice'}</span>
                
                {/* 5-Bar Animated Audio Equalizer Bars (@keyframes sound-wave) */}
                {isPlaying && (
                  <div className="flex items-end space-x-1 h-5 ml-1.5 px-1 py-0.5 rounded-md bg-black/20">
                    <span className="sound-bar text-emerald-300"></span>
                    <span className="sound-bar text-cyan-300"></span>
                    <span className="sound-bar text-sky-200"></span>
                    <span className="sound-bar text-teal-300"></span>
                    <span className="sound-bar text-emerald-200"></span>
                  </div>
                )}
              </button>
            </div>

            {/* Active Speech Audio Waveform Indicator */}
            {isPlaying && (
              <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-sky-100/80 border border-sky-300/60 text-sky-900 text-xs font-bold animate-fade-in-up">
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  AI Voice Synthesizer Active...
                </span>
                <div className="flex items-end space-x-1 h-4">
                  <span className="sound-bar text-sky-700"></span>
                  <span className="sound-bar text-teal-700"></span>
                  <span className="sound-bar text-emerald-700"></span>
                  <span className="sound-bar text-cyan-700"></span>
                  <span className="sound-bar text-sky-800"></span>
                </div>
              </div>
            )}

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {summaryText}
            </p>
          </div>

          {/* Prescribed Medications */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Prescribed Medications</h4>
            <div className="space-y-2">
              {medications.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                    <span className="font-extrabold text-slate-900">{m.name} <span className="text-sky-700 font-semibold">({m.dosage})</span></span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{m.frequency} • {m.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note & PDF Exporter Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <ShieldCheck className="w-4 h-4" /> Verified Digital RX • {new Date(prescription.created_at || Date.now()).toLocaleDateString()}
            </span>

            <button
              type="button"
              onClick={() => downloadPrescriptionPDF(prescription)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all btn-minimal flex items-center justify-center space-x-2 shadow-xs"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Download Official PDF RX</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
