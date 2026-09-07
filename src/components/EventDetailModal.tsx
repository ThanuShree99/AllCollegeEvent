import React from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Zap, 
  CheckCircle2, 
  Share2, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  QrCode,
  Compass
} from 'lucide-react';
import { Event } from '../types';

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  isRegistered: boolean;
  onRsvp: (event: Event) => void;
  onShare: (event: Event) => void;
  onNavigateToMap: (coordinates: { x: number; y: number }) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
  isRegistered,
  onRsvp,
  onShare,
  onNavigateToMap,
}) => {
  if (!isOpen || !event) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Hero Image Banner */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-950">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-slate-950/40 to-transparent" />

          {/* Floating Category & Vibe Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-950/80 backdrop-blur-md border border-indigo-500/30 text-indigo-300 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{event.vibeScore}% Vibe Score</span>
            </span>
          </div>

          {/* Title & Organizer Info at Bottom of Banner */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={event.organizerAvatar}
                alt={event.organizer}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500"
              />
              <span className="text-xs font-bold text-slate-200">
                Hosted by {event.organizer}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <p className="text-slate-400 font-medium">Campus Location</p>
              <p className="font-extrabold text-slate-900 dark:text-white truncate">{event.collegeName}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Date & Time</p>
              <p className="font-extrabold text-slate-900 dark:text-white">{event.date}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Prize Pool</p>
              <p className="font-extrabold text-emerald-600 dark:text-emerald-400">{event.prizePool || 'Swag & Certificates'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Entry Pass</p>
              <p className="font-extrabold text-indigo-600 dark:text-indigo-400">{event.entryFee}</p>
            </div>
          </div>

          {/* Venue & Map Button */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">Venue on Campus</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">{event.venueName}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onNavigateToMap(event.mapCoordinates);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Campus Map</span>
            </motion.button>
          </div>

          {/* About Event Description */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>About The Fest Event</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {event.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Schedule Highlights */}
          {event.scheduleHighlights && event.scheduleHighlights.length > 0 && (
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>Schedule Highlights</span>
              </h4>
              <div className="space-y-2">
                {event.scheduleHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800"
                  >
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                      {item.time}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules & Eligibility */}
          {event.rules && event.rules.length > 0 && (
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Participation Guidelines</span>
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
                {event.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onShare(event)}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-pink-500" />
              <span>Share Story Card</span>
            </motion.button>

            {isRegistered ? (
              <div className="w-full sm:flex-1 py-3 px-6 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-extrabold text-xs flex items-center justify-center gap-2">
                <QrCode className="w-4 h-4" />
                <span>You Have Claimed Your Digital QR Pass!</span>
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  onRsvp(event);
                }}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>RSVP & Claim Free Pass (+150 XP)</span>
              </motion.button>
            )}
          </div>

        </div>

      </motion.div>

    </motion.div>
  );
};
