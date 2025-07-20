import { Router } from 'express';
import { debateRoutes } from './debate.routes';
import { authRoutes } from './auth.routes';


const router = Router();
router.use('/api/auth', authRoutes);
router.use('/debates', debateRoutes);

export default router;
