import { z } from "zod";
import { validate_mobile } from "../lib/validation.lib";

export const userSchema = z.object({
	clerk_id: z.string(),
	email: z.string().email(),
	first_name: z.string(),
	last_name: z.string(),
	dob: z.string().datetime(),
	city: z.string(),
	state: z.string(),
	country: z.string(),
	phone_number: z.string().refine((value) => validate_mobile(value), {
		message: "Phone number should be in format +91-1234567890",
	}),
	gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
	preferences: z.array(z.string()).optional(),
	roles: z
		.array(z.enum(["ADMIN", "TEACHER", "USER"]))
		.min(1)
		.default(["USER"]),
	status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export const partialUserSchema = userSchema.partial();

export const adminUserSchema = userSchema.extend({ user_group_id: z.string() });

export const partialAdminUserSchema = adminUserSchema.partial();
