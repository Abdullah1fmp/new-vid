import { Router } from "express";
import { check_uuid } from "../../middleware/global.middleware";
import * as CommonCategoryController from "../../controller/common/category.common.controller";

/**
 * @common_user_router
 * @description Router for file upload and get file by id
 * @routes
 * 1. POST /api/v1/common/user/me
 */

const commonCatRouter = Router();
commonCatRouter.get("/", CommonCategoryController.get_all_category);
commonCatRouter.get(
	"/:id",
	check_uuid,
	CommonCategoryController.get_by_category_id
);

export default commonCatRouter;
