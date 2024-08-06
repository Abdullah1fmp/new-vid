import prisma from "../../db/db_client";

export const get_by_id = async (id: string) => {
	try {
		return await prisma.lesson.findUnique({
			where: {
				id,
				status: "PUBLISHED",
				chapter: {
					status: "PUBLISHED",
					course: {
						status: "PUBLISHED",
					},
				},
			},
			include: {
				chapter: {
					include: {
						course: {
							include: {
								course_to_category: true,
								author: true,
							},
						},
					},
				},
				quiz: {
					include: {
						questions: {
							include: {
								options: true,
							},
						},
					},
				},
				progress: true,
			},
		});
	} catch (err) {
		throw err;
	}
};

export const get_by_id_including_all = async (id: string) => {
	try {
		return await prisma.lesson.findUnique({
			where: {
				id,
				status: "PUBLISHED",
				chapter: {
					status: "PUBLISHED",
					course: {
						status: "PUBLISHED",
					},
				},
			},
			include: {
				progress: true,
				chapter: {
					include: {
						course: {
							include: {
								course_to_category: true,
								author: true,
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
											include: {
												progress: true,
											},
											orderBy: {
												position: "asc",
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
