import { Router } from "express";
import * as adminChapterController from "../../controller/admin/chapter.admin.controller";
import { check_uuid } from "../../middleware/global.middleware";

const adminChapterRouter = Router();

adminChapterRouter.get("/:id", check_uuid, adminChapterController.get_chapters);

adminChapterRouter.get(
  "/:course_id/:id",
  check_uuid,
  adminChapterController.get_by_chapter_id
);

adminChapterRouter.patch(
  "/reorder/:id",
  check_uuid,
  adminChapterController.reorder_chapter_by_ids
);

adminChapterRouter.patch(
  "/:id",
  check_uuid,
  adminChapterController.update_chapter_by_id
);

adminChapterRouter.delete(
  "/:id",
  check_uuid,
  adminChapterController.delete_chapter_by_id
);

export default adminChapterRouter;
