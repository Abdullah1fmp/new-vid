import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import { validate_options_with_question_id_body } from "../../lib/validation.lib";
import * as TeacherOptionServices from "../../services/teacher/option.teacher.services";
import * as TeacherQuestionServices from "../../services/teacher/question.teacher.services";

/**
 * @create_option_by_question_id Controller
 * return { message: string, data: question, status: number }
 * @description Get the question by id
 */
export const create_option_by_question_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const body = validate_options_with_question_id_body(req.body);

		const data = await TeacherQuestionServices.get_question_by_id({
			id: body.question_id,
		});
		if (!data) throw new CustomError("Not associate question found.", 404);

		/**
		 * Check if the quiz is owned by the user
		 */
		if (data.quiz.lesson.chapter.course.author_id !== req.app.get("user")?.id) {
			throw new CustomError("Course is not owned by you", 401);
		}

		const options = await TeacherOptionServices.create_options({ body });

		res.status(201).json({
			message: "Options created successfully.",
			data: options,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @reorder_options Controller
 * return { message: string, data: object[], status: number }
 * @description Update the options orders by ids from request body object.
 */
export const reorder_options = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const ids = req.body?.ids as string[];
		if (!ids) throw new CustomError("Option Ids are required.", 400);
		const question_id = req.body?.question_id as string;
		if (!question_id) throw new CustomError("question_id is required.", 400);
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
		 * Update the lessons
		 */
		const data = await TeacherOptionServices.reorder_options({
			question_id,
			ids,
		});

		res.status(202).json({
			message: "Options order updated successfully.",
			data,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @update_option_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description Update the question by id from request body object.
 */
export const update_option_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const body = {
			...(req.body?.text ? { text: req.body.text } : {}),
			...(req.body?.is_correct ? { is_correct: req.body.is_correct } : {}),
			...(req.body?.position ? { position: req.body.position } : {}),
		};

		if (Object.keys(body).length === 0)
			throw new CustomError("Nothing to update", 403);
		if (body.text && body.text.length === 0)
			throw new CustomError("Option text is required", 403);
		if (body.is_correct && typeof body.is_correct !== "boolean")
			throw new CustomError("is_correct should be a true or false", 403);
		if (
			body.position &&
			isNaN(Number(body.position)) &&
			Number(body.position) < 0
		)
			throw new CustomError("is_correct should be a true or false", 403);

		const option_id = req.params.id;
		const author_id = req.app.get("user")?.id;

		/**
		 * Check if the course is created by the user
		 */
		const option = await TeacherOptionServices.get_option_by_id({
			id: option_id,
		});

		if (!option) throw new CustomError("Option not found.", 404);
		if (
			option?.question?.quiz?.lesson?.chapter?.course?.author_id !== author_id
		)
			throw new CustomError("Course is not owned by you", 401);

		/**
		 * Update the question
		 */
		const data = await TeacherOptionServices.update_option_by_id({
			id: option_id,
			body,
		});

		res.status(202).json({
			message: "Option updated successfully.",
			data,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @delete_option_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description delete the option by id from request body object.
 */
export const delete_option_by_id = async (
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
		const option = await TeacherOptionServices.get_option_by_id({
			id,
		});
		if (!option) throw new CustomError("Option not found.", 404);
		if (
			option.question.quiz.lesson.chapter.course.author_id !==
			req.app.get("user")?.id
		)
			throw new CustomError("Course is not owned by you", 401);

		/**
		 * Delete the question
		 */
		await TeacherOptionServices.delete_option_by_id({
			id,
		});

		res.status(202).json({
			message: "Option deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};
