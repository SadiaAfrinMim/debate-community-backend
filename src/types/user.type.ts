export interface IUser {
  id: string;
  email: string;
  passwordHash: string; // হ্যাশ করা পাসওয়ার্ড
  createdAt: Date;
  updatedAt: Date;
}
