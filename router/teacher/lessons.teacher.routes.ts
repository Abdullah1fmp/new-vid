import { Router } from "express";
import * as teacherLessonController from "../../controller/teacher/lesson.teacher.controller";
import { check_uuid } from "../../middleware/global.middleware";

/**
 * @teacher_lesson_router
 * @description Router for create lesson, and get all chapter by teacher courses
 * @routes_prefix /api/v1/teacher/lesson
 */

const teacherLessonRouter = Router();

// this :id is the chapter_id, not the lesson_id
// to get all the lessons of a chapter
teacherLessonRouter.get(
	"/:id",
	check_uuid,
	teacherLessonController.get_lessons
);

teacherLessonRouter.get(
	"/:chapter_id/:id",
	check_uuid,
	teacherLessonController.get_by_lesson_id
);

teacherLessonRouter.post(
	// This is chapter_id (named as id for the uuid middleware validation)
	"/:id",
	check_uuid,
	teacherLessonController.create_lesson
);

teacherLessonRouter.patch(
	// This is chapter_id (named as id for the uuid middleware validation)
	"/reorder/:id",
	check_uuid,
	teacherLessonController.reorder_lesson_by_ids
);

teacherLessonRouter.patch(
	// This is lesson_id (named as id for the uuid middleware validation)
	"/:id",
	check_uuid,
	teacherLessonController.update_lesson_by_id
);

teacherLessonRouter.delete(
	// This is lesson_id (named as id for the uuid middleware validation)
	"/:id",
	check_uuid,
	teacherLessonController.delete_lesson_by_id
);

export default teacherLessonRouter;
