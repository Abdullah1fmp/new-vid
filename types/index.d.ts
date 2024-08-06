import { categorySchema } from "../schema/category.schema";
import { courseSchema, partialCourseSchema } from "../schema/course.schema";
import { partialUserSchema, userSchema } from "../schema/user.schema";

/**
 * Custom Error Type extends Error Type with status property
 */
export interface CustomErrorType extends Error {
	status?: number;
}
