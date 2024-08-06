import { Router } from "express";
import * as teacherChapterController from "../../controller/teacher/chapter.teacher.controller";
import { check_uuid } from "../../middleware/global.middleware";

/**
 * @teacher_chapter_router
 * @description Router for create chapter, and get all chapter by teacher courses
 * @routes_prefix /api/v1/teacher/chapter
 */

const teacherChapterRouter = Router();

// This is course id, not chapter id
// to get all chapters of a course by
teacherChapterRouter.get(
	"/:id",
	check_uuid,
	teacherChapterController.get_chapters
);

// course id and id: chapter id
teacherChapterRouter.get(
	"/:course_id/:id",
	check_uuid,
	teacherChapterController.get_by_chapter_id
);

teacherChapterRouter.post(
	// This is course_id (named as id for the uuid middleware validation)
	"/:id",
	check_uuid,
	teacherChapterController.create_chapter
);

teacherChapterRouter.patch(
	// This is course_id (named as id for the uuid middleware validation)
	"/reorder/:id",
	check_uuid,
	teacherChapterController.reorder_chapter_by_ids
);

// teacherChapterRouter.patch(
// 	// This is course_id (named as id for the uuid middleware validation)
// 	"/swap/:id",
// 	check_uuid,
// 	teacherChapterController.swap_chapters
// );

teacherChapterRouter.patch(
	// This is chapter_id (named as id for the uuid middleware validation)
	"/:id",
	check_uuid,
	teacherChapterController.update_chapter_by_id
);

teacherChapterRouter.delete(
	// This is chapter_id (named as id for the uuid middleware validation)
	"/:id",
	check_uuid,
	teacherChapterController.delete_chapter_by_id
);

export default teacherChapterRouter;
