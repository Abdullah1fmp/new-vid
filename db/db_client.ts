import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
	log: ["error", "warn"],
	errorFormat: "minimal",
}).$extends({
	query: {
		/**
		 * @description For every successful review, the average rating of the course is going to be updated
		 */
		review: {
			async create({ args, query }) {
				const prev_reviews = await prisma.review.findMany({
					where: {
						course_id: args.data.course_id,
					},
				});
				const avg_rating =
					prev_reviews?.length === 0
						? args.data.rating
						: (prev_reviews.reduce((acc, curr) => acc + curr.rating, 0) +
								args.data.rating) /
						  (prev_reviews.length + 1);

				await prisma.course.update({
					where: { id: args.data.course_id },
					data: {
						avg_rating: Number(avg_rating?.toFixed(2)),
					},
				});
				console.log(
					`Updated avg_rating for course: ${args.data.course_id}, Review created by: ${args.data.user_id}`
				);

				return query(args);
			},
			// For every successful review update, the average rating of the course is going to be updated
			async update({ args, query }) {
				const curr_review = await prisma.review.findUnique({
					where: {
						id: args.where.id,
					},
				});

				const prev_reviews = await prisma.review.findMany({
					where: {
						course_id: curr_review?.course_id,
					},
				});

				const prev_ratings = prev_reviews
					?.filter((rev) => rev.id !== curr_review?.id)
					?.reduce((acc, curr) => acc + curr.rating, 0);

				let avg_rating = 0;
				if (args.data.rating && typeof args.data.rating === "number") {
					avg_rating = (prev_ratings + args.data.rating) / prev_reviews.length;
				} else {
					avg_rating = prev_ratings / (prev_reviews.length - 1);
				}

				await prisma.course.update({
					where: { id: curr_review?.course_id },
					data: {
						avg_rating: Number(avg_rating?.toFixed(2)),
					},
				});

				console.log(
					`Updated avg_rating for course: ${args.data.course_id} Review updated by: ${args.data.user_id}`
				);

				return query(args);
			},
			// For every successful review delete, the average rating of the course is going to be updated
			async delete({ args, query }) {
				const curr_review = await prisma.review.findUnique({
					where: {
						id: args.where.id,
					},
				});

				const prev_reviews = await prisma.review.findMany({
					where: {
						course_id: curr_review?.course_id,
					},
				});

				const prev_ratings = prev_reviews
					?.filter((rev) => rev.id !== curr_review?.id)
					?.reduce((acc, curr) => acc + curr.rating, 0);

				const avg_rating = prev_ratings / (prev_reviews.length - 1);
				await prisma.course.update({
					where: { id: curr_review?.course_id },
					data: {
						avg_rating: Number(avg_rating?.toFixed(2)),
					},
				});

				console.log(
					`Updated avg_rating for course: ${curr_review?.course_id}, Review deleted by ${curr_review?.user_id}`
				);

				return query(args);
			},
		},

		/**
		 * @description For progress change, the progress percentage of the enrolled course is going to be updated
		 */
		progress: {
			async create({ args, query }) {
				const data = args.data;

				const course = await prisma.course.findFirst({
					where: {
						status: "PUBLISHED",
						chapters: {
							some: {
								lessons: {
									some: {
										id: data.lesson_id,
									},
								},
							},
						},
						enrollments: {
							some: {
								user_id: data.user_id,
							},
						},
					},
					include: {
						enrollments: true,
						chapters: {
							where: {
								status: "PUBLISHED",
							},
							orderBy: {
								position: "asc",
							},
							include: {
								lessons: {
									where: {
										status: "PUBLISHED",
									},
									orderBy: {
										position: "asc",
									},
								},
							},
						},
					},
				});

				if (!course || !course.enrollments || !course.chapters.length)
					return query(args);

				const chapters = await prisma.chapter.findMany({
					where: {
						course_id: course.id,
						status: "PUBLISHED",
					},
					include: {
						lessons: {
							where: {
								status: "PUBLISHED",
							},
							include: {
								progress: {
									where: {
										user_id: data.user_id,
									},
								},
							},
							orderBy: {
								position: "asc",
							},
						},
					},
					orderBy: {
						position: "asc",
					},
				});

				const total_lessons = chapters.reduce(
					(acc, curr) => acc + curr.lessons.length,
					0
				);

				const completed_lessons =
					chapters.reduce(
						(acc, curr) =>
							acc +
							curr.lessons.reduce(
								(acc, curr) => acc + (curr.progress.length > 0 ? 1 : 0),
								0
							),
						0
					) || 0;

				const percentage = Math.round(
					((completed_lessons + 1) / total_lessons) * 100
				);

				if (Number(percentage)) {
					await prisma.enrollment.update({
						where: {
							id: course.enrollments.find(
								(en) =>
									en.course_id === course.id && en.user_id === data.user_id
							)?.id,
						},
						data: {
							progress_percentage: Number(percentage?.toFixed(2)),
							status: Math.floor(percentage) === 100 ? "COMPLETED" : "ONGOING",
						},
					});
					console.log(
						`Updated progress_percentage for course: ${course.id}, percentage: ${percentage}, User: ${data.user_id}`
					);
				}

				return query(args);
			},
		},
		/**
		 * @description For every enrollment 100% completion, the user is going to be awarded a certificate
		 */
		enrollment: {
			async update({ args, query }) {
				const data = args.data;
				const percentage = data.progress_percentage;
				const enrollment_id = args.where?.id;
				if (Number(percentage) === 100) {
					const enrollment = await prisma.enrollment.findUnique({
						where: {
							id: enrollment_id,
						},
					});

					if (!enrollment || !enrollment.user_id || !enrollment.id)
						return query(args);

					await prisma.certificates.create({
						data: {
							user_id: enrollment?.user_id,
							enrollment_id: enrollment.id,
						},
					});
				}

				return query(args);
			},
		},

		/**
		 * @description For every successful query, the total number of seconds taken to execute the query is going to be logged
		 */
		async $allOperations({ operation, model, args, query }) {
			const start = performance.now();
			const result = await query(args);
			const end = performance.now();
			const time = end - start;
			console.log(`${operation}: ${model} took ${time}ms`);
			return result;
		},
	},
});

export default prisma;
