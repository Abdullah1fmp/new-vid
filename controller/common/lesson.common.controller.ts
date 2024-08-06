import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import * as CommonLessonServices from "../../services/common/lesson.common.services";
import * as CommonCourseServices from "../../services/common/courses.common.services";

export const get_by_lesson_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id as string;
		const lesson = await CommonLessonServices.get_by_id(id);
		if (!lesson) {
			throw new CustomError("Lesson not found.", 404);
		}

		const enroll = await CommonCourseServices.get_user_enrollments({
			search_query: {
				user_id: req.app.get("user")?.id as string,
				course_id: lesson?.chapter.course_id as string,
			},
		});

		// check if the user is enrolled in the course
		if (!enroll.length) {
			throw new CustomError(
				"You need to enroll in the course to access this lesson.",
				403
			);
		}

		const { chapter, ...rest } = lesson;

		res.status(200).json({
			message: "Lesson fetched successfully.",
			data: rest,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};
