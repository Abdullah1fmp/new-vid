import { z } from "zod";
import prisma from "../../db/db_client";
import { partialReviewSchema, reviewSchema } from "../../schema/review.schema";

type review_body_type = z.infer<typeof reviewSchema>;
type partial_review_body_type = z.infer<typeof partialReviewSchema>;

export const get_all = async ({ course_id }: { course_id?: string }) => {
	try {
		return await prisma.review.findMany({
			where: {
				course_id,
			},
			include: {
				user: {
					select: {
						id: true,
						first_name: true,
						last_name: true,
						email: true,
					},
				},
			},
			orderBy: {
				created_at: "desc",
			},
		});
	} catch (err) {
		throw err;
	}
};

export const get_by_id = async ({ id }: { id: string }) => {
	try {
		return await prisma.review.findUnique({
			where: {
				id,
			},
		});
	} catch (err) {
		throw err;
	}
};

export const create = async (
	body: review_body_type & {
		user_id: string;
	}
) => {
	try {
		return await prisma.review.create({
			data: {
				course_id: body.course_id,
				user_id: body.user_id,
				rating: body.rating,
				comment: body.comment,
			},
		});
	} catch (err) {
		throw err;
	}
};

export const update = async ({
	id,
	body,
}: {
	id: string;
	body: partial_review_body_type;
}) => {
	try {
		return await prisma.review.update({
			where: {
				id,
			},
			data: {
				...(body.rating && { rating: body.rating }),
				...(body.comment && { comment: body.comment }),
			},
			include: {
				course: {
					select: { id: true },
				},
			},
		});
	} catch (err) {
		throw err;
	}
};

export const delete_by_id = async ({ id }: { id: string }) => {
	try {
		return await prisma.review.delete({
			where: {
				id,
			},
		});
	} catch (err) {
		throw err;
	}
};
