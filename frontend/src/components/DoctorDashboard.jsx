import React, { useState } from 'react';
import { Stethoscope, Calendar, CheckCircle2, XCircle, Sparkles, Video, Plus, FileText, User, Clock, AlertCircle, Pill, Syringe, Brain, Microscope, Dna, FileHeart } from 'lucide-react';

export default function DoctorDashboard({ appointments, prescriptions, patients, onUpdateAppointmentStatus, onCreatePrescription, onOpenTeleconsult }) {
  const [activeTab, setActiveTab] = useState('queue');
  
  // Prescription Writer State
  const [selectedPatientId, setSelectedPatientId] = useState(patients?.[0]?.id || 1);
  const [diagnosis, setDiagnosis] = useState('');
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medFreq, setMedFreq] = useState('Twice daily');
  const [medDuration, setMedDuration] = useState('5 Days');
  const [medList, setMedList] = useState([]);
  const [rxNotes, setRxNotes] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handleAddMedication = () => {
    if (!medName) return;
    setMedList([...medList, { name: medName, dosage: medDosage || '1 tablet', frequency: medFreq, duration: medDuration }]);
    setMedName('');
    setMedDosage('');
  };

  const handlePublishPrescription = async (e) => {
    e.preventDefault();
    if (!diagnosis || medList.length === 0) return;

    setIsPublishing(true);
    try {
      await onCreatePrescription({
        patient_id: selectedPatientId,
        doctor_id: 1,
        diagnosis,
        medications: medList,
        notes: rxNotes,
      });
      setIsPublishing(false);
      setDiagnosis('');
      setMedList([]);
      setRxNotes('');
      setActiveTab('queue');
    } catch (err) {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      
      {/* Doctor Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden bg-gradient-to-r from-teal-900 via-emerald-800 to-slate-900 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-100 text-xs font-extrabold shadow-xs">
              <Stethoscope className="w-4 h-4 text-teal-300" />
              <span>Doctor Workstation & AI Scribe</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Dr. Sarah Jenkins, <span className="text-teal-200">MD</span>
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 font-medium flex items-center gap-2">
              <span>Department of Cardiovascular Sciences</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-bold text-emerald-200">
                <Microscope className="w-3.5 h-3.5" /> OPD Active
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('write_rx')}
              className="px-4 py-2.5 rounded-2xl bg-white text-teal-900 font-extrabold text-xs shadow-md hover:bg-teal-50 transition-all btn-smooth flex items-center space-x-2"
            >
              <Brain className="w-4 h-4 text-teal-700" />
              <span>Write AI Prescription</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all btn-smooth flex items-center space-x-2 ${
            activeTab === 'queue'
              ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Patient Queue ({appointments?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('write_rx')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all btn-smooth flex items-center space-x-2 ${
            activeTab === 'write_rx'
              ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>AI Prescription Assistant</span>
        </button>
      </div>

      {/* Tab 1: Queue */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments && appointments.length > 0 ? (
              appointments.map(app => (
                <div key={app.id} className="glass-card p-5 rounded-2xl space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold text-sm shadow-2xs">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">{app.patient_name || 'Patient'}</h3>
                        <p className="text-xs text-slate-500 font-medium">Reason: <span className="text-slate-900 font-bold">{app.reason}</span></p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      app.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-teal-600" /> Time Slot:
                    </span>
                    <strong className="text-slate-900 font-extrabold">{app.appointment_date} @ {app.time_slot}</strong>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onOpenTeleconsult(app)}
                      className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-extrabold flex items-center space-x-1.5 transition-all btn-smooth"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Start Teleconsult</span>
                    </button>

                    <button
                      onClick={() => onUpdateAppointmentStatus(app.id, 'COMPLETED')}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 text-xs font-extrabold transition-all btn-smooth"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 glass-panel rounded-2xl">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 text-xs font-semibold">No patient appointments queued today.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Write Prescription with AI */}
      {activeTab === 'write_rx' && (
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-2 text-teal-700 font-extrabold text-sm">
              <Brain className="w-5 h-5 text-teal-600" />
              <span>AI Digital Prescription Creator</span>
            </div>
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Auto-Generates Patient Layman Summary
            </span>
          </div>

          <form onSubmit={handlePublishPrescription} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-teal-600" /> Select Patient
                </label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs bg-white font-medium"
                >
                  {patients && patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.phone || 'Patient'})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <FileHeart className="w-3.5 h-3.5 text-teal-600" /> Clinical Diagnosis
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acute Bronchitis / Hypertension"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-medium"
                />
              </div>
            </div>

            {/* Add Medication Row */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-teal-600" /> Add Prescribed Medications
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Medicine (e.g. Amoxicillin)"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  className="px-3 py-2 rounded-xl glass-input text-xs"
                />
                <input
                  type="text"
                  placeholder="Dosage (e.g. 500mg)"
                  value={medDosage}
                  onChange={(e) => setMedDosage(e.target.value)}
                  className="px-3 py-2 rounded-xl glass-input text-xs"
                />
                <input
                  type="text"
                  placeholder="Frequency (e.g. Twice daily)"
                  value={medFreq}
                  onChange={(e) => setMedFreq(e.target.value)}
                  className="px-3 py-2 rounded-xl glass-input text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddMedication}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold transition-all btn-smooth flex items-center justify-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>

              {/* Medication Table Preview */}
              {medList.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  {medList.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 font-semibold shadow-2xs">
                      <span className="font-extrabold text-teal-700 flex items-center gap-1">
                        <Pill className="w-3.5 h-3.5 text-teal-600" /> {m.name} ({m.dosage})
                      </span>
                      <span className="text-slate-500">{m.frequency} • {m.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Doctor Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700">Doctor Remarks / Precautions</label>
              <textarea
                rows="2"
                placeholder="Additional instructions for patient..."
                value={rxNotes}
                onChange={(e) => setRxNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-medium"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isPublishing || medList.length === 0}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md transition-all btn-smooth flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Prescription & Notify Patient</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
