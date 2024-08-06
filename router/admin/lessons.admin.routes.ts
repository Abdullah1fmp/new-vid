import { Router } from "express";
import * as adminLessonController from "../../controller/admin/lesson.admin.controller";
import { check_uuid } from "../../middleware/global.middleware";

/**
 * @teacher_lesson_router
 * @description Router for create lesson, and get all chapter by teacher courses
 * @routes_prefix /api/v1/teacher/lesson
 */

const adminLessonRouter = Router();

adminLessonRouter.get("/:id", check_uuid, adminLessonController.get_lessons);

adminLessonRouter.get(
  "/:chapter_id/:id",
  check_uuid,
  adminLessonController.get_by_lesson_id
);

adminLessonRouter.patch(
  // This is chapter_id (named as id for the uuid middleware validation)
  "/reorder/:id",
  check_uuid,
  adminLessonController.reorder_lesson_by_ids
);

adminLessonRouter.patch(
  // This is lesson_id (named as id for the uuid middleware validation)
  "/:id",
  check_uuid,
  adminLessonController.update_lesson_by_id
);

adminLessonRouter.delete(
  // This is lesson_id (named as id for the uuid middleware validation)
  "/:id",
  check_uuid,
  adminLessonController.delete_lesson_by_id
);

export default adminLessonRouter;
