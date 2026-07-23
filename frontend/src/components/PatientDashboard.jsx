import React, { useState } from 'react';
import { Calendar, Stethoscope, Sparkles, FileText, CreditCard, Clock, CheckCircle2, ChevronRight, HeartPulse, Plus, Video, Pill, Brain, Ticket, FileSpreadsheet, FileHeart, ShieldCheck, Download, Printer } from 'lucide-react';
import { downloadPrescriptionPDF, downloadInvoicePDF } from '../utils/pdfExporter';

export default function PatientDashboard({ appointments, prescriptions, payments, doctors, onOpenBooking, onOpenAIModal, onOpenPayment, onOpenTeleconsult }) {
  const [activeTab, setActiveTab] = useState('appointments');

  const upcomingAppointments = appointments?.filter(a => a.status === 'CONFIRMED' || a.status === 'PENDING') || [];
  const nextAppt = upcomingAppointments[0];

  return (
    <div className="space-y-6 animate-slide-up max-w-7xl mx-auto">
      
      {/* Bento Grid Header Hero Banner */}
      <div className="glass-panel p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-100">
            <HeartPulse className="w-4 h-4 text-sky-600 animate-pulse" />
            <span>MediPulse AI Patient Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, Rahul Verma 👋
          </h1>
          <p className="text-sm text-slate-600 font-medium">
            {nextAppt ? (
              <span>
                Next scheduled consultation:{' '}
                <strong className="text-slate-900 font-extrabold underline decoration-sky-400 decoration-2 underline-offset-4">
                  {nextAppt.appointment_date} at {nextAppt.time_slot}
                </strong>{' '}
                with {nextAppt.doctor_name} ({nextAppt.doctor_specialization || 'OPD'}).
              </span>
            ) : (
              <span>No upcoming consultations scheduled.</span>
            )}
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm transition-all btn-minimal shadow-md flex items-center space-x-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Book Consultation</span>
        </button>
      </div>

      {/* 🌟 Neon Medical Telemetry Vitals Row (Glowing Inner Borders) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" /> Live Telemetry Vitals & ECG Waveform
          </h3>
          <span className="text-xs text-emerald-600 font-extrabold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Realtime Bluetooth Stream
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card neon-vital-card p-4 rounded-2xl space-y-2 border border-sky-300/60">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Heart Rate (ECG)</span>
              <HeartPulse className="w-4 h-4 text-rose-500 animate-heart-beat" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-black text-slate-900">72</span>
              <span className="text-xs font-extrabold text-slate-500">BPM</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-600">
              <span>Normal Sinus Rhythm</span>
              <span className="text-slate-400 font-mono">⚡ 1.2ms</span>
            </div>
          </div>

          <div className="glass-card neon-vital-card p-4 rounded-2xl space-y-2 border border-sky-300/60">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Oxygen Saturation</span>
              <Activity className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-black text-slate-900">98%</span>
              <span className="text-xs font-extrabold text-slate-500">SpO2</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-cyan-700">
              <span>Optimal Oxygenation</span>
              <span className="text-slate-400 font-mono">O₂ Normal</span>
            </div>
          </div>

          <div className="glass-card neon-vital-card p-4 rounded-2xl space-y-2 border border-sky-300/60">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Blood Pressure</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">120/80</span>
              <span className="text-xs font-extrabold text-slate-500">mmHg</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-600">
              <span>Normotensive</span>
              <span className="text-slate-400 font-mono">SYS/DIA</span>
            </div>
          </div>

          <div className="glass-card neon-vital-card p-4 rounded-2xl space-y-2 border border-sky-300/60">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Body Temperature</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-black text-slate-900">98.6</span>
              <span className="text-xs font-extrabold text-slate-500">°F</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-amber-700">
              <span>Afebrile • Normal</span>
              <span className="text-slate-400 font-mono">37.0 °C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid KPI Metrics (Balanced Proportional Typography) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Bento Card 1: Live OPD Queue Token */}
        <div className="glass-card p-5 space-y-3 animate-fade-in-up delay-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-sky-600" /> Live OPD Token
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900"># 14</p>
            <span className="text-xs text-slate-500 font-semibold">Current Serving: # 11</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full w-[70%]"></div>
          </div>
          <span className="text-xs text-sky-700 font-bold block">~10 Mins Estimated Wait</span>
        </div>

        {/* Bento Card 2: Lab Reports */}
        <div className="glass-card p-5 space-y-3 animate-fade-in-up delay-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-teal-600" /> Lab Reports
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900">2 <span className="text-xs font-bold text-slate-400">PDFs</span></p>
            <span className="text-xs text-slate-500 font-semibold">Blood Test & ECG</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-teal-500 h-full rounded-full w-[100%]"></div>
          </div>
          <span className="text-xs text-emerald-700 font-bold block">✓ Download Available</span>
        </div>

        {/* Bento Card 3: Upcoming Consultations */}
        <div className="glass-card p-5 space-y-3 animate-fade-in-up delay-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-indigo-600" /> Upcoming
            </span>
            <Calendar className="w-4 h-4 text-indigo-500" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900">{upcomingAppointments.length}</p>
            <span className="text-xs text-slate-500 font-semibold">Confirmed Slot</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full w-[50%]"></div>
          </div>
          <span className="text-xs text-indigo-700 font-bold block">Cardiology OPD</span>
        </div>

        {/* Bento Card 4: AI Prescriptions */}
        <div className="glass-card p-5 space-y-3 animate-fade-in-up delay-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-purple-600" /> AI Prescriptions
            </span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900">{prescriptions?.length || 0}</p>
            <span className="text-xs text-slate-500 font-semibold">Voice Synthesized</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full w-[90%]"></div>
          </div>
          <span className="text-xs text-purple-700 font-bold block">Voice Audio Ready</span>
        </div>

      </div>

      {/* Clean Segmented Control Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all btn-minimal flex items-center space-x-2 ${
            activeTab === 'appointments'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Appointments ({appointments?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all btn-minimal flex items-center space-x-2 ${
            activeTab === 'prescriptions'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>AI Prescriptions ({prescriptions?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all btn-minimal flex items-center space-x-2 ${
            activeTab === 'billing'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Billing & Receipts ({payments?.length || 0})</span>
        </button>
      </div>

      {/* Tab 1: Appointments Grid */}
      {activeTab === 'appointments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up">
          {appointments && appointments.length > 0 ? (
            appointments.map(app => {
              const isPaid = payments?.some(p => (p.appointment === app.id || p.appointment_id === app.id) && (p.status === 'SUCCESS' || p.status === 'COMPLETED'));
              return (
                <div key={app.id} className="glass-card p-6 space-y-4 font-sans">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-sm border border-sky-100">
                        <Stethoscope className="w-5 h-5 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base">{app.doctor_name || 'Dr. Rajesh Sharma'}</h3>
                        <p className="text-xs text-sky-700 font-semibold">{app.doctor_specialization || 'Cardiology & Heart Care'}</p>
                      </div>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      app.status === 'CONFIRMED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : app.status === 'COMPLETED'
                        ? 'bg-slate-100 text-slate-600 border border-slate-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                        <Clock className="w-4 h-4 text-sky-600" /> Schedule:
                      </span>
                      <strong className="text-slate-900 font-bold">{app.appointment_date} at {app.time_slot}</strong>
                    </div>
                    <div className="text-slate-600 text-xs pt-2 border-t border-slate-200/60">
                      Reason: <span className="text-slate-900 font-semibold">{app.reason}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2.5 pt-1">
                    <button
                      onClick={() => onOpenTeleconsult(app)}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-all btn-minimal shadow-2xs"
                    >
                      <Video className="w-4 h-4 text-emerald-600" />
                      <span>Teleconsult Call</span>
                    </button>

                    {isPaid ? (
                      <span className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Paid (₹800)</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => onOpenPayment(app)}
                        className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-all btn-minimal shadow-xs"
                      >
                        <CreditCard className="w-4 h-4 text-white" />
                        <span>Pay OPD Fee (₹800)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-slate-200/80">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 text-sm font-semibold">No appointments scheduled.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: AI Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up">
          {prescriptions && prescriptions.length > 0 ? (
            prescriptions.map(rx => (
              <div key={rx.id} className="glass-card p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm border border-teal-100">
                      <Pill className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{rx.diagnosis}</h3>
                      <p className="text-xs text-slate-500 font-medium">By {rx.doctor_name || 'Dr. Ananya Gupta'}</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" /> AI Synthesized
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm">
                  <p className="text-slate-700 font-semibold leading-relaxed">
                    {rx.ai_summary?.summary || 'Targeted medical intervention for rapid symptom resolution.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 gap-2">
                  <span className="text-xs text-slate-400 font-medium">{new Date(rx.created_at || Date.now()).toLocaleDateString()}</span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => downloadPrescriptionPDF(rx)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all btn-minimal flex items-center gap-1"
                      title="Download Official PDF RX"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-600" />
                      <span className="hidden sm:inline">PDF RX</span>
                    </button>

                    <button
                      onClick={() => onOpenAIModal(rx)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all btn-minimal flex items-center space-x-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>View AI Summary</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-slate-200/80">
              <Pill className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 text-sm font-semibold">No active digital prescriptions.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Billing */}
      {activeTab === 'billing' && (
        <div className="glass-panel p-6 space-y-4 animate-fade-in-up">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-sky-600" /> Transaction & Payment Audit Trail
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 rounded-l-lg">Transaction ID</th>
                  <th className="p-3.5">Method</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 rounded-r-lg text-right">Tax Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {payments && payments.length > 0 ? (
                  payments.map(pay => (
                    <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-sky-700">{pay.transaction_id}</td>
                      <td className="p-3.5 text-slate-700 font-semibold">{pay.payment_method}</td>
                      <td className="p-3.5 font-extrabold text-slate-900">₹{parseFloat(pay.amount).toFixed(2)}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {pay.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 font-medium">{new Date(pay.created_at || Date.now()).toLocaleDateString()}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => downloadInvoicePDF(pay)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all btn-minimal inline-flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Download GST Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-slate-400 font-medium">No payment records found.</td>
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
