import { z } from "zod";
import prisma from "../../db/db_client";
import { partialAdminUserSchema } from "../../schema/user.schema";

type partial_admin_user_body_type = z.infer<typeof partialAdminUserSchema>;
type user_include_type = {
	user_group?: boolean;
	courses?: boolean;
	progress?: boolean;
	reviews?: boolean;
	enrollments?: boolean;
};

export const get_all = async ({
	search_query,
	includes,
}: {
	search_query: {
		email?: string;
		name?: string;
		id?: string;
		clerk_id?: string;
		dob?: string;
		city?: string;
		state?: string;
		country?: string;
		phone_number?: string;
		roles?: ("ADMIN" | "TEACHER" | "USER")[];
		gender?: "MALE" | "FEMALE" | "OTHERS";
		status?: "ACTIVE" | "INACTIVE";
		preferences?: string[];
		user_group_id?: string;
		user_group?: string;
	};
	includes: user_include_type;
}) => {
	try {
		const users = await prisma.user.findMany({
			where: {
				...(search_query.email && {
					email: { contains: search_query.email, mode: "insensitive" },
				}),
				...(search_query.name && {
					OR: [
						{
							first_name: { contains: search_query.name, mode: "insensitive" },
						},
						{ last_name: { contains: search_query.name, mode: "insensitive" } },
					],
				}),
				...(search_query.id && {
					id: search_query.id,
				}),
				...(search_query.clerk_id && {
					clerk_id: search_query.clerk_id,
				}),
				...(search_query.dob && {
					dob: search_query.dob,
				}),
				...(search_query.city && {
					city: { contains: search_query.city, mode: "insensitive" },
				}),
				...(search_query.state && {
					state: { contains: search_query.state, mode: "insensitive" },
				}),
				...(search_query.country && {
					country: { contains: search_query.country, mode: "insensitive" },
				}),
				...(search_query.phone_number && {
					phone_number: {
						contains: search_query.phone_number,
						mode: "insensitive",
					},
				}),
				...(search_query.roles && {
					roles: { hasEvery: search_query.roles },
				}),
				...(search_query.user_group_id && {
					user_group_id: search_query.user_group_id,
				}),
				...(search_query.user_group && {
					user_group: {
						name: { contains: search_query.user_group, mode: "insensitive" },
					},
				}),
				...(search_query.preferences && {
					preferences: {
						hasEvery: search_query.preferences,
					},
				}),
				...(search_query.status && {
					status: search_query.status,
				}),
				...(search_query.gender && {
					gender: search_query.gender,
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
		return users;
	} catch (err) {
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

export const update_user_by_id = async ({
	user_id,
	user_body,
	includes,
}: {
	user_id: string;
	user_body: partial_admin_user_body_type;
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
				...(user_body.status && {
					status: user_body.status,
				}),
				...(user_body.roles && {
					roles: user_body.roles,
				}),
				...(user_body.user_group_id && user_body.user_group_id !== "anyone"
					? {
							user_group: {
								connect: {
									id: user_body.user_group_id,
								},
							},
					  }
					: {
							user_group: {
								disconnect: true,
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

export const delete_by_id = async ({ user_id }: { user_id: string }) => {
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
