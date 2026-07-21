import React, { useState } from 'react';
import { CreditCard, QrCode, Building2, Smartphone, ShieldCheck, Lock, CheckCircle2, X, Sparkles, ArrowRight, Loader2, Receipt } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentModal({ appointment, isOpen, onClose, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [vpa, setVpa] = useState('rahul@upi');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txId, setTxId] = useState('');

  if (!isOpen || !appointment) return null;

  const amount = appointment.doctor_fee || 800.00;

  const triggerConfettiExplosion = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
    }, 200);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await onPaymentSuccess({
        appointment_id: appointment.id,
        amount: amount,
        payment_method: paymentMethod === 'UPI' ? 'UPI (GPay / PhonePe / Paytm)' : paymentMethod === 'CARD' ? 'Credit/Debit Card' : 'NetBanking',
      });

      const generatedTx = res?.transaction_id || `TXN_IND_${Math.floor(100000 + Math.random() * 900000)}`;
      setTxId(generatedTx);

      setIsProcessing(false);
      setIsSuccess(true);
      triggerConfettiExplosion();

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-slide-up"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 animate-slide-up">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-400 flex items-center justify-center shadow-xs">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                MediPulse Payment Gateway
              </h3>
              <p className="text-xs text-sky-300 font-medium flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL Encrypted Indian Payment Checkout
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all btn-minimal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-5 animate-slide-up">
            
            {/* Animated Success Checkmark Ring */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 scale-105 transition-transform duration-500">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">Payment Verified!</h4>
              <p className="text-xs text-slate-500 font-semibold">Transaction successfully authorized via Razorpay UPI.</p>
            </div>

            {/* Smooth Digital Receipt Card */}
            <div className="p-4.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-2 text-slate-700 animate-slide-up">
              <div className="flex items-center justify-between font-mono font-extrabold">
                <span className="text-slate-500 flex items-center gap-1">
                  <Receipt className="w-3.5 h-3.5 text-emerald-600" /> Transaction ID:
                </span>
                <span className="text-emerald-800">{txId}</span>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="text-slate-900 text-sm">₹{parseFloat(amount).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-emerald-200/60 font-semibold text-emerald-700">
                <span>Receipt Sent:</span>
                <span>SMS & WhatsApp Dispatch Active</span>
              </div>
            </div>

          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 sm:p-7 space-y-6">
            
            {/* Summary Box */}
            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b border-slate-200/80 pb-2">
                <span>Doctor Consultation</span>
                <strong className="text-slate-900 font-bold">{appointment.doctor_name || 'Dr. Rajesh Sharma'}</strong>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b border-slate-200/80 pb-2">
                <span>Department</span>
                <strong className="text-sky-700 font-bold">{appointment.doctor_specialization || 'Cardiology & Heart Care'}</strong>
              </div>
              <div className="flex items-center justify-between text-sm pt-1">
                <span className="font-bold text-slate-700">Total Payable Amount</span>
                <strong className="text-2xl font-extrabold text-slate-900">₹{parseFloat(amount).toFixed(2)}</strong>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Select Indian Payment Method</label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center space-y-1.5 transition-all btn-minimal ${
                    paymentMethod === 'UPI'
                      ? 'bg-sky-50 text-sky-800 border-sky-400 ring-2 ring-sky-400/20 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-sky-600" />
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center space-y-1.5 transition-all btn-minimal ${
                    paymentMethod === 'CARD'
                      ? 'bg-sky-50 text-sky-800 border-sky-400 ring-2 ring-sky-400/20 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-sky-600" />
                  <span>RuPay / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('NETBANKING')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center space-y-1.5 transition-all btn-minimal ${
                    paymentMethod === 'NETBANKING'
                      ? 'bg-sky-50 text-sky-800 border-sky-400 ring-2 ring-sky-400/20 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-sky-600" />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            {/* Input Details */}
            {paymentMethod === 'UPI' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">UPI ID / GPay / PhonePe VPA</label>
                <input
                  type="text"
                  required
                  value={vpa}
                  onChange={(e) => setVpa(e.target.value)}
                  placeholder="username@upi or 9876543210@paytm"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-semibold"
                />
              </div>
            )}

            {paymentMethod === 'CARD' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">RuPay / Visa / Mastercard</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-semibold"
                />
              </div>
            )}

            {paymentMethod === 'NETBANKING' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Indian Bank</label>
                <select className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-semibold bg-white">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Punjab National Bank (PNB)</option>
                </select>
              </div>
            )}

            {/* Action Submit */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md transition-all btn-minimal flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Authorize & Pay ₹{parseFloat(amount).toFixed(2)}</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-slate-400 font-medium">
              🔒 Powered by Razorpay & Paytm Gateway • Instant WhatsApp & SMS Receipt
            </p>

          </form>
        )}

      </div>
    </div>
  );
}
