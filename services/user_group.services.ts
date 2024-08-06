import { z } from "zod";
import prisma from "../db/db_client";
import { userGroupSchema } from "../schema/user_group.schema";

type user_group_body_type = z.infer<typeof userGroupSchema>;

/**
 * @Get_all service
 * @description Get all based on the parameters
 * @param search_query { object }
 * return { object[] }
 */
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

/**
 * @create Service
 * return newly created data
 * @description Create a new data according to the body.
 */
export const create = async ({ body }: { body: user_group_body_type }) => {
	try {
		return await prisma.user_group.create({
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
	body: user_group_body_type;
}) => {
	try {
		/**
		 * Update the data based on the body
		 */
		return await prisma.user_group.update({
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
		return await prisma.user_group.delete({
			where: {
				id,
			},
		});
	} catch (err) {
		throw err;
	}
};
