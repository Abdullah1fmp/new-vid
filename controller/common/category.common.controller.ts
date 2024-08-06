import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import { validate_uuid } from "../../lib/validation.lib";
import * as CommonCatServices from "../../services/common/category.common.services";

export const get_all_category = async (
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

		const data = await CommonCatServices.get_all();

		res.status(200).json({
			message: "Categories fetched successfully.",
			count: data.length,
			data,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const get_by_category_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id as string;
		const data = await CommonCatServices.get_all({ id });

		if (data?.length === 0) throw new CustomError("Category not found.", 404);

		res.status(200).json({
			message: "Category fetched successfully.",
			data: data?.[0],
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};
