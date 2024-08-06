import { NextFunction, Request, Response } from "express";
import * as CourseService from "../../services/admin/course.admin.services";
import * as TeacherCourseServices from "../../services/teacher/courses.teacher.services";
import { validate_course_update_body } from "../../lib/validation.lib";

export const getAllCourse = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await CourseService.get_all_course();

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

export const getCourseById = async (
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

		res.status(200).json({
			message: "Course fetched successfully.",
			data: data[0],
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const updateCourseById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const body = validate_course_update_body(req.body);
		const id = req.params.id;

		const data = await TeacherCourseServices.update_by_id({
			id: id,
			body,
		});

		res.status(201).json({
			message: "Course updated successfully.",
			data,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

export const deleteCourseById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id as string;
		await CourseService.delete_course_by_id(id);

		res.status(202).json({
			message: "Course deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

export const deleteAllCourse = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await CourseService.delete_all_course();
		res.status(202).json({
			message: "All Courses deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

export const addUserToCourse = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { course_id, user_id } = req.body;
		if (!course_id) {
			throw new Error("Course ID is required.");
		}
		if (!user_id) {
			throw new Error("User ID is required.");
		}

		const data = await CourseService.add_user_to_course(course_id, user_id);

		res.status(201).json({
			message: "User added to course successfully.",
			data,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

export const removeUserFromCourse = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { course_id, user_id } = req.body;
		if (!course_id) {
			throw new Error("Course ID is required.");
		}
		if (!user_id) {
			throw new Error("User ID is required.");
		}

		await CourseService.remove_user_from_course(course_id, user_id);

		res.status(200).json({
			message: "User removed from course successfully.",
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};
