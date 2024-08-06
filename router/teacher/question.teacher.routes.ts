import { Router } from "express";
import * as teacherQuestionController from "../../controller/teacher/question.teacher.controller";
import { check_uuid } from "../../middleware/global.middleware";

const teacherQuestionRouter = Router();

teacherQuestionRouter.post(
	"/",
	teacherQuestionController.create_question_by_quiz_id
);
teacherQuestionRouter.patch(
	"/reorder",
	teacherQuestionController.reorder_questions
);
teacherQuestionRouter.patch(
	"/:id",
	check_uuid,
	teacherQuestionController.update_question_by_id
);
teacherQuestionRouter.delete(
	"/:id",
	check_uuid,
	teacherQuestionController.delete_question_by_id
);

export default teacherQuestionRouter;
