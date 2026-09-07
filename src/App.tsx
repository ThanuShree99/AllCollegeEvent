import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { EventCard } from './components/EventCard';
import { EventDetailModal } from './components/EventDetailModal';
import { CampusMapView } from './components/CampusMapView';
import { GamificationDashboard } from './components/GamificationDashboard';
import { ReferralRewardsHub } from './components/ReferralRewardsHub';
import { ScheduleAndPasses } from './components/ScheduleAndPasses';
import { SocialCommunityHub } from './components/SocialCommunityHub';
import { AIFestMateModal } from './components/AIFestMateModal';
import { CreateEventModal } from './components/CreateEventModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ProfileModal } from './components/ProfileModal';
import { 
  AppOpeningIntroSequence, 
  LiveFestTicker, 
  FloatingQuickBar, 
  WelcomeLevelToast, 
  VibeParticleBurst,
  VibeParticle 
} from './components/FloatingGenZTools';

import { Event, EventCategory, UserProfile, Quest, Badge, CommunityPost, UserNotification } from './types';
import { INITIAL_EVENTS } from './data/mockEvents';
import { INITIAL_QUESTS, INITIAL_BADGES, INITIAL_LEADERBOARD, INITIAL_POSTS } from './data/gamificationData';

const TAB_ORDER = ['events', 'map', 'quests', 'referral', 'schedule', 'community'];

const tabMotionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
    scale: 0.98,
    filter: 'blur(3px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 340,
      damping: 26,
      mass: 0.75,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    scale: 0.98,
    filter: 'blur(3px)',
    transition: {
      duration: 0.18,
      ease: [0.32, 0, 0.67, 0],
    },
  }),
};

export default function App() {
  // Opening Intro Splash State
  const [showAppIntro, setShowAppIntro] = useState<boolean>(true);

  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<string>('events');
  const [tabDirection, setTabDirection] = useState<number>(1);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // User Profile State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ace_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-cur',
      name: 'Sam K.',
      email: 'sam.student@stanford.edu',
      college: 'Stanford Tech',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      xp: 2850,
      level: 12,
      streakDays: 7,
      referralCode: 'ACE-SQUAD-SAM88',
      referralsCount: 3,
      squadName: 'TechVipers',
      savedEventIds: ['evt-1'],
      registeredEventIds: ['evt-1'],
    };
  });

  // Events & Filters
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<string>('trending');

  // Gamification Datasets
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);

  // Particles Feedback
  const [particles, setParticles] = useState<VibeParticle[]>([]);

  // Notifications
  const [notifications, setNotifications] = useState<UserNotification[]>([
    {
      id: 'notif-1',
      title: 'Pass Issued 🎫',
      message: 'Your Fast-Track QR pass for HackMatrix 2026 is active!',
      timestamp: '10m ago',
      read: false,
      type: 'event',
    },
    {
      id: 'notif-2',
      title: 'Quest Completed 🔥',
      message: 'Daily Check-in complete (+50 XP granted).',
      timestamp: '1h ago',
      read: true,
      type: 'quest',
    },
  ]);

  // Modal States
  const [selectedEventModal, setSelectedEventModal] = useState<Event | null>(null);
  const [isAiMateOpen, setIsAiMateOpen] = useState<boolean>(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [targetCoordinates, setTargetCoordinates] = useState<{ x: number; y: number } | null>(null);

  // Directional Tab Switcher
  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;
    const prevIdx = TAB_ORDER.indexOf(activeTab);
    const newIdx = TAB_ORDER.indexOf(newTab);
    setTabDirection(newIdx >= prevIdx ? 1 : -1);
    setActiveTab(newTab);
  };

  // Particle Trigger
  const triggerVibeBurst = (emoji: string, e?: React.MouseEvent | { clientX: number; clientY: number }) => {
    const x = e?.clientX ?? (window.innerWidth / 2);
    const y = e?.clientY ?? (window.innerHeight / 2);
    const burstCount = 6;
    const newParticles: VibeParticle[] = Array.from({ length: burstCount }, (_, i) => ({
      id: Date.now() + i,
      emoji,
      x: x + (Math.random() - 0.5) * 80,
      y: y + (Math.random() - 0.5) * 40,
    }));
    setParticles((prev) => [...prev.slice(-20), ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1400);
  };

  // Dark Mode side effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Save user profile state
  useEffect(() => {
    localStorage.setItem('ace_user', JSON.stringify(user));
  }, [user]);

  // Handle Event RSVP / Ticket Claim
  const handleRsvp = (eventToRsvp: Event, e?: React.MouseEvent) => {
    if (user.registeredEventIds.includes(eventToRsvp.id)) return;

    triggerVibeBurst('🎟️', e);
    const updatedRegistered = [...user.registeredEventIds, eventToRsvp.id];
    const gainedXp = 150;
    const newTotalXp = user.xp + gainedXp;
    const newLevel = Math.floor(newTotalXp / 250);

    setUser((prev) => ({
      ...prev,
      registeredEventIds: updatedRegistered,
      xp: newTotalXp,
      level: Math.max(prev.level, newLevel),
    }));

    // Add Notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Pass Claimed! 🎟️',
        message: `You earned +150 XP for registering to ${eventToRsvp.title}.`,
        timestamp: 'Just now',
        read: false,
        type: 'event',
      },
      ...prev,
    ]);
  };

  // Handle Claim Quest XP
  const handleClaimQuestXp = (questId: string, xpReward: number, e?: React.MouseEvent) => {
    triggerVibeBurst('⚡', e);
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, completed: true } : q))
    );

    const newTotalXp = user.xp + xpReward;
    const newLevel = Math.floor(newTotalXp / 250);

    setUser((prev) => ({
      ...prev,
      xp: newTotalXp,
      level: Math.max(prev.level, newLevel),
    }));
  };

  // Handle Add Community Post
  const handleAddPost = (newPostData: Partial<CommunityPost>, e?: React.MouseEvent) => {
    triggerVibeBurst('🚀', e);
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: user.name,
      authorCollege: user.college,
      authorAvatar: user.avatar,
      authorLevel: user.level,
      content: newPostData.content || '',
      eventRefId: newPostData.eventRefId,
      eventRefTitle: newPostData.eventRefTitle,
      timestamp: 'Just now',
      vibes: { fire: 1, rocket: 1, crown: 0, headphone: 0 },
      commentsCount: 0,
      tags: newPostData.tags || ['FestVibes'],
    };

    setPosts((prev) => [newPost, ...prev]);

    // Reward +50 XP
    setUser((prev) => ({
      ...prev,
      xp: prev.xp + 50,
    }));
  };

  // Handle Vibe Reactions
  const handleVibeReact = (
    postId: string,
    vibeType: 'fire' | 'rocket' | 'crown' | 'headphone',
    e?: React.MouseEvent
  ) => {
    const emojiMap = { fire: '🔥', rocket: '🚀', crown: '👑', headphone: '🎧' };
    triggerVibeBurst(emojiMap[vibeType], e);
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            vibes: {
              ...p.vibes,
              [vibeType]: p.vibes[vibeType] + 1,
            },
          };
        }
        return p;
      })
    );
  };

  // Filter & Sort Events
  const filteredEvents = events
    .filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.campusCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All' || e.category === selectedCategory;

      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (sortBy === 'prizes') return (b.prizePool ? 1 : -1) - (a.prizePool ? 1 : -1);
      if (sortBy === 'vibe') return b.vibeScore - a.vibeScore;
      if (sortBy === 'soonest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      return b.squadAttendingCount - a.squadAttendingCount; // default trending
    });

  const registeredEventsList = events.filter((e) => user.registeredEventIds.includes(e.id));
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 relative overflow-x-hidden">
      
      {/* Gen Z App Opening Intro Sequence */}
      {showAppIntro && (
        <AppOpeningIntroSequence 
          user={user} 
          onComplete={() => setShowAppIntro(false)} 
        />
      )}

      {/* Live Campus Fest Wire Ticker */}
      <LiveFestTicker />

      {/* Top Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAiMate={() => setIsAiMateOpen(true)}
        onOpenCreateEvent={() => setIsCreateEventOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area with Spring Motion */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <AnimatePresence mode="wait" custom={tabDirection}>
          {/* TAB 1: Discover Fests */}
          {activeTab === 'events' && (
            <motion.div
              key="tab-events"
              custom={tabDirection}
              variants={tabMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <HeroBanner
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onOpenAiPlanner={() => setIsAiMateOpen(true)}
                onOpenReferrals={() => handleTabChange('referral')}
              />

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <span>Upcoming Campus Fests & Hackathons</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-black bg-indigo-500/10 text-indigo-600 dark:text-pink-400 border border-indigo-500/20">
                    {filteredEvents.length}
                  </span>
                </h2>
              </div>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.06,
                    },
                  },
                }}
              >
                {filteredEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    isRegistered={user.registeredEventIds.includes(evt.id)}
                    onRsvp={(e) => handleRsvp(evt)}
                    onOpenDetails={(e) => setSelectedEventModal(e)}
                    onShare={() => handleTabChange('community')}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* TAB 2: Campus Map */}
          {activeTab === 'map' && (
            <motion.div
              key="tab-map"
              custom={tabDirection}
              variants={tabMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <CampusMapView
                events={events}
                onOpenEventDetails={(e) => setSelectedEventModal(e)}
                selectedCoordinates={targetCoordinates}
              />
            </motion.div>
          )}

          {/* TAB 3: XP & Quests */}
          {activeTab === 'quests' && (
            <motion.div
              key="tab-quests"
              custom={tabDirection}
              variants={tabMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <GamificationDashboard
                user={user}
                quests={quests}
                badges={badges}
                leaderboard={INITIAL_LEADERBOARD}
                onClaimQuestXp={handleClaimQuestXp}
              />
            </motion.div>
          )}

          {/* TAB 4: Squad & Referral Perks */}
          {activeTab === 'referral' && (
            <motion.div
              key="tab-referral"
              custom={tabDirection}
              variants={tabMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <ReferralRewardsHub
                user={user}
                onShareReferral={() => handleTabChange('community')}
              />
            </motion.div>
          )}

          {/* TAB 5: My Digital Passes */}
          {activeTab === 'schedule' && (
            <motion.div
              key="tab-schedule"
              custom={tabDirection}
              variants={tabMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <ScheduleAndPasses
                registeredEvents={registeredEventsList}
                onOpenDetails={(e) => setSelectedEventModal(e)}
                onShareStory={() => handleTabChange('community')}
              />
            </motion.div>
          )}

          {/* TAB 6: Squad Community Feed & Viral Story Studio */}
          {activeTab === 'community' && (
            <motion.div
              key="tab-community"
              custom={tabDirection}
              variants={tabMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <SocialCommunityHub
                user={user}
                posts={posts}
                events={events}
                onAddPost={handleAddPost}
                onVibeReact={handleVibeReact}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Gen Z Tool Hub & Live Notifications */}
      <FloatingQuickBar
        user={user}
        onOpenAiMate={() => setIsAiMateOpen(true)}
        onOpenQuests={() => handleTabChange('quests')}
      />

      {/* Welcome XP Toast */}
      <WelcomeLevelToast user={user} />

      {/* Vibe Particle Bursts */}
      <VibeParticleBurst particles={particles} />

      {/* Modals & Overlay Drawers */}
      <AnimatePresence>
        {selectedEventModal && (
          <EventDetailModal
            event={selectedEventModal}
            isOpen={!!selectedEventModal}
            onClose={() => setSelectedEventModal(null)}
            isRegistered={user.registeredEventIds.includes(selectedEventModal.id)}
            onRsvp={(e) => handleRsvp(e)}
            onShare={() => {
              setSelectedEventModal(null);
              handleTabChange('community');
            }}
            onNavigateToMap={(coords) => {
              setTargetCoordinates(coords);
              handleTabChange('map');
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAiMateOpen && (
          <AIFestMateModal
            isOpen={isAiMateOpen}
            onClose={() => setIsAiMateOpen(false)}
            events={events}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCreateEventOpen && (
          <CreateEventModal
            isOpen={isCreateEventOpen}
            onClose={() => setIsCreateEventOpen(false)}
            onCreateEvent={(newEvent) => {
              setEvents((prev) => [newEvent, ...prev]);
              setUser((prev) => ({ ...prev, xp: prev.xp + 200 }));
              triggerVibeBurst('🎉');
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNotificationsOpen && (
          <NotificationDrawer
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            notifications={notifications}
            onMarkAllRead={() =>
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            }
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProfileOpen && (
          <ProfileModal
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            user={user}
            badges={badges}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

