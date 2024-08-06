import { Router } from "express";
import * as CommonUserController from "../../controller/common/user.common.controller";
import { check_uuid } from "../../middleware/global.middleware";
import { check_auth } from "../../middleware/authorization.middlware";

const commonUserRouter = Router();
commonUserRouter.get(
	"/stat",
	check_auth,
	CommonUserController.get_user_course_stats
);

commonUserRouter.get(
	"/get-by-clerkid/:id",
	CommonUserController.get_by_clerkid
);
commonUserRouter.get(
	"/:id",
	check_uuid,
	check_auth,
	CommonUserController.get_by_id
);
commonUserRouter.post(
	"/create-with-token",
	CommonUserController.create_user_with_token
);
commonUserRouter.patch(
	"/update-profile",
	check_auth,
	CommonUserController.update_profile
);

export default commonUserRouter;
