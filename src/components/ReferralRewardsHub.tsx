import React, { useState } from 'react';
import { Users, Zap, Gift, Crown, Award, Copy, Check, Share2, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, ReferralTier } from '../types';
import { REFERRAL_TIERS } from '../data/gamificationData';

interface ReferralRewardsHubProps {
  user: UserProfile;
  onShareReferral: () => void;
}

export const ReferralRewardsHub: React.FC<ReferralRewardsHubProps> = ({
  user,
  onShareReferral,
}) => {
  const [copied, setCopied] = useState(false);

  const referralLink = `${window.location.origin}/?ref=${user.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold mb-3 border border-pink-500/30">
            <Users className="w-3.5 h-3.5 text-pink-400" />
            <span>Squad Referral & Perks Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Build Your Fest Squad & <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Unlock VIP Backstage Perks
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-2 leading-relaxed">
            Invite your college squad to AllCollegeEvent.com. Every squad member who joins gives you +250 XP, fast-track QR passes, and free merchandise kits!
          </p>

          {/* Code Box & Copy Action */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Referral Code</p>
                <p className="text-lg font-black tracking-wider text-cyan-400">{user.referralCode}</p>
              </div>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
              </button>
            </div>

            <button
              onClick={onShareReferral}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Invite Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Referral Milestone Tiers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Squad Recruitment Perks ({user.referralsCount} Squad Mates Recruited)
          </h3>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-extrabold">
            Next Perk in {Math.max(1, 5 - user.referralsCount)} invites!
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REFERRAL_TIERS.map((tier) => {
            const isReached = user.referralsCount >= tier.referralsRequired;
            return (
              <div
                key={tier.title}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                  isReached
                    ? 'bg-gradient-to-b from-indigo-500/10 to-purple-500/5 border-indigo-500/40 shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      {tier.referralsRequired} {tier.referralsRequired === 1 ? 'Referral' : 'Referrals'}
                    </span>
                    {isReached ? (
                      <span className="text-xs font-black text-emerald-500 flex items-center gap-1">
                        ✓ Unlocked
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">
                        Locked 🔒
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    {tier.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    {tier.rewardDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>{isReached ? 'Active VIP Benefit' : `${user.referralsCount}/${tier.referralsRequired} Friends`}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
