import { Router } from "express";
import * as commonReviewController from "../../controller/common/review.common.controller";
import { check_uuid } from "../../middleware/global.middleware";

/**
 * @common_review_router
 * @routes_prefix /api/v1/review
 */

const commonReviewRouter = Router();
commonReviewRouter.get("/", commonReviewController.get_all_review);
commonReviewRouter.post("/", commonReviewController.create_review);
commonReviewRouter.patch(
	"/:id",
	check_uuid,
	commonReviewController.update_review
);
commonReviewRouter.delete(
	"/:id",
	check_uuid,
	commonReviewController.delete_review
);

export default commonReviewRouter;
