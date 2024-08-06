import { z } from "zod";
import prisma from "../../db/db_client";
import { courseSchema, partialCourseSchema } from "../../schema/course.schema";

type course_body_type = z.infer<typeof courseSchema>;
type partial_course_body_type = z.infer<typeof partialCourseSchema>;

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
		price_range?: number[];
		sort_by?: "rating" | "price" | "created_at" | "title";
		sort_type?: "asc" | "desc";
		author_name?: string;
		author_id?: string;
	};
	includes?: {
		author?: boolean;
		reviews?: boolean;
		chapters?: boolean;
		lessons?: boolean;
		quiz?: boolean;
	};
}) => {
	try {
		return await prisma.course.findMany({
			where: {
				...(search_query.id && {
					id: search_query.id,
				}),
				...(search_query.title && {
					title: {
						contains: search_query.title,
						mode: "insensitive",
					},
				}),
				...(search_query.price_range && {
					price: {
						gte: search_query.price_range[0],
						lte: search_query.price_range[1],
					},
				}),
				...(search_query.author_name && {
					author: {
						OR: [
							{
								first_name: {
									contains: search_query.author_name,
									mode: "insensitive",
								},
							},
							{
								last_name: {
									contains: search_query.author_name,
									mode: "insensitive",
								},
							},
						],
					},
				}),
				...(search_query.author_id && {
					author_id: search_query.author_id,
				}),
			},
			include: {
				access_by_user_group: true,
				course_to_category: {
					select: {
						category: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
				...(includes?.author && {
					author: true,
				}),
				...(includes?.reviews && {
					reviews: true,
				}),
				...(includes?.chapters && {
					chapters: {
						orderBy: {
							position: "asc",
						},
						...(includes.lessons && {
							include: {
								lessons: {
									...(includes.quiz && {
										include: {
											quiz: true,
										},
									}),
									orderBy: {
										position: "asc",
									},
								},
							},
						}),
					},
				}),
				enrollments: {
					include: {
						user: {
							include: {
								user_group: true,
							},
						},
					},
				},
			},
			orderBy: {
				[search_query.sort_by || "created_at"]: search_query.sort_type || "asc",
			},
		});
	} catch (err) {
		throw err;
	}
};

/**
 * @Get_teacher_stat service
 * @description Get teacher stats based on the parameters
 * return { object[] }
 */
export const get_teacher_stats = async ({ user_id }: { user_id: string }) => {
	try {
		return await prisma.$transaction(async (tx) => {
			let res = {
				courses: 0,
				students: 0,
				rating: 0,
				reviews: 0,
			};
			/**
			 * Get all courses by the teacher
			 */
			const courses = await tx.course.findMany({
				where: {
					author_id: user_id,
				},
				include: {
					enrollments: true,
					reviews: true,
				},
			});
			res.courses = courses.length;
			res.students = courses.reduce((acc, course) => {
				return acc + course.enrollments.length;
			}, 0);
			res.reviews = courses.reduce((acc, course) => {
				return acc + course.reviews.length;
			}, 0);
			res.rating =
				courses.reduce((acc, course) => {
					return acc + course.avg_rating;
				}, 0) / courses.length;

			return res;
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
	body: course_body_type & { author_id: string };
}) => {
	try {
		return await prisma.course.create({
			data: {
				title: body.title,
				thumbnail: body.thumbnail,
				description: body.description,
				...(body.intro_video && { intro_video: body.intro_video }),
				...(body.access_by_user_group_id && {
					access_by_user_group: {
						connect: {
							id: body.access_by_user_group_id,
						},
					},
				}),
				price: body.price || 0,
				difficulty: body.difficulty,
				author: {
					connect: {
						id: body.author_id,
					},
				},
				course_to_category: {
					create: body.categoryIds.map((id: string) => ({
						category: {
							connect: {
								id,
							},
						},
					})),
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
	body: partial_course_body_type;
}) => {
	try {
		/**
		 * Update the data based on the body
		 */
		return prisma.$transaction(async (tx) => {
			return await tx.course.update({
				where: {
					id,
				},
				data: {
					...(body.title && { title: body.title }),
					...(body.description && { description: body.description }),
					...(body.thumbnail && { thumbnail: body.thumbnail }),
					...(body.intro_video && { intro_video: body.intro_video }),
					...(body.access_by_user_group_id && {
						access_by_user_group: {
							connect: {
								id: body.access_by_user_group_id,
							},
						},
					}),
					...(body.price && { price: body.price }),
					...(body.difficulty && { difficulty: body.difficulty }),
					...(body.status && { status: body.status }),
					// Delete the previous course_to_categories and create new ones
					...(body.categoryIds && {
						course_to_category: {
							deleteMany: {},
							create: body.categoryIds.map((cat_id: string) => ({
								category: {
									connect: {
										id: cat_id,
									},
								},
							})),
						},
					}),
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
		return await prisma.course.delete({
			where: {
				id,
			},
		});
	} catch (err) {
		throw err;
	}
};
