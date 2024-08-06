import prisma from "../../db/db_client";

export const get_all = async ({
	search_query,
	page,
}: {
	search_query: {
		title?: string;
		id?: string;
		price_range?: number[];
		sort_by?: "avg_rating" | "price" | "created_at" | "title";
		sort_type?: "asc" | "desc";
		author_name?: string;
		author_id?: string;
		difficulity?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
		price_type?: "FREE" | "PAID";
		rating_range?: number[];
	};
	page?: {
		skip: number;
		take: number;
	};
}) => {
	try {
		return await prisma.course.findMany({
			where: {
				status: "PUBLISHED",
				...(search_query.id && {
					id: search_query.id,
				}),
				...(search_query.title && {
					title: {
						contains: search_query.title,
						mode: "insensitive",
					},
				}),
				...(search_query.difficulity && {
					difficulty: {
						equals: search_query.difficulity,
					},
				}),
				...(search_query.price_type && {
					price: {
						...(search_query.price_type === "FREE"
							? {
									equals: 0,
							  }
							: {
									not: {
										equals: 0,
									},
							  }),
					},
				}),
				...(search_query.rating_range && {
					avg_rating: {
						gte: search_query.rating_range[0],
						lte: search_query.rating_range[1],
					},
				}),

				// ...(search_query.price_range && {
				// 	price: {
				// 		gte: search_query.price_range[0],
				// 		lte: search_query.price_range[1],
				// 	},
				// }),
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

				author: {
					select: {
						id: true,
						clerk_id: true,
						first_name: true,
						last_name: true,
						email: true,
					},
				},

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
							include: {
								quiz: true,
							},
							orderBy: {
								position: "asc",
							},
						},
					},
				},

				reviews: {
					orderBy: {
						created_at: "desc",
					},
				},
				enrollments: {
					select: {
						id: true,
						course_id: true,
						user_id: true,
					},
				},
			},
			orderBy: {
				[search_query.sort_by || "created_at"]: search_query.sort_type || "asc",
			},
			// skip: page?.skip || 0,
			// take: page?.take || 10,
		});
	} catch (err) {
		throw err;
	}
};

export const get_by_course_id_with_enrollments = async ({
	course_id,
	user_id,
}: {
	course_id: string;
	user_id: string;
}) => {
	try {
		return await prisma.course.findUnique({
			where: {
				id: course_id,
			},
			include: {
				author: {
					select: {
						first_name: true,
						last_name: true,
						email: true,
					},
				},
				enrollments: true,
				reviews: true,
				access_by_user_group: true,
				course_to_category: {
					include: {
						category: true,
					},
				},
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
							include: {
								progress: {
									where: {
										user_id,
									},
								},
							},
							orderBy: {
								position: "asc",
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

export const get_tops = async () => {
	try {
		return await prisma.course.findMany({
			orderBy: {
				avg_rating: "desc",
			},
			include: {
				course_to_category: true,
				chapters: {
					where: {
						status: "PUBLISHED",
					},
					include: {
						lessons: {
							where: {
								status: "PUBLISHED",
							},
						},
					},
				},
				enrollments: true,
			},
		});
	} catch (err) {
		throw err;
	}
};

export const get_user_enrollments = async ({
	search_query,
}: {
	search_query?: {
		user_id?: string;
		course_id?: string;
	};
}) => {
	try {
		return await prisma.enrollment.findMany({
			where: {
				...(search_query?.user_id && {
					user_id: search_query.user_id,
				}),
				...(search_query?.course_id && {
					course_id: search_query.course_id,
				}),
			},
			include: {
				course: {
					include: {
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
									include: {
										progress: {
											where: {
												...(search_query?.user_id && {
													user_id: search_query.user_id,
												}),
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

export const join_course = async ({
	user_id,
	course_id,
}: {
	user_id: string;
	course_id: string;
}) => {
	try {
		return await prisma.enrollment.create({
			data: {
				user_id,
				course_id,
			},
		});
	} catch (err) {
		throw err;
	}
};
