import prisma from "../../db/db_client";

export const get_all_course = async () => {
	try {
		return await prisma.course.findMany({
			orderBy: [
				{
					created_at: "desc",
				},
				{
					updated_at: "desc",
				},
			],
			include: {
				reviews: {
					include: {
						user: true,
					},
				},
				enrollments: {
					include: {
						user: true,
					},
				},
			},
		});
	} catch (err) {
		throw err;
	}
};

export const delete_course_by_id = async (id: string) => {
	try {
		return await prisma.course.delete({
			where: {
				id,
			},
		});
	} catch (err) {
		throw err;
	}
};

export const delete_all_course = async () => {
	try {
		return await prisma.course.deleteMany({});
	} catch (err) {
		throw err;
	}
};

export const add_user_to_course = async (
	course_id: string,
	user_id: string
) => {
	try {
		return await prisma.enrollment.upsert({
			where: {
				user_id_course_id: {
					course_id,
					user_id,
				},
			},
			update: {},
			create: {
				user_id,
				course_id,
			},
		});
	} catch (err) {
		throw err;
	}
};

export const remove_user_from_course = async (
	course_id: string,
	user_id: string
) => {
	try {
		return await prisma.enrollment.delete({
			where: {
				user_id_course_id: {
					course_id,
					user_id,
				},
			},
		});
	} catch (err) {
		throw err;
	}
};
