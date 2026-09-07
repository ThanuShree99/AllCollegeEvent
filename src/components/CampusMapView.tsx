import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Sparkles, Trophy, Building, ArrowRight, Zap, Filter } from 'lucide-react';
import { Event, MapVenue } from '../types';
import { CAMPUS_MAP_VENUES } from '../data/gamificationData';

interface CampusMapViewProps {
  events: Event[];
  onOpenEventDetails: (event: Event) => void;
  selectedCoordinates?: { x: number; y: number } | null;
}

export const CampusMapView: React.FC<CampusMapViewProps> = ({
  events,
  onOpenEventDetails,
  selectedCoordinates,
}) => {
  const [selectedVenue, setSelectedVenue] = useState<MapVenue | null>(
    selectedCoordinates
      ? CAMPUS_MAP_VENUES.find(v => v.x === selectedCoordinates.x && v.y === selectedCoordinates.y) || CAMPUS_MAP_VENUES[0]
      : CAMPUS_MAP_VENUES[0]
  );
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Filter events matching selected venue
  const venueEvents = selectedVenue
    ? events.filter(e => e.venueName.toLowerCase().includes(selectedVenue.name.toLowerCase()) || (e.mapCoordinates.x === selectedVenue.x && e.mapCoordinates.y === selectedVenue.y))
    : [];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white shadow-xl"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2">
            <Navigation className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Interactive Campus Location Finder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Campus Event Navigation Map
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            Locate active fest halls, OAT grounds, esports labs, and get real-time walking routes.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20 text-xs">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-slate-900 text-white">All Campus Venues</option>
            <option value="Tech & Coding" className="bg-slate-900 text-white">Tech Blocks</option>
            <option value="Cultural & Music" className="bg-slate-900 text-white">OAT & Theatres</option>
            <option value="Gaming & Esports" className="bg-slate-900 text-white">Esports Lounges</option>
            <option value="Sports & Fitness" className="bg-slate-900 text-white">Sports Grounds</option>
          </select>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Visual SVG Campus Map (2 Cols) */}
        <div className="lg:col-span-2 relative bg-slate-950 rounded-3xl border border-slate-800 p-4 overflow-hidden min-h-[420px] sm:min-h-[500px] flex items-center justify-center shadow-inner">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Styled SVG Campus Grounds Vector */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Campus Road Networks */}
            <path d="M 10,50 Q 50,20 90,50 Q 50,80 10,50" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 50,10 L 50,90" fill="none" stroke="#475569" strokeWidth="3" />
            <path d="M 10,30 L 90,70" fill="none" stroke="#334155" strokeWidth="1.5" />

            {/* Campus Greenery Zones */}
            <rect x="5" y="10" width="20" height="25" rx="5" fill="#064e3b" opacity="0.4" />
            <rect x="75" y="60" width="20" height="30" rx="5" fill="#064e3b" opacity="0.4" />
            <circle cx="50" cy="50" r="14" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1" opacity="0.6" />

            {/* Animated Walk Path to Selected Venue */}
            {selectedVenue && (
              <line
                x1="10"
                y1="85"
                x2={selectedVenue.x}
                y2={selectedVenue.y}
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="3 3"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* Main Entrance Marker */}
          <div className="absolute bottom-4 left-4 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-[11px] font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg z-10">
            <Navigation className="w-3.5 h-3.5" />
            <span>Campus Gate 1 (You are here)</span>
          </div>

          {/* Map Venue Pins */}
          {CAMPUS_MAP_VENUES.map((venue) => {
            const isSelected = selectedVenue?.id === venue.id;
            const matchesFilter = filterCategory === 'All' || venue.category === filterCategory;
            if (!matchesFilter) return null;

            return (
              <motion.button
                key={venue.id}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedVenue(venue)}
                style={{ left: `${venue.x}%`, top: `${venue.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer ${
                  isSelected ? 'scale-125 z-30' : ''
                }`}
              >
                <div className="relative flex flex-col items-center">
                  
                  {/* Pin Icon Bubble */}
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold shadow-xl border transition-all ${
                      isSelected
                        ? 'bg-gradient-to-tr from-indigo-500 to-pink-500 text-white border-white ring-4 ring-indigo-500/30'
                        : 'bg-slate-900/90 text-indigo-400 border-indigo-500/40 hover:bg-indigo-600 hover:text-white'
                    }`}
                  >
                    <Building className="w-5 h-5" />
                  </div>

                  {/* Active Events Badge Count */}
                  {venue.activeEventsCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-black flex items-center justify-center shadow-md animate-bounce">
                      {venue.activeEventsCount}
                    </span>
                  )}

                  {/* Pin Name Label */}
                  <span className={`mt-1.5 text-[10px] font-extrabold px-2 py-0.5 rounded-md backdrop-blur-md transition-all whitespace-nowrap shadow-md ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900/80 text-slate-200 group-hover:bg-slate-800'
                  }`}>
                    {venue.buildingCode}
                  </span>

                </div>
              </motion.button>
            );
          })}

        </div>

        {/* Selected Venue Details Panel (1 Col) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          
          {selectedVenue ? (
            <div className="space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    {selectedVenue.buildingCode}
                  </span>
                  <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    ~3 min walk from Gate
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {selectedVenue.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                  {selectedVenue.description}
                </p>
              </div>

              {/* Active Events hosted here */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
                  Events Hosted At This Building ({venueEvents.length})
                </h4>

                {venueEvents.length > 0 ? (
                  <div className="space-y-3">
                    {venueEvents.map((evt) => (
                      <motion.div
                        key={evt.id}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onOpenEventDetails(evt)}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                      >
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1">
                            {evt.title}
                          </p>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {evt.time} • {evt.prizePool ? `Prize: ${evt.prizePool}` : 'Free Entry'}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/30 text-slate-500 text-xs">
                    No active events scheduled at this exact location right now. Select another building pin!
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Click any building pin on the campus map to view venue specs and hosted events.
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 font-medium text-center">
            💡 Pro Tip: Show your AllCollegeEvent QR Ticket at any building entry for fast-track access!
          </div>

        </div>

      </div>

    </div>
  );
};
