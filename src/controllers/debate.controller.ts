import { Request, Response, NextFunction } from 'express';
import { DebateService } from '../services/debate.service';
import { 
  createDebateSchema,
  updateDebateSchema,
  voteSchema,
  debateIdSchema,
  paginationSchema,
  searchQuerySchema
} from '../utils/validation.util';
import { IDebate } from '../types/debate.type';

 

export class DebateController {
  /**
   * Create a new debate
   * POST /debates
   */
 static async create(req: Request, res: Response, next: NextFunction) {
  try {
    // Directly pass req.body to the service (no validation)
    const debate = await DebateService.create({
      ...req.body,
      
    });
    
    res.status(201).json({
      success: true,
      data: debate,
      message: 'Debate created successfully'
    });
  } catch (err) {
    next(err);
  }
}
  /**
   * Get paginated list of debates
   * GET /debates
   */
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = paginationSchema.parse(req.query);
      const result = await DebateService.getAll({
        page: Number(page),
        limit: Number(limit),
        sortBy: req.query.sortBy as string || 'createdAt',
        sortOrder: req.query.sortOrder as 'asc' | 'desc' || 'desc'
      });
      
      res.json({
        success: true,
        data: result.debates,
        pagination: {
          total: result.total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(result.total / Number(limit))
        }
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get single debate by ID
   * GET /debates/:id
   */
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = debateIdSchema.parse(req.params);
      const debate = await DebateService.getById(id);
      
      if (!debate) {
        return res.status(404).json({
          success: false,
          message: 'Debate not found'
        });
      }
      
      res.json({
        success: true,
        data: debate
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update debate
   * PUT /debates/:id
   */
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = debateIdSchema.parse(req.params);
      const input = updateDebateSchema.parse(req.body);
      
      // Verify debate ownership
    //   const existingDebate = await DebateService.verifyOwnership(id, req.user?.id);

   
    //   if (!existingDebate) {
    //     return res.status(403).json({
    //       success: false,
    //       message: 'You are not authorized to update this debate'
    //     });
    //   }
      
      const updatedDebate = await DebateService.update(id, input);
      res.json({
        success: true,
        data: updatedDebate,
        message: 'Debate updated successfully'
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete debate
   * DELETE /debates/:id
   */
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = debateIdSchema.parse(req.params);
      
      // Verify debate ownership
    //   const existingDebate = await DebateService.verifyOwnership(id, req.user?.id);
    //   if (!existingDebate) {
    //     return res.status(403).json({
    //       success: false,
    //       message: 'You are not authorized to delete this debate'
    //     });
    //   }
      
      await DebateService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  /**
   * Vote on debate
   * POST /debates/:id/vote
   */
//   static async vote(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { id } = debateIdSchema.parse(req.params);
//       const { side } = voteSchema.parse(req.body);
      
//       const updated = await DebateService.vote({
//         debateId: id,
//         userId: req.user?.id,
//         side
//       });
      
//       res.json({
//         success: true,
//         data: updated,
//         message: 'Vote recorded successfully'
//       });
//     } catch (err) {
//       next(err);
//     }
//   }


static async vote(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = debateIdSchema.parse(req.params);
    const { side } = voteSchema.parse(req.body);
    
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const updated = await DebateService.vote({
      debateId: id,
      userId: req.user.id, // Now guaranteed to exist
      side
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Debate not found or voting failed'
      });
    }

    res.json({
      success: true,
      data: updated,
      message: 'Vote recorded successfully'
    });
  } catch (err) {
    next(err);
  }
}

  /**
   * Search debates
   * GET /debates/search
   */
  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = searchQuerySchema.parse(req.query);
      const { page, limit } = paginationSchema.parse(req.query);
      
      const result = await DebateService.search({
        query,
        page: Number(page),
        limit: Number(limit)
      });
      
      res.json({
        success: true,
        data: result.debates,
        pagination: {
          total: result.total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(result.total / Number(limit))
        }
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get debates by category
   * GET /debates/category/:category
   */
  static async getByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.params;
      const { page, limit } = paginationSchema.parse(req.query);
      
      const result = await DebateService.getByCategory({
        category,
        page: Number(page),
        limit: Number(limit)
      });
      
      res.json({
        success: true,
        data: result.debates,
        pagination: {
          total: result.total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(result.total / Number(limit))
        }
      });
    } catch (err) {
      next(err);
    }
  }
}