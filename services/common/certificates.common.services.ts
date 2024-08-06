import prisma from "../../db/db_client";

export const get_user_certificate = async ({
	enrollment_id,
	user_id,
}: {
	enrollment_id: string;
	user_id: string;
}) => {
	try {
		return await prisma.certificates.findUnique({
			where: {
				user_id_enrollment_id: {
					enrollment_id,
					user_id,
				},
			},
			include: {
				enrollment: {
					select: {
						course: {
							select: {
								title: true,
								id: true,
							},
						},
						user: {
							select: {
								first_name: true,
								last_name: true,
							},
						},
					},
				},
			},
		});
	} catch (err) {
		throw err;
	}
};

export const create_user_certificate = async ({
	enrollment_id,
	user_id,
}: {
	enrollment_id: string;
	user_id: string;
}) => {
	try {
		return await prisma.certificates.create({
			data: {
				enrollment_id,
				user_id,
			},
			include: {
				enrollment: {
					select: {
						course: {
							select: {
								title: true,
								id: true,
							},
						},
						user: {
							select: {
								first_name: true,
								last_name: true,
							},
						},
					},
				},
			},
		});
	} catch (err) {
		throw err;
	}
};
