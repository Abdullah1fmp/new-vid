import { NextFunction, Request, Response } from "express";
import { validate_uuid } from "../lib/validation.lib";
import { CustomError } from "../custom-class/CustomError";

/**
 * @description Check if the req.params.id is a valid uuid or not
 * @returns next function if id is valid
 * @throws CustomError with status 400 if id is invalid
 */
export const check_uuid = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const params = req.params;

		if (params?.id && !validate_uuid(params.id)) {
			throw new CustomError("Invalid id", 400);
		}

		next();
	} catch (err: any) {
		next(err);
	}
};
