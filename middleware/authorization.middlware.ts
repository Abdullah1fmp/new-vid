import { NextFunction, Request, Response } from "express";
import { CustomError } from "../custom-class/CustomError";
import { decodeToken, verifyToken } from "../lib/token.lib";
import { jsonToObj } from "../lib/utils.lib";

/**
 * @param req Express Request
 * @param _res Express Response
 * @param next Express NextFunction
 * @description Check if the user is authenticated via request headers jwt token. If not, throw an unauthorized error.
 * @returns next function if authenticated
 * @throws CustomError with status 401 if not authenticated
 * @steps
 * 1. Get the token from the request headers
 * 2. If token is not present, throw an unauthorized error
 * 3. Verify the token
 * 4. If not verified, throw an unauthorized error
 * 5. Decode the decodeToken
 * 6. If not decoded, throw an unauthorized error
 * 7. Set the user object in the request headers
 * 8. Call the next function
 */

export const check_auth = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			throw new CustomError("Unauthorized", 401);
		}

		const verified = await verifyToken(token);
		if (!verified) {
			throw new CustomError("Unauthorized", 401);
		}

		const decoded: any = await decodeToken(token);
		if (!decoded) {
			throw new CustomError("Unauthorized", 401);
		}

		/**
		 * @purpose To get the user object as global variable in the request object
		 */
		req.app.set("user", decoded);

		next();
	} catch (err: any) {
		next(err);
	}
};

/**
 * @description Check if the user is admin via req.app.get("user"). If not, throw an unauthorized error.
 * @returns next function if authenticated and set is_admin to true in req.app
 * @throws CustomError with status 401 if not authenticated
 */
export const check_admin = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const roles: string[] = jsonToObj(req.app.get("user")).roles;
		if (!roles?.length || !roles.includes("ADMIN")) {
			throw new CustomError("Unauthorized", 401);
		}

		req.app.set("is_admin", true);
		next();
	} catch (err: any) {
		next(err);
	}
};

/**
 * @description Check if the user is one of teacher via req.app.get("user"). If not, throw an unauthorized error.
 * @returns next function if authenticated and set is_student to true in req.app
 * @throws CustomError with status 401 if not authenticated
 */
export const check_teacher = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const roles: string[] = jsonToObj(req.app.get("user")).roles;

		if (!roles?.length || roles.includes("TEACHER")) {
			throw new CustomError("Unauthorized", 401);
		}

		req.app.set("is_teacher", true);
		next();
	} catch (err: any) {
		next(err);
	}
};
