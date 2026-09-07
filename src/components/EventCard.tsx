import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Trophy, Users, Zap, CheckCircle2, Share2, ArrowRight } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  isRegistered: boolean;
  onRsvp: (event: Event, eventCoord?: { x: number; y: number }) => void;
  onOpenDetails: (event: Event) => void;
  onShare: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isRegistered,
  onRsvp,
  onOpenDetails,
  onShare,
}) => {
  const handleRsvpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onRsvp(event, { x: rect.left + rect.width / 2, y: rect.top });
  };

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 22, scale: 0.96 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          transition: { type: 'spring', damping: 20, stiffness: 260 } 
        },
      }}
      whileHover={{ 
        y: -8, 
        transition: { type: 'spring', damping: 15, stiffness: 400 } 
      }}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/15 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Top Banner Image with Overlay Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-white/20 shadow-md">
            {event.category}
          </span>
          {event.isTrending && (
            <motion.span 
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md flex items-center gap-1"
            >
              🔥 HOT
            </motion.span>
          )}
        </div>

        {/* Vibe Score Pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-950/80 backdrop-blur-md border border-indigo-500/30 text-indigo-300 group-hover:border-indigo-400/60 transition-colors">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
          <span>{event.vibeScore}% Vibe</span>
        </div>

        {/* Prize Pool Tag on Bottom Image Edge */}
        {event.prizePool && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 shadow-md">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>Prize: {event.prizePool}</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* College Name & Location */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{event.collegeName} • {event.campusCity}</span>
          </div>

          {/* Event Title */}
          <h3 
            onClick={() => onOpenDetails(event)}
            className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer transition-colors line-clamp-2 mb-2 leading-snug"
          >
            {event.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 font-medium mb-4">
            {event.description}
          </p>

          {/* Key Event Details Pills */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold mb-4 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="truncate">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time.split('-')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Users className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span>{event.squadAttendingCount} Going</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          
          {/* Share Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            onClick={() => onShare(event)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="Share Viral Story Card"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>

          {/* RSVP / Pass Button */}
          {isRegistered ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => onOpenDetails(event)}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Pass Claimed (QR)</span>
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleRsvpClick}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>RSVP • {event.entryFee}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          )}

        </div>

      </div>

    </motion.div>
  );
};
