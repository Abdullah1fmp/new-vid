import { Router } from "express";
import fileUpload from "express-fileupload";
import CommonFileController from "../../controller/common/file.common.controller";
import { check_uuid } from "../../middleware/global.middleware";

/**
 * @common_file_router
 * @description Router for file upload and get file by id
 */

const commonFileRouter = Router();
// commonFileRouter.get(
// 	"/:id",
// 	check_uuid,
// 	check_auth,
// 	CommonFileController.get_file_by_id
// );
// commonFileRouter.post(
// 	"/",
// 	fileUpload({
// 		limits: { fileSize: 50 * 1024 * 1024 },
// 	}),
// 	check_auth,
// 	CommonFileController.upload_file
// );

export default commonFileRouter;
