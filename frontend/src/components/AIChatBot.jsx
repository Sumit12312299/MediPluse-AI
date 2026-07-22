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
          className="p-4 rounded-full bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-sky-400/30 hover:border-sky-400 relative group"
        >
          <div className="absolute inset-0 rounded-full bg-sky-500/20 animate-ping group-hover:duration-500"></div>
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Glassmorphic Chatbot Window */}
      {isOpen && (
        <div className="w-88 sm:w-96 h-120 bg-slate-900/95 backdrop-blur-xl border border-slate-700/70 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          
          {/* Glowing Header Banner */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border-b border-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-0 right-0 border-2 border-slate-900 animate-pulse"></span>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 border border-sky-500/30 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5">
                  MediPulse RAG Assistant <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                </h4>
                <p className="text-[10px] text-slate-400 font-bold">Retrieval-Augmented Medical Knowledge</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800/80 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col space-y-1.5 max-w-[85%] ${
                  m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                {/* Bubble */}
                <div
                  className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-br-none'
                      : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>

                {/* Meta details for RAG context */}
                {m.sender === 'bot' && (
                  <div className="flex flex-wrap items-center gap-1 px-1">
                    <span className="text-[9px] text-slate-500 font-bold">
                      Powered by: <strong className="text-sky-400/80">{m.poweredBy}</strong>
                    </span>
                    {m.context && m.context.length > 0 && (
                      <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1 bg-slate-950/60 px-1.5 py-0.5 rounded border border-slate-850">
                        <HelpCircle className="w-2.5 h-2.5 text-teal-400" /> Matches: {m.context.join(', ')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex items-center space-x-2 mr-auto bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl rounded-bl-none">
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
            className="p-3 bg-slate-950/60 border-t border-slate-800/60 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about specialists, timings, or blood pressure..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-sky-500 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white transition-all btn-minimal shadow-lg disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
