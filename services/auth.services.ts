import { CustomError } from "../custom-class/CustomError";
import axios from "axios";

type ReqBody = {
	username: string;
	password: string;
};

export class AuthServices {
	static async sustLogin(body: ReqBody) {
		try {
			const formData = new FormData();

			formData.append("username", body.username);
			formData.append("password", body.password);

			const res = await axios.post(
				process.env.SUST_AUTH_API_BASE_URL + "/auth",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
					},
				}
			);

			if (res.data?.status !== 200) {
				throw new CustomError(res?.data?.result, res?.data?.status);
			}

			return res?.data?.data;
		} catch (err: any) {
			if (err instanceof CustomError) {
				throw err;
			} else {
				throw new CustomError(err?.message, err?.status);
			}
		}
	}
}
