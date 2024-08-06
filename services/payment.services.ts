import axios from "axios";

export default class PaymentService {
	/**
	 * @initate_payment_with_sust_epayment service
	 * @param data object
	 * @description Get all user sessions
	 * return app user sessions
	 */
	static async initate_payment_with_sust_epayment({
		data,
	}: {
		data: {
			reg: string;
			name: string;
			email: string;
			mobile: string;
			amount: string;
		};
	}) {
		try {
			const formData = new FormData();
			formData.append("feeType", "14");
			formData.append("reg", data.reg);
			formData.append("name", data.name);
			formData.append("email", data.email);
			formData.append("mobile", data.mobile);
			formData.append("amount", data.amount);

			const res = await axios.post(
				process.env.SUST_E_PAYMENT_URL + "/payment/create",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			return res;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * @check_payment_by_payment_id_with_sust_epayment service
	 * @param paymentId
	 * @description Get all user sessions
	 * return app user sessions
	 */
	static async check_payment_by_payment_id_with_sust_epayment(
		paymentId: string
	) {
		try {
			const res = await axios.get(
				process.env.SUST_E_PAYMENT_URL + "/payment/status/" + paymentId
			);

			return res.data;
		} catch (err) {
			throw err;
		}
	}
}
