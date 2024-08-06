import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import { validate_uuid } from "../../lib/validation.lib";
import * as CommonUserGroupServices from "../../services/common/user_group.common.services";

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

		const data = await CommonUserGroupServices.get_all(search_query);

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

export const get_by_user_group_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id as string;
		const data = await CommonUserGroupServices.get_all({ id });

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
