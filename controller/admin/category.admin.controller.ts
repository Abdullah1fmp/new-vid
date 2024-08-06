import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import { validate_uuid } from "../../lib/validation.lib";
import * as CatServices from "../../services/admin/category.admin.services";

/**
 * @Get_all_category Controller
 * @param req.query { name: string, id: string }
 * return { message: string, count: number, data: object[] }
 * @description Get all category based on the query params
 */
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

		/**
		 * Create the search query object based on the query params
		 */
		const search_query = {
			...(name && { name }),
			...(id && { id }),
		};

		const data = await CatServices.get_all(search_query);

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

/**
 * @get_category_by_id Controller
 * return { message: string, data: category, status: number }
 * @description Get the category by id
 */
export const get_by_category_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id as string;
		const data = await CatServices.get_all({ id });

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

/**
 * @create_category Controller
 * return { message: string, data: object[], status: number }
 * @description Create a new category from request body object.
 */
export const create_category = async (
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
		 * Create the category
		 */
		const data = await CatServices.create({
			body: { name },
		});

		res.status(201).json({
			message: "Category created successfully.",
			data,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @update_category_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description Update the category by id from request body object.
 */
export const update_category_by_id = async (
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
		if (!name) throw new CustomError("Category name is required", 400);
		if (!id) throw new CustomError("Category id is required", 400);

		/**
		 * Update the category
		 */
		const data = await CatServices.update_by_id({
			id: id,
			body: { name },
		});

		res.status(201).json({
			message: "Category updated successfully.",
			data,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

/**
 * @delete_category_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description delete the category by id from request body object.
 */
export const delete_category_by_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Validate the req body
		 */
		const id = req.params.id;
		if (!id) throw new CustomError("Category id is required", 400);

		/**
		 * Delete the category
		 */
		await CatServices.delete_by_id({
			id,
		});

		res.status(202).json({
			message: "Category deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};
