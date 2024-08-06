import { z } from "zod";
import prisma from "../../db/db_client";
import { lessonSchema, partialLessonSchema } from "../../schema/course.schema";
import { CustomError } from "../../custom-class/CustomError";

type lesson_body_type = z.infer<typeof lessonSchema>;
type partial_lesson_body_type = z.infer<typeof partialLessonSchema>;

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
		chapter_id?: string;
	};
	includes?: {
		chapter?: boolean;
		course?: boolean;
		quiz?: boolean;
	};
}) => {
	try {
		return await prisma.lesson.findMany({
			where: {
				...(search_query.id && {
					id: search_query.id,
				}),
				...(search_query.chapter_id && {
					chapter_id: search_query.chapter_id,
				}),
				...(search_query.title && {
					title: {
						contains: search_query.title,
						mode: "insensitive",
					},
				}),
			},
			include: {
				quiz: {
					select: {
						id: true,
					},
				},
				chapter: {
					select: {
						course: {
							include: {
								author: true,
							},
						},
					},
				},
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
	body: lesson_body_type & { chapter_id: string };
}) => {
	try {
		return await prisma.lesson.create({
			data: {
				title: body.title,
				position: body.position,
				is_downloadable: body.is_downloadable,
				status: body.status,
				type: body.type,
				...(body.video_url &&
					body.type === "VIDEO" && { video_url: body.video_url }),
				...(body.document_url &&
					body.type === "DOCUMENT" && { document_url: body.document_url }),
				...(body.type === "QUIZ" && {
					quiz: {
						create: {},
					},
				}),
				chapter: {
					connect: {
						id: body.chapter_id,
					},
				},
			},
			include: {
				quiz: {
					select: {
						id: true,
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
	body: partial_lesson_body_type;
}) => {
	try {
		/**
		 * Update the data based on the body
		 */

		return await prisma.lesson.update({
			where: {
				id,
			},
			data: {
				...(body.title && { title: body.title }),
				...(body.position && { position: body.position }),
				...(body.is_downloadable && { is_downloadable: body.is_downloadable }),
				...(body.type && { type: body.type }),
				...(body.video_url && { video_url: body.video_url }),
				...(body.document_url && { document_url: body.document_url }),
				...(body.status && { status: body.status }),
			},
			include: {
				quiz: {
					select: {
						id: true,
					},
				},
			},
		});
	} catch (err) {
		throw err;
	}
};

/**
 * @reoder_by_ids Service
 * return updated data
 * @description Update the lessons order by ids
 */
export const reoder_by_ids = async ({
	chapter_id,
	ids,
}: {
	chapter_id: string;
	ids: string[];
}) => {
	try {
		/**
		 * Update the order
		 */
		return await prisma.$transaction(async (tx) => {
			const lessons = await tx.lesson.findMany({
				where: {
					chapter_id,
					id: {
						in: ids,
					},
				},
			});

			/**
			 * Update the position with temporary negative values
			 */
			for (let i = 0; i < lessons.length; i++) {
				await tx.lesson.update({
					where: { id: lessons[i].id },
					data: { position: -(i + 1) },
				});
			}

			/**
			 * Update the position with the new order
			 */
			for (let i = 0; i < ids.length; i++) {
				await tx.lesson.update({
					where: { id: ids[i] },
					data: { position: i + 1 },
				});
			}

			return await tx.lesson.findMany({
				where: {
					chapter_id,
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
 * return confirmation of deletion
 */
export const delete_by_id = async ({ id }: { id: string }) => {
	try {
		return prisma.$transaction(async (tx) => {
			const lesson = await tx.lesson.findUnique({
				where: {
					id,
				},
			});

			/**
			 * If lesson is not found
			 */
			if (!lesson) {
				throw new CustomError("Lesson not found.", 404);
			}

			/**
			 * Delete the chapter
			 */
			const deleted = await tx.lesson.delete({
				where: {
					id,
				},
			});

			if (!deleted.id) throw new CustomError("Lesson could not deleted", 404);

			/**
			 * Update the position of the rest of the chapters
			 */
			const rest_lessons = await tx.lesson.findMany({
				where: {
					chapter_id: lesson.chapter_id,
					position: {
						gt: lesson.position,
					},
				},
				orderBy: {
					position: "asc",
				},
			});

			for (let i = 0; i < rest_lessons.length; i++) {
				await tx.lesson.update({
					where: {
						id: rest_lessons[i].id,
					},
					data: {
						position: rest_lessons[i].position - 1,
					},
				});
			}

			return deleted;
		});
	} catch (err) {
		throw err;
	}
};
