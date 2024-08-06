import { z } from "zod";
import { CustomError } from "../../custom-class/CustomError";
import prisma from "../../db/db_client";
import {
	optionSchema,
	optionsWithQuestionIdSchema,
} from "../../schema/course.schema";

type option_type = z.infer<typeof optionSchema>;
type options_with_question_id_type = z.infer<
	typeof optionsWithQuestionIdSchema
>;

export const get_option_by_id = async ({ id }: { id: string }) => {
	try {
		return await prisma.option.findUnique({
			where: {
				id,
			},
			include: {
				question: {
					select: {
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
				},
			},
		});
	} catch (err) {
		throw err;
	}
};

/**
 * @create_option Service
 * return newly created options
 * @description Create a new options according to the body.
 */
export const create_options = async ({
	body,
}: {
	body: options_with_question_id_type;
}) => {
	try {
		return await prisma.option.createMany({
			data: body.options.map((option: option_type) => ({
				text: option.text,
				is_correct: option.is_correct,
				question_id: body.question_id,
				position: option.position,
			})),
		});
	} catch (err: any) {
		throw err;
	}
};

/**
 * @update_option_by_id Service
 * return updated data
 * @description Update data by id. The data will be updated based on the body.
 */
export const update_option_by_id = async ({
	id,
	body,
}: {
	id: string;
	body: {
		text?: string;
		is_correct?: boolean;
		position?: number;
	};
}) => {
	try {
		/**
		 * Update the data based on the body
		 */

		return await prisma.option.update({
			where: {
				id,
			},
			data: {
				...(body.text && { text: body.text }),
				...(body.is_correct && { is_correct: body.is_correct }),
				...(body.position && { position: body.position }),
			},
		});
	} catch (err) {
		throw err;
	}
};

/**
 * @reorder_options Service
 * return updated data
 * @description Update the options order by ids
 */
export const reorder_options = async ({
	question_id,
	ids,
}: {
	question_id: string;
	ids: string[];
}) => {
	try {
		/**
		 * Update the order
		 */
		return await prisma.$transaction(async (tx) => {
			const options = await tx.option.findMany({
				where: {
					question_id,
					id: {
						in: ids,
					},
				},
			});

			/**
			 * Update the position with temporary negative values
			 */
			for (let i = 0; i < options.length; i++) {
				await tx.option.update({
					where: { id: options[i].id },
					data: { position: -(i + 1) },
				});
			}

			/**
			 * Update the position with the new order
			 */
			for (let i = 0; i < ids.length; i++) {
				await tx.option.update({
					where: { id: ids[i] },
					data: { position: i + 1 },
				});
			}

			return await tx.option.findMany({
				where: {
					question_id,
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
 * @delete_option_by_id Service
 * return confirmation of deletion
 */
export const delete_option_by_id = async ({ id }: { id: string }) => {
	try {
		return prisma.$transaction(async (tx) => {
			/**
			 * Delete the Option
			 */
			const deleted = await tx.option.delete({
				where: {
					id,
				},
			});

			if (!deleted.id) throw new CustomError("Option could not deleted", 404);

			/**
			 * Update the position of the rest of the options
			 */
			const rest_options = await tx.option.findMany({
				where: {
					position: {
						gt: deleted.position,
					},
				},
				orderBy: {
					position: "asc",
				},
			});

			for (let i = 0; i < rest_options.length; i++) {
				await tx.option.update({
					where: {
						id: rest_options[i].id,
					},
					data: {
						position: rest_options[i].position - 1,
					},
				});
			}

			return deleted;
		});
	} catch (err) {
		throw err;
	}
};
