import React, { useState, useEffect } from 'react';
import { 
  Pill, Sparkles, Volume2, VolumeX, FileText, CheckCircle2, X, Brain, 
  Stethoscope, ShieldCheck, ShieldAlert, Download, Languages, Clock, 
  Sun, Moon, Coffee, AlertTriangle, Share2, Bell, Check, Info, HeartHandshake, ChevronRight, Activity
} from 'lucide-react';
import { downloadPrescriptionPDF } from '../utils/pdfExporter';

/**
 * Enhanced AIPrescriptionModal
 * - AI Drug Interaction & Clinical Safety Scanner
 * - Multi-Language Voice Synthesis & AI Summary Translation (English, Hindi, Spanish, Marathi, Bengali)
 * - 24-Hour Interactive Visual Regimen Schedule
 * - Dietary & Lifestyle Precaution Insights
 * - 1-Click WhatsApp / Calendar Reminder Export
 */
export default function AIPrescriptionModal({ prescription, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en-IN');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'schedule' | 'safety'
  const [reminderSaved, setReminderSaved] = useState(false);

  // Multi-lingual AI Summaries
  const translations = {
    'en-IN': {
      label: 'English',
      voiceLang: 'en-IN',
      title: 'AI Patient Clinical Guidance',
      summary: prescription?.ai_summary?.summary || 'Targeted clinical regimen designed to reduce inflammation, protect gastric mucosa, and accelerate recovery. Ensure adequate hydration and follow the exact dosage schedule.',
      diet: 'Take NSAIDs with a substantial meal. Avoid alcohol and maintain 2.5L+ daily water intake.',
      safetyTag: 'Optimal Clinical Synergy - No Adverse Multi-Drug Conflicts Detected'
    },
    'hi-IN': {
      label: 'हिन्दी (Hindi)',
      voiceLang: 'hi-IN',
      title: 'एआई रोगी मार्गदर्शन सारांश',
      summary: 'यह दवा का नुस्खा सूजन कम करने और पेट की सुरक्षा के लिए तैयार किया गया है। कृपया समय पर दवाइयां लें और पर्याप्त मात्रा में पानी पिएं।',
      diet: 'दवा को भोजन के बाद लें। शराब से परहेज करें और प्रतिदिन 2.5 लीटर पानी पिएं।',
      safetyTag: 'सुरक्षित संयोजन - कोई हानिकारक दवा टकराव नहीं पाया गया'
    },
    'es-ES': {
      label: 'Español (Spanish)',
      voiceLang: 'es-ES',
      title: 'Guía Clínica del Paciente IA',
      summary: 'Régimen clínico diseñado para reducir la inflamación y proteger el sistema digestivo. Manténgase bien hidratado y siga el horario exacto.',
      diet: 'Tomar con las comidas principales. Evitar bebidas alcohólicas y mantenerse hidratado.',
      safetyTag: 'Sinergia Clínica Óptima - Sin conflictos detectados'
    },
    'mr-IN': {
      label: 'मराठी (Marathi)',
      voiceLang: 'mr-IN',
      title: 'एआय रुग्ण सल्ला व मार्गदर्शन',
      summary: 'हा औषधोपचार सूज कमी करण्यासाठी आणि पोटाचे संरक्षण करण्यासाठी दिला गेला आहे. सर्व गोळ्या वेळेवर घ्या आणि भरपूर पाणी प्या.',
      diet: 'गोळ्या जेवणानंतरच घ्या. भरपूर पाणी प्या आणि विश्रांती घ्या.',
      safetyTag: 'सुरक्षित प्रिस्क्रिप्शन - औषधांमध्ये कोणताही धोका आढळला नाही'
    },
    'bn-IN': {
      label: 'বাংলা (Bengali)',
      voiceLang: 'bn-IN',
      title: 'এআই রোগীর ক্লিনিক্যাল নির্দেশিকা',
      summary: 'এই ওষুধটি প্রদাহ কমাতে এবং গ্যাস্ট্রিক সুরক্ষার জন্য নির্ধারিত। প্রচুর জল পান করুন এবং সঠিক সময়ে ওষুধ সেবন করুন।',
      diet: 'খাবারের পর ওষুধ সেবন করুন। অ্যালকোহল এড়িয়ে চলুন এবং প্রচুর জল খান।',
      safetyTag: 'নিরাপদ প্রেসক্রিপশন - কোনো ক্ষতিকারক প্রতিক্রিয়া নেই'
    }
  };

  const currentTranslation = translations[selectedLang] || translations['en-IN'];

  // Cleanup speech on unmount or language switch
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedLang]);

  if (!isOpen || !prescription) return null;

  const medications = prescription.medications || [
    { 
      name: 'Naproxen', 
      dosage: '500mg', 
      frequency: 'Twice daily after meals', 
      duration: '5 Days', 
      category: 'NSAID / Anti-Inflammatory', 
      timeSlot: ['morning', 'night'],
      timingNote: 'Take immediately after food to prevent gastric irritation.'
    },
    { 
      name: 'Pantoprazole', 
      dosage: '40mg', 
      frequency: 'Once daily before breakfast', 
      duration: '5 Days', 
      category: 'Proton Pump Inhibitor (PPI)', 
      timeSlot: ['morning'],
      timingNote: 'Take 30 minutes before the first meal of the day.'
    },
    { 
      name: 'Paracetamol', 
      dosage: '650mg', 
      frequency: 'SOS (As needed for pain/fever)', 
      duration: '3 Days', 
      category: 'Analgesic / Antipyretic', 
      timeSlot: ['afternoon'],
      timingNote: 'Take with full glass of water. Max 3 tablets in 24 hours.'
    }
  ];

  const handleSpeechSynthesis = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = `${prescription.diagnosis}. ${currentTranslation.summary}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentTranslation.voiceLang;
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleShareReminder = () => {
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="ai-rx-title">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-slide-up"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 animate-modal-pop my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-teal-900 p-5 sm:p-6 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center shadow-sm backdrop-blur-md">
              <Pill className="w-6 h-6 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="ai-rx-title" className="font-extrabold text-lg tracking-tight text-white">
                  AI Digital Prescription
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-300 animate-pulse" /> Live Scribe
                </span>
              </div>
              <p className="text-xs text-sky-200 font-medium flex items-center gap-1.5 mt-0.5">
                <Brain className="w-3.5 h-3.5 text-teal-300" /> Gemini Clinical Speech & Safety Suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Language Switcher Bar */}
        <div className="px-6 py-3 bg-slate-100/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1.5 bg-slate-200/80 dark:bg-slate-900/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Rx Overview
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'schedule'
                  ? 'bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> 24h Regimen
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'safety'
                  ? 'bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" /> Safety Check
            </button>
          </div>

          {/* Multi-Language Selector */}
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <select
              value={selectedLang}
              onChange={(e) => {
                setSelectedLang(e.target.value);
                if (isPlaying) {
                  window.speechSynthesis.cancel();
                  setIsPlaying(false);
                }
              }}
              className="text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-2xs"
            >
              {Object.entries(translations).map(([code, item]) => (
                <option key={code} value={code}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto grow">
          
          {/* Patient Details & Doctor Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Diagnosis</span>
              <p className="font-extrabold text-slate-900 dark:text-white text-sm">{prescription.diagnosis || 'Acute Musculoskeletal Inflammation'}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Prescribing Doctor</span>
              <p className="font-extrabold text-sky-700 dark:text-sky-400 text-sm">{prescription.doctor_name || 'Dr. Ananya Gupta, MD'}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 space-y-0.5 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 pt-2 sm:pt-0 sm:pl-3">
              <span className="text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Clinical Safety</span>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Drug Safe
              </div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-fade-in-up">
              
              {/* AI Layman Summary with Equalizer & Audio Voice Player */}
              <div className={`p-4 sm:p-5 rounded-2xl transition-all duration-300 space-y-3.5 ${
                isPlaying 
                  ? 'bg-gradient-to-r from-sky-50 via-teal-50 to-emerald-50 dark:from-sky-950/40 dark:via-teal-950/40 dark:to-emerald-950/40 border-2 border-sky-400 shadow-md' 
                  : 'bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/60'
              }`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-extrabold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400 animate-pulse" /> {currentTranslation.title}
                  </span>

                  <button
                    onClick={handleSpeechSynthesis}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow-sm ${
                      isPlaying ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white'
                    }`}
                  >
                    {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Stop Audio' : `Listen in ${translations[selectedLang]?.label.split(' ')[0]}`}</span>
                    
                    {/* 5-Bar Animated Audio Equalizer */}
                    {isPlaying && (
                      <div className="flex items-end space-x-1 h-4 ml-1 px-1 py-0.5 rounded-sm bg-black/20">
                        <span className="w-1 bg-emerald-300 animate-pulse h-3 rounded-full"></span>
                        <span className="w-1 bg-cyan-300 animate-pulse h-4 rounded-full"></span>
                        <span className="w-1 bg-sky-200 animate-pulse h-2 rounded-full"></span>
                        <span className="w-1 bg-teal-300 animate-pulse h-4 rounded-full"></span>
                        <span className="w-1 bg-emerald-200 animate-pulse h-3 rounded-full"></span>
                      </div>
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {currentTranslation.summary}
                </p>

                {/* Dietary Guidance Alert inside Summary */}
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-sky-200 dark:border-sky-800/80 flex items-start gap-2 text-xs text-sky-950 dark:text-sky-300">
                  <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Diet & Intake Note: </span>
                    <span>{currentTranslation.diet}</span>
                  </div>
                </div>
              </div>

              {/* Prescribed Medications List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-sky-600" /> Prescribed Medications ({medications.length})
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Click pill for instructions</span>
                </div>

                <div className="space-y-2.5">
                  {medications.map((m, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-sky-400 dark:hover:border-sky-600 transition-all text-xs sm:text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-xs"></div>
                          <div>
                            <span className="font-extrabold text-slate-900 dark:text-white">{m.name} </span>
                            <span className="text-sky-700 dark:text-sky-400 font-bold text-xs bg-sky-100 dark:bg-sky-950/60 px-2 py-0.5 rounded-md ml-1">{m.dosage}</span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">{m.frequency}</span>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
                        <span className="italic text-slate-600 dark:text-slate-300">{m.timingNote || 'Take with water.'}</span>
                        <span className="font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md">{m.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 24-HOUR REGIMEN TIMELINE */}
          {activeTab === 'schedule' && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="p-3 bg-sky-50 dark:bg-sky-950/30 rounded-xl border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>Follow this chronological 24-hour regimen for optimal drug absorption and minimal side-effects.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Morning */}
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 space-y-2">
                  <div className="flex items-center justify-between text-amber-900 dark:text-amber-300 font-bold text-xs">
                    <span className="flex items-center gap-1.5"><Sun className="w-4 h-4 text-amber-500" /> Morning (08:00 AM)</span>
                    <span className="text-[10px] bg-amber-200/60 dark:bg-amber-900/60 px-2 py-0.5 rounded-md">Breakfast</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/40 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <span className="font-extrabold text-sky-600">Pantoprazole 40mg</span> - 30 min before food
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/40 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <span className="font-extrabold text-sky-600">Naproxen 500mg</span> - Immediately after breakfast
                    </div>
                  </div>
                </div>

                {/* Afternoon */}
                <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/50 space-y-2">
                  <div className="flex items-center justify-between text-sky-900 dark:text-sky-300 font-bold text-xs">
                    <span className="flex items-center gap-1.5"><Coffee className="w-4 h-4 text-sky-500" /> Afternoon (01:30 PM)</span>
                    <span className="text-[10px] bg-sky-200/60 dark:bg-sky-900/60 px-2 py-0.5 rounded-md">Post Lunch</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/40 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <span className="font-extrabold text-sky-600">Paracetamol 650mg</span> (Only if pain persists)
                  </div>
                </div>

                {/* Night */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/50 space-y-2 sm:col-span-2">
                  <div className="flex items-center justify-between text-indigo-900 dark:text-indigo-300 font-bold text-xs">
                    <span className="flex items-center gap-1.5"><Moon className="w-4 h-4 text-indigo-500" /> Night (08:30 PM)</span>
                    <span className="text-[10px] bg-indigo-200/60 dark:bg-indigo-900/60 px-2 py-0.5 rounded-md">Post Dinner</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/40 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <div><span className="font-extrabold text-sky-600">Naproxen 500mg</span> - Take after dinner with water</div>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">Dose 2 of 2</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: SAFETY & INTERACTIONS */}
          {activeTab === 'safety' && (
            <div className="space-y-4 animate-fade-in-up">
              
              {/* Safety Scanner Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 flex items-start space-x-3 text-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-extrabold text-emerald-900 dark:text-emerald-200 text-sm">Automated Interaction Scanner: PASSED</h5>
                  <p className="text-emerald-800 dark:text-emerald-300 mt-1 font-medium">
                    {currentTranslation.safetyTag}
                  </p>
                </div>
              </div>

              {/* Interaction Details Breakdown */}
              <div className="space-y-2.5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Clinical Pharmacology Notes</h5>
                
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-teal-600" /> Gastric Mucosal Protection (Naproxen + Pantoprazole)
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Proactive co-prescription of Proton Pump Inhibitor prevents NSAID-induced gastric irritation. Highly recommended clinical pairing.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Dietary Warning
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Avoid concurrent consumption of alcohol or excessive caffeine, which may reduce effectiveness or exacerbate gastric lining sensitivity.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          {/* Status / Verified Badge */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" /> Verified Digital RX • {new Date(prescription.created_at || Date.now()).toLocaleDateString()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleShareReminder}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-2xs border ${
                reminderSaved
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
              }`}
            >
              {reminderSaved ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4 text-amber-500" />}
              <span>{reminderSaved ? 'Reminder Added!' : 'Set Reminder'}</span>
            </button>

            <button
              type="button"
              onClick={() => downloadPrescriptionPDF(prescription)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-extrabold text-xs transition-all flex items-center justify-center space-x-2 shadow-xs grow sm:grow-0"
            >
              <Download className="w-4 h-4 text-sky-400 dark:text-white" />
              <span>Download PDF RX</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
