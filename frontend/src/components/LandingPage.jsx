import React, { useState } from 'react';
import { 
  HeartPulse, Stethoscope, Video, MessageSquare, CreditCard, Sparkles, 
  ShieldCheck, Activity, Users, ArrowRight, Star, Plus, CheckCircle, 
  HelpCircle, ChevronRight, Play, Globe, ShieldAlert, Award
} from 'lucide-react';
import medicalHeroImg from '../assets/medical_hero.png';

export default function LandingPage({ currentUser, onOpenAuth, onNavigateToRole, doctors }) {
  const [activeServiceTab, setActiveServiceTab] = useState('opd');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const featuredDoctors = doctors ? doctors.slice(0, 4) : [
    { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiology & Heart Health', fee: 800, rating: 4.9 },
    { id: 2, name: 'Dr. Priya Patel', specialty: 'Pediatrics & Child Care', fee: 600, rating: 4.8 },
    { id: 3, name: 'Dr. Rajesh Sharma', specialty: 'Neurology & Brain Science', fee: 1200, rating: 5.0 },
    { id: 4, name: 'Dr. Amit Verma', specialty: 'Orthopedics & Joint Care', fee: 700, rating: 4.7 }
  ];

  const serviceTabDetails = {
    opd: {
      title: 'High-Fidelity Virtual OPD Consults',
      desc: 'Connect directly with certified specialists over a low-latency WebRTC connection. Equipped with a live meeting timer, local camera feed picture-in-picture, and one-click screen snapshot storage.',
      bullets: ['Full duplex audio-video encryption', 'Automatic live call status checks', 'Dynamic audio-level indicators'],
      stats: '12ms Avg Latency'
    },
    scribe: {
      title: 'AI Layman Scribe Summarization',
      desc: 'Automatically capture doctor-patient discussions. Transcribe audio in real-time, generate structured digital prescriptions with drug dosages, and convert them to speech for patients with visual impairments.',
      bullets: ['Speech-to-text transcription engine', 'Voice synthesis patient reading mode', 'One-click PDF receipt and Rx logs'],
      stats: '98.8% Transcribe Accuracy'
    },
    rag: {
      title: 'Retrieval-Augmented Medical RAG',
      desc: 'Ask our clinical chatbot about medications, appointment schedules, or lab results. Backed by private vector database storage, search queries are verified against HIPAA-compliant guidelines in real-time.',
      bullets: ['Private patient vector database', 'Multi-match source verification', 'Holographic floating quick-access UI'],
      stats: '< 1.2s Query Response'
    },
    upi: {
      title: 'Confetti UPI Payments & QR Billing',
      desc: 'Process consultation fees using RuPay, Google Pay, PhonePe, or net banking. Includes instant payment callbacks, custom invoice generation, and celebratory confetti effects upon success.',
      bullets: ['Dual-channel UPI validation', 'Dynamic invoice print templates', 'Interactive success confetti boost'],
      stats: '99.99% Settlement Rate'
    }
  };

  const faqItems = [
    {
      q: 'Is my medical data secure and private?',
      a: 'Absolutely. MediPulse complies with HIPAA guidelines. All call recordings, RAG search vectors, and patient files are double-encrypted both in transit and at rest.'
    },
    {
      q: 'How do I start a virtual consult with a doctor?',
      a: 'Sign up as a Patient, select an online OPD specialist, pay the consultation fee via UPI, and click "Join Consult" to enter the live WebRTC room immediately.'
    },
    {
      q: 'Can doctors write and sign prescriptions digitally?',
      a: 'Yes. Our AI Scribe automatically compiles prescription summaries. Doctors can review, edit, and digitally sign the RX file before it is sent to the patient.'
    },
    {
      q: 'What payment modes are supported on MediPulse?',
      a: 'We support all major Indian UPI apps (GPay, PhonePe, Paytm, BHIM) along with secure net banking and credit card gateways.'
    }
  ];

  return (
    <div className="space-y-28 pb-20 animate-fade-in">
      
      {/* 🚀 Split Hero Banner Section */}
      <section className="relative min-h-[85vh] flex items-center justify-between overflow-hidden rounded-[36px] bg-slate-950 text-white shadow-2xl border border-slate-900 px-6 sm:px-12 lg:px-16 py-16">
        
        {/* Background Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] opacity-30"></div>
        <div className="absolute top-10 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:3s]"></div>

        <div className="grid lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto items-center relative z-10">
          
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 bg-sky-950/50 border border-sky-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-400">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>Next-Gen Service-Based Hospital Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Revolutionizing <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Healthcare Delivery
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base font-semibold leading-relaxed max-w-xl">
              MediPulse links certified medical providers and patients using a secure WebRTC video room, real-time AI transcription tools, and automated UPI payment settlements.
            </p>

            {/* Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 text-slate-300 font-semibold text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Zero-Install WebRTC Video</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Gemini Medical AI Scribe</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Confetti UPI & QR billing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>HIPAA Encrypted Patient Vault</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              {currentUser ? (
                <button
                  onClick={() => onNavigateToRole(currentUser.role)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-extrabold text-sm shadow-[0_0_30px_rgba(14,165,233,0.35)] hover:scale-103 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onOpenAuth()}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-extrabold text-sm shadow-[0_0_30px_rgba(14,165,233,0.35)] hover:scale-103 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Start as Patient</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenAuth()}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-200 font-extrabold text-sm hover:scale-103 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Stethoscope className="w-4 h-4 text-teal-400" />
                    <span>Join as Doctor</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Column: 3D-effect Mockup Banner */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Background Light Ring */}
            <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-sky-500 to-teal-500 opacity-25 blur-xl animate-pulse"></div>
            
            {/* Device Wrapper */}
            <div className="relative bg-slate-900/80 border border-slate-800 p-2.5 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden w-full max-w-md">
              <img 
                src={medicalHeroImg} 
                alt="MediPulse Workspace mockup" 
                className="w-full h-auto rounded-[20px] object-cover border border-slate-800"
              />
              
              {/* Floating Overlay Badge */}
              <div className="absolute bottom-6 right-6 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-3 rounded-2xl flex items-center space-x-2.5 shadow-lg max-w-[180px] animate-bounce [animation-duration:4s]">
                <div className="w-7.5 h-7.5 rounded-full bg-emerald-500/25 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live Consults</p>
                  <p className="text-xs font-black text-white">Active Room 0:00</p>
                </div>
              </div>
            </div>
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

      {/* 🛠️ Interactive Service tab widget */}
      <section className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Explore Our Medical Services</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold max-w-xl mx-auto">
            Click on the tabs below to explore the clinical technologies built inside the MediPulse platform.
          </p>
        </div>

        {/* Tab Buttons Row */}
        <div className="flex flex-wrap items-center justify-center bg-slate-100 dark:bg-slate-900/90 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 gap-2 max-w-3xl mx-auto">
          {[
            { id: 'opd', label: 'Virtual OPD', icon: Video, color: 'text-sky-500' },
            { id: 'scribe', label: 'AI Scribe', icon: Sparkles, color: 'text-purple-500' },
            { id: 'rag', label: 'RAG Assistant', icon: MessageSquare, color: 'text-teal-500' },
            { id: 'upi', label: 'UPI Payments', icon: CreditCard, color: 'text-emerald-500' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveServiceTab(tab.id)}
              className={`flex-1 min-w-[130px] flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeServiceTab === tab.id
                  ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-800'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab View Container */}
        <div className="grid md:grid-cols-2 gap-10 p-8 sm:p-10 rounded-[32px] bg-slate-50 dark:bg-slate-900/30 border border-slate-200/80 dark:border-slate-800/80 shadow-inner items-center">
          
          {/* Detail Description */}
          <div className="space-y-6 text-left">
            <span className="px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-black tracking-widest uppercase">
              {serviceTabDetails[activeServiceTab].stats}
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {serviceTabDetails[activeServiceTab].title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
              {serviceTabDetails[activeServiceTab].desc}
            </p>
            
            {/* Checklist */}
            <div className="space-y-2">
              {serviceTabDetails[activeServiceTab].bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Feature Visual Card */}
          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">active_engine.py</span>
            </div>
            
            <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400 text-left space-y-1">
              <p className="text-blue-500"># Initializing pipeline...</p>
              <p><span className="text-purple-500">import</span> WebRTC, GeminiAI, UPIPay</p>
              <p>engine = MediPulsePipeline(mode=<span className="text-emerald-500">"{activeServiceTab.toUpperCase()}"</span>)</p>
              <p>response = engine.process_request(user_token)</p>
              <p className="text-emerald-600 font-bold">&gt;&gt;&gt; Status: OK [ACTIVE_METRIC: {serviceTabDetails[activeServiceTab].stats}]</p>
            </div>
          </div>

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
            <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between min-h-[220px] hover:scale-102 transition-all">
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

      {/* 🏷️ Transparent Pricing Plans */}
      <section className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Fair & Transparent Pricing</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold max-w-xl mx-auto">
            Choose a plan that fits your clinical workflow or virtual telehealth consultation needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Basic Patient Plan',
              price: '₹0',
              period: 'forever free',
              desc: 'Best for patients scheduling occasional virtual checkups with OPD doctors.',
              bullets: ['Access to certified OPD doctors', 'Gemini AI Scribe prescriptions', '100% Secure UPI billing payments'],
              cta: 'Get Started Now',
              accent: false
            },
            {
              name: 'Provider Pro Workstation',
              price: '₹1,499',
              period: 'per month',
              desc: 'Tailored for independent practitioners or single-doctor clinics.',
              bullets: ['Unlimited WebRTC video calls', 'Automated audio prescription recording', 'Complete patient audit logs logs', 'Priority email support'],
              cta: 'Start Free Trial',
              accent: true
            },
            {
              name: 'Hospital Enterprise License',
              price: 'Custom',
              period: 'contact sales',
              desc: 'Optimized for multi-specialty healthcare networks and clinical organizations.',
              bullets: ['Unlimited providers and patients', 'Private hospital RAG database storage', 'Dedicated custom domain names', 'SLA guaranteed 99.9% uptime'],
              cta: 'Contact Sales',
              accent: false
            }
          ].map((plan, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-[32px] text-left flex flex-col justify-between min-h-[480px] transition-all relative ${
                plan.accent 
                  ? 'bg-slate-950 text-white border-2 border-sky-500 shadow-2xl scale-103' 
                  : 'bg-white dark:bg-slate-900/60 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {plan.accent && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-wider">
                  Most Popular
                </span>
              )}
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">{plan.name}</h4>
                  <div className="flex items-baseline mt-2">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">/{plan.period}</span>
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{plan.desc}</p>
                
                <div className="space-y-3 pt-2">
                  {plan.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center space-x-2.5 text-xs font-semibold">
                      <CheckCircle className={`w-4 h-4 shrink-0 ${plan.accent ? 'text-sky-400' : 'text-emerald-500'}`} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onOpenAuth()}
                className={`w-full py-3.5 rounded-2xl text-xs font-black tracking-wide transition-all mt-8 cursor-pointer ${
                  plan.accent 
                    ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg' 
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ❓ Expandable FAQ list */}
      <section className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold max-w-xl mx-auto">
            Got questions about telehealth consults, AI scribe transcripts, or payments? We have answers.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {faqItems.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-2xs overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-slate-800 dark:text-slate-150 hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-all font-extrabold text-sm cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-500 transition-all transform ${isOpen ? 'rotate-90 text-sky-500' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed border-t border-slate-100 dark:border-slate-850">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
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
          <h3 className="text-2xl sm:text-3xl font-black">Ready to scale your clinical workspace?</h3>
          <p className="text-xs text-slate-400 font-bold leading-relaxed">
            Create an account today to access zero-latency virtual consultation rooms, automatic digital prescriptions, and direct patient billing payments.
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
