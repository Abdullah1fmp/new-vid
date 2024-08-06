import { UploadedFile } from "express-fileupload";

type fileBody = {
	name: string;
	path: string;
};

export const get_file_services = async ({ id }: { id: string }) => {
	// try {
	// 	const file = await prisma.files.findUnique({
	// 		where: {
	// 			id,
	// 		},
	// 	});
	// 	return file;
	// } catch (err: any) {
	// 	throw new CustomError(err?.message, 500);
	// }
};

export const create_file_services = async (body: fileBody) => {
	// try {
	// 	const file = await prisma.files.create({
	// 		data: {
	// 			...body,
	// 		},
	// 	});
	// 	return file;
	// } catch (err: any) {
	// 	throw new CustomError(err?.message, 500);
	// }
};

/**
 * @description Upload file to S3 bucket using aws-sdk, the configuration is set in aws.s3.config.ts
 * @param file UploadedFile by express-fileupload
 * @returns uploaded file url and details
 */
export const upload_file_to_s3 = async (file: UploadedFile) => {
	// try {
	// 	// Setting up S3 upload parameters
	// 	if (!process.env.AWS_S3_BUCKET_NAME)
	// 		throw new CustomError("AWS_S3_BUCKET_NAME is not defined", 500);
	// 	const params = {
	// 		Bucket: process.env.AWS_S3_BUCKET_NAME,
	// 		Key: file.name + Date.now(), // File name you want to save as in S3
	// 		Body: file.data,
	// 	};
	// 	// Uploading files to the bucket
	// 	const res = s3().upload(params, function (err: Error, data: any) {
	// 		if (err) {
	// 			throw err;
	// 		}
	// 		return data;
	// 	});
	// 	const data = await res.promise();
	// 	return data;
	// } catch (err: any) {
	// 	throw new CustomError(err?.message, 500);
	// }
};
