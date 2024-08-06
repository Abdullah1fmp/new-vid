import { Router } from "express";
import * as AdminCourseController from "../../controller/admin/course.admin.controller";
import { check_uuid } from "../../middleware/global.middleware";

const adminCourseRouter = Router();

adminCourseRouter.get("/", AdminCourseController.getAllCourse);
adminCourseRouter.post("/add-user", AdminCourseController.addUserToCourse);
adminCourseRouter.post(
	"/remove-user",
	AdminCourseController.removeUserFromCourse
);
adminCourseRouter.get("/:id", check_uuid, AdminCourseController.getCourseById);
adminCourseRouter.patch(
	"/:id",
	check_uuid,
	AdminCourseController.updateCourseById
);
adminCourseRouter.delete("/delete-all", AdminCourseController.deleteAllCourse);
adminCourseRouter.delete(
	"/:id",
	check_uuid,
	AdminCourseController.deleteCourseById
);

export default adminCourseRouter;
