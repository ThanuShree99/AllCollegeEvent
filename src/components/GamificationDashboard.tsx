import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Flame, 
  CheckCircle, 
  Award, 
  Zap, 
  Users, 
  Star, 
  Code, 
  Ticket, 
  Moon, 
  Bot, 
  Gift, 
  ChevronRight,
  TrendingUp,
  Activity,
  BarChart2,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import confetti from 'canvas-confetti';
import { UserProfile, Quest, Badge, LeaderboardUser } from '../types';

interface GamificationDashboardProps {
  user: UserProfile;
  quests: Quest[];
  badges: Badge[];
  leaderboard: LeaderboardUser[];
  onClaimQuestXp: (questId: string, xpReward: number) => void;
}

export const GamificationDashboard: React.FC<GamificationDashboardProps> = ({
  user,
  quests,
  badges,
  leaderboard,
  onClaimQuestXp,
}) => {
  const [activeTab, setActiveTab] = useState<'quests' | 'chart' | 'badges' | 'leaderboard'>('quests');
  const [leaderboardScope, setLeaderboardScope] = useState<'campus' | 'national'>('campus');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [chartMode, setChartMode] = useState<'cumulative' | 'daily'>('cumulative');

  // XP calculation for next level
  const currentLevelXp = user.xp % 500;
  const xpProgressPercent = Math.min(100, Math.round((currentLevelXp / 500) * 100));

  // Dynamic 7-Day XP Growth dataset linked to live user.xp
  const xpHistoryData = [
    { day: 'Mon', date: 'Jul 22', cumulativeXp: Math.max(800, user.xp - 1150), dailyGain: 180, event: 'HackMatrix RSVP 💻' },
    { day: 'Tue', date: 'Jul 23', cumulativeXp: Math.max(1000, user.xp - 950), dailyGain: 200, event: 'Daily Check-in 🔥' },
    { day: 'Wed', date: 'Jul 24', cumulativeXp: Math.max(1220, user.xp - 730), dailyGain: 220, event: 'Squad Invite Bonus 👥' },
    { day: 'Thu', date: 'Jul 25', cumulativeXp: Math.max(1470, user.xp - 480), dailyGain: 250, event: 'RoboWars Ticket 🤖' },
    { day: 'Fri', date: 'Jul 26', cumulativeXp: Math.max(1790, user.xp - 160), dailyGain: 320, event: 'Photo Drop Quest 📸' },
    { day: 'Sat', date: 'Jul 27', cumulativeXp: Math.max(1940, user.xp - 100), dailyGain: 150, event: 'Community Feed Post ✍️' },
    { day: 'Today', date: 'Jul 28', cumulativeXp: user.xp, dailyGain: 280, event: 'Live Fest Quest Active ⚡' },
  ];

  // Calculate 7-day stats
  const total7DayGain = xpHistoryData.reduce((acc, curr) => acc + curr.dailyGain, 0);
  const peakGainDay = [...xpHistoryData].sort((a, b) => b.dailyGain - a.dailyGain)[0];

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-indigo-500/40 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl text-white space-y-1.5 min-w-[180px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="text-xs font-black text-indigo-400">{dataPoint.day} ({dataPoint.date})</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30">
              +{dataPoint.dailyGain} XP
            </span>
          </div>
          <p className="text-sm font-black text-cyan-300">
            {chartMode === 'cumulative' ? `${dataPoint.cumulativeXp} Total XP` : `+${dataPoint.dailyGain} XP Gained`}
          </p>
          <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <span>Milestone:</span>
            <span className="text-slate-200 font-bold">{dataPoint.event}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Render badge icon helper
  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ticket': return <Ticket className="w-6 h-6" />;
      case 'Code': return <Code className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Moon': return <Moon className="w-6 h-6" />;
      case 'Bot': return <Bot className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  const handleClaim = (quest: Quest) => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#ec4899', '#38bdf8', '#10b981'],
    });
    onClaimQuestXp(quest.id, quest.xpReward);
  };

  const filteredBadges = badges.filter((b) => {
    if (badgeFilter === 'unlocked') return b.unlocked;
    if (badgeFilter === 'locked') return !b.unlocked;
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Level & XP Overview Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 border border-slate-800/80 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* User Level Card */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-indigo-500 shadow-lg"
              />
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-black shadow-md">
                Lvl {user.level}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">{user.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                  {user.college}
                </span>
              </div>
              <p className="text-xs text-indigo-300 font-extrabold mt-0.5">
                Title: Fest Master 🌟
              </p>

              {/* 🔥 Streak Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold mt-2 border border-orange-500/30">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-bounce" />
                <span>{user.streakDays}-Day Fest Streak Active! (+1.5x XP Boost)</span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar Container */}
          <div className="w-full md:w-80 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Level Progress</span>
              <span className="text-cyan-400 font-extrabold">{user.xp} Total XP</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden relative p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 transition-all duration-500"
                style={{ width: `${xpProgressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>{currentLevelXp} / 500 XP</span>
              <span className="text-indigo-300 font-bold">Next Lvl: Lvl {user.level + 1}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('quests')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'quests'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Daily Missions ({quests.filter(q => !q.completed).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('chart')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'chart'
                ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-md shadow-pink-500/25 ring-2 ring-pink-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>7-Day XP Chart 📈</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'badges'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Badges ({badges.filter(b => b.unlocked).length}/{badges.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'leaderboard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Leaderboard</span>
          </button>
        </div>
      </div>

      {/* 📊 RECHARTS 7-DAY XP GROWTH CHART (STANDALONE SECTION / TAB) */}
      {(activeTab === 'chart' || activeTab === 'quests') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Chart Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-extrabold border border-indigo-500/30 mb-2">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Recharts Dynamic Velocity Tracker</span>
              </div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                7-Day XP Trajectory & Progress
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30">
                  +{total7DayGain} XP This Week
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Visualizing daily XP gains from event RSVPs, daily missions, and squad referrals over time.
              </p>
            </div>

            {/* Toggle Controls */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setChartMode('cumulative')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  chartMode === 'cumulative'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Total Growth Curve
              </button>
              <button
                onClick={() => setChartMode('daily')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  chartMode === 'daily'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Daily Gain Velocity
              </button>
            </div>
          </div>

          {/* Stat Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Current Total XP</span>
              </p>
              <p className="text-2xl font-black text-cyan-400">{user.xp} XP</p>
              <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>Top 5% on Stanford Leaderboard</span>
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Peak Gain Day</span>
              </p>
              <p className="text-2xl font-black text-amber-400">+{peakGainDay.dailyGain} XP</p>
              <p className="text-[10px] text-slate-400 font-medium">
                {peakGainDay.day} ({peakGainDay.event})
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-pink-400" />
                <span>Weekly Average</span>
              </p>
              <p className="text-2xl font-black text-pink-400">
                {Math.round(total7DayGain / 7)} XP / day
              </p>
              <p className="text-[10px] text-indigo-300 font-bold">
                Streak Multiplier: 1.5x Active
              </p>
            </div>
          </div>

          {/* Recharts Area Chart Container */}
          <div className="h-72 sm:h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={xpHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="xpGradientCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="xpGradientDaily" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />

                <XAxis 
                  dataKey="day" 
                  stroke="#94a3b8" 
                  tick={{ fontSize: 12, fontWeight: 700 }}
                  axisLine={{ stroke: '#475569' }}
                />

                <YAxis 
                  stroke="#94a3b8" 
                  tick={{ fontSize: 11, fontWeight: 600 }}
                  axisLine={{ stroke: '#475569' }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey={chartMode === 'cumulative' ? 'cumulativeXp' : 'dailyGain'}
                  stroke={chartMode === 'cumulative' ? '#c084fc' : '#38bdf8'}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill={chartMode === 'cumulative' ? 'url(#xpGradientCumulative)' : 'url(#xpGradientDaily)'}
                  dot={{ r: 5, fill: '#38bdf8', stroke: '#0f172a', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: '#f43f5e', stroke: '#ffffff', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 1: Daily Quests */}
      {activeTab === 'quests' && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Active Daily & Social Quests
            </h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
              Resets Daily at Midnight ⏰
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quests.map((quest) => (
              <div
                key={quest.id}
                className={`p-5 rounded-3xl border transition-all flex items-center justify-between gap-4 ${
                  quest.completed
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400 shadow-sm'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {quest.category}
                    </span>
                    <span className="text-xs font-black text-amber-500 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-amber-500" />
                      +{quest.xpReward} XP
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {quest.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {quest.description}
                  </p>
                </div>

                {quest.completed ? (
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs shrink-0">
                    <CheckCircle className="w-4 h-4" />
                    <span>Claimed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleClaim(quest)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 shrink-0 hover:scale-105 active:scale-95 transition-all"
                  >
                    Claim XP
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Badges Grid */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Achievement Badges Gallery
            </h3>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setBadgeFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold ${badgeFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                All
              </button>
              <button
                onClick={() => setBadgeFilter('unlocked')}
                className={`px-3 py-1.5 rounded-xl font-bold ${badgeFilter === 'unlocked' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                Unlocked
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border transition-all relative overflow-hidden flex items-start gap-4 ${
                  badge.unlocked
                    ? 'bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-800 shadow-md'
                    : 'bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60 grayscale'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${badge.colorGrad} text-white flex items-center justify-center shrink-0 shadow-lg`}>
                  {renderBadgeIcon(badge.icon)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      {badge.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    {badge.description}
                  </p>
                  {badge.unlocked ? (
                    <span className="inline-block text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                      ✓ Unlocked on {badge.unlockedAt || 'Recently'}
                    </span>
                  ) : (
                    <span className="inline-block text-[10px] font-extrabold text-slate-400 mt-1">
                      🔒 Locked Challenge
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Campus XP Leaderboard
            </h3>

            <div className="flex items-center gap-2 text-xs bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              <button
                onClick={() => setLeaderboardScope('campus')}
                className={`px-3 py-1.5 rounded-xl font-bold ${leaderboardScope === 'campus' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Stanford Tech
              </button>
              <button
                onClick={() => setLeaderboardScope('national')}
                className={`px-3 py-1.5 rounded-xl font-bold ${leaderboardScope === 'national' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                National Overall
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {leaderboard.map((usr) => (
                <div
                  key={usr.id}
                  className={`p-4 flex items-center justify-between gap-4 transition-all ${
                    usr.id === user.id
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-l-4 border-indigo-600'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {/* Rank Number */}
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center ${
                      usr.rank === 1 ? 'bg-amber-400 text-slate-950 shadow-md' :
                      usr.rank === 2 ? 'bg-slate-300 text-slate-950 shadow-md' :
                      usr.rank === 3 ? 'bg-amber-600 text-white shadow-md' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      #{usr.rank}
                    </span>

                    {/* Avatar & User Details */}
                    <img
                      src={usr.avatar}
                      alt={usr.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-slate-900 dark:text-white">
                          {usr.name}
                        </p>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                          Lvl {usr.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {usr.college} • {usr.badgeTitle}
                      </p>
                    </div>
                  </div>

                  {/* XP & Streak Stats */}
                  <div className="text-right">
                    <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                      {usr.xp} XP
                    </p>
                    <p className="text-xs text-orange-500 font-bold flex items-center justify-end gap-1">
                      <Flame className="w-3 h-3 fill-orange-500" />
                      {usr.streakDays}d streak
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

