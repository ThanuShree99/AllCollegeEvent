import React from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Award, Flame, Users, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { UserProfile, Badge } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  badges: Badge[];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  badges,
}) => {
  if (!isOpen) return null;

  const unlockedCount = badges.filter(b => b.unlocked).length;

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
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 my-8 space-y-6"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-500 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{user.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white">
                Lvl {user.level}
              </span>
            </div>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-extrabold mt-0.5">
              {user.college}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">{user.email}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center text-xs">
          <div>
            <p className="text-slate-400 font-bold">Total XP</p>
            <p className="text-base font-black text-indigo-600 dark:text-indigo-400">{user.xp}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Streak</p>
            <p className="text-base font-black text-orange-500">{user.streakDays} Days</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold">Badges</p>
            <p className="text-base font-black text-purple-600 dark:text-purple-400">{unlockedCount}/{badges.length}</p>
          </div>
        </div>

        {/* Referral Info */}
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 dark:text-white">Squad Referral Code</span>
            <span className="font-mono font-black text-indigo-600 dark:text-indigo-400">{user.referralCode}</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
            You have recruited {user.referralsCount} squad members. Keep sharing to unlock VIP backstage passes!
          </p>
        </div>

      </motion.div>
    </motion.div>
  );
};
