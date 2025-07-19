import { Router } from 'express';
import { DebateController } from '../controllers/debate.controller';
// import { authMiddleware } from '../middlewares/auth.middleware';




const router = Router();

// Create a new debate (authenticated)
router.post(
  '/',
//   authMiddleware,
  
  (req, res, next) => DebateController.create(req, res, next)
);

// Get paginated list of debates
router.get(
  '/',
  
  (req, res, next) => DebateController.list(req, res, next)
);

// Get single debate by ID
router.get(
  '/:id',

  (req, res, next) => DebateController.getById(req, res, next)
);

// Update debate (authenticated + owner)
router.put(
  '/:id',
//   authMiddleware,


  (req, res, next) => DebateController.update(req, res, next)
);

// Delete debate (authenticated + owner)
router.delete(
  '/:id',
//   authMiddleware,

  (req, res, next) => DebateController.delete(req, res, next)
);

// Vote on debate (authenticated)
router.post(
  '/:id/vote',
//   authMiddleware,
  
  (req, res, next) => DebateController.vote(req, res, next)
);

// Search debates
router.get(
  '/search',
  
  (req, res, next) => DebateController.search(req, res, next)
);

// Get debates by category
router.get(
  '/category/:category',

  (req, res, next) => DebateController.getByCategory(req, res, next)
);

export const debateRoutes = router;