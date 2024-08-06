import { Router } from "express";
import * as AdminUserGroupController from "../../controller/admin/user_group.admin.controller";
import { check_uuid } from "../../middleware/global.middleware";

/**
 * Admin user-group Router
 * @description All the API routes for admins will be prefixed with /admin/user-group.
 * 1. GET: Get all the categories
 * 2. GET: Get a user-group by id
 * 3. POST: Create a new user-group
 * 4. PATCH: Update a user-group by id
 * 5. DELETE: Delete a user-group by id
 * @access Protected
 * @admin_protected admin protected route checked by check_admin
 * @uuid_protected uuid protected route checked by check_uuid
 */

const adminUserGroupRouter = Router();

adminUserGroupRouter.get("/", AdminUserGroupController.get_all_user_group);
adminUserGroupRouter.get(
	"/:id",
	check_uuid,
	AdminUserGroupController.get_by_user_group_id
);
adminUserGroupRouter.post("/", AdminUserGroupController.create_user_group);
adminUserGroupRouter.patch(
	"/:id",
	check_uuid,
	AdminUserGroupController.update_user_group_by_id
);
adminUserGroupRouter.delete(
	"/:id",
	check_uuid,
	AdminUserGroupController.delete_user_group_by_id
);

export default adminUserGroupRouter;
