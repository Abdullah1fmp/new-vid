import { z } from "zod";
import prisma from "../db/db_client";
import { partialUserSchema, userSchema } from "../schema/user.schema";

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
 * @Get_all_users service
 * @description Get all users based on the parameters
 * @param search_query { object }
 * return users list
 */
export const get_all_users = async (
	search_query: {
		email?: string;
		id?: string;
		clerk_id?: string;
		first_name?: string;
		last_name?: string;
		dob?: string;
		phone_number?: string;
		roles?: ("ADMIN" | "TEACHER" | "USER")[];
		preferences?: string[];
		gender?: "MALE" | "FEMALE" | "OTHERS";
		city?: string;
		state?: string;
		country?: string;
		status?: "ACTIVE" | "INACTIVE";
		user_group?: string;
		user_group_id?: string;
	},
	includes?: user_include_type
) => {
	try {
		return await prisma.user.findMany({
			where: {
				...(search_query.id && {
					id: search_query.id,
				}),
				...(search_query.clerk_id && {
					clerk_id: search_query.clerk_id,
				}),
				...(search_query.first_name && {
					first_name: {
						contains: search_query.first_name,
						mode: "insensitive",
					},
				}),
				...(search_query.last_name && {
					last_name: { contains: search_query.last_name, mode: "insensitive" },
				}),
				...(search_query.dob && {
					dob: {
						equals: new Date(search_query.dob),
					},
				}),
				...(search_query.email && {
					email: search_query.email,
				}),
				...(search_query.phone_number && {
					phone_number: { contains: search_query.phone_number },
				}),
				...(search_query.city && {
					city: { contains: search_query.city },
				}),
				...(search_query.state && {
					state: { contains: search_query.state },
				}),
				...(search_query.country && {
					country: { contains: search_query.country },
				}),
				...(search_query.roles && {
					roles: {
						hasEvery: search_query.roles,
					},
				}),
				...(search_query.preferences && {
					preferences: { hasEvery: search_query.preferences },
				}),
				...(search_query.status && {
					status: search_query.status,
				}),
				...(search_query.user_group && {
					user_group: {
						name: {
							contains: search_query.user_group,
						},
					},
				}),
				...(search_query.user_group_id && {
					user_group_id: search_query.user_group_id,
				}),
			},
			include: {
				...(includes?.user_group && {
					user_group: true,
				}),
				...(includes?.courses && {
					courses: true,
				}),
				...(includes?.progress && {
					progress: true,
				}),
				...(includes?.reviews && {
					reviews: true,
				}),
				...(includes?.enrollments && {
					enrollments: true,
				}),
			},
		});
	} catch (err) {
		throw err;
	}
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

export const update_user_by_id = async ({
	user_id,
	user_body,
	includes,
}: {
	user_id: string;
	user_body: Omit<
		partial_user_body_type & { user_group_id?: string; user_group?: string },
		"email" | "clerk_id"
	>;
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
				...(user_body.first_name && { name: user_body.first_name }),
				...(user_body.last_name && { last_name: user_body.last_name }),
				...(user_body.status && { status: user_body.status }),
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
				...(user_body.roles && {
					roles: user_body.roles,
				}),
				...(user_body.user_group_id && {
					user_group: {
						connect: {
							id: user_body.user_group_id,
						},
					},
				}),
				...(user_body.user_group && {
					user_group: {
						connect: {
							name: user_body.user_group,
						},
					},
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

/**
 * @delete_user_by_id Service
 * return confirmation of deletion
 * @description Delete user by id. The user will be deleted based on the id.
 */
export const delete_user_by_id = async ({ user_id }: { user_id: string }) => {
	try {
		const deleted_user = await prisma.user.delete({
			where: {
				id: user_id,
			},
		});

		return deleted_user;
	} catch (err) {
		throw err;
	}
};
