
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';  // ✅ সঠিক


export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
}

const users = new Map<string, IUser>();

export const UserModel = {
  async create(email: string, password: string): Promise<IUser> {
    // Check if email exists
    for (const user of users.values()) {
      if (user.email === email) {
        throw new Error('Email already registered');
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: IUser = {
      id: uuidv4(),
      email,
      passwordHash
    };
    users.set(newUser.id, newUser);
    return newUser;
  },

  findByEmail(email: string): IUser | null {
    for (const user of users.values()) {
      if (user.email === email) return user;
    }
    return null;
  },

  async verifyPassword(user: IUser, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
};
