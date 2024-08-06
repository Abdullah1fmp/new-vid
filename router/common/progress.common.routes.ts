import { Router } from "express";
import * as commonProgressController from "../../controller/common/progress.common.controller";

/**
 * @common_review_router
 * @routes_prefix /api/v1/review
 */

const commonProgressRouter = Router();
// commonProgressRouter.get("/", commonProgressController.get_all_review);
commonProgressRouter.post("/", commonProgressController.create_progress);

export default commonProgressRouter;
