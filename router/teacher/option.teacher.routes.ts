import { Router } from "express";
import * as teacherOptionController from "../../controller/teacher/option.teacher.controller";
import { check_uuid } from "../../middleware/global.middleware";

const teacherOptionRouter = Router();

teacherOptionRouter.post(
	"/",
	teacherOptionController.create_option_by_question_id
);
teacherOptionRouter.patch("/reorder", teacherOptionController.reorder_options);
teacherOptionRouter.patch(
	"/:id",
	check_uuid,
	teacherOptionController.update_option_by_id
);
teacherOptionRouter.delete(
	"/:id",
	check_uuid,
	teacherOptionController.delete_option_by_id
);

export default teacherOptionRouter;
