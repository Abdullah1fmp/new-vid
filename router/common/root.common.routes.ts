import { Router } from "express";
import { check_auth } from "../../middleware/authorization.middlware";
import commonCatRouter from "./category.common.routes";
import commonCourseRouter from "./course.common.routes";
import commonLessonRouter from "./lesson.common.routes";
import commonProgressRouter from "./progress.common.routes";
import commonReviewRouter from "./review.common.routes";
import commonUserRouter from "./user.common.routes";
import commonUserGroupRouter from "./user_group.common.routes";

const commonRouter = Router();

commonRouter.use("/user", commonUserRouter);
commonRouter.use("/category", commonCatRouter);
commonRouter.use("/user-group", check_auth, commonUserGroupRouter);
commonRouter.use("/course", check_auth, commonCourseRouter);
commonRouter.use("/lesson", check_auth, commonLessonRouter);
commonRouter.use("/review", check_auth, commonReviewRouter);
commonRouter.use("/progress", check_auth, commonProgressRouter);

export default commonRouter;
