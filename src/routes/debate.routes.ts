import { Router } from 'express';
import { DebateController } from '../controllers/debate.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, DebateController.create);
router.get('/', DebateController.list);
router.get('/:id', DebateController.getById);
router.put('/:id', authMiddleware, DebateController.update);
router.delete('/:id', authMiddleware, DebateController.delete);
router.post('/:id/vote', authMiddleware, DebateController.vote);
router.get('/search', DebateController.search);
router.get('/category/:category', DebateController.getByCategory);

export const debateRoutes = router;
