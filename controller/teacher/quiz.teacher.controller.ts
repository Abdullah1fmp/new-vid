import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import * as TeacherQuizServices from "../../services/teacher/quiz.teacher.services";

/**
 * @Get_chapters Controller
 * @param req.params.id - quiz_id
 * return { message: string, data: object[] }
 * @description Get quiz based on the quiz_id
 */
export const get_quiz_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const quiz_id = req.params.id;

		const data = await TeacherQuizServices.get_by_id({
			quiz_id,
			includes: { question: true },
		});

		if (data.length === 0) throw new CustomError("Quiz not found.", 404);

		if (data[0].lesson.chapter.course.author_id !== req.app.get("user")?.id)
			throw new CustomError("Course is not owned by you", 401);

		res.status(200).json({
			message: "Quiz fetched successfully.",
			data,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};
