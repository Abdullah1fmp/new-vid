import { Router } from "express";
import * as adminQuizController from "../../controller/admin/quiz.admin.controller";
import { check_uuid } from "../../middleware/global.middleware";
import adminOptionRouter from "./option.admin.routes";
import adminQuestionRouter from "./question.admin.routes";

/**
 * @teacher_quiz_router
 * @routes_prefix /api/v1/teacher/lesson
 */

const adminQuizRouter = Router();

adminQuizRouter.get("/:id", check_uuid, adminQuizController.get_quiz_by_id);

/**
 * @Question
 */
adminQuizRouter.use("/question", adminQuestionRouter);

/**
 * @option
 */
adminQuizRouter.use("/option", adminOptionRouter);

export default adminQuizRouter;
