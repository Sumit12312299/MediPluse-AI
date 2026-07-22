import React from 'react';
import { HeartPulse, Stethoscope, Video, MessageSquare, CreditCard, Sparkles, ShieldCheck, Activity, Users, ArrowRight, Star, Plus } from 'lucide-react';

export default function LandingPage({ currentUser, onOpenAuth, onNavigateToRole, doctors }) {
  const featuredDoctors = doctors ? doctors.slice(0, 4) : [
    { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiology & Heart Health', fee: 800, rating: 4.9 },
    { id: 2, name: 'Dr. Priya Patel', specialty: 'Pediatrics & Child Care', fee: 600, rating: 4.8 },
    { id: 3, name: 'Dr. Rajesh Sharma', specialty: 'Neurology & Brain Science', fee: 1200, rating: 5.0 },
    { id: 4, name: 'Dr. Amit Verma', specialty: 'Orthopedics & Joint Care', fee: 700, rating: 4.7 }
  ];

  return (
    <div className="space-y-24 pb-20 animate-fade-in">
      
      {/* 🚀 Premium Hero Section with Ambient Lights & Grid */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-12 rounded-[36px] bg-slate-950 text-white shadow-2xl border border-slate-900">
        
        {/* Futuristic Grid & Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>

        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-8 z-10">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-bold text-sky-400">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Smart Clinical Teleconsultation Suite</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
            Healthcare Reimagined <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-teal-300">
              With AI Intelligence
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base font-semibold leading-relaxed">
            Experience high-fidelity WebRTC virtual consultation rooms, automated digital prescription summaries, and secure UPI payment settlements in a unified hospital operating system.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {currentUser ? (
              <button
                onClick={() => onNavigateToRole(currentUser.role)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-extrabold text-sm shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:scale-103 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Go to dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-extrabold text-sm shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:scale-103 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Access Patient Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenAuth()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-200 font-extrabold text-sm hover:scale-103 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-teal-400" />
                  <span>Join as Doctor / Provider</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 📊 Live Platform Stats */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'AI Diagnostic Precision', value: '99.4%', icon: Sparkles, color: 'text-sky-400' },
          { label: 'Active OPD Specialists', value: '45+', icon: Stethoscope, color: 'text-teal-400' },
          { label: 'Telehealth Consults Done', value: '15,000+', icon: Video, color: 'text-indigo-400' },
          { label: 'Success Rate (Payments)', value: '99.9%', icon: CreditCard, color: 'text-emerald-400' }
        ].map((stat, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xs flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex items-center justify-center">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 🛠️ Core Technology Services */}
      <section className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Smart Clinical Core Features</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold max-w-xl mx-auto">
            Our technology stack is built from the ground up for seamless, high-speed provider-to-patient communication.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'WebRTC HD Video consultations',
              desc: 'Encrypted, high-fidelity real-time teleconsultation rooms equipped with active timers, local picture-in-picture stream rendering, and audio indicators.',
              icon: Video,
              accent: 'from-sky-500 to-sky-600',
              bg: 'bg-sky-500/5 border-sky-500/25'
            },
            {
              title: 'AI Layman Scribe Summaries',
              desc: 'Complex clinical terminology parsed instantly into layman summaries via Gemini AI, alongside responsive text-to-speech audio synthesis.',
              icon: Sparkles,
              accent: 'from-purple-500 to-indigo-600',
              bg: 'bg-purple-500/5 border-purple-500/25'
            },
            {
              title: 'confetti Indian UPI Settlement',
              desc: 'Accept payments through QR, RuPay, and net banking with instant success callbacks, receipt generating logs, and interactive confetti particles.',
              icon: CreditCard,
              accent: 'from-emerald-500 to-teal-600',
              bg: 'bg-emerald-500/5 border-emerald-500/25'
            }
          ].map((service, idx) => (
            <div key={idx} className="p-8 rounded-[28px] bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6 hover:shadow-lg transition-all group">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${service.accent} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-all`}>
                <service.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{service.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 👨‍⚕️ Available OPD Specialists */}
      <section className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">OPD Specialists Online</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Book virtual consultations instantly with our clinical experts.</p>
          </div>
          <button
            onClick={() => currentUser ? onNavigateToRole('PATIENT') : onOpenAuth()}
            className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-xs transition-all flex items-center space-x-2 shadow-2xs cursor-pointer"
          >
            <span>Book Appointment</span>
            <Plus className="w-4 h-4 text-sky-400" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doc, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between min-h-[220px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-sky-500" />
                  </div>
                  <div className="flex items-center space-x-1 bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>{doc.rating || '5.0'}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{doc.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">{doc.specialty}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-850">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider">Fee</p>
                  <p className="text-sm font-extrabold text-emerald-500">₹{doc.fee || '800'}</p>
                </div>
                <button
                  onClick={() => currentUser ? onNavigateToRole('PATIENT') : onOpenAuth()}
                  className="px-3.5 py-2 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 text-xs font-black hover:bg-sky-100 transition-all cursor-pointer"
                >
                  Consult
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔒 Enterprise Trust & Audit Logs */}
      <section className="max-w-5xl mx-auto px-6 p-10 sm:p-12 rounded-[36px] bg-gradient-to-tr from-slate-900 via-sky-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-850 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_70%)"></div>
        <div className="space-y-4 max-w-lg relative z-10">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% HIPAA & GDPR Compliant</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black">Trusted by medical providers worldwide.</h3>
          <p className="text-xs text-slate-400 font-bold leading-relaxed">
            MediPulse provides secure medical log auditing, private RAG storage, and encrypted real-time communications to ensure maximum patient confidentiality.
          </p>
        </div>
        <button
          onClick={() => onOpenAuth()}
          className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-sm hover:bg-slate-100 hover:scale-103 transition-all shrink-0 cursor-pointer shadow-lg"
        >
          Create Provider Account
        </button>
      </section>

    </div>
  );
}
