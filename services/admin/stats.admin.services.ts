import prisma from "../../db/db_client";

export const get_all_stats = async () => {
	try {
		const users = await prisma.user.count();
		const teachers = await prisma.user.count({
			where: {
				roles: {
					has: "TEACHER",
				},
			},
		});
		const enrollments = await prisma.enrollment.count();
		const courses = await prisma.course.count();
		const chapters = await prisma.chapter.count();
		const lessons = await prisma.lesson.count();
		const quizzes = await prisma.quiz.count();
		const questions = await prisma.question.count();
		const reviews = await prisma.review.count();

		return {
			users,
			teachers,
			enrollments,
			courses,
			chapters,
			lessons,
			quizzes,
			questions,
			reviews,
		};
	} catch (err) {
		throw err;
	}
};
