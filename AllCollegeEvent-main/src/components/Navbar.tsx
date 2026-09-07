import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Trophy, 
  Users, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Moon, 
  Sun, 
  PlusCircle, 
  Flame,
  Bot
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenAiMate: () => void;
  onOpenCreateEvent: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  darkMode,
  setDarkMode,
  unreadCount,
  onOpenNotifications,
  onOpenAiMate,
  onOpenCreateEvent,
  onOpenProfile,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'events', label: 'Discover Fests', icon: Sparkles },
    { id: 'map', label: 'Campus Map', icon: MapPin },
    { id: 'quests', label: 'XP & Quests', icon: Trophy, badge: `${user.level} Lvl` },
    { id: 'referral', label: 'Squad & Perks', icon: Users },
    { id: 'schedule', label: 'My Passes', icon: Calendar },
    { id: 'community', label: 'Squad Feed', icon: MessageSquare },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-indigo-500/20 shadow-lg shadow-indigo-950/10'
        : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800'
    }`}>
      {/* Dynamic Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 origin-left z-50 shadow-sm"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-14 sm:h-15' : 'h-16'
        } gap-2`}>
          
          {/* Logo & Brand */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setActiveTab('events')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  AllCollegeEvent
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
                  Gen Z
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 font-medium hidden sm:block">
                Discover • Compete • Level Up
              </p>
            </div>
          </motion.div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-300 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 dark:from-indigo-500/25 dark:via-purple-500/25 dark:to-pink-500/25 rounded-xl border border-indigo-400/40 dark:border-indigo-400/50 shadow-sm shadow-indigo-500/10"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.div
                      animate={isActive ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, -8, 8, 0]
                      } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <Icon className={`w-4 h-4 transition-colors ${
                        isActive 
                          ? 'text-indigo-600 dark:text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]' 
                          : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                      }`} />
                    </motion.div>
                    <span>{item.label}</span>
                    {item.badge && (
                      <motion.span 
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xs"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </nav>

          {/* Right Action Icons & Gamification Pills */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Fest Mate Button */}
            <motion.button
              onClick={onOpenAiMate}
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.92, rotate: 2 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-md shadow-teal-500/25 transition-all cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, -12, 12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Bot className="w-4 h-4" />
              </motion.div>
              <span className="hidden sm:inline">AI Fest Mate</span>
            </motion.button>

            {/* 🔥 Streak Pill */}
            <motion.div 
              onClick={() => setActiveTab('quests')}
              whileHover={{ scale: 1.09, rotate: 2 }}
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50 text-xs font-bold cursor-pointer transition-all shadow-xs"
              title="Daily Fest Streak"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
              <span className="font-extrabold">{user.streakDays}d</span>
            </motion.div>

            {/* Notification Bell */}
            <motion.button
              onClick={onOpenNotifications}
              whileHover={{ scale: 1.12, rotate: 12 }}
              whileTap={{ scale: 0.88 }}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <motion.span 
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-black flex items-center justify-center shadow-md shadow-pink-500/50"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Dark/Light Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              whileHover={{ rotate: 180, scale: 1.12 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400 animate-pulse" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </motion.button>

            {/* Post Event Button (Desktop) */}
            <motion.button
              onClick={onOpenCreateEvent}
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.94 }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:border-indigo-400 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-800 dark:text-slate-200 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-indigo-500" />
              <span>Post Event</span>
            </motion.button>

            {/* User Profile Pill */}
            <motion.div 
              onClick={onOpenProfile}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 p-1 pl-2 rounded-full border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 bg-slate-50 dark:bg-slate-800/80 cursor-pointer transition-all shadow-xs"
            >
              <div className="hidden sm:block text-right pr-1">
                <p className="text-xs font-black text-slate-800 dark:text-slate-200 leading-tight">{user.name}</p>
                <p className="text-[10px] text-indigo-600 dark:text-pink-400 font-bold">{user.xp} XP</p>
              </div>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/50"
              />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Mobile Sticky Sub-Nav Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer ${
                isActive ? 'text-indigo-600 dark:text-pink-400' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <motion.div
                animate={isActive ? { scale: [1, 1.2, 1], y: [0, -3, 0] } : { scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'drop-shadow-[0_0_6px_rgba(236,72,153,0.5)]' : ''}`} />
              </motion.div>
              <span>{item.label.split(' ')[0]}</span>
            </motion.button>
          );
        })}
      </div>
    </header>
  );
};
