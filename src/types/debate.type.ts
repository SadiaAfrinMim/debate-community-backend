export interface IDebate {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  bannerUrl?: string;
  durationHours: number;
  creatorId: string;       // Added for ownership tracking
  status: 'active' | 'closed' | 'archived'; // Added for lifecycle management
  createdAt: Date;
  updatedAt: Date;         // Added for tracking last modification
  expiresAt: Date;
  supportVotes: number;
  opposeVotes: number;
  voters: string[];        // Added to track who voted (prevent duplicate votes)
  viewCount?: number;      // Optional for popularity tracking
  lastActivityAt?: Date;   // Optional for sorting by activity
}