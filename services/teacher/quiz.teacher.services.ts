import prisma from "../../db/db_client";

/**
 * @Get_by_id service
 * @description Get all based on the parameters
 * @param search_query { object }
 * return { object[] }
 */
export const get_by_id = async ({
	quiz_id,
	includes,
}: {
	quiz_id: string;
	includes?: {
		question?: boolean;
	};
}) => {
	try {
		return await prisma.quiz.findMany({
			where: {
				id: quiz_id,
			},
			include: {
				questions: !includes?.question
					? false
					: {
							include: {
								options: {
									orderBy: {
										position: "asc",
									},
								},
							},
							orderBy: {
								position: "asc",
							},
					  },
				lesson: {
					select: {
						type: true,
						title: true,
						chapter: {
							select: {
								title: true,
								course: {
									select: {
										id: true,
										title: true,
										author_id: true,
									},
								},
							},
						},
					},
				},
			},
		});
	} catch (err) {
		throw err;
	}
};
