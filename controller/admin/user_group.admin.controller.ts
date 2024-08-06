import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import { validate_uuid } from "../../lib/validation.lib";
import * as UserGroupServices from "../../services/user_group.services";

/**
 * @Get_all_user_group Controller
 * @param req.query { name: string, id: string }
 * return { message: string, count: number, data: object[] }
 * @description Get all user_group based on the query params
 */
export const get_all_user_group = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Get the query params from the request object
		 */
		const { name, id } = req.query as {
			name: string;
			id: string;
		};

		/**
		 * Validating the roles query param
		 */
		if (id && !validate_uuid(id as string)) {
			throw new CustomError("Invalid id provided", 403);
		}

		/**
		 * Create the search query object based on the query params
		 */
		const search_query = {
			...(name && { name }),
			...(id && { id }),
		};

		const data = await UserGroupServices.get_all(search_query);

		res.status(200).json({
			message: "User Group fetched successfully.",
			count: data.length,
			data,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @get_user_group_by_id Controller
 * return { message: string, data: user_group, status: number }
 * @description Get the user_group by id
 */
export const get_by_user_group_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id as string;
		const data = await UserGroupServices.get_all({ id });

		if (data?.length === 0) throw new CustomError("User group not found.", 404);

		res.status(200).json({
			message: "User group fetched successfully.",
			data: data?.[0],
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @create_user_group Controller
 * return { message: string, data: object[], status: number }
 * @description Create a new user_group from request body object.
 */
export const create_user_group = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const name: string = req.body?.name;
		if (!name) throw new CustomError("Name is required", 400);

		/**
		 * Create the user_group
		 */
		const data = await UserGroupServices.create({
			body: { name },
		});

		res.status(201).json({
			message: "User group created successfully.",
			data,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @update_user_group_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description Update the user_group by id from request body object.
 */
export const update_user_group_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const name = req.body?.name;
		const id = req.params.id;
		if (!name) throw new CustomError("User group name is required", 400);
		if (!id) throw new CustomError("User group id is required", 400);

		/**
		 * Update the User group
		 */
		const data = await UserGroupServices.update_by_id({
			id: id,
			body: { name },
		});

		res.status(201).json({
			message: "User group updated successfully.",
			data,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @delete_user_group_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description delete the user_group by id from request body object.
 */
export const delete_user_group_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const id = req.params.id;
		if (!id) throw new CustomError("User group id is required", 400);

		/**
		 * Delete the user_group
		 */
		await UserGroupServices.delete_by_id({
			id,
		});

		res.status(202).json({
			message: "User group deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};
