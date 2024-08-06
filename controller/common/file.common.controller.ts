import { NextFunction, Request, Response } from "express";

export default class CommonFileController {
	/**
	 * @description used to get file by id from s3 bucket
	 * @return file buffer
	 */
	static async get_file_by_id(req: Request, res: Response, next: NextFunction) {
		// try {
		// 	const id = req.params.id as string;
		// 	const file = await get_file_services({ id });
		// 	const getParams = {
		// 		Bucket: process.env.AWS_S3_BUCKET_NAME || "",
		// 		Key: file?.name || "",
		// 	};
		// 	s3().getObject(getParams, function (err: Error, data: any) {
		// 		if (err) {
		// 			res.status(500).json({ error: err?.message });
		// 		} else {
		// 			const file = Buffer.from(data.Body).toString("base64");
		// 			res.status(200).json({ file: file });
		// 		}
		// 	});
		// } catch (err: any) {
		// 	next(err);
		// }
	}
	/**
	 * @description used to upload file, file will be uploaded to s3 bucket
	 * @return new file url
	 */
	static async upload_file(req: Request, res: Response, next: NextFunction) {
		// try {
		// 	const file = req.files?.file as UploadedFile;
		// 	if (!file) {
		// 		throw new CustomError("Please upload a file", 400);
		// 	}
		// 	const file_url = await upload_file_to_s3(file);
		// 	res.status(200).json({
		// 		message: "File uploaded successfully",
		// 		data: file_url,
		// 		status: 200,
		// 	});
		// } catch (err: any) {
		// 	next(err);
		// }
	}

	static async send_mail(req: Request, res: Response, next: NextFunction) {
		// try {
		// 	const get_file = await get_file_services({
		// 		id: "905dd792-1854-4f33-aac3-1bb163b80ca8",
		// 	});
		// 	if (!get_file?.name) {
		// 		throw new CustomError("Couldnot get file", 404);
		// 	}
		// 	const getParams = {
		// 		Bucket: process.env.AWS_S3_BUCKET_NAME || "",
		// 		Key: get_file?.name,
		// 	};
		// 	s3().getObject(getParams, async function (err: Error, data: any) {
		// 		if (err) {
		// 			// throw new CustomError(err?.message, 500);
		// 			res.status(500).json({ error: err?.message });
		// 		} else {
		// 			// create file from buffer
		// 			const file =
		// 				"data:application/pdf;base64," +
		// 				Buffer.from(data.Body).toString("base64");
		// 			// const blob = new Blob([data.Body], { type: "application/pdf" });
		// 			// const file = new File([blob], "file2.pdf", {
		// 			// 	type: "application/pdf",
		// 			// });
		// 			// ** write this file
		// 			// fs.writeFileSync("file.pdf", file);
		// 			console.log(typeof data?.Body);
		// 			const _res = await sendMail(
		// 				["imdariful71@gmail.com"],
		// 				`Application `,
		// 				esignTemplate("APPROVED", "123456", "2021-09-09", "2021-09-09"),
		// 				file,
		// 				get_file.name
		// 			);
		// 			if (!_res) {
		// 				throw new CustomError("Failed to send email", 500);
		// 			}
		// 			res.status(200).json({ message: "send mail" });
		// 		}
		// 	});
		// } catch (err: any) {
		// 	next(err);
		// }
	}
}
