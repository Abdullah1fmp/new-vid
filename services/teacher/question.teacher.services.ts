import { z } from "zod";
import { CustomError } from "../../custom-class/CustomError";
import prisma from "../../db/db_client";
import {
	optionSchema,
	partialQuestionSchema,
	questionSchema,
} from "../../schema/course.schema";

type question_body_type = z.infer<typeof questionSchema>;
type partial_question_body_type = z.infer<typeof partialQuestionSchema>;
type option_type = z.infer<typeof optionSchema>;

export const get_question_by_id = async ({ id }: { id: string }) => {
	try {
		return await prisma.question.findUnique({
			where: {
				id,
			},
			include: {
				quiz: {
					select: {
						lesson: {
							select: {
								chapter: {
									include: {
										course: {
											select: {
												author_id: true,
											},
										},
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

/**
 * @create_question Service
 * return newly created question
 * @description Create a new question according to the body.
 */
export const create_question = async ({
	body,
}: {
	body: question_body_type;
}) => {
	try {
		return await prisma.question.create({
			data: {
				text: body.text,
				position: body.position,
				answer_type: body.answer_type,
				quiz: {
					connect: {
						id: body.quiz_id,
					},
				},
				...(body.options && {
					options: {
						createMany: {
							data: body.options.map((option: option_type) => ({
								text: option.text,
								is_correct: option.is_correct,
								position: option.position,
							})),
						},
					},
				}),
			},
			include: {
				options: {
					orderBy: {
						position: "asc",
					},
				},
			},
		});
	} catch (err: any) {
		throw err;
	}
};

/**
 * @update_question_by_id Service
 * return updated data
 * @description Update data by id. The data will be updated based on the body.
 */
export const update_question_by_id = async ({
	id,
	body,
}: {
	id: string;
	body: partial_question_body_type;
}) => {
	try {
		/**
		 * Update the data based on the body
		 */

		return await prisma.question.update({
			where: {
				id,
			},
			data: {
				...(body.text && { text: body.text }),
				...(body.position && { position: body.position }),
				...(body.answer_type && { answer_type: body.answer_type }),
			},
		});
	} catch (err) {
		throw err;
	}
};

/**
 * @reorder_questions Service
 * return updated data
 * @description Update the questions order by ids
 */
export const reorder_questions = async ({
	quiz_id,
	ids,
}: {
	quiz_id: string;
	ids: string[];
}) => {
	try {
		/**
		 * Update the order
		 */
		return await prisma.$transaction(async (tx) => {
			const questions = await tx.question.findMany({
				where: {
					quiz_id,
					id: {
						in: ids,
					},
				},
			});

			/**
			 * Update the position with temporary negative values
			 */
			for (let i = 0; i < questions.length; i++) {
				await tx.question.update({
					where: { id: questions[i].id },
					data: { position: -(i + 1) },
				});
			}

			/**
			 * Update the position with the new order
			 */
			for (let i = 0; i < ids.length; i++) {
				await tx.question.update({
					where: { id: ids[i] },
					data: { position: i + 1 },
				});
			}

			return await tx.question.findMany({
				where: {
					quiz_id,
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
 * @delete_question_by_id Service
 * return confirmation of deletion
 */
export const delete_question_by_id = async ({ id }: { id: string }) => {
	try {
		return prisma.$transaction(async (tx) => {
			/**
			 * Delete the question
			 */
			const deleted = await tx.question.delete({
				where: {
					id,
				},
			});

			if (!deleted.id) throw new CustomError("Question could not deleted", 404);

			/**
			 * Update the position of the rest of the chapters
			 */
			const rest_questions = await tx.question.findMany({
				where: {
					position: {
						gt: deleted.position,
					},
				},
				orderBy: {
					position: "asc",
				},
			});

			for (let i = 0; i < rest_questions.length; i++) {
				await tx.question.update({
					where: {
						id: rest_questions[i].id,
					},
					data: {
						position: rest_questions[i].position - 1,
					},
				});
			}

			return deleted;
		});
	} catch (err) {
		throw err;
	}
};
