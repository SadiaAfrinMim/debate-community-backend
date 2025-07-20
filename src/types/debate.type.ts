// src/types/debate.type.ts
export interface IDebate {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  bannerUrl?: string;
  durationHours: number;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  status: 'active' | 'closed' | 'archived';
  supportVotes: number;
  opposeVotes: number;
  voters: string[];
}
