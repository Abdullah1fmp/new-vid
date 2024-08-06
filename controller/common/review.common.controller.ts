import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import {
	validate_review_body,
	validate_review_update_body,
	validate_uuid,
} from "../../lib/validation.lib";
import * as CommonCourseServices from "../../services/common/courses.common.services";
import * as CommonReviewServices from "../../services/common/review.common.services";
import * as CommonEnrollmentServices from "../../services/common/enrollement.common.services";

export const get_all_review = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");
		const course_id = req.query.course_id as string;

		if (!validate_uuid(course_id)) {
			throw new CustomError("Invalid course id provided", 403);
		}

		const course = await CommonCourseServices.get_all({
			search_query: { id: course_id },
		});

		if (course?.length === 0) throw new CustomError("Course not found", 404);
		if (
			course?.[0]?.access_by_user_group_id &&
			course?.[0]?.access_by_user_group_id !== user?.group
		) {
			throw new CustomError("Invalid course.", 401);
		}

		const data = await CommonReviewServices.get_all({
			course_id: req.query.course_id as string,
		});

		res.status(200).json({
			message: "Reviews fetched successfully.",
			count: data.length,
			data,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const create_review = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");
		const course_id = req.body.course_id as string;

		const body = validate_review_body(req.body);

		if (!validate_uuid(course_id)) {
			throw new CustomError("Invalid course id provided", 403);
		}

		const course = await CommonCourseServices.get_all({
			search_query: { id: course_id },
		});

		if (course?.length === 0) throw new CustomError("Course not found.", 404);

		const my_enrollment = await CommonEnrollmentServices.get_my_enrollment({
			user_id: user?.id,
			course_id,
		});

		if (my_enrollment?.length === 0) {
			throw new CustomError("You need to enroll in the course to review.", 403);
		}

		await CommonReviewServices.create({
			...body,
			user_id: user?.id,
		});

		res.status(201).json({
			message: "Review created successfully.",
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

export const update_review = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");
		const review_id = req.params.id as string;

		const body = validate_review_update_body(req.body);

		const review = await CommonReviewServices.get_by_id({
			id: review_id,
		});

		if (!review) throw new CustomError("Review not found.", 404);

		if (review.user_id !== user?.id) {
			throw new CustomError("You can't update this review.", 403);
		}

		await CommonReviewServices.update({ id: review_id, body });

		res.status(202).json({
			message: "Review updated successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

export const delete_review = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");
		const review_id = req.params.id as string;

		const review = await CommonReviewServices.get_by_id({
			id: review_id,
		});

		if (!review) throw new CustomError("Review not found.", 404);

		if (review.user_id !== user?.id) {
			throw new CustomError("You can't delete this review.", 403);
		}

		await CommonReviewServices.delete_by_id({ id: review_id });

		res.status(202).json({
			message: "Review deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};
