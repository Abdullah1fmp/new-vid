import { z } from "zod";

export const reviewSchema = z.object({
	rating: z.number().positive().min(1).max(5),
	comment: z.string().optional(),
	course_id: z.string().uuid(),
});

export const partialReviewSchema = reviewSchema.partial();
