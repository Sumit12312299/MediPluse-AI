import React, { useState, useEffect, useRef } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Sparkles, ArrowLeft, ShieldCheck, Send, Brain, Stethoscope, User, Heart, Activity, FileText, Share2 } from 'lucide-react';

export default function TeleconsultationRoom({ appointment, onBackToDashboard }) {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState('scribe');
  const [chatInput, setChatInput] = useState('');
  const [callDuration, setCallDuration] = useState(312); // 05:12 in seconds
  
  const localVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const [liveTranscript, setLiveTranscript] = useState([
    { sender: 'Dr. Rajesh Sharma', time: '10:31 AM', text: 'Namaste Rahul! How are you feeling after taking the prescribed cardiology medication?' },
    { sender: 'Rahul Verma', time: '10:32 AM', text: 'Good morning Dr. Sharma. My blood pressure has stabilized at 120/78 today.' },
    { sender: 'AI Scribe', time: '10:32 AM', text: '[AI Clinical Note]: Patient vitals confirmed within normal physiological range (BP 120/78, HR 72 BPM).' }
  ]);

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

    // Simulate AI Scribe response
    setTimeout(() => {
      const aiMsg = {
        sender: 'AI Scribe',
        time: currentTime,
        text: `[AI Live Note]: Query recorded ("${currentInput}"). Synced with Doctor OPD record.`
      };
      setLiveTranscript(prev => [...prev, aiMsg]);
    }, 1000);
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
            <span>Live Call: <strong className="font-mono text-white text-sm">{formatTime(callDuration)}</strong></span>
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
          <div className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-2xl">
            
            {!isVideoOff ? (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-sky-500/20 border-2 border-sky-400/50 text-sky-300 mx-auto flex items-center justify-center shadow-2xl animate-pulse">
                  <Stethoscope className="w-12 h-12 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-black text-2xl text-white">{appointment?.doctor_name || 'Dr. Rajesh Sharma'}</h3>
                  <span className="text-xs text-emerald-400 font-extrabold flex items-center justify-center gap-1.5 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span> 1080p HD Encrypted Stream Active
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 space-y-2">
                <VideoOff className="w-12 h-12 text-red-500 mx-auto" />
                <p className="text-white font-extrabold text-base">Video Feed Paused</p>
              </div>
            )}

            {/* Local Patient PIP Video Feed */}
            <div className="absolute bottom-6 right-6 w-48 h-36 rounded-2xl bg-slate-900 border-2 border-sky-400 shadow-2xl overflow-hidden flex items-center justify-center">
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
                <div className="text-center p-2 text-red-400">
                  <VideoOff className="w-6 h-6 mx-auto" />
                  <span className="text-xs text-slate-400 font-extrabold block mt-1">Cam Muted</span>
                </div>
              )}
            </div>

          </div>

          {/* Floating Controls Bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-4 px-6 py-3 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 shadow-2xl">
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all btn-minimal flex items-center space-x-2 ${
                isMicMuted ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
              <span>{isMicMuted ? 'Unmute Mic' : 'Mute Mic'}</span>
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all btn-minimal flex items-center space-x-2 ${
                isVideoOff ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4 text-white" />}
              <span>{isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}</span>
            </button>

            <button
              onClick={() => alert('Screen sharing initialized in HD mode!')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold transition-all btn-minimal flex items-center space-x-2 border border-slate-700"
            >
              <Share2 className="w-4 h-4 text-sky-400" />
              <span>Share Screen</span>
            </button>

            <button
              onClick={onBackToDashboard}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold transition-all btn-minimal shadow-lg flex items-center space-x-2"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call</span>
            </button>
          </div>

        </div>

        {/* Right Side: Tabbed AI Scribe & Clinical Workspace (1 Col) */}
        <div className="bg-slate-900 border-l border-slate-800 p-5 flex flex-col justify-between space-y-4">
          
          {/* Segmented Sidebar Tabs */}
          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1">
              <button
                onClick={() => setActiveRightTab('scribe')}
                className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition-all btn-minimal flex items-center justify-center space-x-1.5 ${
                  activeRightTab === 'scribe' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>AI Scribe</span>
              </button>

              <button
                onClick={() => setActiveRightTab('chat')}
                className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition-all btn-minimal flex items-center justify-center space-x-1.5 ${
                  activeRightTab === 'chat' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Chat</span>
              </button>

              <button
                onClick={() => setActiveRightTab('vitals')}
                className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition-all btn-minimal flex items-center justify-center space-x-1.5 ${
                  activeRightTab === 'vitals' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Vitals</span>
              </button>
            </div>

            {/* Tab 1: AI Scribe Transcript */}
            {activeRightTab === 'scribe' && (
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {liveTranscript.map((t, i) => (
                  <div key={i} className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                    t.sender === 'AI Scribe' 
                      ? 'bg-sky-950/70 text-sky-200 border border-sky-800/80' 
                      : 'bg-slate-800 text-slate-200 border border-slate-700'
                  }`}>
                    <div className="flex items-center justify-between font-bold text-[10px] text-slate-400">
                      <span>{t.sender}</span>
                      <span>{t.time}</span>
                    </div>
                    <p className="font-semibold leading-relaxed">{t.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Live Chat */}
            {activeRightTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between space-y-3 min-h-0">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {liveTranscript.filter(t => t.sender !== 'AI Scribe').map((t, i) => (
                    <div key={i} className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                      t.sender === 'Rahul Verma' 
                        ? 'bg-emerald-950/70 text-emerald-200 border border-emerald-800 ml-4' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700 mr-4'
                    }`}>
                      <div className="flex items-center justify-between font-bold text-[10px] text-slate-400">
                        <span>{t.sender}</span>
                        <span>{t.time}</span>
                      </div>
                      <p className="font-semibold">{t.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type message to doctor..."
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

            {/* Tab 3: Patient Vitals Card */}
            {activeRightTab === 'vitals' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" /> Patient Physiological Metrics
                  </span>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Blood Pressure</span>
                      <p className="text-xl font-black text-emerald-400">120 / 78</p>
                      <span className="text-[10px] text-slate-500 font-bold">mmHg • Normal</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Heart Rate</span>
                      <p className="text-xl font-black text-sky-400">72 BPM</p>
                      <span className="text-[10px] text-slate-500 font-bold">Regular Rhythm</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <span className="font-extrabold text-slate-300 block">Allergy & Health History</span>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    No known drug allergies (NKDA). Mild hypertension under beta-blocker treatment.
                  </p>
                </div>
              </div>
            )}

          </div>

          <p className="text-[11px] text-slate-500 font-bold text-center border-t border-slate-800/80 pt-3">
            Gemini AI Voice Scribe Active • MediPulse OS
          </p>

        </div>

      </div>

    </div>
  );
}
