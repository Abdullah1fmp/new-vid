import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import {
	validate_question_body,
	validate_question_update_body,
} from "../../lib/validation.lib";
import * as TeacherQuizServices from "../../services/teacher/quiz.teacher.services";
import * as TeacherQuestionServices from "../../services/teacher/question.teacher.services";

/**
 * @create_question_by_quiz_id Controller
 * return { message: string, data: question, status: number }
 * @description Get the question by id
 */
export const create_question_by_quiz_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const body = validate_question_body(req.body);

		const data = await TeacherQuizServices.get_by_id({
			quiz_id: body.quiz_id,
		});
		if (data?.length === 0)
			throw new CustomError("Not associate quiz found.", 404);

		/**
		 * Check if the quiz is owned by the user
		 */
		if (data[0].lesson.chapter.course.author_id !== req.app.get("user")?.id) {
			throw new CustomError("Course is not owned by you", 401);
		}

		const question = await TeacherQuestionServices.create_question({ body });

		res.status(201).json({
			message: "Question created successfully.",
			data: question,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @update_question_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description Update the question by id from request body object.
 */
export const update_question_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const body = validate_question_update_body(req.body);
		const question_id = req.params.id;
		const author_id = req.app.get("user")?.id;

		/**
		 * Check if the course is created by the user
		 */
		const question = await TeacherQuestionServices.get_question_by_id({
			id: question_id,
		});

		if (!question) throw new CustomError("Question not found.", 404);
		if (question?.quiz?.lesson?.chapter?.course?.author_id !== author_id)
			throw new CustomError("Course is not owned by you", 401);

		/**
		 * Update the question
		 */
		const data = await TeacherQuestionServices.update_question_by_id({
			id: question_id,
			body,
		});

		res.status(202).json({
			message: "Question updated successfully.",
			data,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @reorder_questions Controller
 * return { message: string, data: object[], status: number }
 * @description Update the lesson orders by ids from request body object.
 */
export const reorder_questions = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const ids = req.body?.ids as string[];
		if (!ids) throw new CustomError("Question Ids are required.", 400);
		const quiz_id = req.body?.quiz_id as string;
		if (!quiz_id) throw new CustomError("quiz_id is required.", 400);
		const author_id = req.app.get("user")?.id;

		/**
		 * Check if the course is created by the user
		 */
		const quiz = await TeacherQuizServices.get_by_id({
			quiz_id,
		});

		if (quiz.length === 0) throw new CustomError("Quiz not found.", 404);

		if (quiz?.[0]?.lesson?.chapter?.course?.author_id !== author_id)
			throw new CustomError("Quiz is not owned by you", 401);

		/**
		 * Update the lessons
		 */
		const data = await TeacherQuestionServices.reorder_questions({
			quiz_id,
			ids,
		});

		res.status(202).json({
			message: "Question order updated successfully.",
			data,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @delete_question_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description delete the lesson by id from request body object.
 */
export const delete_question_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const id = req.params.id;

		/**
		 * Check if the course is created by the user
		 */
		const question = await TeacherQuestionServices.get_question_by_id({
			id,
		});
		if (!question) throw new CustomError("Question not found.", 404);
		if (
			question.quiz.lesson.chapter.course.author_id !== req.app.get("user")?.id
		)
			throw new CustomError("Course is not owned by you", 401);

		/**
		 * Delete the question
		 */
		await TeacherQuestionServices.delete_question_by_id({
			id,
		});

		res.status(202).json({
			message: "Question deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};
