import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, ArrowUp, Bot, Flame, X, Trophy, Radio, Compass, PartyPopper } from 'lucide-react';
import { UserProfile } from '../types';

export interface VibeParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export const AppOpeningIntroSequence: React.FC<{
  user: UserProfile;
  onComplete: () => void;
}> = ({ user, onComplete }) => {
  const [stage, setStage] = useState<'boot' | 'unfurl' | 'ready'>('boot');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('unfurl'), 500);
    const t2 = setTimeout(() => {
      setStage('ready');
      onComplete();
    }, 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'ready' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden pointer-events-auto"
        >
          {/* Animated Cyber Hologram Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.35),rgba(255,255,255,0))]" />
          
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              rotate: [0, 90, 180],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-pink-500/20 via-indigo-500/20 to-cyan-500/20 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md">
            
            {/* Pulsing App Icon */}
            <motion.div
              initial={{ scale: 0.3, rotate: -25, opacity: 0 }}
              animate={{ 
                scale: stage === 'unfurl' ? 1.08 : 1, 
                rotate: 0, 
                opacity: 1 
              }}
              transition={{ type: 'spring', damping: 14, stiffness: 220 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-2xl shadow-purple-500/40 mb-6 relative"
            >
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-pink-400 animate-spin" />
              </div>
              <motion.span
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md uppercase tracking-wider"
              >
                GEN Z
              </motion.span>
            </motion.div>

            {/* Brand Title with Shimmer Text */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-3xl sm:text-4xl font-black tracking-tight mb-2"
            >
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                AllCollegeEvent
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className="text-xs sm:text-sm font-semibold text-slate-400 mb-6 flex items-center gap-1.5 justify-center"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>Campus Fests • Squad Perks • Level {user.level} Matrix</span>
            </motion.p>

            {/* Booting Progress Bar */}
            <motion.div 
              initial={{ opacity: 0, width: '0%' }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
              className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden relative"
            >
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1/2 h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 rounded-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-4 flex items-center gap-2 text-[11px] font-bold text-slate-500"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Connecting {user.squadName} Squad Node...</span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const LiveFestTicker: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const announcements = [
    '🔥 Stanford Vanguard AI Hackathon ($15,000 Prize Pool) Registration is LIVE',
    '⚡ Double XP Fest Weekend active for all college squads (+150 XP per RSVP)',
    '🎧 Sunburn Campus DJ Night fast-track digital QR passes releasing at 5 PM',
    '👑 14,890 Gen Z squad members joined across 120+ colleges today',
    '🚀 MIT Inter-College Esports Arena finals streaming live on Squad Feed',
    '🎉 ByteBeat Cultural Fest: +200 XP for squad check-ins tonight',
  ];

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="relative z-50 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 text-white border-b border-indigo-500/20 overflow-hidden py-1.5 px-4 text-xs font-semibold select-none shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-pink-500/30">
            <Radio className="w-3 h-3 text-pink-400 animate-pulse" />
            Live Fest Wire
          </span>
        </div>

        {/* Marquee ticker */}
        <div className="overflow-hidden whitespace-nowrap flex-1 relative mask-fade-edges">
          <motion.div
            className="inline-flex gap-12 font-medium text-slate-200 text-[11px]"
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {announcements.concat(announcements).map((item, idx) => (
              <span key={idx} className="flex items-center gap-2 hover:text-cyan-300 transition-colors cursor-default">
                <span>{item}</span>
                <span className="text-pink-500/60 font-bold">•</span>
              </span>
            ))}
          </motion.div>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer shrink-0"
          title="Dismiss Live Wire"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

export const FloatingQuickBar: React.FC<{
  user: UserProfile;
  onOpenAiMate: () => void;
  onOpenQuests: () => void;
}> = ({ user, onOpenAiMate, onOpenQuests }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollVibe, setScrollVibe] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setShowScrollTop(scrolled > 220);
      setScrollVibe(Math.min(100, Math.round((scrolled / 800) * 100)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      <AnimatePresence>
        {/* Floating Gen Z Quick Hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 25 }}
          transition={{ type: 'spring', damping: 18, stiffness: 320 }}
          className="flex items-center gap-2 p-1.5 rounded-full bg-slate-900/90 text-white backdrop-blur-xl border border-indigo-500/30 shadow-2xl shadow-indigo-950/60"
        >
          {/* Streak pill button with energetic bounce */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.92, rotate: 3 }}
            onClick={onOpenQuests}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/30 text-xs font-black cursor-pointer transition-all"
            title="View Daily Quests & Streak"
          >
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-bounce" />
            <span>{user.streakDays}d Streak</span>
          </motion.button>

          {/* AI Mate Quick Launcher */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.92, rotate: -3 }}
            onClick={onOpenAiMate}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white text-xs font-extrabold shadow-lg shadow-teal-500/30 cursor-pointer transition-all"
            title="Ask AI Fest Mate"
          >
            <Bot className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline">AI Concierge</span>
          </motion.button>

          {/* Scroll to top button with smooth rotation */}
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.4, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.4, rotate: 180 }}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.85 }}
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white flex items-center justify-center cursor-pointer shadow-md shadow-indigo-500/30 transition-all"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const WelcomeLevelToast: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.88, rotate: -3 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, y: 30, scale: 0.88, filter: 'blur(4px)' }}
        transition={{ type: 'spring', damping: 22, stiffness: 360, delay: 0.5 }}
        className="fixed bottom-6 left-6 z-40 max-w-sm p-4 rounded-3xl bg-slate-900/95 text-white backdrop-blur-xl border border-indigo-500/30 shadow-2xl shadow-indigo-950/80 flex items-center gap-3.5"
      >
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-500/30"
        >
          <Sparkles className="w-6 h-6 animate-spin" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-black text-white truncate">Welcome back, {user.name}! 🚀</h4>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-indigo-500 text-white">
              Lvl {user.level}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-medium mt-0.5 leading-snug">
            {user.streakDays}-Day Fest Streak active. Explore fests to claim +150 XP today!
          </p>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export const VibeParticleBurst: React.FC<{ particles: VibeParticle[] }> = ({ particles }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 1,
              scale: 0.4,
              x: p.x,
              y: p.y,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.4, 1.5, 0.9],
              y: p.y - 140 - Math.random() * 90,
              x: p.x + (Math.random() - 0.5) * 140,
              rotate: (Math.random() - 0.5) * 90,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute text-3xl drop-shadow-lg select-none font-black"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

