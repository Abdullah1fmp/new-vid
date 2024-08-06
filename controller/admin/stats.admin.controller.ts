import { NextFunction, Request, Response } from "express";
import * as AdminStatServices from "../../services/admin/stats.admin.services";

/**
 * @Get_all_stats Controller
 * return { message: string, data: object[] }
 * @description Get all stats
 */
export const get_all_stats = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await AdminStatServices.get_all_stats();

		res.status(200).json({
			message: "Stat fetched successfully.",
			data,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};
