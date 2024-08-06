import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import { validate_uuid } from "../../lib/validation.lib";
import * as CommonLessonServices from "../../services/common/lesson.common.services";
import * as CommonProgressServices from "../../services/common/progress.common.services";

export const create_progress = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");
		const lesson_id = req.body.lesson_id as string;
		const enrollment_id = req.body.enrollment_id as string;
		const score = req.body.score as number;

		if (!validate_uuid(lesson_id) || !validate_uuid(enrollment_id)) {
			throw new CustomError("Invalid lesson or enrollment id provided", 403);
		}
		if (Number(score) && (Number(score) < 0 || Number(score) > 100)) {
			throw new CustomError("Invalid score provided", 403);
		}

		const lesson = await CommonLessonServices.get_by_id_including_all(
			lesson_id
		);

		if (!lesson) throw new CustomError("Lesson not found.", 404);

		if (lesson.type === "QUIZ" && !score) {
			throw new CustomError("Score is required for quiz lessons.", 403);
		}

		// Check if the course is private and user is not in the group
		const my_enrollment = lesson.chapter.course.enrollments.find(
			(enrollment) => enrollment.user_id === user?.id
		);
		if (!my_enrollment) {
			throw new CustomError(
				"You need to enroll in the course to access the lesson.",
				401
			);
		}

		// Check if the progress already exists
		const already_progress = lesson.progress.find(
			(progress) => progress.user_id === user?.id
		);
		if (already_progress) {
			res.status(200).json({
				message: "Progress already exists.",
				data: already_progress,
				status: 200,
			});
			return;
		}

		// check all the previous lessons are completed
		let previous_lessons = [];

		for (let i = 0; i < lesson.chapter.course.chapters.length; i++) {
			const chapter = lesson.chapter.course.chapters[i];

			let flag = false;
			for (let j = 0; j < chapter.lessons.length; j++) {
				const lesson = chapter.lessons[j];

				if (lesson.id !== lesson_id) {
					previous_lessons.push(lesson);
				} else {
					flag = true;
					break;
				}
			}
			if (flag) break;
		}

		let everything_ok = true;
		previous_lessons.map((lesson) => {
			const prog = lesson.progress.find(
				(progress) => progress.user_id === user?.id
			);
			if (!prog) {
				everything_ok = false;
			}
			return prog;
		});

		if (!everything_ok) {
			throw new CustomError(
				"You need to complete the previous lessons to access this lesson.",
				401
			);
		}

		// Create the progress
		const data = await CommonProgressServices.create_progress({
			lesson_id,
			user_id: user.id,
			enrollment_id,
			score: lesson.type === "QUIZ" ? score : 100,
		});

		res.status(201).json({
			message: "Progress created successfully.",
			data,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};
