import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import { generateToken } from "../../lib/token.lib";
import {
	validate_user_body,
	validate_user_update_body,
} from "../../lib/validation.lib";
import * as CommonUserServices from "../../services/common/user.common.services";
import * as CommonCourseServices from "../../services/common/courses.common.services";

export const get_by_clerkid = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const clerk_id = req.params.id as string;

		const user = await CommonUserServices.get_user_by_clerk_id({ clerk_id });

		if (!user) throw new CustomError("User not found.", 404);

		const token = await generateToken({
			id: user.id,
			email: user.email,
			clerk_id: user.clerk_id,
			roles: user.roles,
			first_name: user.first_name,
			last_name: user.last_name,
			group: user.user_group_id,
			group_name: user.user_group?.name,
			phone: user.phone_number,
			status: user.status,
		});

		res.status(200).json({
			message: "User fetched successfully.",
			data: user,
			token,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const get_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id as string;

		// Check if the id is own id
		if (id !== req.app.get("user")?.id) {
			throw new CustomError("Unauthorized", 401);
		}

		const user = await CommonUserServices.get_user_by_id({
			user_id: id,
			includes: {
				user_group: true,
			},
		});

		if (!user) throw new CustomError("User not found.", 404);

		res.status(200).json({
			message: "User fetched successfully.",
			data: user,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const get_user_course_stats = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.app.get("user")?.id as string;

		const enrolled_courses = await CommonCourseServices.get_user_enrollments({
			search_query: {
				user_id: id,
			},
		});

		const completed_courses = enrolled_courses.filter(
			(course) => course.status === "COMPLETED"
		);

		res.status(200).json({
			message: "User fetched successfully.",
			data: {
				total_courses: enrolled_courses.length,
				completed_courses: completed_courses.length,
				pending_courses: enrolled_courses.length - completed_courses.length,
			},
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const create_user_with_token = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body and check if password and confirm password matches
		 */
		const body = validate_user_body(req.body);

		/**
		 * Create the user
		 */
		const user = await CommonUserServices.create_user({
			body,
			includes: { user_group: true },
		});

		const token = await generateToken({
			id: user.id,
			email: user.email,
			clerk_id: user.clerk_id,
			roles: user.roles,
			first_name: user.first_name,
			last_name: user.last_name,
			group: user.user_group_id,
			group_name: user.user_group?.name,
			phone: user.phone_number,
			status: user.status,
		});

		res.status(201).json({
			message: "User created successfully.",
			data: user,
			token,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

export const update_profile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user_id = req.app.get("user")?.id;
		const user_body = validate_user_update_body(req.body);

		// delete the user email
		delete user_body.email;
		delete user_body.clerk_id;

		// update user by id
		const user = await CommonUserServices.update_user_by_id({
			user_id,
			user_body: {
				...user_body,
			},
			includes: {},
		});

		res.status(202).json({
			message: "User updated successfully.",
			data: user,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};
