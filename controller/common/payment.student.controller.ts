import { NextFunction, Request, Response } from "express";
import PaymentService from "../../services/payment.services";
import { CustomError } from "../../custom-class/CustomError";

export default class StudentPaymentController {
	/**
	 * @get_payment_by_id controller
	 * @description Check a payment by id weather it is successful or not
	 * 1. Check the payment id is in a application or not (paymentId is unique)
	 * 2. Check the payment status from sust e-payment system
	 * 3. Update the application status to paid if the payment is successful
	 */
	static async get_payment_by_id(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		// try {
		// 	/**
		// 	 * @description Validate application body and throw error if not valid
		// 	 */
		// 	const paymentID = req.params.id;
		// 	if (!paymentID) {
		// 		throw new CustomError("Payment ID is invalid", 403);
		// 	}
		// 	/**
		// 	 * Get the application by payment id
		// 	 */
		// 	const application =
		// 		await ApplicationServices.get_application_by_payment_id(paymentID);
		// 	if (!application?.id) {
		// 		throw new CustomError("Payment ID is not found", 404);
		// 	}
		// 	/**
		// 	 * Get the payment status from sust e-payment system
		// 	 */
		// 	const payment_status =
		// 		await PaymentService.check_payment_by_payment_id_with_sust_epayment(
		// 			paymentID
		// 		);
		// 	/**
		// 	 * Update application status if already not updated to db
		// 	 * 1. If the payment is successful, and the status is already not paid then update the application status to paid
		// 	 */
		// 	if (Number(payment_status?.status) === 200) {
		// 		/**
		// 		 * If the application status is not paid then update the application status to paid
		// 		 */
		// 		if (application?.paymentStatus !== "PAID") {
		// 			/**
		// 			 * Update the application status to paid if the status is not already paid
		// 			 */
		// 			const update_application =
		// 				await ApplicationServices.update_application_by_student(
		// 					application?.id,
		// 					{
		// 						paymentStatus: "PAID",
		// 						status: "PENDING",
		// 					}
		// 				);
		// 			if (!update_application?.id) {
		// 				throw new CustomError(
		// 					"Payment status couldn't update. Please try again",
		// 					500
		// 				);
		// 			}
		// 			/**
		// 			 * On successful status update, send the response
		// 			 */
		// 			res.status(200).json({
		// 				message: "Payment successful",
		// 				data: {
		// 					...payment_status,
		// 					applicationId: application?.id,
		// 					reg: application?.sRegistrationNo,
		// 				},
		// 				status: 200,
		// 			});
		// 			/**
		// 			 * If the application status is already paid then send the response
		// 			 */
		// 		} else {
		// 			/**
		// 			 * If payment status is already paid then send the response
		// 			 */
		// 			res.status(200).json({
		// 				message: "Payment successful",
		// 				data: {
		// 					...payment_status,
		// 					applicationId: application?.id,
		// 					reg: application?.sRegistrationNo,
		// 				},
		// 				status: 200,
		// 			});
		// 		}
		// 		/**
		// 		 * If the payment id is not found in sust e-payment system then update the application status to unpaid if the status is already not unpaid, and send the response
		// 		 */
		// 	} else {
		// 		/**
		// 		 * If the status is not paid then send the response
		// 		 */
		// 		if (application?.paymentStatus === "UNPAID") {
		// 			res.status(Number(payment_status?.status)).json({
		// 				error: payment_status?.message_description,
		// 				data: {
		// 					applicationId: application?.id,
		// 					paymentId: paymentID,
		// 				},
		// 				status: payment_status?.status,
		// 			});
		// 			/**
		// 			 * If the status is not unpaid then change the payment status and send the response
		// 			 */
		// 		} else {
		// 			const update_application =
		// 				await ApplicationServices.update_application_by_student(
		// 					application?.id,
		// 					{
		// 						paymentStatus: "UNPAID",
		// 						...(application.status === "PENDING"
		// 							? { status: "DRAFT" }
		// 							: {}),
		// 					}
		// 				);
		// 			if (!update_application?.id) {
		// 				throw new CustomError(
		// 					"Payment status couldn't update. Please try again",
		// 					500
		// 				);
		// 			}
		// 			res.status(Number(payment_status?.status)).json({
		// 				message: payment_status?.message_description,
		// 				data: {
		// 					applicationId: application?.id,
		// 					paymentId: paymentID,
		// 				},
		// 				status: payment_status?.status,
		// 			});
		// 		}
		// 	}
		// } catch (err: any) {
		// 	next(err);
		// }
	}

	/**
	 * @create_payment controller
	 * @description Create new payment instance using sust e-payment system.
	 * @access Protected (only for students and admins)
	 */
	static async create_payment(req: Request, res: Response, next: NextFunction) {
		// try {
		// 	/**
		// 	 * @description Validate application body and throw error if not valid
		// 	 */
		// 	const req_body = validate_payment_body({
		// 		...req.body,
		// 	});
		// 	const initiate_payment =
		// 		await PaymentService.initate_payment_with_sust_epayment({
		// 			data: {
		// 				reg: req_body.reg,
		// 				name: req_body.name,
		// 				email: req_body.email,
		// 				mobile: req_body.mobile,
		// 				amount: req_body.amount,
		// 			},
		// 		});
		// 	if (initiate_payment.data?.status !== "200") {
		// 		throw new Error("Payment initiation failed");
		// 	}
		// 	const update_application =
		// 		await ApplicationServices.update_application_by_student(
		// 			req_body?.applicationId,
		// 			{
		// 				paymentId: initiate_payment.data?.paymentID,
		// 			}
		// 		);
		// 	if (!update_application?.id) {
		// 		throw new Error("Payment initiation failed. Please try again");
		// 	}
		// 	res.status(201).json({
		// 		message: "Payment initiated successfully",
		// 		data: initiate_payment?.data,
		// 		status: 201,
		// 	});
		// } catch (err: any) {
		// 	next(err);
		// }
	}

	/**
	 * @confirm_payment controller
	 * @description Use after the payment is successful from sust e-payment system.
	 * Update the application payment status to paid and make the application status to pending
	 * @access Protected
	 */
	static async confirm_payment(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		// try {
		// 	/**
		// 	 * @description Validate application body and throw error if not valid
		// 	 */
		// 	const paymentID = req.body.paymentID;
		// 	if (!paymentID) {
		// 		throw new CustomError("Payment ID is invalid", 403);
		// 	}
		// 	const paymentStatus: "PAID" | "UNPAID" = req.body.status;
		// 	if (
		// 		!paymentStatus ||
		// 		(paymentStatus !== "PAID" && paymentStatus !== "UNPAID")
		// 	) {
		// 		throw new CustomError("Payment status is invalid", 403);
		// 	}
		// 	const application =
		// 		await ApplicationServices.get_application_by_payment_id(paymentID);
		// 	/**
		// 	 * IF application is not found with the payment id then throw error
		// 	 */
		// 	if (!application?.id) {
		// 		throw new CustomError(
		// 			"Payment ID could not found in any application",
		// 			404
		// 		);
		// 	}
		// 	const update_application =
		// 		await ApplicationServices.update_application_by_student(
		// 			application.id,
		// 			{
		// 				paymentStatus,
		// 				...(paymentStatus === "PAID" ? { status: "PENDING" } : {}),
		// 			}
		// 		);
		// 	if (!update_application?.id) {
		// 		throw new CustomError(
		// 			"Application Payment status couldn't update. Please try again",
		// 			500
		// 		);
		// 	}
		// 	res.status(202).json({
		// 		message: "Payment updated successfully",
		// 		data: {
		// 			paymentId: paymentID,
		// 			paymentStatus,
		// 		},
		// 		status: 202,
		// 	});
		// } catch (err: any) {
		// 	next(err);
		// }
	}
}
