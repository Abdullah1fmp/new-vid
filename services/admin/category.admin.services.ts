import { z } from "zod";
import prisma from "../../db/db_client";
import { categorySchema } from "../../schema/category.schema";

type category_body_type = z.infer<typeof categorySchema>;

/**
 * @Get_all service
 * @description Get all based on the parameters
 * @param search_query { object }
 * return { object[] }
 */
export const get_all = async (search_query: { name?: string; id?: string }) => {
	try {
		return await prisma.category.findMany({
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

/**
 * @create Service
 * return newly created data
 * @description Create a new data according to the body.
 */
export const create = async ({ body }: { body: category_body_type }) => {
	try {
		return await prisma.category.create({
			data: {
				name: body.name,
			},
		});
	} catch (err: any) {
		throw err;
	}
};

/**
 * @update_by_id Service
 * return updated data
 * @description Update data by id. The data will be updated based on the body.
 */
export const update_by_id = async ({
	id,
	body,
}: {
	id: string;
	body: category_body_type;
}) => {
	try {
		/**
		 * Update the data based on the body
		 */
		return await prisma.category.update({
			where: {
				id,
			},
			data: {
				...(body.name && { name: body.name }),
			},
		});
	} catch (err) {
		throw err;
	}
};

/**
 * @delete_by_id Service
 * return confirmation of deletion
 */
export const delete_by_id = async ({ id }: { id: string }) => {
	try {
		return await prisma.category.delete({
			where: {
				id,
			},
		});
	} catch (err) {
		throw err;
	}
};
