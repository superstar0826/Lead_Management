export interface Lead {
  id: string;
  fullName: string;
  profilePicture: string;
  instagramHandle: string;
  phoneNumber?: string;
  onlyFansEarnings: number;
  currentlySignedTo?: string;
  referredBy?: string;
  whosTalkingTo: string;
  notes?: string;
  lastTimeSpokenTo: Date;
  status: 'pending' | 'signed' | 'dead';
  conversationTimeline: ConversationEntry[];
}

export interface ConversationEntry {
  id: string;
  date: Date;
  dealStatus: string;
  notes?: string;
}

export type FilterTimeframe = '7days' | '14days' | '30days' | 'all';
export type FilterEarnings = '100k+' | 'all';

export interface LeadFilters {
  timeframe: FilterTimeframe;
  earnings: FilterEarnings;
  searchQuery: string;
}