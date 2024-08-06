import { Router } from "express";
import * as AdminStatController from "../../controller/admin/stats.admin.controller";

/**
 * Admin stat Router
 * @description All the stats related routes for admin and officials will be prefixed with /admin/stats.
 * @admin_protected admin protected route checked by check_admin
 * @uuid_protected uuid protected route checked by check_uuid
 */

const adminStatRouter = Router();

adminStatRouter.get("/", AdminStatController.get_all_stats);

export default adminStatRouter;
