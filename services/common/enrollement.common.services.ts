import prisma from "../../db/db_client";

export const get_my_enrollment = async ({
	course_id,
	user_id,
}: {
	course_id: string;
	user_id: string;
}) => {
	try {
		return await prisma.enrollment.findMany({
			where: {
				course_id,
				user_id,
			},
		});
	} catch (err) {
		throw err;
	}
};
