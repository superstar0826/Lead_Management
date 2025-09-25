import { Lead } from '@/types/lead';

export const mockLeads: Lead[] = [
  {
    id: '1',
    fullName: 'Sarah Johnson',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=400',
    instagramHandle: '@sarah_j_model',
    phoneNumber: '+1 (555) 123-4567',
    onlyFansEarnings: 150000,
    currentlySignedTo: 'Elite Models',
    referredBy: 'Jessica Miller',
    whosTalkingTo: 'Mike Thompson',
    notes: 'Very interested, considering our premium package',
    lastTimeSpokenTo: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: 'pending',
    conversationTimeline: [
      {
        id: '1-1',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        dealStatus: 'Initial Contact',
        notes: 'Reached out via Instagram DM'
      },
      {
        id: '1-2',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        dealStatus: 'First Call Scheduled',
        notes: 'Phone conversation set for this week'
      },
      {
        id: '1-3',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        dealStatus: 'Proposal Sent',
        notes: 'Sent premium management proposal'
      }
    ]
  },
  {
    id: '2',
    fullName: 'Amanda Rodriguez',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    instagramHandle: '@amanda_r_official',
    phoneNumber: '+1 (555) 987-6543',
    onlyFansEarnings: 85000,
    whosTalkingTo: 'Lisa Chen',
    notes: 'Needs time to think about the offer',
    lastTimeSpokenTo: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    status: 'pending',
    conversationTimeline: [
      {
        id: '2-1',
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        dealStatus: 'Initial Outreach',
        notes: 'Connected through mutual contact'
      },
      {
        id: '2-2',
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        dealStatus: 'Video Call Completed',
        notes: 'Discussed management terms and commission structure'
      }
    ]
  },
  {
    id: '3',
    fullName: 'Emma Williams',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    instagramHandle: '@emma_w_creator',
    phoneNumber: '+1 (555) 456-7890',
    onlyFansEarnings: 220000,
    whosTalkingTo: 'David Parker',
    lastTimeSpokenTo: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: 'signed',
    conversationTimeline: [
      {
        id: '3-1',
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        dealStatus: 'Cold Outreach',
        notes: 'Initial contact via email'
      },
      {
        id: '3-2',
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        dealStatus: 'Meeting Scheduled',
        notes: 'In-person meeting arranged'
      },
      {
        id: '3-3',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        dealStatus: 'Contract Negotiation',
        notes: 'Discussing terms and exclusivity'
      },
      {
        id: '3-4',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        dealStatus: 'Signed',
        notes: 'Contract executed, onboarding started'
      }
    ]
  },
  {
    id: '4',
    fullName: 'Olivia Brown',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    instagramHandle: '@olivia_brown_',
    phoneNumber: '+1 (555) 321-0987',
    onlyFansEarnings: 45000,
    referredBy: 'Sarah Johnson',
    whosTalkingTo: 'Mike Thompson',
    notes: 'Not interested in our current offering',
    lastTimeSpokenTo: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    status: 'dead',
    conversationTimeline: [
      {
        id: '4-1',
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        dealStatus: 'Referral Received',
        notes: 'Referred by existing client'
      },
      {
        id: '4-2',
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        dealStatus: 'Final Follow-up',
        notes: 'Decided to go with a different agency'
      }
    ]
  },
  {
    id: '5',
    fullName: 'Zoe Martinez',
    profilePicture: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400',
    instagramHandle: '@zoe_martinez_model',
    phoneNumber: '+1 (555) 789-1234',
    onlyFansEarnings: 180000,
    currentlySignedTo: 'Independent',
    whosTalkingTo: 'Lisa Chen',
    notes: 'High earner, very interested in our services',
    lastTimeSpokenTo: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 days ago
    status: 'pending',
    conversationTimeline: [
      {
        id: '5-1',
        date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        dealStatus: 'Discovery Call',
        notes: 'Initial consultation completed'
      },
      {
        id: '5-2',
        date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
        dealStatus: 'Proposal Review',
        notes: 'Reviewing our comprehensive management package'
      }
    ]
  }
];