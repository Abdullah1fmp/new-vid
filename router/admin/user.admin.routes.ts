import { Router } from "express";
import * as AdminUserController from "../../controller/admin/user.admin.controller";
import { check_uuid } from "../../middleware/global.middleware";

/**
 * User Router
 * @description user routes for CRUD operations
 * @access Public and Protected
 * @admin_protected admin protected route checked by check_admin
 * @uuid_protected uuid protected route checked by check_uuid
 */

const adminUserRouter = Router();

adminUserRouter.get("/", AdminUserController.get_all_users);
adminUserRouter.get("/:id", check_uuid, AdminUserController.get_by_id);

adminUserRouter.patch("/:id", check_uuid, AdminUserController.update_by_id);

adminUserRouter.delete("/:id", check_uuid, AdminUserController.delete_by_id);

export default adminUserRouter;
