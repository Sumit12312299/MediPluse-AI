import React, { useState, useEffect } from 'react';
import { CreditCard, QrCode, Building2, Smartphone, ShieldCheck, Lock, CheckCircle2, X, Sparkles, ArrowRight, Loader2, Receipt, Check, Copy, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentModal({ appointment, isOpen, onClose, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [vpa, setVpa] = useState('rahul@okicici');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8842');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txId, setTxId] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(299);
  const [copiedTx, setCopiedTx] = useState(false);

  useEffect(() => {
    if (!isOpen || isSuccess) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isSuccess]);

  if (!isOpen || !appointment) return null;

  const amount = appointment.doctor_fee || 800.00;
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  const triggerConfettiExplosion = () => {
    // Multi-stage high velocity confetti burst
    confetti({
      particleCount: 120,
      spread: 90,
      startVelocity: 45,
      ticks: 200,
      scalar: 1.25,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#0f766e', '#10b981', '#38bdf8', '#fbbf24']
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        startVelocity: 40,
        ticks: 200,
        scalar: 1.1,
        origin: { x: 0 },
        colors: ['#38bdf8', '#34d399', '#f59e0b']
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        startVelocity: 40,
        ticks: 200,
        scalar: 1.1,
        origin: { x: 1 },
        colors: ['#0284c7', '#10b981', '#fbbf24']
      });
    }, 250);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingStep(0);

    // Simulate smooth payment gateway stages
    const steps = [
      () => setProcessingStep(1), // Kontakt Gateway
      () => setProcessingStep(2), // Handshake
      () => setProcessingStep(3)  // Finalizing
    ];

    steps.forEach((runStep, index) => {
      setTimeout(runStep, (index + 1) * 850);
    });

    setTimeout(async () => {
      try {
        const res = await onPaymentSuccess({
          appointment_id: appointment.id,
          amount: amount,
          payment_method: paymentMethod === 'UPI' ? `UPI (${selectedUpiApp.toUpperCase()})` : paymentMethod === 'CARD' ? 'RuPay / Credit Card' : 'NetBanking',
        });

        const generatedTx = res?.transaction_id || `TXN_IND_${Math.floor(100000 + Math.random() * 900000)}`;
        setTxId(generatedTx);

        setIsProcessing(false);
        setIsSuccess(true);
        triggerConfettiExplosion();

        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 4000);
      } catch (err) {
        setIsProcessing(false);
      }
    }, 3200);
  };

  const handleCopyTx = () => {
    navigator.clipboard.writeText(txId);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-slide-up"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden z-10 animate-slide-up">
        
        {/* Sleek Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-400 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                MediPulse Smart Checkout
              </h3>
              <p className="text-xs text-sky-300 font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> RBI & Razorpay 256-Bit SSL Encrypted
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
          <div className="p-8 text-center space-y-6 animate-slide-up">
            
            {/* Animated Success Checkmark Ring */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 scale-105 transition-transform duration-500">
                <CheckCircle2 className="w-12 h-12 animate-bounce" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">Payment Verified & Settled!</h4>
              <p className="text-xs text-slate-500 font-semibold">Your OPD slot reservation has been officially confirmed.</p>
            </div>

            {/* Smooth Digital Receipt Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-xs space-y-3 text-slate-700 animate-slide-up">
              <div className="flex items-center justify-between font-mono font-extrabold">
                <span className="text-slate-500 flex items-center gap-1">
                  <Receipt className="w-4 h-4 text-emerald-600" /> Transaction ID:
                </span>
                <div className="flex items-center space-x-1.5 text-emerald-800">
                  <span>{txId}</span>
                  <button onClick={handleCopyTx} className="p-1 hover:bg-emerald-100 rounded text-emerald-700">
                    {copiedTx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="text-slate-900 text-base font-extrabold">₹{parseFloat(amount).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-emerald-200/80 font-bold text-emerald-800">
                <span>WhatsApp Invoice:</span>
                <span>✓ Sent to +91 98765 43210</span>
              </div>
            </div>

          </div>
        ) : isProcessing ? (
          <div className="p-10 text-center space-y-8 animate-slide-up flex flex-col items-center">
            {/* Spinning Glow Circle */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-sky-100 animate-pulse"></div>
              <Loader2 className="w-14 h-14 text-sky-600 animate-spin" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-black text-slate-900">Authorizing Payment...</h4>
              <p className="text-xs text-slate-500 font-bold">Please do not refresh this page or close the window.</p>
            </div>

            {/* Simulated Live Stepper (Progressive verification) */}
            <div className="w-full max-w-sm bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  processingStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-sky-100 text-sky-700 animate-pulse'
                }`}>
                  {processingStep >= 1 ? '✓' : '1'}
                </div>
                <span className={`text-xs font-bold ${processingStep >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                  Connecting to payment gateway...
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  processingStep >= 2 ? 'bg-emerald-500 text-white' : processingStep === 1 ? 'bg-sky-100 text-sky-700 animate-pulse' : 'bg-slate-200 text-slate-400'
                }`}>
                  {processingStep >= 2 ? '✓' : '2'}
                </div>
                <span className={`text-xs font-bold ${processingStep >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                  Establishing bank-level RBI handshake...
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  processingStep >= 3 ? 'bg-emerald-500 text-white' : processingStep === 2 ? 'bg-sky-100 text-sky-700 animate-pulse' : 'bg-slate-200 text-slate-400'
                }`}>
                  {processingStep >= 3 ? '✓' : '3'}
                </div>
                <span className={`text-xs font-bold ${processingStep >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>
                  Securing tokenized settlement...
                </span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 sm:p-7 space-y-6">
            
            {/* Consultation Invoice Breakdown Card */}
            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900 pb-2 border-b border-slate-200/80">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    Dr
                  </div>
                  <div>
                    <h5 className="text-slate-900">{appointment.doctor_name || 'Dr. Rajesh Sharma'}</h5>
                    <span className="text-[11px] text-sky-700 font-semibold">{appointment.doctor_specialization || 'Cardiology OPD'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-medium uppercase block">Session Fee</span>
                  <span className="font-extrabold text-slate-900 text-sm">₹{parseFloat(amount).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-slate-500 font-medium pt-0.5">
                <span>AI Voice Prescription Scribe</span>
                <span className="text-emerald-700 font-bold">FREE (₹0.00)</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 font-medium">
                <span>GST & Medical Platform Cess</span>
                <span className="text-slate-400 line-through">₹144.00</span>
              </div>

              <div className="flex items-center justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount Payable</span>
                <span className="text-2xl text-slate-900 font-extrabold">₹{parseFloat(amount).toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Payment Method</label>
                <span className="text-[11px] text-amber-700 font-extrabold flex items-center gap-1">
                  ⏱️ Session Expires: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-2xl border text-xs font-extrabold flex flex-col items-center justify-center space-y-1.5 transition-all btn-minimal hover:scale-102 hover:shadow-sm ${
                    paymentMethod === 'UPI'
                      ? 'bg-sky-50 text-sky-905 border-sky-400 ring-2 ring-sky-400/20 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-sky-600 animate-pulse" />
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-2xl border text-xs font-extrabold flex flex-col items-center justify-center space-y-1.5 transition-all btn-minimal hover:scale-102 hover:shadow-sm ${
                    paymentMethod === 'CARD'
                      ? 'bg-sky-50 text-sky-905 border-sky-400 ring-2 ring-sky-400/20 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-sky-600" />
                  <span>RuPay / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('NETBANKING')}
                  className={`p-3 rounded-2xl border text-xs font-extrabold flex flex-col items-center justify-center space-y-1.5 transition-all btn-minimal hover:scale-102 hover:shadow-sm ${
                    paymentMethod === 'NETBANKING'
                      ? 'bg-sky-50 text-sky-905 border-sky-400 ring-2 ring-sky-400/20 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-sky-600" />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            {/* Input Details Tab 1: UPI */}
            {paymentMethod === 'UPI' && (
              <div className="space-y-4 animate-slide-up">
                
                {/* ⚡ Sleek Dynamic UPI QR Code Scanner with Laser Beam */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white flex items-center justify-between gap-4 border border-sky-500/30 shadow-md">
                  <div className="space-y-1.5 max-w-[240px]">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-black text-emerald-300 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Live QR Active
                    </span>
                    <h5 className="text-sm font-extrabold text-white">Scan & Pay via Any UPI App</h5>
                    <p className="text-[11px] text-sky-200 font-medium">GPay, PhonePe, Paytm, CRED, or BHIM</p>
                  </div>

                  {/* Animated Scanner Box */}
                  <div className="relative w-24 h-24 p-2 rounded-xl bg-white/95 border border-sky-400/40 shadow-inner flex items-center justify-center overflow-hidden shrink-0">
                    <QrCode className="w-16 h-16 text-slate-900" />
                    {/* Laser Scanning Beam Line */}
                    <div className="animate-qr-scan"></div>
                    {/* HUD Corner Markers */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-sky-500"></div>
                    <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-sky-500"></div>
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-sky-500"></div>
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-sky-500"></div>
                  </div>
                </div>

                {/* UPI App Quick Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Popular UPI Apps</span>
                  <div className="grid grid-cols-4 gap-2">
                    {['gpay', 'phonepe', 'paytm', 'bhim'].map(app => (
                      <button
                        type="button"
                        key={app}
                        onClick={() => setSelectedUpiApp(app)}
                        className={`py-2 rounded-xl text-xs font-extrabold uppercase border transition-all btn-minimal hover:scale-102 ${
                          selectedUpiApp === app
                            ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Enter Virtual Payment Address (VPA)</label>
                  <input
                    type="text"
                    required
                    value={vpa}
                    onChange={(e) => setVpa(e.target.value)}
                    placeholder="e.g. rahul@okicici"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-semibold"
                  />
                </div>
              </div>
            )}

            {/* Input Details Tab 2: CARD */}
            {paymentMethod === 'CARD' && (
              <div className="space-y-3 animate-slide-up">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 •••• •••• 8842"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="08/28"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">CVV / CVC</label>
                    <input
                      type="password"
                      required
                      maxLength="3"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Input Details Tab 3: NETBANKING */}
            {paymentMethod === 'NETBANKING' && (
              <div className="space-y-1.5 animate-slide-up">
                <label className="text-xs font-bold text-slate-700">Select NetBanking Partner Bank</label>
                <select className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-semibold bg-white">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                  <option>Punjab National Bank (PNB)</option>
                </select>
              </div>
            )}

            {/* Action Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all btn-minimal flex items-center justify-center space-x-2 active:scale-98"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Authorize & Pay ₹{parseFloat(amount).toFixed(2)}</span>
            </button>

            {/* Security Badges Footer */}
            <div className="flex items-center justify-center space-x-4 pt-1 border-t border-slate-100 text-[10px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-500" /> PCI-DSS v4.0 Certified</span>
              <span>•</span>
              <span>Razorpay Tokenized</span>
              <span>•</span>
              <span>WhatsApp Invoice Active</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
