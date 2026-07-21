import React, { useState } from 'react';
import { Calendar, Stethoscope, Sparkles, FileText, CreditCard, Clock, CheckCircle2, ChevronRight, HeartPulse, Plus, Video, Pill, Brain, Thermometer, ArrowUpRight, Activity, ShieldCheck, Dna, FileHeart, Ticket, FileSpreadsheet } from 'lucide-react';

export default function PatientDashboard({ appointments, prescriptions, payments, doctors, onOpenBooking, onOpenAIModal, onOpenPayment, onOpenTeleconsult }) {
  const [activeTab, setActiveTab] = useState('appointments');

  const upcomingAppointments = appointments?.filter(a => a.status === 'CONFIRMED' || a.status === 'PENDING') || [];

  return (
    <div className="space-y-6 animate-slide-up">
      
      {/* High-End Aesthetic Hero Banner with Accent Gradient Border */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 border-l-4 border-l-sky-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-400/10 via-teal-400/5 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs sm:text-sm font-bold shadow-2xs">
              <HeartPulse className="w-4 h-4 text-sky-600 animate-pulse" />
              <span>MediPulse AI Patient Health Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              Welcome back, Rahul Verma <span className="inline-block animate-bounce text-xl">👋</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Next scheduled consultation: <strong className="text-slate-900 font-extrabold underline decoration-sky-400 decoration-2 underline-offset-4">Tomorrow at 10:30 AM</strong> with Dr. Rajesh Sharma (Cardiology).
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-950 hover:from-sky-950 hover:to-slate-900 text-white font-bold text-sm transition-all btn-minimal shadow-md flex items-center space-x-2 self-start md:self-auto group"
          >
            <Plus className="w-4 h-4 text-sky-400 group-hover:rotate-90 transition-transform duration-300" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Upgraded 4 Core Utility Cards (Token, Lab Reports, Appointments, AI RX) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
          
          {/* Card 1: Live OPD Token */}
          <div className="glass-card p-4.5 rounded-2xl space-y-2 group">
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-sky-600" /> Live OPD Token
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
              # 14 <span className="text-xs font-semibold text-sky-700">Token</span>
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-sky-500 h-full rounded-full w-[70%]"></div>
            </div>
            <span className="text-xs text-sky-700 font-bold">~10 Mins Est. Wait</span>
          </div>

          {/* Card 2: Diagnostic Lab Reports */}
          <div className="glass-card p-4.5 rounded-2xl space-y-2 group">
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <FileSpreadsheet className="w-3.5 h-3.5 text-teal-600" /> Lab Reports
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
              2 <span className="text-xs font-semibold text-slate-500">Reports</span>
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[100%]"></div>
            </div>
            <span className="text-xs text-emerald-700 font-bold">✓ Blood & ECG Ready</span>
          </div>

          {/* Card 3: Upcoming Consultations */}
          <div className="glass-card p-4.5 rounded-2xl space-y-2 group">
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" /> Upcoming
              </span>
              <Calendar className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
              {upcomingAppointments.length}
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full w-[50%]"></div>
            </div>
            <span className="text-xs text-teal-700 font-semibold">Confirmed Booking</span>
          </div>

          {/* Card 4: AI Prescriptions */}
          <div className="glass-card p-4.5 rounded-2xl space-y-2 group">
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <Brain className="w-3.5 h-3.5 text-indigo-500" /> AI Prescriptions
              </span>
              <Sparkles className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {prescriptions?.length || 0}
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full w-[90%]"></div>
            </div>
            <span className="text-xs text-indigo-700 font-bold">AI Voice Ready</span>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all btn-minimal flex items-center space-x-2 ${
            activeTab === 'appointments'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Appointments ({appointments?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all btn-minimal flex items-center space-x-2 ${
            activeTab === 'prescriptions'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-4 h-4 text-sky-400" />
          <span>AI Prescriptions ({prescriptions?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all btn-minimal flex items-center space-x-2 ${
            activeTab === 'billing'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Billing & Receipts ({payments?.length || 0})</span>
        </button>
      </div>

      {/* Tab 1: Appointments */}
      {activeTab === 'appointments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {appointments && appointments.length > 0 ? (
            appointments.map(app => (
              <div key={app.id} className="glass-card p-6 rounded-2xl space-y-4 group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/80 text-sky-700 flex items-center justify-center font-bold text-sm shadow-2xs group-hover:scale-105 transition-transform">
                      <Stethoscope className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{app.doctor_name || 'Dr. Rajesh Sharma'}</h3>
                      <p className="text-xs sm:text-sm text-sky-700 font-semibold flex items-center gap-1">
                        <FileHeart className="w-3.5 h-3.5 text-sky-600" /> {app.doctor_specialization || 'Cardiology & Heart Care'}
                      </p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                    app.status === 'CONFIRMED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs'
                      : app.status === 'COMPLETED'
                      ? 'bg-slate-100 text-slate-700 border border-slate-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-2 text-slate-500 font-medium">
                      <Clock className="w-4 h-4 text-sky-600" /> Appointment Schedule:
                    </span>
                    <strong className="text-slate-900 font-bold">{app.appointment_date} at {app.time_slot}</strong>
                  </div>
                  <div className="text-slate-600 text-xs sm:text-sm pt-2 border-t border-slate-200/80">
                    Reason: <span className="text-slate-900 font-semibold">{app.reason}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-1">
                  <button
                    onClick={() => onOpenTeleconsult(app)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50/50 text-slate-800 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all btn-minimal shadow-2xs group/btn"
                  >
                    <Video className="w-4 h-4 text-emerald-600 group-hover/btn:scale-110 transition-transform" />
                    <span>Teleconsult Call</span>
                  </button>

                  <button
                    onClick={() => onOpenPayment(app)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-950 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all btn-minimal shadow-xs"
                  >
                    <CreditCard className="w-4 h-4 text-sky-400" />
                    <span>Pay OPD Fee (₹800)</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 glass-panel rounded-2xl">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 text-sm font-semibold">No appointments scheduled.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: AI Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {prescriptions && prescriptions.length > 0 ? (
            prescriptions.map(rx => (
              <div key={rx.id} className="glass-card p-6 rounded-2xl space-y-4 group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-600 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                      <Pill className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{rx.diagnosis}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">By {rx.doctor_name || 'Dr. Ananya Gupta'}</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" /> AI Synthesized
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 text-xs sm:text-sm">
                  <p className="text-slate-700 font-semibold leading-relaxed">
                    {rx.ai_summary?.summary || 'Targeted medical intervention for rapid symptom resolution.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">{new Date(rx.created_at || Date.now()).toLocaleDateString()}</span>
                  
                  <button
                    onClick={() => onOpenAIModal(rx)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all btn-minimal flex items-center space-x-2 shadow-xs group/btn"
                  >
                    <Sparkles className="w-4 h-4 text-sky-400 group-hover/btn:rotate-12 transition-transform" />
                    <span>View AI Summary & Speech</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 glass-panel rounded-2xl">
              <Pill className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 text-sm font-semibold">No active digital prescriptions.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Billing */}
      {activeTab === 'billing' && (
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-sky-600" /> Transaction & Payment Audit Trail
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-700 uppercase text-xs tracking-wider font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 rounded-l-lg">Transaction ID</th>
                  <th className="p-3.5">Method</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {payments && payments.length > 0 ? (
                  payments.map(pay => (
                    <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-sky-700">{pay.transaction_id}</td>
                      <td className="p-3.5 text-slate-700">{pay.payment_method}</td>
                      <td className="p-3.5 font-extrabold text-slate-900">₹{parseFloat(pay.amount).toFixed(2)}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {pay.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500">{new Date(pay.created_at || Date.now()).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-slate-500 font-medium">No payment records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
