import { Router } from "express";
import * as commonLessonController from "../../controller/common/lesson.common.controller";
import { check_uuid } from "../../middleware/global.middleware";

/**
 * @teacher_lesson_router
 * @description Router for common users to fetch the courses
 * @routes_prefix /api/v1/lesson
 */

const commonLessonRouter = Router();
commonLessonRouter.get(
	"/:id",
	check_uuid,
	commonLessonController.get_by_lesson_id
);

export default commonLessonRouter;
