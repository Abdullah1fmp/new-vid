import prisma from "../../db/db_client";

export const create_progress = async ({
	lesson_id,
	user_id,
	enrollment_id,
	score,
}: {
	lesson_id: string;
	user_id: string;
	enrollment_id: string;
	score?: number;
}) => {
	try {
		return await prisma.progress.create({
			data: {
				lesson_id,
				user_id,
				enrollement_id: enrollment_id,
				...(score ? { score } : {}),
			},
		});
	} catch (err) {
		throw err;
	}
};
