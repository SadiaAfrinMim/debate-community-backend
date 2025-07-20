import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', authMiddleware, AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);

export { router as authRoutes };
