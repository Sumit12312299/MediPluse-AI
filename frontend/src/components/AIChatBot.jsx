import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, HelpCircle, Mic, MicOff, Volume2, Globe, FileText, Stethoscope } from 'lucide-react';
import { api } from '../api';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste Rahul! I am your 24/7 MediPulse AI Clinical Assistant. You can speak or type to ask me about dosage, OPD scheduling, vitals, or medical Rx summaries!',
      context: [],
      poweredBy: 'Gemini RAG Engine'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN'; // Indian English / Hindi mix support

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome/Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleSendQuery = async (queryText) => {
    const targetQuery = queryText || input;
    if (!targetQuery.trim() || loading) return;

    setMessages(prev => [...prev, { sender: 'user', text: targetQuery }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.ragChat(targetQuery);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: res.answer,
          context: res.context || [],
          poweredBy: res.powered_by || 'MediPulse RAG Core'
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'MediPulse AI Knowledge Engine is processing your query. For emergency cardiology care, please contact OPD at +91 98765 43210.',
          context: ['Emergency Helpline'],
          poweredBy: 'Fallback Knowledge'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    handleSendQuery();
  };

  const quickActionChips = [
    { label: '💊 Explain Naproxen dosage', query: 'Explain Naproxen dosage and frequency' },
    { label: '🩺 How to book Cardiology OPD', query: 'How do I book a consultation with Dr. Rajesh Sharma?' },
    { label: '🌐 Translate Rx to Hindi', query: 'Can you translate my digital prescription summary into layman Hindi?' },
    { label: '⚡ Normal BP & ECG range', query: 'What is the normal blood pressure and ECG BPM range for adults?' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Toggle Button with Glowing Badge & Pulse Ring */}
      {!isOpen && (
        <div className="relative group">
          {/* Tooltip Hover Badge */}
          <div className="absolute -top-10 right-0 px-3 py-1 rounded-xl bg-slate-900 text-sky-300 text-[11px] font-extrabold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-sky-500/30">
            💬 Ask 24/7 MediPulse AI Assistant
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-slate-900 via-sky-950 to-slate-900 text-sky-400 shadow-[0_8px_32px_rgba(14,165,233,0.4)] hover:shadow-[0_8px_40px_rgba(14,165,233,0.6)] hover:scale-110 flex items-center justify-center border border-sky-500/40 hover:border-sky-400 transition-all duration-300 relative animate-float"
          >
            {/* Pulsing Backlight */}
            <div className="absolute inset-0 rounded-full bg-sky-500/25 animate-pulse"></div>
            {/* Rotating HUD Ring */}
            <div className="absolute -inset-1 rounded-full border border-dashed border-sky-400/40 group-hover:border-sky-400 animate-[spin_10s_linear_infinite] pointer-events-none"></div>
            
            <Bot className="w-6 h-6 text-sky-400 group-hover:text-white transition-colors relative z-10" />

            {/* Glowing Active Status Pill Badge */}
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[8px] font-black text-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            </span>
          </button>
        </div>
      )}

      {/* Glassmorphic Chatbot Window */}
      {isOpen && (
        <div className="w-88 sm:w-96 h-[520px] bg-slate-950/90 backdrop-blur-2xl border border-slate-800 rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden animate-modal-pop relative z-50">
          
          {/* Neon Top Edge Highlight Line */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>

          {/* Glowing Header Banner */}
          <div className="p-4 bg-gradient-to-r from-slate-950 via-sky-950/60 to-slate-950 border-b border-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 border-2 border-slate-950 animate-ping"></span>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 border border-sky-400/30 flex items-center justify-center shadow-inner">
                  <Bot className="w-5 h-5 text-sky-400 animate-pulse" />
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5 tracking-wide">
                  MediPulse Voice Assistant <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
                </h4>
                <p className="text-[10px] text-emerald-300 font-bold flex items-center gap-1">
                  ● Gemini 24/7 Live Clinical RAG Engine
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-all btn-minimal cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col space-y-1.5 max-w-[88%] ${
                  m.sender === 'user' ? 'ml-auto items-end animate-fade-in-left' : 'mr-auto items-start animate-fade-in-right'
                }`}
              >
                {/* Bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-xs transition-all ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-br from-sky-600 to-teal-600 text-white rounded-br-none border border-sky-400/30 shadow-md'
                      : 'bg-slate-900/80 backdrop-blur-md text-slate-100 border border-slate-800 rounded-bl-none shadow-inner'
                  }`}
                >
                  {m.text}
                </div>

                {/* Meta details for RAG context */}
                {m.sender === 'bot' && (
                  <div className="flex flex-col space-y-1 px-1 mt-1">
                    <span className="text-[9px] text-slate-500 font-bold">
                      Engine: <strong className="text-sky-400">{m.poweredBy}</strong>
                    </span>
                    {m.context && m.context.length > 0 && (
                      <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/40 w-fit">
                        <HelpCircle className="w-3 h-3 text-emerald-400" /> Matches: {m.context.join(', ')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex items-center space-x-2 mr-auto bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl rounded-bl-none animate-pulse">
                <span className="text-[10px] text-sky-300 font-bold">Gemini AI synthesizing answer...</span>
                <span className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0s]"></span>
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Interactive Quick Action Chips */}
          <div className="px-3 py-1.5 bg-slate-900/90 border-t border-slate-900 flex items-center space-x-1.5 overflow-x-auto">
            {quickActionChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendQuery(chip.query)}
                className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-sky-950 text-[10px] font-extrabold text-sky-300 hover:text-white border border-slate-700 hover:border-sky-500/50 whitespace-nowrap transition-all btn-minimal"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Form Input Bar with Voice Speech Button */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-slate-950 border-t border-slate-900 flex items-center gap-2"
          >
            {/* Mic Speech-to-Text Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all btn-minimal flex items-center justify-center ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.6)]'
                  : 'bg-slate-900 text-sky-400 border border-slate-800 hover:bg-slate-800'
              }`}
              title={isListening ? 'Stop Listening' : 'Speak Symptoms (Voice Input)'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-sky-400" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={isListening ? "Listening to voice..." : "Type or speak symptoms..."}
              className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white focus:outline-none transition-all ${
                isListening 
                  ? 'bg-rose-950/40 border border-rose-500/60 placeholder-rose-300' 
                  : 'bg-slate-900/60 border border-slate-800 focus:border-sky-500 placeholder-slate-500'
              }`}
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white transition-all btn-minimal disabled:opacity-40 shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
