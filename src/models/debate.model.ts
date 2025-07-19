import { IDebate } from '../types/debate.type';
import { PaginationQuery, SearchQuery } from '../utils/validation.util';

// In-memory storage
const debates = new Map<string, IDebate>();

// Define allowed sortable fields
type SortableField = keyof Pick<IDebate, 
  'createdAt' | 'updatedAt' | 'title' | 'supportVotes' | 'opposeVotes' | 'viewCount' | 'lastActivityAt'
>;

export const DebateModel = {
  /**
   * Create a new debate
   */
  create(debate: IDebate): IDebate {
    debates.set(debate.id, debate);
    return debate;
  },

  /**
   * Find debate by ID
   */
  findById(id: string): IDebate | null {
    return debates.get(id) || null;
  },

  /**
   * Update debate
   */
  update(id: string, data: Partial<IDebate>): IDebate | null {
    const debate = debates.get(id);
    if (!debate) return null;
    
    const updatedDebate = { 
      ...debate, 
      ...data,
      updatedAt: new Date() 
    };
    
    debates.set(id, updatedDebate);
    return updatedDebate;
  },

  /**
   * Delete debate
   */
  delete(id: string): boolean {
    return debates.delete(id);
  },

  /**
   * List debates with pagination
   */
  list(params: {
    page: number;
    limit: number;
    sortBy?: SortableField;
    sortOrder?: 'asc' | 'desc';
  }): { debates: IDebate[]; total: number } {
    const allDebates = Array.from(debates.values());
    
    // Sorting with type-safe field access
    const sorted = allDebates.sort((a, b) => {
      const sortField = params.sortBy || 'createdAt';
      const order = params.sortOrder === 'asc' ? 1 : -1;
      
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Handle date comparisons
      if (aValue instanceof Date && bValue instanceof Date) {
        return order * (aValue.getTime() - bValue.getTime());
      }

      // Handle number comparisons
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order * (aValue - bValue);
      }

      // Default string comparison
      return order * String(aValue).localeCompare(String(bValue));
    });

    // Pagination
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    const paginated = sorted.slice(start, end);

    return {
      debates: paginated,
      total: allDebates.length
    };
  },

  /**
   * Search debates
   */
  search(params: SearchQuery & PaginationQuery): { debates: IDebate[]; total: number } {
    const allDebates = Array.from(debates.values());
    const query = params.query.toLowerCase();
    
    const filtered = allDebates.filter(debate => 
      debate.title.toLowerCase().includes(query) ||
      debate.description.toLowerCase().includes(query) ||
      debate.tags.some(tag => tag.toLowerCase().includes(query))
    );

    // Pagination
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    const paginated = filtered.slice(start, end);

    return {
      debates: paginated,
      total: filtered.length
    };
  },

  /**
   * Find debates by category
   */
  findByCategory(params: {
    category: string;
    page: number;
    limit: number;
  }): { debates: IDebate[]; total: number } {
    const allDebates = Array.from(debates.values());
    const filtered = allDebates.filter(
      debate => debate.category.toLowerCase() === params.category.toLowerCase()
    );

    // Pagination
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    const paginated = filtered.slice(start, end);

    return {
      debates: paginated,
      total: filtered.length
    };
  },

  /**
   * Get debates by creator
   */
  findByCreator(creatorId: string): IDebate[] {
    return Array.from(debates.values()).filter(
      debate => debate.creatorId === creatorId
    );
  }
};