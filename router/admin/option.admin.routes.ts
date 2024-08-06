import { Router } from "express";
import * as adminOptionController from "../../controller/admin/option.admin.controller";
import { check_uuid } from "../../middleware/global.middleware";

const adminOptionRouter = Router();

// adminOptionRouter.post("/", adminOptionController.create_option_by_question_id);
adminOptionRouter.patch("/reorder", adminOptionController.reorder_options);
adminOptionRouter.patch(
  "/:id",
  check_uuid,
  adminOptionController.update_option_by_id
);
adminOptionRouter.delete(
  "/:id",
  check_uuid,
  adminOptionController.delete_option_by_id
);

export default adminOptionRouter;
