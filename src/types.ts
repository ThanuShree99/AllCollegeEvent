export type EventCategory = 
  | 'Tech & Coding'
  | 'Cultural & Music'
  | 'Gaming & Esports'
  | 'E-Summit & Biz'
  | 'Workshops & AI'
  | 'Sports & Fitness'
  | 'Design & Arts'
  | 'Social & Parties';

export interface Event {
  id: string;
  title: string;
  collegeName: string;
  campusCity: string;
  date: string; // ISO date string
  time: string; // e.g., "10:00 AM - 05:00 PM"
  category: EventCategory;
  description: string;
  venueName: string;
  mapCoordinates: { x: number; y: number }; // Percentage coordinates on campus map
  prizePool?: string;
  entryFee: string; // "Free" or "$10" or "₹100"
  imageUrl: string;
  organizer: string;
  organizerAvatar: string;
  squadAttendingCount: number;
  vibeScore: number; // 1 - 100
  isFeatured?: boolean;
  isTrending?: boolean;
  tags: string[];
  rules?: string[];
  scheduleHighlights?: { time: string; topic: string }[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  category: 'Daily' | 'Social' | 'Explorer' | 'Special';
  progress?: { current: number; total: number };
  badgeRewardId?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  category: 'Explorer' | 'Competitor' | 'Social' | 'Master';
  unlocked: boolean;
  unlockedAt?: string;
  colorGrad: string;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  college: string;
  xp: number;
  level: number;
  avatar: string;
  badgeTitle: string;
  streakDays: number;
  squadCount: number;
}

export interface ReferralTier {
  referralsRequired: number;
  title: string;
  rewardDescription: string;
  unlocked: boolean;
  icon: string;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'event' | 'quest' | 'squad' | 'system';
  linkToTab?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorCollege: string;
  authorAvatar: string;
  authorLevel: number;
  content: string;
  imageUrl?: string;
  eventRefId?: string;
  eventRefTitle?: string;
  timestamp: string;
  vibes: {
    fire: number;
    rocket: number;
    crown: number;
    headphone: number;
  };
  userVibed?: string[]; // Array of vibe keys clicked by current user
  commentsCount: number;
  tags: string[];
}

export interface MapVenue {
  id: string;
  name: string;
  buildingCode: string;
  x: number; // Percentage on map canvas
  y: number;
  category: string;
  activeEventsCount: number;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  avatar: string;
  xp: number;
  level: number;
  streakDays: number;
  referralCode: string;
  referralsCount: number;
  squadName: string;
  savedEventIds: string[];
  registeredEventIds: string[];
}
