import { v4 as uuidv4 } from 'uuid';
import { DebateModel } from '../models/debate.model';
import { 
  CreateDebateInput,
  UpdateDebateInput,
  VoteInput,
  PaginationQuery,
  SearchQuery
} from '../utils/validation.util';
import { IDebate } from '../types/debate.type';

export class DebateService {
  /**
   * Create a new debate
   */
  static async create(input: CreateDebateInput): Promise<IDebate> {
    const now = new Date();
    const debate = {
      id: uuidv4(),
      ...input,
      creatorId: input.creatorId,
      createdAt: now,
      updatedAt: now,
      expiresAt: new Date(now.getTime() + input.durationHours * 3600_000),
      status: 'active' as const,
      supportVotes: 0,
      opposeVotes: 0,
      voters: []
    };
    
    return await DebateModel.create(debate);
  }

//  static create(input: CreateDebateInput) {
//      const now = new Date();
//     const debate = {
//       id: uuidv4(),
//       ...input,
//       creatorId: input.creatorId,
//       createdAt: now,
//       updatedAt: now,
//       expiresAt: new Date(now.getTime() + input.durationHours * 3600_000),
//       status: 'active' as const,
//       supportVotes: 0,
//       opposeVotes: 0,
//       voters: []
    
//     };
//     return DebateModel.create(debate);
//   }

  /**
   * Get paginated list of debates
   */
  static async getAll(params: {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ debates: IDebate[]; total: number }> {
    return await DebateModel.list({
      page: params.page,
      limit: params.limit,
     
      sortOrder: params.sortOrder || 'desc'
    });
  }

  /**
   * Get debate by ID
   */
  static async getById(id: string): Promise<IDebate | null> {
    return await DebateModel.findById(id);
  }

  /**
   * Update debate
   */
  static async update(id: string, input: UpdateDebateInput): Promise<IDebate | null> {
    const existingDebate = await DebateModel.findById(id);
    if (!existingDebate) return null;

    const updatedData = {
      ...existingDebate,
      ...input,
      updatedAt: new Date()
    };

    return await DebateModel.update(id, updatedData);
  }

  /**
   * Delete debate
   */
  static async delete(id: string): Promise<boolean> {
    return await DebateModel.delete(id);
  }

  /**
   * Vote on debate
   */
  static async vote(params: {
    debateId: string;
    userId: string;
    side: 'support' | 'oppose';
  }): Promise<IDebate | null> {
    const debate = await DebateModel.findById(params.debateId);
    if (!debate) return null;

    // Prevent duplicate voting
    if (debate.voters.includes(params.userId)) {
      throw new Error('User has already voted on this debate');
    }

    const updatedVotes = {
      supportVotes: params.side === 'support' 
        ? debate.supportVotes + 1 
        : debate.supportVotes,
      opposeVotes: params.side === 'oppose' 
        ? debate.opposeVotes + 1 
        : debate.opposeVotes,
      voters: [...debate.voters, params.userId]
    };

    return await DebateModel.update(params.debateId, {
      ...debate,
      ...updatedVotes,
      updatedAt: new Date()
    });
  }

  /**
   * Search debates
   */
  static async search(params: SearchQuery & PaginationQuery): Promise<{
    debates: IDebate[];
    total: number;
  }> {
    return await DebateModel.search({
      query: params.query,
      page: params.page,
      limit: params.limit
    });
  }

  /**
   * Get debates by category
   */
  static async getByCategory(params: {
    category: string;
    page: number;
    limit: number;
  }): Promise<{ debates: IDebate[]; total: number }> {
    return await DebateModel.findByCategory({
      category: params.category,
      page: params.page,
      limit: params.limit
    });
  }

  /**
   * Verify debate ownership
   */
//   static async verifyOwnership(
//     debateId: string,
//     userId?: string
//   ): Promise<boolean> {
//     if (!userId) return false;
//     const debate = await DebateModel.findById(debateId);
//     return debate?.creatorId === userId;
//   }
}