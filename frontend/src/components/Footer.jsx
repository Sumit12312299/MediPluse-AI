import React from 'react';
import { HeartPulse, ShieldCheck, Phone, Mail, MapPin, ExternalLink, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/95 backdrop-blur-md pt-12 pb-8 text-slate-600 text-xs">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Certification */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                <HeartPulse className="w-5 h-5 text-sky-400" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                MediPulse <span className="text-sky-600">AI</span>
              </span>
            </div>
            
            <p className="text-slate-500 leading-relaxed font-medium">
              Empowering clinical excellence with AI-driven patient care, real-time tele-health, and seamless digital health records.
            </p>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>HIPAA & ISO 27001 Certified</span>
            </div>
          </div>

          {/* Column 2: Patient Services */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">Patient Services</h4>
            <ul className="space-y-2 font-medium text-slate-500">
              <li className="hover:text-sky-600 cursor-pointer transition-colors">Book OPD Appointment</li>
              <li className="hover:text-sky-600 cursor-pointer transition-colors">AI Digital Prescriptions</li>
              <li className="hover:text-sky-600 cursor-pointer transition-colors">Tele-Health Video Suite</li>
              <li className="hover:text-sky-600 cursor-pointer transition-colors">Diagnostic Lab Reports</li>
            </ul>
          </div>

          {/* Column 3: Medical Departments */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">Medical Departments</h4>
            <ul className="space-y-2 font-medium text-slate-500">
              <li className="hover:text-sky-600 cursor-pointer transition-colors">Cardiovascular Sciences</li>
              <li className="hover:text-sky-600 cursor-pointer transition-colors">Neurosciences & Brain Care</li>
              <li className="hover:text-sky-600 cursor-pointer transition-colors">Orthopedic Surgery</li>
              <li className="hover:text-sky-600 cursor-pointer transition-colors">Dermatology OPD</li>
            </ul>
          </div>

          {/* Column 4: 24/7 Helpline & Contact */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">Emergency Helpline</h4>
            <div className="space-y-2 text-slate-600 font-medium">
              <p className="flex items-center gap-2 font-bold text-slate-900">
                <Phone className="w-3.5 h-3.5 text-sky-600" /> +91 1800 123 4567
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-600" /> support@medipulse.ai
              </p>
              <p className="flex items-center gap-2 text-[11px] text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-sky-600" /> Connaught Place, New Delhi, India
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 font-medium text-[11px]">
          <p>© {new Date().getFullYear()} MediPulse AI Health Systems Inc. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">HIPAA Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
