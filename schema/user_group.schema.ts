import { z } from "zod";

export const userGroupSchema = z.object({
	name: z.string(),
});
