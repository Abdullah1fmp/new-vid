import { Router } from "express";
import * as adminQuestionController from "../../controller/admin/question.admin.controller";
import { check_uuid } from "../../middleware/global.middleware";

const adminQuestionRouter = Router();

// adminQuestionRouter.post(
//   "/",
//   adminQuestionController.create_question_by_quiz_id
// );
adminQuestionRouter.patch(
  "/reorder",
  adminQuestionController.reorder_questions
);
adminQuestionRouter.patch(
  "/:id",
  check_uuid,
  adminQuestionController.update_question_by_id
);
adminQuestionRouter.delete(
  "/:id",
  check_uuid,
  adminQuestionController.delete_question_by_id
);

export default adminQuestionRouter;
