import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import { validate_only_numbers, validate_uuid } from "../../lib/validation.lib";
import * as CommonCourseServices from "../../services/common/courses.common.services";
import * as CommonUserServices from "../../services/common/user.common.services";
import * as CommonCertificateServices from "../../services/common/certificates.common.services";
import { generate_certificate } from "../../lib/certificate.lib";
import fs from "fs";

export const get_all_courses = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");

		/**
		 * Get the query params from the request object to filter
		 */
		const {
			title,
			id,
			price_range,
			sort_by,
			sort_type,
			author_name,
			author_id,
			page,
			take,
			difficulity,
			price_type,
			rating_range,
		} = req.query as {
			title: string;
			id: string;
			price_range: string;
			sort_by: "avg_rating" | "price" | "created_at" | "title";
			sort_type: "asc" | "desc";
			author_name: string;
			author_id: string;
			page: string;
			take: string;
			difficulity: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
			price_type: "FREE" | "PAID";
			rating_range: string;
		};

		/**
		 * Validating the query param
		 */
		if (id && !validate_uuid(id as string)) {
			throw new CustomError("Invalid id provided", 403);
		}
		if (
			price_range &&
			(price_range.split("-").length !== 2 ||
				price_range.split("-").some((val) => isNaN(Number(val))))
		) {
			throw new CustomError("Invalid price range provided", 403);
		}
		if (
			sort_by &&
			!["avg_rating", "price", "created_at", "title"].includes(sort_by)
		) {
			throw new CustomError("Invalid sort_by provided", 403);
		}
		if (sort_type && !["asc", "desc"].includes(sort_type)) {
			throw new CustomError("Invalid sort_type provided", 403);
		}
		if (page && !validate_only_numbers(page) && Number(page) < 1) {
			throw new CustomError("Invalid page number provided", 403);
		}
		if (take && !validate_only_numbers(take) && Number(take) < 1) {
			throw new CustomError("Take number must be greater than 0", 403);
		}
		if (
			difficulity &&
			!["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(difficulity)
		) {
			throw new CustomError("Invalid difficulity level provided", 403);
		}
		if (price_type && !["FREE", "PAID"].includes(price_type)) {
			throw new CustomError("Invalid price type provided", 403);
		}
		if (
			rating_range &&
			(rating_range.split("-").length !== 2 ||
				rating_range.split("-").some((val) => isNaN(Number(val))))
		) {
			throw new CustomError("Invalid rating range provided", 403);
		}

		/**
		 * Create the search query object based on the query params
		 */
		const search_query = {
			...(id && { id }),
			...(title && { title }),
			...(price_range && {
				price_range: price_range.split("-").map((val) => Number(val)),
			}),
			...(sort_by && { sort_by }),
			...(sort_type && { sort_type }),
			...(author_name && { author_name }),
			...(author_id && { author_id }),
			...(difficulity && { difficulity }),
			...(price_type && { price_type }),
			...(rating_range && {
				rating_range: rating_range.split("-").map((val) => Number(val)),
			}),
		};

		const data = await CommonCourseServices.get_all({
			search_query,
			page: {
				skip: (Number(page) - 1) * (Number(take) || 10) || 0,
				take: Number(take) || 10,
			},
		});

		const result = data.filter((course) => {
			if (course.access_by_user_group_id) {
				// for specific group

				// no group, no private access
				if (!user?.group) return false;

				// if user group is same as course group
				if (course.access_by_user_group_id === user?.group) return true;
				else return false;
				// for anyone
			} else return true;
		});

		const cleaned_result = result.map((course) => {
			const total_chapters = course.chapters?.length;
			const total_lessons = course.chapters?.reduce(
				(acc, curr) => acc + curr.lessons.length,
				0
			);
			const total_reviews = course.reviews?.length;
			const total_students = course.enrollments?.length;
			const categories = course.course_to_category?.map((cat) => cat.category);
			const { chapters, reviews, course_to_category, enrollments, ...rest } =
				course;

			return {
				...rest,
				categories,
				total_chapters,
				total_lessons,
				total_reviews,
				total_students,
			};
		});

		res.status(200).json({
			message: "Courses fetched successfully.",
			count: result.length,
			data: cleaned_result,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const get_top_courses = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/**
		 * Get the query params from the request object to filter
		 */
		const num = req.query?.num as string;
		const user = await CommonUserServices.get_user_by_id({
			user_id: req.app.get("user")?.id,
		});
		const preferences = user?.preferences;

		/**
		 * Validating the query param
		 */
		if (num && !validate_only_numbers(num)) {
			throw new CustomError("Invalid number provided", 403);
		}

		const num_default = 4;

		const data = await CommonCourseServices.get_tops();

		const top_courses = [];
		const rest_courses = [];
		let cnt = 0;
		for (let i = 0; i < data.length; i++) {
			const categories = data[i].course_to_category?.map(
				(cat) => cat.category_id
			);

			let flag = false;
			for (let j = 0; j < categories.length; j++) {
				if (preferences?.includes(categories[j])) {
					top_courses.push({
						...data[i],
						categories,
					});

					cnt++;
					flag = true;
					break;
				}
			}

			if (!flag) {
				rest_courses.push({
					...data[i],
					categories,
				});
			}

			if (cnt === Number(num || num_default)) break;
		}

		const result =
			top_courses.length >= Number(num || num_default)
				? top_courses
				: [...top_courses, ...rest_courses].slice(0, Number(num));

		// filter result by user group id
		const filtered_result = result.filter((course) => {
			if (course.access_by_user_group_id) {
				// for specific group

				// no group, no private access
				if (!user?.user_group_id) return false;

				// if user group is same as course group
				if (course.access_by_user_group_id === user?.user_group_id) return true;
				else return false;
				// for anyone
			} else return true;
		});

		res.status(200).json({
			message: "Courses fetched successfully.",
			data: filtered_result.map((course) => {
				const total_chapters = course.chapters?.length;
				const total_students = course.enrollments?.length;
				const { chapters, enrollments, ...rest } = course;
				return {
					...rest,
					total_chapters,
					total_students,
				};
			}),
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const get_by_course_id = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id as string;
		const data = await CommonCourseServices.get_by_course_id_with_enrollments({
			course_id: id,
			user_id: req.app.get("user")?.id,
		});

		if (!data) throw new CustomError("Course not found.", 404);

		// ** Check if the course is private and user is not in the group
		if (data.access_by_user_group_id) {
			const user = req.app.get("user");
			if (!user?.group || user?.group !== data.access_by_user_group_id) {
				throw new CustomError("Course not found.", 404);
			}
		}

		const total_reviews = data.reviews?.length;
		const reviews = data.reviews?.slice(0, 2);
		const total_enrollments = data.enrollments?.length;
		const my_enrollment = data.enrollments?.find(
			(enrollment) => enrollment.user_id === req.app.get("user")?.id
		);
		const categories = data.course_to_category?.map((cat) => cat.category);
		const { reviews: _, course_to_category, enrollments, ...rest } = data;

		const result = {
			...rest,
			categories,
			total_reviews,
			reviews,
			total_enrollments,
			my_enrollment,
		};

		res.status(200).json({
			message: "Course fetched successfully.",
			data: result,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const get_my_enrolled_courses = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user_id = req.app.get("user")?.id;

		const enrollments = await CommonCourseServices.get_user_enrollments({
			search_query: {
				user_id,
			},
		});

		res.status(200).json({
			message: "My courses fetched successfully.",
			data: enrollments.map((enrollment) => {
				const total_chapters = enrollment.course.chapters?.length;
				const total_lessons = enrollment.course.chapters?.reduce(
					(acc, curr) => acc + curr.lessons.length,
					0
				);
				const completed_lessons = enrollment.course.chapters?.reduce(
					(acc, curr) =>
						acc +
						curr.lessons.reduce((acc, curr) => acc + curr.progress.length, 0),
					0
				);

				const { chapters, ...rest } = enrollment.course;
				const { course, ...rest_enrollment } = enrollment;
				return {
					...rest_enrollment,
					course: {
						...rest,
						progress_percentage: rest_enrollment.progress_percentage,
						status: rest_enrollment.status,
						total_chapters,
						total_lessons,
						completed_lessons,
					},
				};
			}),
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const join_course = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");
		const course_id = req.body.course_id as string;

		if (!validate_uuid(course_id)) {
			throw new CustomError("Invalid course id provided", 403);
		}

		const course = await CommonCourseServices.get_all({
			search_query: { id: course_id },
		});

		if (course?.length === 0) throw new CustomError("Course not found.", 404);

		// Check if the course is private and user is not in the group
		if (course?.[0].access_by_user_group_id) {
			if (!user?.group || user?.group !== course?.[0].access_by_user_group_id) {
				throw new CustomError("Course is not available for you.", 401);
			}
		}

		const user_course = await CommonCourseServices.get_user_enrollments({
			search_query: {
				user_id: user?.id,
				course_id,
			},
		});

		if (user_course?.length > 0) {
			throw new CustomError("User already joined the course", 403);
		}

		await CommonCourseServices.join_course({
			user_id: user?.id,
			course_id,
		});

		res.status(200).json({
			message: "User joined the course successfully.",
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const continue_course = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");
		const course_id = req.body.course_id as string;

		if (!validate_uuid(course_id)) {
			throw new CustomError("Invalid course id provided", 403);
		}

		const enrollment = await CommonCourseServices.get_user_enrollments({
			search_query: { course_id: course_id, user_id: user?.id },
		});

		if (enrollment?.length === 0)
			throw new CustomError("Course not found or you are not enrolled", 404);

		const course = await CommonCourseServices.get_by_course_id_with_enrollments(
			{
				course_id: course_id,
				user_id: user?.id,
			}
		);
		if (!course) {
			throw new CustomError("Course not found.", 404);
		}

		// Get all the progress of the user in the course
		let upcoming_lesson = "";
		let first_lession = "";
		for (let i = 0; i < course.chapters.length; i++) {
			const chapter = course.chapters[i];

			for (let j = 0; j < chapter.lessons.length; j++) {
				const lesson = chapter.lessons[j];
				if (!first_lession) first_lession = lesson.id;

				if (lesson.progress.length === 0) {
					upcoming_lesson = lesson.id;
					break;
				}
			}
			if (upcoming_lesson) break;
		}

		if (!upcoming_lesson) {
			// then the first lesson will be the upcoming lesson
			upcoming_lesson = first_lession;
		}

		res.status(200).json({
			message: "Upcoming lesson fetched successfully.",
			data: upcoming_lesson,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export const download_certificate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.app.get("user");
		const course_id = req.body.course_id as string;

		if (!validate_uuid(course_id)) {
			throw new CustomError("Invalid course id provided", 403);
		}

		const enrollment = await CommonCourseServices.get_user_enrollments({
			search_query: { course_id: course_id, user_id: user?.id },
		});

		if (enrollment?.length === 0)
			throw new CustomError("You are not enrolled or course not found", 404);

		if (enrollment[0].progress_percentage < 100) {
			throw new CustomError("You have not completed the course yet.", 403);
		}

		const enrollment_id = enrollment[0].id;

		let certificate = await CommonCertificateServices.get_user_certificate({
			enrollment_id,
			user_id: user?.id,
		});

		if (!certificate) {
			// Create a new certificate
			certificate = await CommonCertificateServices.create_user_certificate({
				enrollment_id,
				user_id: user?.id,
			});

			if (!certificate) {
				throw new CustomError(
					"Failed to create certificate, please try again.",
					500
				);
			}
		}

		// Generate the certificate and send it as a response
		const generate_file_path = await generate_certificate({
			course_title: certificate.enrollment.course.title,
			issue_date: certificate.issued_at.toISOString(),
			issued_by: "Vidhyala",
			student_name:
				certificate.enrollment.user.first_name +
				" " +
				certificate.enrollment.user.last_name,
			document_id: certificate.enrollment_id,
		});

		res.status(200).sendFile(generate_file_path, (err) => {
			if (err) {
				throw new CustomError("Failed to download certificate", 500);
			} else {
				// Delete the file after download
				fs.unlink(generate_file_path, (unlinkErr) => {
					if (unlinkErr) {
						console.error(`Failed to delete file: ${unlinkErr.message}`);
					}
				});
			}
		});
	} catch (err: any) {
		next(err);
	}
};
