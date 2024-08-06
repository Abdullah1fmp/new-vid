import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import { validate_admin_user_update_body } from "../../lib/validation.lib";
import * as AdminUserServices from "../../services/admin/user.admin.services";

/**
 * @Get_all_users Controller
 * @param req.query { email: string, in_roles: string[], out_roles: string[], name: string, id: string }
 * return { message: string, count: number, data: object[] }
 * @description Get all users based on the query params
 */
export const get_all_users = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Get the query params from the request object
		 */
		const email = req.query.email as string;
		const name = req.query.name as string;
		const id = req.query.id as string;
		const clerk_id = req.query.clerk_id as string;
		const dob = req.query.dob as string;
		const phone_number = req.query.phone_number as string;
		const roles = req.query.roles as string;
		const user_group = req.query.user_group as string;
		const user_group_id = req.query.user_group_id as string;
		const _gender = req.query.gender as string;
		const _status = req.query.status as string;
		const city = req.query.city as string;
		const state = req.query.state as string;
		const country = req.query.country as string;
		const preferences = req.query.preferences as string[];

		/**
		 * Validating the roles query param
		 */
		if (
			roles?.split(",")?.length > 0 &&
			!roles
				?.split(",")
				.every((role) => ["ADMIN", "TEACHER", "USER"].includes(role))
		) {
			throw new CustomError("Invalid roles provided.", 403);
		}

		if (_gender && !["MALE", "FEMALE", "OTHERS"].includes(_gender)) {
			throw new CustomError("Invalid gender provider", 403);
		}

		if (_status && !["ACTIVE", "INACTIVE"].includes(_status)) {
			throw new CustomError("Invalid status provided", 403);
		}

		const roles_arr = roles?.split(",") as ("ADMIN" | "TEACHER" | "USER")[];
		const gender = _gender as "MALE" | "FEMALE" | "OTHERS";
		const status = _status as "ACTIVE" | "INACTIVE";

		/**
		 * Create the search query object based on the query params
		 */
		const search_query = {
			...(email && { email }),
			...(name && { name }),
			...(id && { id }),
			...(clerk_id && { clerk_id }),
			...(dob && { dob }),
			...(city && { city }),
			...(state && { state }),
			...(country && { country }),
			...(phone_number && { phone_number }),
			...(roles_arr && { roles: roles_arr }),
			...(user_group && { user_group }),
			...(user_group_id && {
				user_group_id,
			}),
			...(gender && {
				gender,
			}),
			...(status && { status }),
			...(preferences && { preferences }),
		};

		const users = await AdminUserServices.get_all({
			search_query,
			includes: {
				user_group: true,
			},
		});

		res.status(200).json({
			message: "Users fetched successfully.",
			count: users.length,
			data: users,
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
		const user = await AdminUserServices.get_user_by_id({
			user_id: req.params?.id as string,
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

export const update_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user_id = req.params.id as string;

		const user_body = validate_admin_user_update_body(req.body);

		// update user by id
		const user = await AdminUserServices.update_user_by_id({
			user_id,
			user_body,
			includes: { user_group: true },
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

export const delete_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user_id = req.params.id as string;

		// delete user by id
		await AdminUserServices.delete_by_id({
			user_id,
		});

		res.status(202).json({
			message: "User deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};
