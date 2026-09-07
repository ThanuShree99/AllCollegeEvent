import React from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Trophy, Users, Zap, Filter, Flame, FlameKindling, Star } from 'lucide-react';
import { EventCategory } from '../types';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: EventCategory | 'All';
  setSelectedCategory: (category: EventCategory | 'All') => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onOpenAiPlanner: () => void;
  onOpenReferrals: () => void;
}

const CATEGORIES: (EventCategory | 'All')[] = [
  'All',
  'Tech & Coding',
  'Cultural & Music',
  'Gaming & Esports',
  'E-Summit & Biz',
  'Workshops & AI',
  'Sports & Fitness',
  'Design & Arts',
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  onOpenAiPlanner,
  onOpenReferrals,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white p-6 sm:p-10 mb-8 border border-slate-800 shadow-2xl shadow-indigo-950/40"
    >
      {/* Decorative Glow Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" 
      />

      {/* Floating Gen Z Interactive Stickers (Float on Screen Open) */}
      <motion.div
        initial={{ opacity: 0, y: -20, rotate: -8 }}
        animate={{ 
          opacity: 1, 
          y: [0, -8, 0],
          rotate: [-6, -2, -6] 
        }}
        transition={{ 
          opacity: { duration: 0.5, delay: 0.2 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="hidden lg:flex absolute top-8 right-12 z-20 items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-pink-500/30 to-purple-500/30 backdrop-blur-xl border border-pink-400/40 text-pink-200 text-xs font-black shadow-lg shadow-pink-500/20 select-none cursor-default"
      >
        <span className="text-base">⚡</span>
        <span>+150 XP Double Boost</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 6 }}
        animate={{ 
          opacity: 1, 
          y: [0, 8, 0],
          rotate: [6, 10, 6] 
        }}
        transition={{ 
          opacity: { duration: 0.5, delay: 0.3 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="hidden xl:flex absolute bottom-24 right-16 z-20 items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 backdrop-blur-xl border border-cyan-400/40 text-cyan-200 text-xs font-black shadow-lg shadow-cyan-500/20 select-none cursor-default"
      >
        <span className="text-base">🔥</span>
        <span>98% Vibe Fest Match</span>
      </motion.div>

      <div className="relative z-10 max-w-4xl">
        
        {/* Top Tagline */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-300 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>The #1 Gamified Campus Fest Platform for Gen Z</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-4"
        >
          Discover Campus Fests, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
            Build Your Squad & Claim XP
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mb-8 leading-relaxed"
        >
          Track upcoming college hackathons, cultural concerts, esports jams, and pitch tanks.
          Earn badges, climb campus leaderboards, and unlock VIP backstage passes with your squad!
        </motion.p>

        {/* Search Bar & Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-stretch gap-3 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fests, hackathons, college name, city..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm font-medium transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenAiPlanner}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all whitespace-nowrap cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>AI Fest Itinerary</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenReferrals}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer"
            >
              <Users className="w-4 h-4 text-pink-400" />
              <span>Invite Squad</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Stats Grid with stagger */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
          <motion.div 
            whileHover={{ scale: 1.04, y: -2 }}
            className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
              🔥
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">500+ Active</p>
              <p className="text-slate-400 font-medium">Campus Fests</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.04, y: -2 }}
            className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
              💰
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">$250,000+</p>
              <p className="text-slate-400 font-medium">Prize Pools</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.04, y: -2 }}
            className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold">
              👥
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">45,000+</p>
              <p className="text-slate-400 font-medium">Student Squads</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.04, y: -2 }}
            className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              🎓
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">120+</p>
              <p className="text-slate-400 font-medium">Partner Colleges</p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Category Pills & Sorting Bar */}
      <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Category Scroll Container */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'text-slate-900 font-extrabold'
                    : 'text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-white rounded-xl shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 font-semibold">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/10 text-white text-xs font-bold rounded-xl px-3 py-1.5 border border-white/20 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
          >
            <option value="trending" className="bg-slate-900 text-white">🔥 Trending & Hot</option>
            <option value="prizes" className="bg-slate-900 text-white">💰 Highest Prize Pool</option>
            <option value="soonest" className="bg-slate-900 text-white">⏰ Starting Soon</option>
            <option value="vibe" className="bg-slate-900 text-white">⚡ Top Vibe Score</option>
          </select>
        </div>

      </div>

    </motion.div>
  );
};
