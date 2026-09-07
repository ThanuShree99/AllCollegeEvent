import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Flame, 
  Rocket, 
  Crown, 
  Headphones, 
  Send, 
  Image as ImageIcon, 
  Share2, 
  Sparkles,
  Download,
  X,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CommunityPost, UserProfile, Event } from '../types';

interface SocialCommunityHubProps {
  user: UserProfile;
  posts: CommunityPost[];
  events: Event[];
  onAddPost: (post: Partial<CommunityPost>) => void;
  onVibeReact: (postId: string, vibeType: 'fire' | 'rocket' | 'crown' | 'headphone') => void;
}

export const SocialCommunityHub: React.FC<SocialCommunityHubProps> = ({
  user,
  posts,
  events,
  onAddPost,
  onVibeReact,
}) => {
  const [newContent, setNewContent] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('SquadRecruiting');

  // Viral Story Generator State
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [storyEvent, setStoryEvent] = useState<Event>(events[0]);
  const [storyTheme, setStoryTheme] = useState<'cyber' | 'sunset' | 'midnight' | 'emerald'>('cyber');
  const [storySticker, setStorySticker] = useState('Attending 🔥');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const matchedEvent = events.find(e => e.id === selectedEventId);

    onAddPost({
      content: newContent,
      eventRefId: matchedEvent?.id,
      eventRefTitle: matchedEvent?.title,
      tags: [selectedTag],
    });

    setNewContent('');
    setSelectedEventId('');
    confetti({ particleCount: 30, spread: 50 });
  };

  const themeGradients = {
    cyber: 'from-fuchsia-600 via-purple-600 to-indigo-900',
    sunset: 'from-amber-500 via-orange-600 to-pink-600',
    midnight: 'from-slate-900 via-indigo-950 to-blue-900',
    emerald: 'from-emerald-600 via-teal-700 to-cyan-900',
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-pink-900 via-purple-900 to-slate-900 text-white shadow-xl"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold mb-2 border border-pink-500/30">
            <MessageSquare className="w-3.5 h-3.5 text-pink-400" />
            <span>Campus Squad Feed & Viral Media Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Community Squad Wall & Viral Story Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            Recruit hackathon teammates, drop fest photos, and generate branded Instagram/Snapchat story cards in 1-click!
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowStoryModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-pink-500/25 transition-all whitespace-nowrap cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>Viral Story Card Studio</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Post Card & Feed (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Create Post Form */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500"
              />
              <div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">{user.college} • Lvl {user.level}</p>
              </div>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3">
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Looking for teammates? Want to review a fest? Drop a vibe post..."
                rows={3}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  {/* Select Event Reference */}
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    <option value="">Link Event (Optional)</option>
                    {events.map((evt) => (
                      <option key={evt.id} value={evt.id}>{evt.title}</option>
                    ))}
                  </select>

                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    <option value="SquadRecruiting">#SquadRecruiting</option>
                    <option value="FestVibes">#FestVibes</option>
                    <option value="AskCampus">#AskCampus</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post (+50 XP)</span>
                </motion.button>
              </div>
            </form>
          </div>

          {/* Posts Feed List */}
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3 transition-all hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{post.authorName}</p>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                          Lvl {post.authorLevel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">{post.authorCollege} • {post.timestamp}</p>
                    </div>
                  </div>

                  {post.tags.map((t) => (
                    <span key={t} className="text-[10px] font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/50 px-2.5 py-1 rounded-full">
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Event Tag Reference */}
                {post.eventRefTitle && (
                  <div className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    📍 Linked Event: {post.eventRefTitle}
                  </div>
                )}

                {/* Post Content Text */}
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  {post.content}
                </p>

                {/* Vibe Reaction Action Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onVibeReact(post.id, 'fire')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-500/20 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-all cursor-pointer"
                  >
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>{post.vibes.fire}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onVibeReact(post.id, 'rocket')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/20 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-all cursor-pointer"
                  >
                    <Rocket className="w-4 h-4 text-cyan-500" />
                    <span>{post.vibes.rocket}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onVibeReact(post.id, 'crown')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/20 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-all cursor-pointer"
                  >
                    <Crown className="w-4 h-4 text-amber-500" />
                    <span>{post.vibes.crown}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onVibeReact(post.id, 'headphone')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-500/20 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-purple-500 transition-all cursor-pointer"
                  >
                    <Headphones className="w-4 h-4 text-purple-500" />
                    <span>{post.vibes.headphone}</span>
                  </motion.button>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

        {/* Viral Story Card Studio Trigger Sidebar (1 Col) */}
        <div className="space-y-6">
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 text-white border border-slate-800 space-y-4 shadow-xl"
          >
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-black text-white">
              Gen Z Viral Story Studio
            </h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Generate vertical 9:16 story cards formatted for Instagram, Snapchat, & WhatsApp status with custom gradient themes, QR codes, and squad tags!
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowStoryModal(true)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
            >
              <span>Launch Story Studio</span>
            </motion.button>
          </motion.div>
        </div>

      </div>

      {/* Modal: Viral Story Card Studio */}
      <AnimatePresence>
        {showStoryModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 my-8"
            >
              
              <button
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <span>Instagram & WhatsApp Story Generator</span>
              </h3>

              {/* Customizer Controls */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-bold">
                <div>
                  <label className="text-slate-400 font-medium mb-1 block">Select Fest Event</label>
                  <select
                    value={storyEvent.id}
                    onChange={(e) => {
                      const found = events.find(ev => ev.id === e.target.value);
                      if (found) setStoryEvent(found);
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    {events.map((e) => (
                      <option key={e.id} value={e.id}>{e.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-medium mb-1 block">Gradient Theme</label>
                  <select
                    value={storyTheme}
                    onChange={(e: any) => setStoryTheme(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    <option value="cyber">Cyberpunk Neon</option>
                    <option value="sunset">Fiery Sunset</option>
                    <option value="midnight">Midnight Violet</option>
                    <option value="emerald">Emerald Oasis</option>
                  </select>
                </div>
              </div>

              {/* Preview Story Card Container */}
              <div className={`relative aspect-[9/16] max-w-xs mx-auto rounded-3xl bg-gradient-to-b ${themeGradients[storyTheme]} text-white p-6 shadow-2xl flex flex-col justify-between border-4 border-white/20 overflow-hidden`}>
                
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-extrabold text-sm tracking-wider">AllCollegeEvent.com</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-white/20 backdrop-blur-md">
                      {storySticker}
                    </span>
                  </div>

                  <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 mb-3">
                    <img src={storyEvent.imageUrl} alt={storyEvent.title} className="w-full h-32 object-cover rounded-xl" />
                  </div>

                  <h4 className="text-lg font-black leading-tight mb-2">
                    {storyEvent.title}
                  </h4>
                  <p className="text-xs text-slate-200 font-medium">
                    📍 {storyEvent.collegeName}
                  </p>
                  <p className="text-xs text-amber-300 font-bold mt-1">
                    📅 {storyEvent.date} • {storyEvent.time}
                  </p>
                </div>

                {/* Bottom Footer Code & Squad Invite */}
                <div className="pt-4 border-t border-white/20 space-y-2">
                  <p className="text-[11px] font-bold text-center text-slate-200">
                    Join my squad on AllCollegeEvent using code:
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/30 text-center text-xs font-black text-cyan-300 tracking-wider">
                    {user.referralCode}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setDownloadSuccess(true);
                    confetti({ particleCount: 50 });
                    setTimeout(() => setDownloadSuccess(false), 2500);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                >
                  {downloadSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{downloadSuccess ? 'Story Card Saved!' : 'Download Story Graphic'}</span>
                </motion.button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
