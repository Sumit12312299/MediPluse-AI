import React, { useState } from 'react';
import { Stethoscope, Calendar, Clock, CheckCircle2, XCircle, Brain, Pill, Plus, User, Sparkles, FileText, AlertCircle, Video, Activity, ShieldCheck, HeartPulse, Trash2, X, ChevronRight } from 'lucide-react';

export default function DoctorDashboard({ appointments, prescriptions, patients, onUpdateAppointmentStatus, onCreatePrescription, onOpenTeleconsult }) {
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [meds, setMeds] = useState([
    { name: 'Naproxen', dosage: '500mg', frequency: 'Twice daily after meals', duration: '5 Days' },
    { name: 'Pantoprazole', dosage: '40mg', frequency: 'Once daily before breakfast', duration: '5 Days' }
  ]);
  const [notes, setNotes] = useState('');
  const [isSubmittingRx, setIsSubmittingRx] = useState(false);

  const pendingAppointments = appointments?.filter(a => a.status === 'PENDING' || a.status === 'CONFIRMED') || [];

  const handleAddMed = () => {
    setMeds([...meds, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleRemoveMed = (index) => {
    if (meds.length <= 1) return;
    setMeds(meds.filter((_, idx) => idx !== index));
  };

  const handleMedChange = (index, field, value) => {
    const updated = [...meds];
    updated[index][field] = value;
    setMeds(updated);
  };

  const handleCreateRxSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAppt || !diagnosis) return;
    setIsSubmittingRx(true);

    try {
      await onCreatePrescription({
        appointment_id: selectedAppt.id,
        patient_id: selectedAppt.patient_id || 1,
        doctor_id: selectedAppt.doctor_id || 1,
        diagnosis,
        medications: meds,
        notes,
      });

      setIsSubmittingRx(false);
      setSelectedAppt(null);
      setDiagnosis('');
      setNotes('');
    } catch (err) {
      setIsSubmittingRx(false);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-7xl mx-auto">
      
      {/* Doctor Header Banner */}
      <div className="relative glass-panel p-6 sm:p-8 border-l-4 border-l-teal-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400/10 via-sky-400/5 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold shadow-2xs">
              <Stethoscope className="w-4 h-4 text-teal-600 animate-pulse" />
              <span>Doctor OPD Clinical Workstation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              Dr. Rajesh Sharma, MD <span className="inline-block text-xl">🩺</span>
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              Senior Consultant • <span className="text-teal-700 font-bold">Cardiology & Heart Care OPD</span>
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>OPD Active • 4 Patients Pending</span>
            </div>
          </div>
        </div>

        {/* Doctor KPIs */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
          <div className="glass-card p-4 space-y-1.5 group animate-fade-in-up delay-100">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Consultations</span>
              <Calendar className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
              {appointments?.length || 0}
            </p>
            <span className="text-xs text-slate-400 font-medium">Scheduled Today</span>
          </div>

          <div className="glass-card p-4 space-y-1.5 group animate-fade-in-up delay-200">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Prescriptions</span>
              <Brain className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {prescriptions?.length || 0}
            </p>
            <span className="text-xs text-indigo-700 font-bold">AI Summarized</span>
          </div>

          <div className="glass-card p-4 space-y-1.5 group animate-fade-in-up delay-300">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Patients</span>
              <User className="w-4 h-4 text-sky-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
              {patients?.length || 2}
            </p>
            <span className="text-xs text-slate-400 font-medium">Registered Records</span>
          </div>

          <div className="glass-card p-4 space-y-1.5 group animate-fade-in-up delay-400">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">OPD Fee</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
              ₹800.00
            </p>
            <span className="text-xs text-emerald-700 font-bold">Standard Rate</span>
          </div>
        </div>
      </div>

      {/* OPD Patient Queue Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-600" /> Active Patient OPD Queue
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {appointments && appointments.length > 0 ? (
            appointments.map(app => (
              <div key={app.id} className="glass-card p-6 space-y-4 font-sans">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-base shadow-2xs">
                      {app.patient_name ? app.patient_name.charAt(0) : 'R'}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{app.patient_name || 'Rahul Verma'}</h3>
                      <p className="text-xs text-teal-700 font-semibold">Slot: {app.time_slot} • {app.appointment_date}</p>
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

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">Chief Complaint / Reason:</span>
                  <p className="text-slate-900 font-bold mt-1">{app.reason}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateAppointmentStatus(app.id, 'CONFIRMED', 'Confirmed by Doctor')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all btn-minimal flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm</span>
                    </button>

                    <button
                      onClick={() => onUpdateAppointmentStatus(app.id, 'COMPLETED', 'Consultation complete')}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all btn-minimal flex items-center space-x-1"
                    >
                      <span>Complete</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenTeleconsult(app)}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-all btn-minimal shadow-2xs"
                    >
                      <Video className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Teleconsult</span>
                    </button>

                    <button
                      onClick={() => setSelectedAppt(app)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5 transition-all btn-minimal shadow-xs"
                    >
                      <Brain className="w-3.5 h-3.5 text-sky-400" />
                      <span>Issue AI RX</span>
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 glass-panel">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 text-sm font-semibold">No active appointments in queue.</p>
            </div>
          )}
        </div>
      </div>

      {/* Upgraded AI Prescription Generator Drawer/Form */}
      {selectedAppt && (
        <div className="glass-panel p-6 sm:p-8 space-y-6 animate-slide-up ring-4 ring-sky-500/10">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-600 text-white flex items-center justify-center font-bold shadow-md">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Generate AI Digital Prescription</h3>
                <p className="text-xs text-sky-700 font-bold flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-sky-600" /> Patient: <span className="text-slate-900 underline">{selectedAppt.patient_name || 'Rahul Verma'}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAppt(null)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all btn-minimal"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          <form onSubmit={handleCreateRxSubmit} className="space-y-5">
            
            {/* Clinical Diagnosis Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Clinical Diagnosis</label>
              <input
                type="text"
                required
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g. Cervical Strain & Tension Headaches"
                className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-semibold shadow-2xs"
              />
            </div>

            {/* Prescribed Medication Table Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Prescribed Medications</label>
                <button
                  type="button"
                  onClick={handleAddMed}
                  className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-extrabold flex items-center gap-1.5 transition-all btn-minimal shadow-2xs"
                >
                  <Plus className="w-4 h-4 text-sky-600" /> Add Drug Row
                </button>
              </div>

              {/* Medication Table Header Labels */}
              <div className="grid grid-cols-12 gap-2 text-[11px] font-black uppercase text-slate-400 px-3">
                <span className="col-span-3">Drug Name</span>
                <span className="col-span-2">Dosage</span>
                <span className="col-span-4">Timing / Frequency</span>
                <span className="col-span-2">Duration</span>
                <span className="col-span-1 text-center">Action</span>
              </div>

              {/* Medication Row Inputs */}
              <div className="space-y-2">
                {meds.map((m, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/90 items-center hover:bg-slate-100/80 transition-colors">
                    <div className="col-span-3">
                      <input
                        type="text"
                        placeholder="Medicine Name"
                        value={m.name}
                        onChange={(e) => handleMedChange(idx, 'name', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs font-bold"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        placeholder="500mg"
                        value={m.dosage}
                        onChange={(e) => handleMedChange(idx, 'dosage', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs font-bold"
                      />
                    </div>
                    <div className="col-span-4">
                      <input
                        type="text"
                        placeholder="Twice daily after meals"
                        value={m.frequency}
                        onChange={(e) => handleMedChange(idx, 'frequency', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs font-bold"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        placeholder="5 Days"
                        value={m.duration}
                        onChange={(e) => handleMedChange(idx, 'duration', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs font-bold"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveMed(idx)}
                        disabled={meds.length <= 1}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 transition-all"
                        title="Remove Drug"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Notes & Advice Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Doctor Notes & Advice</label>
              <textarea
                rows="2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take adequate rest and perform neck stretches."
                className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-medium shadow-2xs"
              ></textarea>
            </div>

            {/* Gradient Submit Action */}
            <button
              type="submit"
              disabled={isSubmittingRx}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md transition-all btn-minimal flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span>Synthesize & Issue AI Digital Prescription</span>
            </button>

          </form>
        </div>
      )}

    </div>
  );
}
