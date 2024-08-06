import { Router } from "express";
import * as teacherCourseController from "../../controller/teacher/course.teacher.controller";
import { check_uuid } from "../../middleware/global.middleware";

/**
 * @teacher_courses_router
 * @description Router for create course, and get all course by teacher
 * @routes_prefix /api/v1/teacher/course
 */

const teacherCourseRouter = Router();
teacherCourseRouter.get("/", teacherCourseController.get_my_courses);
teacherCourseRouter.get("/stats", teacherCourseController.get_my_stats);
teacherCourseRouter.get(
	"/:id",
	check_uuid,
	teacherCourseController.get_by_course_id
);
teacherCourseRouter.post("/", teacherCourseController.create_course);
teacherCourseRouter.patch(
	"/:id",
	check_uuid,
	teacherCourseController.update_course_by_id
);
teacherCourseRouter.delete(
	"/:id",
	check_uuid,
	teacherCourseController.delete_course_by_id
);

export default teacherCourseRouter;
