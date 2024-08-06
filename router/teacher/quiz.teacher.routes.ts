import { Router } from "express";
import * as teacherQuizController from "../../controller/teacher/quiz.teacher.controller";
import { check_uuid } from "../../middleware/global.middleware";
import teacherOptionRouter from "./option.teacher.routes";
import teacherQuestionRouter from "./question.teacher.routes";

/**
 * @teacher_quiz_router
 * @routes_prefix /api/v1/teacher/lesson
 */

const teacherQuizRouter = Router();

teacherQuizRouter.get("/:id", check_uuid, teacherQuizController.get_quiz_by_id);

/**
 * @Question
 */
teacherQuizRouter.use("/question", teacherQuestionRouter);

/**
 * @option
 */
teacherQuizRouter.use("/option", teacherOptionRouter);

export default teacherQuizRouter;
