import React, { useState } from 'react';
import { 
  HeartPulse, Stethoscope, Video, MessageSquare, CreditCard, Sparkles, 
  ShieldCheck, Activity, Users, ArrowRight, Star, Plus, CheckCircle, 
  ChevronRight, Play, Globe, Zap, Cpu, Award, BadgeCheck, Clock, Check
} from 'lucide-react';
import medicalHeroImg from '../assets/medical_hero.png';

export default function LandingPage({ currentUser, onOpenAuth, onNavigateToRole, doctors }) {
  const [activeServiceTab, setActiveServiceTab] = useState('opd');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const featuredDoctors = doctors ? doctors.slice(0, 4) : [
    { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiology & Heart Health', exp: '12+ yrs exp', fee: 800, rating: 4.9, reviews: 142 },
    { id: 2, name: 'Dr. Priya Patel', specialty: 'Pediatrics & Child Care', exp: '9+ yrs exp', fee: 600, rating: 4.8, reviews: 98 },
    { id: 3, name: 'Dr. Rajesh Sharma', specialty: 'Neurology & Brain Science', exp: '16+ yrs exp', fee: 1200, rating: 5.0, reviews: 210 },
    { id: 4, name: 'Dr. Amit Verma', specialty: 'Orthopedics & Joint Care', exp: '11+ yrs exp', fee: 700, rating: 4.7, reviews: 85 }
  ];

  const serviceTabDetails = {
    opd: {
      title: 'High-Fidelity Virtual OPD Consultations',
      desc: 'Connect directly with certified specialists over ultra-low-latency WebRTC encrypted video pipelines. Equipped with live session telemetry, synchronized vitals broadcast, and instant snapshot clinical archiving.',
      bullets: ['End-to-end full duplex WebRTC video encryption', 'Automatic live call bandwidth & latency optimizer', 'Dynamic real-time audio telemetry visualizers'],
      stats: '12ms Latency',
      tag: 'Real-Time WebRTC',
      color: 'from-sky-500 to-blue-600'
    },
    scribe: {
      title: 'AI Clinical Layman Scribe Summarization',
      desc: 'Automatically transcribe audio in real-time between physician and patient. Synthesize structured digital prescriptions with precise dosage schedules and audio voice readback for accessibility.',
      bullets: ['Speech-to-text medical transcription engine', 'Natural voice synthesis audio readback mode', 'One-click authenticated PDF & Rx generation'],
      stats: '99.4% Accuracy',
      tag: 'Gemini Scribe AI',
      color: 'from-purple-500 to-indigo-600'
    },
    rag: {
      title: 'Retrieval-Augmented Medical Knowledge Vault',
      desc: 'Query our specialized clinical chatbot for medical guidelines, appointments, drug interactions, and diagnostics backed by vector-embedded private clinical repositories.',
      bullets: ['Private HIPAA-compliant patient vector vault', 'Multi-match clinical source verification', 'Instant conversational intelligence assistant'],
      stats: '< 1.1s Response',
      tag: 'Vector AI Engine',
      color: 'from-teal-500 to-emerald-600'
    },
    upi: {
      title: 'Instant Confetti UPI & QR Tele-Billing',
      desc: 'Effortlessly settle consultation charges using Google Pay, PhonePe, Paytm, BHIM UPI, or cards with zero checkout friction and automated invoice receipt generation.',
      bullets: ['Instant UPI QR code generation & webhook triggers', 'Dynamic downloadable billing invoices', 'Celebratory interactive success animations'],
      stats: '99.99% Uptime',
      tag: 'Instant Settlement',
      color: 'from-emerald-500 to-teal-600'
    }
  };

  const faqItems = [
    {
      q: 'Is my medical telemetry data secure and private?',
      a: 'Yes, absolutely. MediPulse adheres strictly to HIPAA and ISO 27001 data protection standards. All video consultations, AI scribe notes, and patient records are encrypted end-to-end both in transit and at rest.'
    },
    {
      q: 'How do I start a virtual consultation with a doctor?',
      a: 'Register as a Patient, choose your preferred OPD specialist from the live directory, confirm your session via UPI/Card, and step directly into your private WebRTC room.'
    },
    {
      q: 'Can doctors review and edit prescriptions before dispatching?',
      a: 'Yes. Our AI Scribe generates an initial draft based on the consultation transcript, allowing the doctor full editing capability, signature validation, and instant delivery to the patient.'
    },
    {
      q: 'What payment methods are supported on the platform?',
      a: 'We support all major Indian UPI applications (GPay, PhonePe, Paytm, BHIM, Cred), net banking across 50+ banks, debit cards, and major credit cards.'
    }
  ];

  return (
    <div className="space-y-32 pb-24 animate-fade-in-up">
      
      {/* 🚀 Split Hero Banner Section */}
      <section className="relative min-h-[85vh] flex items-center justify-between overflow-hidden rounded-[40px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl border border-slate-800/80 px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
        
        {/* Ambient Gradient Glows & Grid Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-25"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="grid lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto items-center relative z-10">
          
          {/* Left Column: Text & Hero CTA */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2.5 bg-gradient-to-r from-sky-500/15 to-teal-500/15 border border-sky-400/30 px-4 py-1.5 rounded-full text-xs font-bold text-sky-300 backdrop-blur-md shadow-inner">
              <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>Next-Gen Clinical AI & Telehealth Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Intelligent Care, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Connected Worldwide.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
              MediPulse bridges certified healthcare providers and patients with ultra-low-latency WebRTC video suites, Gemini AI prescription synthesis, and automated UPI billing settlements.
            </p>

            {/* Checklist Chips */}
            <div className="grid sm:grid-cols-2 gap-3.5 text-slate-200 font-medium text-xs">
              <div className="flex items-center space-x-2.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-Install WebRTC Video Suites</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gemini Medical Scribe Rx Synthesis</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Confetti UPI QR Tele-Billing</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>HIPAA & ISO-27001 Encrypted Vault</span>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              {currentUser ? (
                <button
                  onClick={() => onNavigateToRole(currentUser.role)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-extrabold text-sm shadow-[0_0_35px_rgba(14,165,233,0.4)] hover:shadow-[0_0_45px_rgba(14,165,233,0.6)] hover:scale-102 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onOpenAuth()}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-teal-600 hover:from-sky-400 hover:to-teal-500 text-white font-extrabold text-sm shadow-[0_0_35px_rgba(14,165,233,0.35)] hover:scale-102 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Start as Patient</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenAuth()}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 text-slate-100 font-extrabold text-sm hover:scale-102 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <Stethoscope className="w-4 h-4 text-teal-400" />
                    <span>Join as Doctor</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Column: 3D Workspace Card Mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-sky-500 via-teal-500 to-emerald-500 opacity-20 blur-2xl animate-pulse"></div>
            
            <div className="relative bg-slate-900/90 border border-slate-700/80 p-3 rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden w-full max-w-md">
              <img 
                src={medicalHeroImg} 
                alt="MediPulse Clinical Platform" 
                className="w-full h-auto rounded-[24px] object-cover border border-slate-800"
              />
              
              {/* Floating Active Vitals Badge */}
              <div className="absolute bottom-6 right-6 bg-slate-950/95 backdrop-blur-xl border border-sky-500/40 p-3 rounded-2xl flex items-center space-x-3 shadow-2xl animate-float">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live Consults</p>
                  <p className="text-xs font-black text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Active Stream
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 📊 Live Telemetry & Platform Performance Stats */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'AI Diagnostic Precision', value: '99.4%', icon: Sparkles, badge: '+0.4% vs last mo', color: 'text-sky-400', bg: 'bg-sky-500/10' },
          { label: 'Active OPD Specialists', value: '45+', icon: Stethoscope, badge: 'Verified MDs', color: 'text-teal-400', bg: 'bg-teal-500/10' },
          { label: 'Telehealth Consults Done', value: '15,000+', icon: Video, badge: 'Zero Drops', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Payment Success Rate', value: '99.9%', icon: CreditCard, badge: 'Instant UPI', color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-4 hover:border-sky-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className={`w-11 h-11 rounded-2xl ${stat.bg} flex items-center justify-center border border-slate-200/50 dark:border-slate-800`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {stat.badge}
              </span>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 🛠️ Interactive Medical Services Suite */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Integrated Clinical Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Engineered for Modern Healthcare
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-xl mx-auto">
            Explore the specialized real-time engines powering automated clinical workflows across MediPulse.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex flex-wrap items-center justify-center bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 max-w-2xl mx-auto shadow-inner">
          {[
            { id: 'opd', label: 'Virtual OPD', icon: Video },
            { id: 'scribe', label: 'AI Scribe', icon: Sparkles },
            { id: 'rag', label: 'Medical RAG', icon: MessageSquare },
            { id: 'upi', label: 'UPI Tele-Billing', icon: CreditCard }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveServiceTab(tab.id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeServiceTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-sky-700 dark:text-white shadow-md border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4 text-sky-500" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Feature Display */}
        <div className="grid md:grid-cols-2 gap-10 p-8 sm:p-12 rounded-[36px] glass-panel border border-slate-200 dark:border-slate-800 items-center">
          
          <div className="space-y-6 text-left">
            <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-extrabold tracking-wider uppercase border border-sky-500/20">
              {serviceTabDetails[activeServiceTab].tag} • {serviceTabDetails[activeServiceTab].stats}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {serviceTabDetails[activeServiceTab].title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {serviceTabDetails[activeServiceTab].desc}
            </p>
            
            <div className="space-y-3 pt-2">
              {serviceTabDetails[activeServiceTab].bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-sky-500/15 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-sky-500" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Code / Pipeline Telemetry Window */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4 font-mono text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-[11px] text-slate-500 font-bold">medipulse_engine.rs</span>
            </div>
            
            <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed overflow-x-auto">
              <p className="text-slate-500">// Initialize sub-system pipeline</p>
              <p><span className="text-purple-400">let</span> session = MediPulse::<span className="text-sky-400">connect</span>(Mode::{activeServiceTab.toUpperCase()});</p>
              <p>session.<span className="text-teal-400">set_security_level</span>(Security::HIPAA_DOUBLE_ENCRYPT);</p>
              <p>session.<span className="text-emerald-400">stream_telemetry</span>(&amp;active_patient);</p>
              <p className="text-emerald-400 font-bold pt-2">✓ Pipeline Verified • Metric: {serviceTabDetails[activeServiceTab].stats}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 👨‍⚕️ Available OPD Specialists Directory */}
      <section className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-600 dark:text-teal-400">
              <BadgeCheck className="w-4 h-4" />
              <span>Certified Healthcare Practitioners</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Featured OPD Specialists Online</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Book zero-friction virtual consultations immediately with verified specialists.</p>
          </div>
          <button
            onClick={() => currentUser ? onNavigateToRole('PATIENT') : onOpenAuth()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all flex items-center space-x-2 shadow-md cursor-pointer"
          >
            <span>Book Appointment</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doc, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl flex flex-col justify-between min-h-[250px] hover:border-sky-400/50 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 dark:bg-sky-950/60 border border-sky-500/20 flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-sky-500" />
                  </div>
                  <div className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-xl text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{doc.rating || '5.0'}</span>
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{doc.name}</h4>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold mt-0.5">{doc.specialty}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">{doc.exp || '10+ yrs exp'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Fee</p>
                  <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">₹{doc.fee || '800'}</p>
                </div>
                <button
                  onClick={() => currentUser ? onNavigateToRole('PATIENT') : onOpenAuth()}
                  className="px-4 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/80 text-xs font-bold transition-all cursor-pointer"
                >
                  Consult Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🏷️ Transparent Pricing & Plans */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Predictable Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Fair & Transparent Pricing</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-xl mx-auto">
            Choose the tier tailored to your clinical practice, clinic, or personal telehealth requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {[
            {
              name: 'Patient Standard',
              price: '₹0',
              period: 'forever free',
              desc: 'Best for patients scheduling occasional virtual checkups with OPD doctors.',
              bullets: ['Access to certified OPD doctors', 'Gemini AI Scribe prescriptions', '100% Secure UPI billing payments', 'Standard record storage'],
              cta: 'Get Started Free',
              accent: false
            },
            {
              name: 'Provider Pro',
              price: '₹1,499',
              period: 'per month',
              desc: 'Tailored for independent practitioners or single-doctor clinics.',
              bullets: ['Unlimited WebRTC video sessions', 'Automated audio prescription recording', 'Complete patient audit logs', 'Priority verified practitioner badge', 'Instant UPI payout routing'],
              cta: 'Start Pro Trial',
              accent: true
            },
            {
              name: 'Hospital Enterprise',
              price: 'Custom',
              period: 'annual license',
              desc: 'Optimized for multi-specialty healthcare networks and clinical organizations.',
              bullets: ['Unlimited providers and patients', 'Private hospital RAG database storage', 'Dedicated custom domain names', 'SLA guaranteed 99.99% uptime', '24/7 dedicated support engineer'],
              cta: 'Contact Enterprise Team',
              accent: false
            }
          ].map((plan, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-[36px] text-left flex flex-col justify-between transition-all relative ${
                plan.accent 
                  ? 'bg-slate-950 text-white border-2 border-sky-500 shadow-2xl scale-103 z-10' 
                  : 'glass-panel text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {plan.accent && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-[11px] font-black uppercase px-4 py-1 rounded-full tracking-wider shadow-md">
                  Most Popular
                </span>
              )}
              
              <div className="space-y-6">
                <div>
                  <h4 className={`font-extrabold text-sm uppercase tracking-wider ${plan.accent ? 'text-sky-400' : 'text-slate-500 dark:text-slate-400'}`}>{plan.name}</h4>
                  <div className="flex items-baseline mt-2">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className={`text-xs ml-1.5 ${plan.accent ? 'text-slate-400' : 'text-slate-500'}`}>/{plan.period}</span>
                  </div>
                </div>
                
                <p className={`text-xs font-medium leading-relaxed ${plan.accent ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>{plan.desc}</p>
                
                <div className="space-y-3 pt-2">
                  {plan.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center space-x-3 text-xs font-semibold">
                      <Check className={`w-4 h-4 shrink-0 ${plan.accent ? 'text-teal-400' : 'text-emerald-500'}`} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onOpenAuth()}
                className={`w-full py-4 rounded-2xl text-xs font-extrabold tracking-wide transition-all mt-8 cursor-pointer ${
                  plan.accent 
                    ? 'bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white shadow-lg' 
                    : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white dark:hover:bg-slate-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ❓ Expandable FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-xl mx-auto">
            Everything you need to know about video consults, AI scribe transcripts, and platform security.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {faqItems.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-slate-900 dark:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all font-bold text-sm cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-all transform ${isOpen ? 'rotate-90 text-sky-500' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 🔒 Enterprise Trust & CTA Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-10 sm:p-14 rounded-[40px] bg-gradient-to-tr from-slate-950 via-sky-950 to-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4 max-w-xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>HIPAA & ISO-27001 Certified Clinical Stack</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">Ready to scale your clinical workspace?</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Create an account today to access zero-latency virtual consultation rooms, automatic digital prescriptions, and direct patient billing payments.
            </p>
          </div>
          
          <button
            onClick={() => onOpenAuth()}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm transition-all shrink-0 cursor-pointer shadow-xl hover:scale-102"
          >
            Create Provider Account
          </button>
        </div>
      </section>

    </div>
  );
}
