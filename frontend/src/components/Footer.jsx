import React from 'react';
import { HeartPulse, ShieldCheck, Phone, Mail, MapPin, ExternalLink, Lock, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * Footer component displaying company brand, certification badges,
 * list of patient services, departments, and emergency helplines.
 */
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl pt-16 pb-12 text-slate-600 dark:text-slate-400 text-xs">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Certification (Span 4) */}
          <div className="space-y-4 md:col-span-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/20">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                MediPulse <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-teal-500">AI</span>
              </span>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-normal text-xs max-w-sm">
              Empowering clinical workflows with real-time WebRTC telemedicine, Gemini AI prescription synthesis, and automated digital payments.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>HIPAA & GDPR Compliant</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-bold text-[11px]">
                <Lock className="w-3.5 h-3.5" />
                <span>ISO 27001 Certified</span>
              </div>
            </div>
          </div>

          {/* Column 2: Patient Services (Span 2) */}
          <div className="space-y-3.5 md:col-span-2 text-left">
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs">Patient Services</h4>
            <ul className="space-y-2.5 font-medium text-slate-500 dark:text-slate-400">
              <li className="hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer transition-colors flex items-center gap-1 group">
                <span>Book OPD Consult</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li className="hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer transition-colors flex items-center gap-1 group">
                <span>AI Digital Prescriptions</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li className="hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer transition-colors flex items-center gap-1 group">
                <span>Tele-Health Video Suite</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li className="hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer transition-colors flex items-center gap-1 group">
                <span>Diagnostic Lab Reports</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
            </ul>
          </div>

          {/* Column 3: Medical Departments (Span 3) */}
          <div className="space-y-3.5 md:col-span-3 text-left">
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs">Medical Departments</h4>
            <ul className="space-y-2.5 font-medium text-slate-500 dark:text-slate-400">
              <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors">Cardiovascular & Heart Health</li>
              <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors">Neurosciences & Brain Care</li>
              <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors">Orthopedics & Joint Care</li>
              <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors">Pediatrics & Neonatal Care</li>
            </ul>
          </div>

          {/* Column 4: 24/7 Emergency Helpline (Span 3) */}
          <div className="space-y-3.5 md:col-span-3 text-left">
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs">24/7 Helpline</h4>
            <div className="space-y-2.5 text-slate-600 dark:text-slate-300 font-medium">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <p className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white">
                  <Phone className="w-4 h-4 text-emerald-500" /> +91 1800 123 4567
                </p>
                <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-sky-500" /> support@medipulse.ai
                </p>
                <p className="flex items-center gap-2 text-[11px] text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" /> AIIMS Enclave, New Delhi, India
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 dark:text-slate-500 font-medium text-xs">
          <p>© {new Date().getFullYear()} MediPulse AI Health Cloud Platform. All rights reserved.</p>
          <div className="flex items-center space-x-5">
            <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer transition-colors">Security Audit</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
