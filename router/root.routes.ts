import { Router } from "express";
import adminRouter from "./admin/root.admin.routes";
import commonRouter from "./common/root.common.routes";
import teacherRouter from "./teacher/root.teacher.routes";
import { check_admin, check_auth } from "../middleware/authorization.middlware";

const rootRouter = Router();

rootRouter.use("/", commonRouter);
rootRouter.use("/admin", check_auth, check_admin, adminRouter);
rootRouter.use("/teacher", check_auth, check_admin, teacherRouter);

export default rootRouter;
