import React, { useState } from 'react';
import { Calendar, Clock, Stethoscope, User, FileText, CheckCircle2, X, Sparkles, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookAppointmentModal({ doctors, isOpen, onClose, onBookSuccess }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors?.[0]?.id || 1);
  const [appointmentDate, setAppointmentDate] = useState('2026-07-22');
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [reason, setReason] = useState('Routine cardiovascular checkup & wellness review.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onBookSuccess({
        doctor_id: selectedDoctorId,
        patient_id: 1,
        appointment_date: appointmentDate,
        time_slot: timeSlot,
        reason,
      });

      setIsSubmitting(false);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      onClose();
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const selectedDoctor = doctors?.find(d => d.id === parseInt(selectedDoctorId)) || doctors?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-slide-up"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 animate-modal-pop">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-400 flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                Schedule Consultation
              </h3>
              <p className="text-xs text-sky-300 font-medium">Select Specialist & OPD Slot</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all btn-minimal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          
          {/* Select Doctor */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <Stethoscope className="w-3.5 h-3.5 text-sky-600" /> Select Specialist
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-semibold bg-white"
            >
              {doctors && doctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.specialization} (${d.consultation_fee})
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Info Chip */}
          {selectedDoctor && (
            <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {selectedDoctor.name.charAt(4)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{selectedDoctor.name}</h4>
                  <p className="text-sky-700 font-semibold">{selectedDoctor.specialization}</p>
                </div>
              </div>
              <span className="font-extrabold text-slate-900 text-sm">${selectedDoctor.consultation_fee}</span>
            </div>
          )}

          {/* Date & Time Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Date</label>
              <input
                type="date"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-semibold bg-white"
              >
                <option>09:30 AM</option>
                <option>10:30 AM</option>
                <option>02:15 PM</option>
                <option>04:30 PM</option>
              </select>
            </div>
          </div>

          {/* Reason Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Reason for Visit</label>
            <textarea
              rows="2"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe your symptoms or consultation goals..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-medium"
            ></textarea>
          </div>

          {/* Action Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-950 hover:from-sky-950 hover:to-slate-900 text-white font-extrabold text-sm shadow-md transition-all btn-minimal flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Confirm & Reserve OPD Slot</span>
          </button>

        </form>

      </div>
    </div>
  );
}
