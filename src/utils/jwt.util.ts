import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

/**
 * Create Access Token
 */
export function signAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

/**
 * Create Refresh Token
 */
export function signRefreshToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

/**
 * Unified signToken (for simple usage, default is Access Token)
 */
export function signToken(payload: object, options?: { refresh?: boolean }) {
  if (options?.refresh) {
    return signRefreshToken(payload);
  }
  return signAccessToken(payload);
}

/**
 * Verify Token
 */
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}


export function decodeToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET);
  
  if (typeof decoded === 'string') {
    throw new Error('Invalid token payload');
  }
  
  return decoded;
}
