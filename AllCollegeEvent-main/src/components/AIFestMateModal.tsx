import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles, Send, X, Zap, Calendar, MapPin, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Event } from '../types';

interface AIFestMateModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
}

export const AIFestMateModal: React.FC<AIFestMateModalProps> = ({
  isOpen,
  onClose,
  events,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'itinerary'>('chat');
  const [userPrompt, setUserPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: "Hey! I'm ACE Fest Mate 🤖 — your Gen Z AI Concierge for AllCollegeEvent.com. Ask me for fest recommendations, hackathon squad advice, or generate a custom fest day itinerary!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Itinerary Generator Form State
  const [collegeName, setCollegeName] = useState('Stanford Institute of Technology');
  const [durationHours, setDurationHours] = useState(6);
  const [generatedItinerary, setGeneratedItinerary] = useState<any[] | null>(null);
  const [itineraryLoading, setItineraryLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Suggest top hackathons with $10,000+ prize pool",
    "How do I build a winning pitch deck for E-Summit?",
    "What are the best cultural music fests this month?",
    "Tips to earn 500+ XP on AllCollegeEvent quickly",
  ];

  const handleSendChat = async (promptText?: string) => {
    const textToSend = promptText || userPrompt;
    if (!textToSend.trim() || loading) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    if (!promptText) setUserPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: textToSend,
          selectedEvents: events.slice(0, 3),
        }),
      });

      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: data.reply || "I'm having trouble thinking right now. Try asking again!" },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: "Network error calling AI Concierge. Please check connection." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateItinerary = async () => {
    setItineraryLoading(true);
    try {
      const res = await fetch('/api/gemini/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeName,
          durationHours,
          availableEvents: events.map((e) => ({ title: e.title, category: e.category, venue: e.venueName })),
        }),
      });

      const data = await res.json();
      setGeneratedItinerary(data.itinerary || []);
    } catch (err) {
      console.error(err);
    } finally {
      setItineraryLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] my-8"
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
              <Bot className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">ACE AI Fest Mate 🤖</h3>
              <p className="text-xs text-emerald-100 font-medium">Powered by Gemini AI • Your Smart Campus Guide</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-2 gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>AI Fest Concierge</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('itinerary')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'itinerary'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>AI Itinerary Planner</span>
          </motion.button>
        </div>

        {/* Tab 1: AI Chat Concierge */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6 space-y-4">
            
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[380px] scrollbar-thin">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                    <span>ACE Fest Mate is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {quickPrompts.map((qp, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleSendChat(qp)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/10 text-slate-700 dark:text-slate-300 hover:text-emerald-500 text-[11px] font-bold whitespace-nowrap border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                >
                  {qp}
                </motion.button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <input
                type="text"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Ask about events, hackathon tips, or fest rules..."
                className="flex-1 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleSendChat()}
                disabled={loading}
                className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>

          </div>
        )}

        {/* Tab 2: AI Itinerary Planner */}
        {activeTab === 'itinerary' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold mb-1 block">Your Campus Name</label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold mb-1 block">Available Hours Today</label>
                <select
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold cursor-pointer"
                >
                  <option value={4}>4 Hours (Quick Fest Tour)</option>
                  <option value={6}>6 Hours (Full Day Fest Pass)</option>
                  <option value={10}>10 Hours (All-Night Marathon)</option>
                </select>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleGenerateItinerary}
              disabled={itineraryLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {itineraryLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI Architecting Custom Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Time-Blocked Fest Plan</span>
                </>
              )}
            </motion.button>

            {/* Generated Itinerary Output */}
            {generatedItinerary && (
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Generated Fest Itinerary Timeline
                </h4>

                <div className="space-y-2.5">
                  {generatedItinerary.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
                    >
                      <span className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-black text-[11px] shrink-0">
                        {item.time}
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-xs font-black text-slate-900 dark:text-white">{item.title}</p>
                        <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-indigo-500" />
                          <span>{item.location}</span>
                        </p>
                        {item.tip && (
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold mt-1">
                            💡 {item.tip}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </motion.div>
    </motion.div>
  );
};
