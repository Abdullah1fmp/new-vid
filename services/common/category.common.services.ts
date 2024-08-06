import prisma from "../../db/db_client";

export const get_all = async (search_query?: { id?: string }) => {
	try {
		return await prisma.category.findMany({
			where: {
				...(search_query?.id && {
					id: search_query.id,
				}),
			},
		});
	} catch (err) {
		throw err;
	}
};
