import { Router } from "express";
import { check_uuid } from "../../middleware/global.middleware";
import * as CommonUserGroupController from "../../controller/common/user_group.common.controller";

/**
 * @common_user_group
 * @description Router for file upload and get file by id
 */

const commonUserGroupRouter = Router();
commonUserGroupRouter.get("/", CommonUserGroupController.get_all_user_group);
commonUserGroupRouter.get(
	"/:id",
	check_uuid,
	CommonUserGroupController.get_by_user_group_id
);

export default commonUserGroupRouter;
