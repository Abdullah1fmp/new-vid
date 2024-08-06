import {
	chapterSchema,
	courseSchema,
	lessonSchema,
	optionSchema,
	optionsSchema,
	optionsWithQuestionIdSchema,
	partialChapterSchema,
	partialCourseSchema,
	partialLessonSchema,
	partialQuestionSchema,
	questionSchema,
} from "../schema/course.schema";
import { partialReviewSchema, reviewSchema } from "../schema/review.schema";
import {
	adminUserSchema,
	partialAdminUserSchema,
	partialUserSchema,
	userSchema,
} from "../schema/user.schema";
import { PhoneNumberUtil } from "google-libphonenumber";
const phoneUtil = PhoneNumberUtil.getInstance();

export const validate_uuid = (uuid: string) => {
	const uuidRegex =
		/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
	return uuidRegex.test(uuid);
};

export const validate_email = (email: string): boolean => {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(email);
};

export const validate_only_numbers = (value: string): boolean => {
	const re = /^[0-9]*$/;
	return re.test(value);
};

export const validate_mobile = (mobile: string): boolean => {
	try {
		return phoneUtil.isValidNumber(phoneUtil?.parseAndKeepRawInput(mobile));
	} catch (error) {
		return false;
	}
};

export const validate_user_body = (body: any) => {
	return userSchema.parse(body);
};

export const validate_user_update_body = (body: any) => {
	return partialUserSchema.parse(body);
};

export const validate_admin_user_body = (body: any) => {
	return adminUserSchema.parse(body);
};

export const validate_admin_user_update_body = (body: any) => {
	return partialAdminUserSchema.parse(body);
};

export const validate_course_body = (body: any) => {
	return courseSchema.parse(body);
};

export const validate_course_update_body = (body: any) => {
	return partialCourseSchema.parse(body);
};

export const validate_chapter_body = (body: any) => {
	return chapterSchema.parse(body);
};

export const validate_chapter_update_body = (body: any) => {
	return partialChapterSchema.parse(body);
};

export const validate_lesson_body = (body: any) => {
	return lessonSchema.parse(body);
};

export const validate_lesson_update_body = (body: any) => {
	return partialLessonSchema.parse(body);
};

export const validate_question_body = (body: any) => {
	return questionSchema.parse(body);
};

export const validate_question_update_body = (body: any) => {
	return partialQuestionSchema.parse(body);
};

export const validate_option_body = (body: any) => {
	return optionSchema.parse(body);
};

export const validate_options_body = (body: any) => {
	return optionsSchema.parse(body);
};

export const validate_options_with_question_id_body = (body: any) => {
	return optionsWithQuestionIdSchema.parse(body);
};

export const validate_review_body = (body: any) => {
	return reviewSchema.parse(body);
};

export const validate_review_update_body = (body: any) => {
	return partialReviewSchema.parse(body);
};
