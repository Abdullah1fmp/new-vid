import prisma from "../../db/db_client";

export const get_all = async (search_query: { name?: string; id?: string }) => {
	try {
		return await prisma.user_group.findMany({
			where: {
				...(search_query.id && {
					id: search_query.id,
				}),
				...(search_query.name && {
					name: {
						contains: search_query.name,
						mode: "insensitive",
					},
				}),
			},
		});
	} catch (err) {
		throw err;
	}
};
