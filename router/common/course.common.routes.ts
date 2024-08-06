import { Router } from "express";
import { check_uuid } from "../../middleware/global.middleware";
import * as commonCourseController from "../../controller/common/course.common.controller";

/**
 * @teacher_courses_router
 * @description Router for common users to fetch the courses
 * @routes_prefix /api/v1/course
 */

const commonCourseRouter = Router();

commonCourseRouter.get("/", commonCourseController.get_all_courses);
commonCourseRouter.get("/top-course", commonCourseController.get_top_courses);
commonCourseRouter.get(
	"/enrolled",
	commonCourseController.get_my_enrolled_courses
);

commonCourseRouter.get(
	"/:id",
	check_uuid,
	commonCourseController.get_by_course_id
);

commonCourseRouter.post("/join", commonCourseController.join_course);
commonCourseRouter.post("/continue", commonCourseController.continue_course);
commonCourseRouter.post(
	"/download-certificate",
	commonCourseController.download_certificate
);

export default commonCourseRouter;
