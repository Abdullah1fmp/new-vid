import { z } from "zod";
import prisma from "../../db/db_client";
import { partialUserSchema, userSchema } from "../../schema/user.schema";

type user_body_type = z.infer<typeof userSchema>;
type partial_user_body_type = z.infer<typeof partialUserSchema>;
type user_include_type = {
	user_group?: boolean;
	courses?: boolean;
	progress?: boolean;
	reviews?: boolean;
	enrollments?: boolean;
};

/**
 * @create_user Service
 * return newly created user
 * @description Create a new user according to the body.
 * The body is validated by the registerSchema.
 */
export const create_user = async ({
	body,
	includes,
}: {
	body: user_body_type;
	includes: user_include_type;
}) => {
	try {
		const user = await prisma.user.create({
			data: {
				clerk_id: body.clerk_id,
				email: body.email,
				first_name: body.first_name,
				last_name: body.last_name,
				status: "ACTIVE",
				phone_number: body.phone_number,
				city: body.city,
				state: body.state,
				country: body.country,
				gender: body.gender,
				roles: body.roles,
				dob: body.dob,
				...(body.preferences && {
					preferences: body.preferences,
				}),
			},
			include: {
				...(includes.user_group && {
					user_group: true,
				}),
				...(includes.courses && {
					courses: true,
				}),
				...(includes.progress && {
					progress: true,
				}),
				...(includes.reviews && {
					reviews: true,
				}),
				...(includes.enrollments && {
					enrollments: true,
				}),
			},
		});

		return user;
	} catch (err: any) {
		throw err;
	}
};

export const get_user_by_id = async ({
	user_id,
	includes = {
		user_group: false,
		courses: false,
		progress: false,
		reviews: false,
		enrollments: false,
	},
}: {
	user_id: string;
	includes?: user_include_type;
}) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: user_id,
			},
			include: {
				...(includes.user_group && {
					user_group: true,
				}),
				...(includes.courses && {
					courses: true,
				}),
				...(includes.progress && {
					progress: true,
				}),
				...(includes.reviews && {
					reviews: true,
				}),
				...(includes.enrollments && {
					enrollments: true,
				}),
			},
		});

		return user;
	} catch (err) {
		throw err;
	}
};

export const get_user_by_clerk_id = async ({
	clerk_id,
	includes = {
		user_group: false,
		courses: false,
		progress: false,
		reviews: false,
		enrollments: false,
	},
}: {
	clerk_id: string;
	includes?: user_include_type;
}) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				clerk_id,
			},
			include: {
				...(includes.user_group && {
					user_group: true,
				}),
				...(includes.courses && {
					courses: true,
				}),
				...(includes.progress && {
					progress: true,
				}),
				...(includes.reviews && {
					reviews: true,
				}),
				...(includes.enrollments && {
					enrollments: true,
				}),
			},
		});

		return user;
	} catch (err) {
		throw err;
	}
};

export const update_user_by_id = async ({
	user_id,
	user_body,
	includes,
}: {
	user_id: string;
	user_body: Omit<partial_user_body_type, "email" | "clerk_id">;
	includes: user_include_type;
}) => {
	try {
		/**
		 * Update the user based on the body
		 * Check each field and update the user based on the field
		 */
		const updated_user = await prisma.user.update({
			where: {
				id: user_id,
			},
			data: {
				...(user_body.first_name && { first_name: user_body.first_name }),
				...(user_body.last_name && { last_name: user_body.last_name }),
				...(user_body.phone_number && {
					phone_number: user_body.phone_number,
				}),
				...(user_body.city && { city: user_body.city }),
				...(user_body.state && { state: user_body.state }),
				...(user_body.country && { country: user_body.country }),
				...(user_body.dob && { dob: user_body.dob }),
				...(user_body.preferences && { preferences: user_body.preferences }),
				...(user_body.gender && {
					gender: user_body.gender,
				}),
			},
			include: {
				...(includes.user_group && {
					user_group: true,
				}),
				...(includes.courses && {
					courses: true,
				}),
				...(includes.progress && {
					progress: true,
				}),
				...(includes.reviews && {
					reviews: true,
				}),
				...(includes.enrollments && {
					enrollments: true,
				}),
			},
		});

		return updated_user;
	} catch (err) {
		throw err;
	}
};
