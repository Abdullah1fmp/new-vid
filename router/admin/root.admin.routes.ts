import { Router } from "express";
import adminCategoryRouter from "./category.admin.routes";
import adminUserGroupRouter from "./user_group.admin.routes";
import adminUserRouter from "./user.admin.routes";
import adminCourseRouter from "./course.admin.routes";
import adminChapterRouter from "./chapter.admin.routes";
import adminLessonRouter from "./lessons.admin.routes";
import adminQuizRouter from "./quiz.admin.routes";
import adminQuestionRouter from "./question.admin.routes";
import adminOptionRouter from "./option.admin.routes";
import adminStatRouter from "./stats.admin.routes";

/**
 * Admin Router
 * @description All the API routes for admin and officials will be prefixed with /admin.
 * @access Public and Protected
 */
const adminRouter = Router();

adminRouter.use("/stats", adminStatRouter);
adminRouter.use("/user", adminUserRouter);
adminRouter.use("/category", adminCategoryRouter);
adminRouter.use("/user-group", adminUserGroupRouter);
adminRouter.use("/course", adminCourseRouter);
adminRouter.use("/chapter", adminChapterRouter);
adminRouter.use("/lesson", adminLessonRouter);
adminRouter.use("/quiz", adminQuizRouter);
adminRouter.use("/question", adminQuestionRouter);
adminRouter.use("/option", adminOptionRouter);

export default adminRouter;
