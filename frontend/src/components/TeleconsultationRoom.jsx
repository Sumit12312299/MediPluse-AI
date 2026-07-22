import React, { useState, useEffect, useRef } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Sparkles, ArrowLeft, ShieldCheck, Send, Brain, Stethoscope, User, Heart, Activity, FileText, Share2, Camera } from 'lucide-react';

export default function TeleconsultationRoom({ appointment, onBackToDashboard }) {
  const doctorName = appointment?.doctor_name || 'Dr. Rajesh Sharma';

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState('chat');
  const [chatInput, setChatInput] = useState('');
  const [callDuration, setCallDuration] = useState(312); // 05:12 in seconds
  const [isDoctorTyping, setIsDoctorTyping] = useState(false);
  const [liveHeartRate, setLiveHeartRate] = useState(72);
  const [liveSubtitles, setLiveSubtitles] = useState(`${doctorName}: "Namaste Rahul! Let's check your current cardiological metrics."`);
  const [showFlash, setShowFlash] = useState(false);

  // Fluctuating Heart Rate & Subtitles
  useEffect(() => {
    const hrInterval = setInterval(() => {
      setLiveHeartRate(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next >= 68 && next <= 78 ? next : prev;
      });
    }, 4000);

    const subtitleList = [
      `${doctorName}: "Let's review your cardiology history. Any pain or discomfort today?"`,
      `${doctorName}: "Your heart rate and EKG rhythms show stable signals."`,
      `${doctorName}: "Please continue monitoring your vitals after your morning walk."`,
      `${doctorName}: "I am modifying your digital prescription dosage slightly."`,
      `${doctorName}: "Let's schedule a follow-up consultation in about two weeks."`
    ];

    const subInterval = setInterval(() => {
      const randomSub = subtitleList[Math.floor(Math.random() * subtitleList.length)];
      setLiveSubtitles(randomSub);
    }, 8000);

    return () => {
      clearInterval(hrInterval);
      clearInterval(subInterval);
    };
  }, [doctorName]);

  const localVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const chatEndRef = useRef(null);

  const [liveTranscript, setLiveTranscript] = useState([
    { sender: doctorName, time: '10:31 AM', text: 'Namaste Rahul! How are you feeling after taking the prescribed cardiology medication?' },
    { sender: 'Rahul Verma', time: '10:32 AM', text: `Good morning ${doctorName.split(' ')[1] || 'Doctor'}. My blood pressure has stabilized at 120/78 today.` },
    { sender: doctorName, time: '10:32 AM', text: "That's excellent news! Please continue taking the dosage after meals and stay hydrated." }
  ]);

  // Handle Auto Scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [liveTranscript, activeRightTab]);

  // Handle Real HTML5 Camera Stream
  useEffect(() => {
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
  }, [isVideoOff]);

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

    setIsDoctorTyping(true);

    // Simulate Direct Doctor Response (Not AI!)
    setTimeout(() => {
      setIsDoctorTyping(false);
      const doctorResponses = [
        `Rahul, I have noted your message ("${currentInput}"). Everything looks under control.`,
        `Thank you for the update Rahul. Please keep monitoring your vitals daily.`,
        `Understood Rahul. Feel free to reach out if you notice any unusual symptoms.`
      ];
      const randomDocReply = doctorResponses[Math.floor(Math.random() * doctorResponses.length)];
      
      const docMsg = {
        sender: doctorName,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: randomDocReply
      };
      setLiveTranscript(prev => [...prev, docMsg]);
    }, 2000);
  };

  const handleCaptureSnapshot = () => {
    // Trigger flash animation
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 250);

    const videoEl = localVideoRef.current;
    if (videoEl && hasCameraPermission && !isVideoOff) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoEl.videoWidth || 640;
        canvas.height = videoEl.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/png');
          
          const downloadLink = document.createElement('a');
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          downloadLink.href = dataUrl;
          downloadLink.download = `MediPulse-Snapshot-${timestamp}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      } catch (err) {
        console.error('Failed to capture snapshot:', err);
      }
    } else {
      alert('Camera feed is muted or inactive. Please turn on your camera to capture a snapshot!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans animate-slide-up">
      
      {/* Room Header Navigation Bar */}
      <header className="h-18 px-6 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToDashboard}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold transition-all btn-minimal flex items-center space-x-2 border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Return to Dashboard</span>
          </button>

          <div className="h-6 w-px bg-slate-800"></div>

          <div>
            <h2 className="font-extrabold text-base text-white flex items-center gap-2">
              Tele-Health WebRTC Video Room <span className="text-xs font-mono font-bold text-sky-400">#TC-8921</span>
            </h2>
            <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> HIPAA Encrypted 256-bit Connection
            </p>
          </div>
        </div>

        {/* Live Timer & Doctor Profile */}
        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-extrabold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Call: <strong className="font-mono text-emerald-400 text-sm neon-glow-emerald">{formatTime(callDuration)}</strong></span>
          </div>

          <div className="hidden sm:flex items-center space-x-3 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
            <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">{appointment?.doctor_name || 'Dr. Rajesh Sharma'}</p>
              <p className="text-[10px] text-sky-400 font-semibold">Cardiology OPD</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Full Page Video Call Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-0 overflow-hidden">
        
        {/* Left Side: Large Main Video Screen (3 Cols) */}
        <div className="lg:col-span-3 bg-slate-950 p-4 sm:p-6 relative flex flex-col justify-between">
          
          {/* Main Remote Video Stream Box */}
          <div className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-2xl ambient-video-glow">
            
            {showFlash && (
              <div className="absolute inset-0 bg-white z-40 animate-pulse duration-100"></div>
            )}

            {!isVideoOff ? (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-sky-500/20 border-2 border-sky-400/50 text-sky-300 mx-auto flex items-center justify-center shadow-2xl animate-pulse">
                  <Stethoscope className="w-12 h-12 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-black text-2xl text-white">{doctorName}</h3>
                  <span className="text-xs text-emerald-400 font-extrabold flex items-center justify-center gap-1.5 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span> 1080p HD Encrypted Stream Active
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center shadow-2xl relative">
                  <Stethoscope className="w-9 h-9 text-slate-500" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center border-2 border-slate-905">
                    <VideoOff className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-350">{doctorName}</h3>
                  <p className="text-xs text-rose-450 font-bold mt-1">Video Stream Paused by Doctor</p>
                </div>
              </div>
            )}

            {/* Real-time Subtitle/Caption Overlay */}
            {!isVideoOff && (
              <div className="absolute top-6 left-6 bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800/80 max-w-sm shadow-lg animate-fade-in-up">
                <span className="text-[9px] font-black text-sky-400 uppercase tracking-widest block mb-1">Live AI Subtitles</span>
                <p className="text-xs font-bold text-slate-200 italic leading-relaxed">
                  {liveSubtitles}
                </p>
              </div>
            )}

            {/* Local Patient PIP Video Feed */}
            <div className={`absolute bottom-6 right-6 w-48 h-36 rounded-2xl bg-slate-900 border-2 shadow-2xl overflow-hidden flex items-center justify-center transition-all duration-300 ${
              isVideoOff ? 'border-slate-800' : 'border-sky-450'
            }`}>
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
                  <div className="text-center p-3 space-y-1">
                    <User className="w-8 h-8 text-sky-400 mx-auto" />
                    <span className="text-xs text-white font-extrabold block">Rahul Verma</span>
                    <span className="text-[10px] text-emerald-400 font-bold block">● Live Local Cam</span>
                  </div>
                )
              ) : (
                <div className="text-center p-2 text-slate-500 space-y-1.5 animate-fade-in">
                  <VideoOff className="w-6 h-6 text-slate-600 mx-auto" />
                  <span className="text-xs text-slate-450 font-bold block">Cam Muted</span>
                </div>
              )}

              {/* Dynamic Mic Level Visualizer overlay */}
              {!isMicMuted && (
                <div className="absolute top-3 right-3 flex items-end gap-0.5 h-3.5 px-1.5 py-0.5 rounded bg-slate-950/85 backdrop-blur-xs border border-slate-800 shadow-lg">
                  <span className="w-0.5 bg-emerald-400 rounded-full audio-bar-anim [animation-delay:-0.2s]"></span>
                  <span className="w-0.5 bg-emerald-400 rounded-full audio-bar-anim [animation-delay:-0.4s]"></span>
                  <span className="w-0.5 bg-emerald-400 rounded-full audio-bar-anim [animation-delay:-0.1s]"></span>
                </div>
              )}
            </div>

          </div>

          {/* Floating Controls Bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-3 px-5 py-3 rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
            {/* Mic Toggle Button */}
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                isMicMuted 
                  ? 'bg-rose-500/90 text-white border border-rose-400/40 shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:bg-rose-600' 
                  : 'bg-slate-800/80 text-emerald-400 border border-slate-700/50 hover:bg-slate-700 hover:text-emerald-350'
              }`}
              title={isMicMuted ? "Unmute Mic" : "Mute Mic"}
            >
              {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Camera Toggle Button */}
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                isVideoOff 
                  ? 'bg-rose-500/90 text-white border border-rose-400/40 shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:bg-rose-600' 
                  : 'bg-slate-800/80 text-emerald-400 border border-slate-700/50 hover:bg-slate-700 hover:text-emerald-350'
              }`}
              title={isVideoOff ? "Turn Camera On" : "Turn Camera Off"}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>

            {/* Snapshot Button */}
            <button
              onClick={handleCaptureSnapshot}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-800/80 text-teal-400 border border-slate-700/50 hover:bg-slate-700 hover:text-teal-350 transition-all duration-300 hover:scale-105 active:scale-95"
              title="Capture patient webcam snapshot"
            >
              <Camera className="w-5 h-5" />
            </button>

            {/* Share Screen Button */}
            <button
              onClick={() => alert('Screen sharing initialized in HD mode!')}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-800/80 text-sky-400 border border-slate-700/50 hover:bg-slate-700 hover:text-sky-350 transition-all duration-300 hover:scale-105 active:scale-95"
              title="Share Screen"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <div className="w-px h-8 bg-slate-800 mx-1"></div>

            {/* End Call Button */}
            <button
              onClick={onBackToDashboard}
              className="h-12 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.4)] border border-rose-500/30"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call</span>
            </button>
          </div>

        </div>

        {/* Right Side: Tabbed Direct Doctor-Patient Chat Workspace (1 Col) */}
        <div className="bg-slate-900 border-l border-slate-800 p-5 flex flex-col justify-between space-y-4">
          
          {/* Segmented Sidebar Tabs */}
          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1">
              <button
                onClick={() => setActiveRightTab('chat')}
                className={`flex-1 py-2 rounded-lg text-[11px] font-extrabold transition-all btn-minimal flex items-center justify-center space-x-1 ${
                  activeRightTab === 'chat' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>

              <button
                onClick={() => setActiveRightTab('vitals')}
                className={`flex-1 py-2 rounded-lg text-[11px] font-extrabold transition-all btn-minimal flex items-center justify-center space-x-1 ${
                  activeRightTab === 'vitals' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Vitals</span>
              </button>

              <button
                onClick={() => setActiveRightTab('prescription')}
                className={`flex-1 py-2 rounded-lg text-[11px] font-extrabold transition-all btn-minimal flex items-center justify-center space-x-1 ${
                  activeRightTab === 'prescription' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Rx Scribe</span>
              </button>
            </div>

            {/* Direct Doctor-Patient Chat Session (Scrollable with Auto-Scroll) */}
            {activeRightTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between space-y-3 min-h-0 animate-fade-in-up">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[380px] custom-scrollbar">
                  {liveTranscript.map((t, i) => (
                    <div key={i} className={`p-3.5 rounded-2xl text-xs space-y-1.5 ${
                      t.sender === 'Rahul Verma' 
                        ? 'bg-sky-600 text-white shadow-xs ml-6' 
                        : 'bg-slate-800 text-slate-100 border border-slate-700 mr-6'
                    }`}>
                      <div className="flex items-center justify-between font-extrabold text-[10px] text-slate-300 opacity-90">
                        <span>{t.sender}</span>
                        <span>{t.time}</span>
                      </div>
                      <p className="font-semibold leading-relaxed">{t.text}</p>
                    </div>
                  ))}
                  
                  {isDoctorTyping && (
                    <div className="p-3.5 rounded-2xl text-xs bg-slate-800 text-slate-100 border border-slate-700 mr-6 animate-pulse flex items-center justify-between">
                      <span className="font-extrabold text-[10px] text-sky-400">{doctorName} is typing...</span>
                      <span className="flex space-x-1">
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0s]"></span>
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </span>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Type message to ${doctorName}...`}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white transition-all btn-minimal shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: Patient Vitals Card */}
            {activeRightTab === 'vitals' && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 glass-vitals-card">
                  <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" /> Patient Physiological Metrics
                  </span>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-850 glass-vitals-card">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Blood Pressure</span>
                      <p className="text-xl font-black text-emerald-400">120 / 78</p>
                      <span className="text-[10px] text-slate-500 font-bold">mmHg • Normal</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-850 glass-vitals-card">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Heart Rate</span>
                      <p className="text-xl font-black text-sky-400 flex items-center gap-1.5">
                        <span>{liveHeartRate} BPM</span>
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block"></span>
                      </p>
                      <span className="text-[10px] text-slate-500 font-bold">Regular Rhythm</span>
                    </div>
                  </div>

                  <div className="relative h-12 w-full mt-2 bg-slate-900/60 rounded-xl overflow-hidden flex items-center border border-slate-800/80 px-2">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest absolute left-3 top-2 z-10 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> EKG Monitor
                    </span>
                    <svg className="w-full h-8 stroke-emerald-400" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
                      <path
                        className="animate-ecg-path"
                        style={{ animationDuration: `${(60 / liveHeartRate) * 3}s` }}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M0,10 L30,10 L35,2 L40,18 L45,10 L50,10 L52,7 L55,13 L57,10 L100,10"
                      />
                    </svg>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 glass-vitals-card">
                  <span className="font-extrabold text-slate-300 block">Allergy & Health History</span>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    No known drug allergies (NKDA). Mild hypertension under beta-blocker treatment.
                  </p>
                </div>
              </div>
            )}

            {activeRightTab === 'prescription' && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 glass-vitals-card">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                    <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-500" /> Rx Draft
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-sky-950/60 text-sky-400 border border-sky-900/60 animate-pulse">
                      ● Live Sync
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Diagnosis</span>
                      <p className="text-xs font-semibold text-slate-200">Hypertension & Cardiological Review</p>
                    </div>

                    <div className="h-px bg-slate-850"></div>

                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Prescribed Regimen</span>
                      <ul className="space-y-1.5 mt-1">
                        <li className="text-[11px] font-medium text-slate-300 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5"></span>
                          <div>
                            <strong className="text-white">Amlodipine 5mg</strong> — Once daily in the morning
                          </div>
                        </li>
                        <li className="text-[11px] font-medium text-slate-300 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5"></span>
                          <div>
                            <strong className="text-white">Metoprolol 25mg</strong> — Twice daily after meals
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="h-px bg-slate-850"></div>

                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase flex items-center gap-1">
                        <Brain className="w-3.5 h-3.5 text-purple-400" /> Live AI Summary Scribe
                      </span>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-semibold italic mt-1 bg-purple-950/20 border border-purple-900/30 p-2.5 rounded-xl">
                        "Patient Rahul Verma reports BP stabilization at 120/78. Continue current medication regimen with proper hydration. Scheduled follow-up in two weeks."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          <p className="text-[11px] text-slate-500 font-bold text-center border-t border-slate-800/80 pt-3">
            Direct Doctor-Patient Tele-Consultation Stream • MediPulse OS
          </p>

        </div>

      </div>

    </div>
  );
}
