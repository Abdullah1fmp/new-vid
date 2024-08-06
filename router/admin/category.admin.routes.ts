import { Router } from "express";
import * as AdminCategoryController from "../../controller/admin/category.admin.controller";
import { check_uuid } from "../../middleware/global.middleware";

/**
 * Admin Category Router
 * @description All the API routes for admins will be prefixed with /admin/category.
 * 1. GET: Get all the categories
 * 2. GET: Get a category by id
 * 3. POST: Create a new category
 * 4. PATCH: Update a category by id
 * 5. DELETE: Delete a category by id
 * @access Protected
 * @admin_protected admin protected route checked by check_admin
 * @uuid_protected uuid protected route checked by check_uuid
 */

const adminCategoryRouter = Router();

adminCategoryRouter.get("/", AdminCategoryController.get_all_category);
adminCategoryRouter.get(
	"/:id",
	check_uuid,
	AdminCategoryController.get_by_category_id
);
adminCategoryRouter.post("/", AdminCategoryController.create_category);
adminCategoryRouter.patch(
	"/:id",
	check_uuid,
	AdminCategoryController.update_category_by_id
);
adminCategoryRouter.delete(
	"/:id",
	check_uuid,
	AdminCategoryController.delete_category_by_id
);

export default adminCategoryRouter;
