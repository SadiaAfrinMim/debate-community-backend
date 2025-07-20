// import { z } from 'zod';

// // Debate ID Validation
// export const debateIdSchema = z.object({
//   id: z.string().uuid("Invalid debate ID format"),
// });
// export type DebateIdParam = z.infer<typeof debateIdSchema>;

// // Pagination Validation
// export const paginationSchema = z.object({
//   page: z.number().int().positive().default(1),
//   limit: z.number().int().positive().max(100).default(10),
// });
// export type PaginationQuery = z.infer<typeof paginationSchema>;

// // Search Query Validation
// export const searchQuerySchema = z.object({
//   query: z.string().min(1, "Search query cannot be empty"),
// });
// export type SearchQuery = z.infer<typeof searchQuerySchema>;

// // Category Query Validation
// export const categoryQuerySchema = z.object({
//   category: z.string().min(1, "Category cannot be empty"),
// });
// export type CategoryQuery = z.infer<typeof categoryQuerySchema>;

// // Vote Validation
// export const voteSchema = z.object({
//   side: z.enum(['support', 'oppose']).superRefine((val, ctx) => {
//     if (!val) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Vote side is required"
//       });
//     }
//     if (val && !['support', 'oppose'].includes(val)) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Vote side must be either 'support' or 'oppose'"
//       });
//     }
//   }),
//   userId: z.string().min(1, { message: "User ID is required" })
// }).strict();
// export type VoteInput = z.infer<typeof voteSchema>;

// // Create Debate Validation
// export const createDebateSchema = z.object({
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   tags: z.array(z.string().min(1, "Tags cannot be empty")).min(1, "At least one tag is required"),
//   category: z.string().min(1, "Category is required"),
//   bannerUrl: z.string().url("Invalid URL format").optional(),
//   durationHours: z.number().int().positive(),
//   creatorId: z.string().min(1, "Creator ID is required"),
// });
// export type CreateDebateInput = z.infer<typeof createDebateSchema>;



// // Update Debate Validation
// export const updateDebateSchema = z.object({
//   title: z.string().min(5, "Title must be at least 5 characters").optional(),
//   description: z.string().min(10, "Description must be at least 10 characters").optional(),
//   tags: z.array(z.string().min(1, "Tags cannot be empty")).min(1, "At least one tag is required").optional(),
//   category: z.string().min(1, "Category is required").optional(),
//   bannerUrl: z.string().url("Invalid URL format").optional(),
//   durationHours: z.number().int("Must be whole number").positive("Must be positive number").optional(),
//   status: z.enum(['active', 'closed', 'archived']).optional(),
// }).refine(data => {
//   return Object.keys(data).length > 0;
// }, {
//   message: "At least one field must be provided for update",
// });
// export type UpdateDebateInput = z.infer<typeof updateDebateSchema>;




import { z } from 'zod';

// Debate ID Validation
export const debateIdSchema = z.object({
  id: z.string().uuid("Invalid debate ID format"),
});
export type DebateIdParam = z.infer<typeof debateIdSchema>;

// Pagination Validation
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});
export type PaginationQuery = z.infer<typeof paginationSchema>;

// Search Query Validation
export const searchQuerySchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
});
export type SearchQuery = z.infer<typeof searchQuerySchema>;

// Category Query Validation ✅
export const categoryQuerySchema = z.object({
  category: z.string().min(1, "Category cannot be empty"),
});
export type CategoryQuery = z.infer<typeof categoryQuerySchema>;

// Vote Validation
export const voteSchema = z.object({
  side: z.enum(['support', 'oppose']).superRefine((val, ctx) => {
    if (!val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Vote side is required"
      });
    }
    if (val && !['support', 'oppose'].includes(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Vote side must be either 'support' or 'oppose'"
      });
    }
  }),
  userId: z.string().min(1, { message: "User ID is required" })
}).strict();
export type VoteInput = z.infer<typeof voteSchema>;

// Create Debate Validation
export const createDebateSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tags: z.array(z.string().min(1, "Tags cannot be empty")).min(1, "At least one tag is required"),
  category: z.string().min(1, "Category is required"),
  bannerUrl: z.string().url("Invalid URL format").optional(),
  durationHours: z.number().int().positive(),
  creatorId: z.string().min(1, "Creator ID is required"),
});
export type CreateDebateInput = z.infer<typeof createDebateSchema>;

// Update Debate Validation
export const updateDebateSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").optional(),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  tags: z.array(z.string().min(1, "Tags cannot be empty")).min(1, "At least one tag is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  bannerUrl: z.string().url("Invalid URL format").optional(),
  durationHours: z.number().int("Must be whole number").positive("Must be positive number").optional(),
  status: z.enum(['active', 'closed', 'archived']).optional(),
}).refine(data => {
  return Object.keys(data).length > 0;
}, {
  message: "At least one field must be provided for update",
});
export type UpdateDebateInput = z.infer<typeof updateDebateSchema>;
