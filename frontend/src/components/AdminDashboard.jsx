import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, Stethoscope, Calendar, DollarSign, Activity, Plus, Mail, MessageSquare, Database, Sparkles, X, Check, Hospital, UserRoundCheck, Brain, Dna, ShieldCheck } from 'lucide-react';

function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0, duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const target = parseFloat(value) || 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out quad progress curve
      const easeOut = 1 - (1 - progress) * (1 - progress);
      setCount(target * easeOut);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function AdminDashboard({ metrics, doctors, notifications, onAddDoctor }) {
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [docName, setDocName] = useState('');
  const [docSpec, setDocSpec] = useState('');
  const [docDept, setDocDept] = useState('');
  const [docFee, setDocFee] = useState('80');

  const handleAddDoctorSubmit = (e) => {
    e.preventDefault();
    if (!docName || !docSpec) return;

    onAddDoctor({
      user: { first_name: 'Dr. ' + docName, username: `dr_${docName.toLowerCase().replace(/\s+/g, '')}` },
      specialization: docSpec,
      department: docDept || 'Outpatient Department',
      consultation_fee: parseFloat(docFee)
    });

    setDocName('');
    setDocSpec('');
    setDocDept('');
    setIsAddDoctorOpen(false);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      
      {/* Admin Executive Header */}
      <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-900 to-sky-900 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-extrabold shadow-xs">
              <Hospital className="w-4 h-4" />
              <span>Hospital Executive Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              MediPulse Operations & <span className="text-sky-300">Tele-Health Center</span>
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 font-medium flex items-center gap-2">
              <span>PostgreSQL / DRF REST API</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-sky-200 font-bold">
                <Brain className="w-3.5 h-3.5" /> AI Prescription Pipeline
              </span>
            </p>
          </div>

          <button
            onClick={() => setIsAddDoctorOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white text-indigo-950 font-extrabold text-xs shadow-md hover:bg-sky-50 transition-all btn-smooth flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 text-indigo-700" />
            <span>Onboard Specialist Doctor</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card glass-tilt-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Patients</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <UserRoundCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">
            <AnimatedCounter value={metrics?.total_patients || 2} />
          </p>
          <p className="text-[11px] text-emerald-600 font-bold">+12% growth this month</p>
        </div>

        <div className="glass-card glass-tilt-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Active Doctors</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">
            <AnimatedCounter value={metrics?.total_doctors || doctors?.length || 4} />
          </p>
          <p className="text-[11px] text-slate-500 font-bold">4 Specializations</p>
        </div>

        <div className="glass-card glass-tilt-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">AI Summaries</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">
            <AnimatedCounter value={metrics?.ai_prescriptions_generated || 2} />
          </p>
          <p className="text-[11px] text-purple-600 font-bold">98.4% AI Accuracy</p>
        </div>

        <div className="glass-card glass-tilt-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Hospital Revenue</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">
            <AnimatedCounter value={metrics?.total_revenue || 1600.00} prefix="₹" decimals={2} />
          </p>
          <p className="text-[11px] text-emerald-600 font-bold">Razorpay / UPI Live</p>
        </div>
      </div>

      {/* Doctor Roster & Dispatch Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Doctor Roster */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-indigo-600" /> Specialist Doctor Roster
            </h3>
            <span className="text-xs text-slate-500 font-bold">{doctors?.length || 0} Registered</span>
          </div>

          <div className="space-y-3">
            {doctors && doctors.map(doc => (
              <div key={doc.id} className="glass-card p-3.5 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-indigo-700 font-extrabold flex items-center justify-center text-xs border border-slate-200">
                    {doc.name ? doc.name.charAt(4) : 'D'}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{doc.name}</h4>
                    <p className="text-[11px] text-indigo-600 font-bold">{doc.specialization}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-xs text-slate-900">${doc.consultation_fee}</span>
                  <p className="text-[10px] text-emerald-600 font-bold">⭐ {doc.rating || '4.9'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SMS & Email Notification Audit Trail */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-600" /> Notification Dispatch Logs
            </h3>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-sky-50 text-sky-700 border border-sky-200">
              Twilio / SMTP Active
            </span>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {notifications && notifications.map((n, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{n.title}</span>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{n.channel}</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed font-medium">{n.message}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Doctor Modal */}
      {isAddDoctorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setIsAddDoctorOpen(false)}></div>

          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 z-10 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm">Add New Specialist Doctor</h3>
              <button onClick={() => setIsAddDoctorOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddDoctorSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Doctor Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Vance"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Specialization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dermatology & Laser Therapy"
                  value={docSpec}
                  onChange={(e) => setDocSpec(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Department</label>
                  <input
                    type="text"
                    placeholder="Dermatology"
                    value={docDept}
                    onChange={(e) => setDocDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Consultation Fee ($)</label>
                  <input
                    type="number"
                    value={docFee}
                    onChange={(e) => setDocFee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-all btn-smooth mt-2"
              >
                Onboard Doctor to Roster
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
