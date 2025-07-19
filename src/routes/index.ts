import { Router } from 'express';
import { debateRoutes } from './debate.routes';


const router = Router();
router.use('/debates', debateRoutes);

export default router;
