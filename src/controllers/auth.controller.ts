import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model'; // ধরলাম তোমার user মডেল এখানে আছে
import { signAccessToken, signRefreshToken, verifyToken } from '../utils/jwt.util';

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' });
      }

      const user = await UserModel.create(email, password);
      const accessToken = signAccessToken({ id: user.id, email: user.email });
      const refreshToken = signRefreshToken({ id: user.id, email: user.email });

      res.status(201).json({
        success: true,
        data: {
          user: { id: user.id, email: user.email },
          accessToken,
          refreshToken
        }
      });
    } catch (err: any) {
      if (err.message === 'Email already registered') {
        return res.status(409).json({ success: false, message: err.message });
      }
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' });
      }

      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const valid = await UserModel.verifyPassword(user, password);
      if (!valid) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const accessToken = signAccessToken({ id: user.id, email: user.email });
      const refreshToken = signRefreshToken({ id: user.id, email: user.email });

      res.json({
        success: true,
        data: {
          user: { id: user.id, email: user.email },
          accessToken,
          refreshToken
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req: Request, res: Response) {
    // Stateless JWT-র জন্য শুধু ক্লায়েন্টে token মুছে ফেলতে বললেই হয়
    res.json({ success: true, message: 'Logged out successfully. Please delete token on client side.' });
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ success: false, message: 'Refresh token required' });
      }

     const payload = verifyToken(token);

// Type guard
if (typeof payload === 'string') {
  // এটা সম্ভবত টোকেনের মধ্যে শুধু string ছিল, তাই error throw করতে পারো
  throw new Error('Invalid token payload');
}

      const newAccessToken = signAccessToken({ id: payload.id, email: payload.email });

      res.json({ success: true, data: { accessToken: newAccessToken } });
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
  }
}
