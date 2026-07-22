import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, HelpCircle } from 'lucide-react';
import { api } from '../api';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello Rahul! I am your MediPulse AI Assistant, connected to our clinic database and symptom guidelines. Ask me anything about timings, specialists, blood pressure, or general care!',
      context: [],
      poweredBy: 'System Engine'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userQuery = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.ragChat(userQuery);
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
          text: 'Sorry, I encountered an issue connecting to the MediPulse AI service. Please try again.',
          context: [],
          poweredBy: 'Error Handler'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-slate-900 via-sky-950 to-slate-900 text-sky-400 shadow-[0_8px_32px_rgba(14,165,233,0.4)] hover:shadow-[0_8px_40px_rgba(14,165,233,0.6)] hover:scale-110 flex items-center justify-center border border-sky-500/40 hover:border-sky-450 transition-all duration-300 relative group animate-float"
        >
          {/* Pulsing Backlight */}
          <div className="absolute inset-0 rounded-full bg-sky-500/20 animate-pulse"></div>
          {/* Rotating Ring */}
          <div className="absolute -inset-1 rounded-full border border-dashed border-sky-500/30 group-hover:border-sky-400/50 animate-[spin_10s_linear_infinite] pointer-events-none"></div>
          
          <Bot className="w-6 h-6 text-sky-400 group-hover:text-white transition-colors relative z-10" />
        </button>
      )}

      {/* Glassmorphic Chatbot Window */}
      {isOpen && (
        <div className="w-88 sm:w-96 h-128 bg-slate-950/85 backdrop-blur-2xl border border-slate-800/80 rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-slide-up relative z-50">
          
          {/* Neon Top Edge Highlight Line */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400/80 to-transparent"></div>

          {/* Glowing Header Banner */}
          <div className="p-4 bg-gradient-to-r from-slate-950 via-sky-950/40 to-slate-950 border-b border-slate-900/80 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 border-2 border-slate-950 animate-pulse"></span>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 border border-sky-400/30 flex items-center justify-center shadow-inner">
                  <Bot className="w-5 h-5 text-sky-400 animate-pulse" />
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5 tracking-wide">
                  MediPulse RAG Assistant <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
                </h4>
                <p className="text-[10px] text-slate-400 font-bold">Retrieval-Augmented Medical Knowledge</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800 border border-slate-850/60 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[380px] custom-scrollbar">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col space-y-1.5 max-w-[85%] ${
                  m.sender === 'user' ? 'ml-auto items-end animate-fade-in-left' : 'mr-auto items-start animate-fade-in-right'
                }`}
              >
                {/* Bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-xs transition-all ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-br from-sky-600 to-sky-700 text-white rounded-br-none border border-sky-550/20 shadow-[0_4px_12px_rgba(14,165,233,0.15)]'
                      : 'bg-slate-900/50 backdrop-blur-md text-slate-100 border border-slate-850/60 rounded-bl-none shadow-inner'
                  }`}
                >
                  {m.text}
                </div>

                {/* Meta details for RAG context */}
                {m.sender === 'bot' && (
                  <div className="flex flex-col space-y-1.5 px-1 mt-1">
                    <span className="text-[9px] text-slate-500 font-bold">
                      Powered by: <strong className="text-sky-400/80">{m.poweredBy}</strong>
                    </span>
                    {m.context && m.context.length > 0 && (
                      <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/30 w-fit">
                        <HelpCircle className="w-3 h-3 text-emerald-400" /> Matches: {m.context.join(', ')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex items-center space-x-2 mr-auto bg-slate-900/50 border border-slate-850/60 p-3.5 rounded-2xl rounded-bl-none animate-pulse">
                <span className="text-[10px] text-slate-400 font-bold">AI searching knowledge base...</span>
                <span className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0s]"></span>
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Form Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-slate-950/80 border-t border-slate-900/60 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about timing, specialists, BP..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900/40 border border-slate-850 text-xs font-semibold text-white focus:outline-none focus:border-sky-500/80 placeholder-slate-500 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-550 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(14,165,233,0.3)] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
