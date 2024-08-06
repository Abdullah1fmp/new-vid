import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import {
	validate_course_body,
	validate_course_update_body,
} from "../../lib/validation.lib";
import * as TeacherCourseServices from "../../services/teacher/courses.teacher.services";

/**
 * @Get_my_courses Controller
 * @param req.query { name: string, id: string }
 * return { message: string, count: number, data: object[] }
 * @description Get all courses based on the query params
 */
export const get_my_courses = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");
		const data = await TeacherCourseServices.get_all({
			search_query: { author_id: user?.id },
		});

		res.status(200).json({
			message: "Courses fetched successfully.",
			count: data.length,
			data,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @Get_my_stats Controller
 * return { message: string data: object[] }
 * @description Get teacher stats based on the query params
 */
export const get_my_stats = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");
		const data = await TeacherCourseServices.get_teacher_stats({
			user_id: user?.id,
		});

		res.status(200).json({
			message: "Stats fetched successfully.",
			data,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @get_course_by_id Controller
 * return { message: string, data: course, status: number }
 * @description Get the course by id
 */
export const get_by_course_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id as string;
		const data = await TeacherCourseServices.get_all({
			search_query: { id },
			includes: {
				author: true,
				chapters: true,
				reviews: true,
				lessons: true,
				quiz: true,
			},
		});

		if (data?.length === 0) throw new CustomError("Course not found.", 404);

		res.status(200).json({
			message: "Course fetched successfully.",
			data: data?.[0],
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @create_category Controller
 * return { message: string, data: object[], status: number }
 * @description Create a new category from request body object.
 */
export const create_course = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */

		const body = validate_course_body(req.body);
		const author_id = req.app.get("user")?.id;

		/**
		 * Create the course
		 */
		const data = await TeacherCourseServices.create({
			body: {
				...body,
				author_id,
			},
		});

		res.status(201).json({
			message: "Course created successfully.",
			data,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @update_course_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description Update the course by id from request body object.
 */
export const update_course_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const body = validate_course_update_body(req.body);
		const id = req.params.id;
		const author_id = req.app.get("user")?.id;

		/**
		 * Check if the course is created by the user
		 */
		const course = await TeacherCourseServices.get_all({
			search_query: { id, author_id },
		});
		if (course.length === 0)
			throw new CustomError("Course is not created by the user.", 401);

		/**
		 * Update the course
		 */
		const data = await TeacherCourseServices.update_by_id({
			id: id,
			body,
		});

		res.status(201).json({
			message: "Course updated successfully.",
			data,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @delete_course_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description delete the course by id from request body object.
 */
export const delete_course_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const id = req.params.id;
		if (!id) throw new CustomError("Course id is required", 400);

		const author_id = req.app.get("user")?.id;
		/**
		 * Check if the course is created by the user
		 */
		const course = await TeacherCourseServices.get_all({
			search_query: { id, author_id },
		});

		if (course.length === 0)
			throw new CustomError("Course is not owned by the user.", 401);

		/**
		 * Delete the category
		 */
		await TeacherCourseServices.delete_by_id({
			id,
		});

		res.status(202).json({
			message: "Course deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};
