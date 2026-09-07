import React, { useState } from 'react';
import { QrCode, Calendar, MapPin, Download, Share2, Bell, CheckCircle, Sparkles, Clock } from 'lucide-react';
import { Event } from '../types';

interface ScheduleAndPassesProps {
  registeredEvents: Event[];
  onOpenDetails: (event: Event) => void;
  onShareStory: (event: Event) => void;
}

export const ScheduleAndPasses: React.FC<ScheduleAndPassesProps> = ({
  registeredEvents,
  onOpenDetails,
  onShareStory,
}) => {
  const [activeTicket, setActiveTicket] = useState<Event | null>(
    registeredEvents.length > 0 ? registeredEvents[0] : null
  );

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2 border border-emerald-500/30">
          <QrCode className="w-3.5 h-3.5 text-emerald-400" />
          <span>My Digital Passes & Schedule</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Personal Fest Schedule & QR Entry Passes
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
          Access your fast-track QR tickets, event timelines, and set automated push notifications for campus fests.
        </p>
      </div>

      {registeredEvents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Registered Passes Agenda List (1 Col) */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              RSVP'd Events ({registeredEvents.length})
            </h3>

            {registeredEvents.map((evt) => {
              const isSelected = activeTicket?.id === evt.id;
              return (
                <div
                  key={evt.id}
                  onClick={() => setActiveTicket(evt)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-indigo-400'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                    }`}>
                      {evt.category}
                    </span>
                    <h4 className="text-sm font-extrabold line-clamp-1 mt-1">
                      {evt.title}
                    </h4>
                    <p className={`text-xs font-medium ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {evt.date} • {evt.venueName}
                    </p>
                  </div>

                  <QrCode className={`w-6 h-6 shrink-0 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                </div>
              );
            })}
          </div>

          {/* Detailed QR Pass Ticket Card (2 Cols) */}
          <div className="lg:col-span-2">
            {activeTicket ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg relative overflow-hidden">
                
                {/* Decorative Ticket Stub Edges */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800" />

                {/* Ticket Top Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-dashed border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
                      VIP Fast-Track Pass ⚡
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                      {activeTicket.title}
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{activeTicket.collegeName} • {activeTicket.venueName}</span>
                    </p>
                  </div>

                  {/* QR Code Graphic Box */}
                  <div className="p-3 bg-slate-950 rounded-2xl border border-indigo-500/30 flex flex-col items-center justify-center text-center self-center sm:self-auto shadow-md">
                    <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-slate-950" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 mt-1.5">
                      ACE-PASS-{activeTicket.id.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Ticket Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-b border-dashed border-slate-200 dark:border-slate-800 text-xs">
                  <div>
                    <p className="text-slate-400 font-medium">Scheduled Date</p>
                    <p className="font-extrabold text-slate-900 dark:text-white text-sm">{activeTicket.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Session Hours</p>
                    <p className="font-extrabold text-slate-900 dark:text-white text-sm">{activeTicket.time}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Entry Status</p>
                    <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Confirmed Pass
                    </p>
                  </div>
                </div>

                {/* Notification Reminders & Story Share Footer */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <Bell className="w-4 h-4 text-indigo-500 animate-bounce" />
                    <span>In-App Push Reminder Set (15m before event)</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => onShareStory(activeTicket)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Share2 className="w-4 h-4 text-pink-500" />
                      <span>Share Pass Story</span>
                    </button>

                    <button
                      onClick={() => onOpenDetails(activeTicket)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
                    >
                      <span>View Full Event Specs</span>
                    </button>
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <QrCode className="w-12 h-12 text-indigo-500 mx-auto" />
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            No Event Passes Claimed Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
            Browse the Discover Fests tab, click "RSVP & Claim Pass" on any event to earn +150 XP and get your instant QR Ticket!
          </p>
        </div>
      )}

    </div>
  );
};
