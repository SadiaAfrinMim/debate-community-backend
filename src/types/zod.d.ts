// src/types/zod.d.ts
import 'zod';

declare module 'zod' {
  interface ZodError {
    formErrors?: {
      fieldErrors: Record<string, string[]>;
    };
  }
}