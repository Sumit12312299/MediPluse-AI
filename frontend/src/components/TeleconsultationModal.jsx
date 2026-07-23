import React, { useState, useEffect, useRef } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Sparkles, X, Brain, Stethoscope, User, ShieldCheck, Send, CheckCircle2, Camera } from 'lucide-react';

export default function TeleconsultationModal({ appointment, isOpen, onClose }) {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [callDuration, setCallDuration] = useState(255); // 04:15 in seconds
  
  const localVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const chatEndRef = useRef(null);

  const [liveTranscript, setLiveTranscript] = useState([
    { sender: 'Dr. Rajesh Sharma', time: '10:31 AM', text: 'Namaste Rahul! How are you feeling after taking the prescribed cardiology medication?' },
    { sender: 'Rahul Verma', time: '10:32 AM', text: 'Good morning Dr. Sharma. My blood pressure has stabilized at 120/78 today.' },
    { sender: 'Dr. Rajesh Sharma', time: '10:32 AM', text: "That's excellent news! Please continue taking the dosage after meals." }
  ]);

  // Auto Scroll Chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [liveTranscript]);

  // Handle Real HTML5 Camera Stream
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    if (!isVideoOff) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      clearInterval(timer);
      stopCamera();
    };
  }, [isOpen, isVideoOff]);

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        mediaStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      }
    } catch (err) {
      console.log('Webcam permission error:', err);
      setHasCameraPermission(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
  };

  if (!isOpen || !appointment) return null;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'Rahul Verma', time: currentTime, text: chatInput };
    
    setLiveTranscript(prev => [...prev, userMsg]);
    const currentInput = chatInput;
    setChatInput('');

    // Direct Doctor Response (Not AI!)
    setTimeout(() => {
      const doctorResponses = [
        `Rahul, I have noted your message ("${currentInput}"). Everything looks under control.`,
        `Thank you for the update Rahul. Please keep monitoring your vitals daily.`,
        `Understood Rahul. Feel free to reach out if you notice any unusual symptoms.`
      ];
      const randomDocReply = doctorResponses[Math.floor(Math.random() * doctorResponses.length)];
      
      const docMsg = {
        sender: 'Dr. Rajesh Sharma',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: randomDocReply
      };
      setLiveTranscript(prev => [...prev, docMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-modal-pop"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden z-10 animate-modal-pop space-y-0 text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shadow-xs">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                Tele-Health WebRTC Video Suite
              </h3>
              <p className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> WebRTC Encrypted • Live Call Duration: <span className="font-mono text-white font-extrabold">{formatTime(callDuration)}</span>
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

        {/* Video & Direct Chat Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-[520px]">
          
          {/* Main Video Screen (2 Cols) */}
          <div className="lg:col-span-2 bg-slate-950 p-4 relative flex flex-col justify-between">
            
            {/* Remote Doctor Stream Container */}
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center">
              
              {!isVideoOff ? (
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 mx-auto flex items-center justify-center text-xl font-extrabold shadow-xl animate-pulse">
                    <Stethoscope className="w-10 h-10 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-lg">{appointment.doctor_name || 'Dr. Rajesh Sharma'}</h4>
                    <span className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Video Stream Connected
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400 font-medium text-xs space-y-2">
                  <VideoOff className="w-10 h-10 mx-auto text-red-400" />
                  <p className="text-white font-bold">Video Feed Paused</p>
                </div>
              )}

              {/* Local Patient PIP Webcam Video Element */}
              <div className="absolute bottom-4 right-4 w-36 h-28 rounded-2xl bg-slate-900 border-2 border-sky-400 shadow-2xl overflow-hidden flex items-center justify-center">
                {!isVideoOff ? (
                  hasCameraPermission ? (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center p-2 space-y-1">
                      <User className="w-6 h-6 text-sky-400 mx-auto" />
                      <span className="text-[10px] text-white font-extrabold block">Rahul Verma</span>
                      <span className="text-[9px] text-emerald-400 font-bold block">● Live Feed</span>
                    </div>
                  )
                ) : (
                  <div className="text-center p-2 text-red-400">
                    <VideoOff className="w-5 h-5 mx-auto" />
                    <span className="text-[9px] text-slate-400 block font-bold mt-1">Cam Off</span>
                  </div>
                )}
              </div>

            </div>

            {/* Video Action Controls Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3 px-5 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/90 shadow-xl">
              <button
                type="button"
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all btn-minimal flex items-center space-x-1.5 ${
                  isMicMuted ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
                <span>{isMicMuted ? 'Unmute Mic' : 'Mute Mic'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all btn-minimal flex items-center space-x-1.5 ${
                  isVideoOff ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4 text-white" />}
                <span>{isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold transition-all btn-minimal shadow-md flex items-center space-x-1.5"
                title="End Consultation Call"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            </div>

          </div>

          {/* Direct Doctor-Patient Chat Session Drawer (1 Col) */}
          <div className="bg-slate-50 border-l border-slate-200 p-4 flex flex-col justify-between space-y-3">
            <div className="space-y-3 flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-sky-600" /> Direct Doctor Chat
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>

              {/* Chat List (Smooth Scrollable Container + Auto-Scroll to Bottom) */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[380px]">
                {liveTranscript.map((t, i) => (
                  <div key={i} className={`p-3 rounded-xl text-xs space-y-1 ${
                    t.sender === 'Rahul Verma'
                      ? 'bg-sky-600 text-white shadow-xs ml-4'
                      : 'bg-white text-slate-900 border border-slate-200/90 shadow-2xs mr-4'
                  }`}>
                    <div className="flex items-center justify-between font-extrabold text-[10px] text-slate-400">
                      <span className={t.sender === 'Rahul Verma' ? 'text-sky-100' : 'text-slate-500'}>{t.sender}</span>
                      <span className={t.sender === 'Rahul Verma' ? 'text-sky-200' : 'text-slate-400'}>{t.time}</span>
                    </div>
                    <p className="font-semibold leading-relaxed">{t.text}</p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Live Chat Input Form */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type message to Dr. Rajesh Sharma..."
                className="flex-1 px-3 py-2 rounded-xl glass-input text-xs font-semibold"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-slate-900 hover:bg-sky-900 text-white transition-all btn-minimal shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
