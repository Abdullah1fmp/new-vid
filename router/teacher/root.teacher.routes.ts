import { Router } from "express";
import teacherChapterRouter from "./chapter.teacher.routes";
import teacherCourseRouter from "./course.teacher.routes";
import teacherLessonRouter from "./lessons.teacher.routes";
import teacherQuizRouter from "./quiz.teacher.routes";

/**
 * @teacher_router
 * @description Router for teachers to publish and view the course with statistics
 * @access Public and Protected
 */
const teacherRouter = Router();

teacherRouter.use("/course", teacherCourseRouter);
teacherRouter.use("/chapter", teacherChapterRouter);
teacherRouter.use("/lesson", teacherLessonRouter);
teacherRouter.use("/quiz", teacherQuizRouter);

export default teacherRouter;
