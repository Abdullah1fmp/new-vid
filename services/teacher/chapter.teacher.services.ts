import { z } from "zod";
import prisma from "../../db/db_client";
import {
	chapterSchema,
	partialChapterSchema,
} from "../../schema/course.schema";
import { CustomError } from "../../custom-class/CustomError";

type chapter_body_type = z.infer<typeof chapterSchema>;
type partial_chapter_body_type = z.infer<typeof partialChapterSchema>;

/**
 * @Get_all service
 * @description Get all based on the parameters
 * @param search_query { object }
 * return { object[] }
 */
export const get_all = async ({
	search_query,
	includes,
}: {
	search_query: {
		title?: string;
		id?: string;
		course_id?: string;
	};
	includes?: {
		lessons?: boolean;
		course?: boolean;
	};
}) => {
	try {
		return await prisma.chapter.findMany({
			where: {
				...(search_query.id && {
					id: search_query.id,
				}),
				...(search_query.course_id && {
					course_id: search_query.course_id,
				}),
				...(search_query.title && {
					title: {
						contains: search_query.title,
						mode: "insensitive",
					},
				}),
			},
			include: {
				lessons: includes?.lessons
					? {
							orderBy: {
								position: "asc",
							},
					  }
					: false,
				course: includes?.course || false,
			},
			orderBy: {
				position: "asc",
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
export const create = async ({
	body,
}: {
	body: chapter_body_type & { course_id: string };
}) => {
	try {
		return await prisma.chapter.create({
			data: {
				title: body.title,
				description: body.description,
				position: body.position,
				is_free: body.is_free || false,
				status: body.status || "DRAFT",
				course: {
					connect: {
						id: body.course_id,
					},
				},
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
	body: partial_chapter_body_type;
}) => {
	try {
		/**
		 * Update the data based on the body
		 */
		return await prisma.chapter.update({
			where: {
				id,
			},
			data: {
				...(body.title && { title: body.title }),
				...(body.description && { description: body.description }),
				...(body.position && { position: body.position }),
				...(typeof body.is_free === "boolean" && { is_free: body.is_free }),
				...(body.status && { status: body.status }),
			},
		});
	} catch (err) {
		throw err;
	}
};

/**
 * @reoder_by_ids Service
 * return updated data
 * @description Update the chapter order by ids
 */
export const reoder_by_ids = async ({
	course_id,
	ids,
}: {
	course_id: string;
	ids: string[];
}) => {
	try {
		/**
		 * Update the order
		 */
		return await prisma.$transaction(async (tx) => {
			const chapters = await tx.chapter.findMany({
				where: {
					course_id,
					id: {
						in: ids,
					},
				},
			});

			/**
			 * Update the position with temporary negative values
			 */
			for (let i = 0; i < chapters.length; i++) {
				await tx.chapter.update({
					where: { id: chapters[i].id },
					data: { position: -(i + 1) },
				});
			}

			/**
			 * Update the position with the new order
			 */
			for (let i = 0; i < ids.length; i++) {
				await tx.chapter.update({
					where: { id: ids[i] },
					data: { position: i + 1 },
				});
			}

			const data = await tx.chapter.findMany({
				where: {
					course_id,
				},
				orderBy: {
					position: "asc",
				},
			});

			return data;
		});
	} catch (err) {
		throw err;
	}
};

/**
 * @swap_chapters Service
 * return updated data
 * @description Update the chapter order by ids
 */
export const swap_chapters = async ({
	course_id,
	ids,
}: {
	course_id: string;
	ids: [string, string];
}) => {
	try {
		/**
		 * Update the order
		 */
		return await prisma.$transaction(async (tx) => {
			const chapters = await tx.chapter.findMany({
				where: {
					course_id,
					id: {
						in: ids,
					},
				},
			});

			const [first, second] = chapters;
			// store the previous position
			const firstPosition = first.position;
			const secondPosition = second.position;

			/**
			 * Update the position by swapping
			 */
			await tx.chapter.update({
				where: { id: first.id },
				data: { position: secondPosition },
			});

			await tx.chapter.update({
				where: { id: second.id },
				data: { position: firstPosition },
			});

			return await tx.chapter.findMany({
				where: {
					course_id,
				},
				orderBy: {
					position: "asc",
				},
			});
		});
	} catch (err) {
		throw err;
	}
};

/**
 * @delete_by_id Service
 * @description If the data is deleted successfully, then we have to reset the position of the rest of the chapters.
 * return confirmation of deletion
 */
export const delete_by_id = async ({ id }: { id: string }) => {
	try {
		return prisma.$transaction(async (tx) => {
			const chapter = await tx.chapter.findUnique({
				where: {
					id,
				},
			});

			/**
			 * If chapter is not found
			 */
			if (!chapter) {
				throw new CustomError("Chapter not found.", 404);
			}

			/**
			 * Delete the chapter
			 */
			const deleted = await tx.chapter.delete({
				where: {
					id,
				},
			});

			if (!deleted.id) throw new CustomError("Chapter could not deleted", 404);

			/**
			 * Update the position of the rest of the chapters
			 */
			const rest_chapters = await tx.chapter.findMany({
				where: {
					course_id: chapter.course_id,
					position: {
						gt: chapter.position,
					},
				},
				orderBy: {
					position: "asc",
				},
			});

			for (let i = 0; i < rest_chapters.length; i++) {
				await tx.chapter.update({
					where: {
						id: rest_chapters[i].id,
					},
					data: {
						position: rest_chapters[i].position - 1,
					},
				});
			}

			return deleted;
		});
	} catch (err) {
		throw err;
	}
};
