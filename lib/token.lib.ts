import jwt, { TokenExpiredError } from "jsonwebtoken";
import { CustomError } from "../custom-class/CustomError";

// generate jwt token
export const generateToken = async (user: any) => {
	if (process.env.JWT_SECRET)
		return jwt.sign(user, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
	else throw new CustomError("Couldn't create token", 500);
};

// verify jwt token
export const verifyToken = async (token: string) => {
	try {
		if (process.env.JWT_SECRET)
			return jwt.verify(token, process.env.JWT_SECRET);
		else throw new CustomError("Couldn't verify token", 500);
	} catch (err: any) {
		// ** if token is expired
		if (err instanceof TokenExpiredError) {
			throw new CustomError("Token expired", 401);
		} else {
			throw err;
		}
	}
};

// decode jwt token
export const decodeToken = async (token: string) => {
	return jwt.decode(token);
};
