import { z } from "zod";

export const courseSchema = z.object({
	title: z
		.string()
		.min(10, "You have to use at least 10 characters for the title"),
	thumbnail: z.string(),
	description: z.string().min(100, "Min 100 characters required"),
	intro_video: z.string().optional(),
	access_by_user_group_id: z.string().uuid().optional(),
	price: z.number().min(0).max(10000).optional(),
	difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
	categoryIds: z.array(z.string().uuid()).min(1),
	status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export const partialCourseSchema = courseSchema.partial();

export const chapterSchema = z.object({
	title: z
		.string()
		.min(10, "You have to use at least 10 characters for the title"),
	position: z.number().int().positive().min(1),
	description: z.string().min(100, "Min 100 characters required"),
	is_free: z.boolean().optional(),
	status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export const partialChapterSchema = chapterSchema.partial();

export const lessonSchema = z.object({
	title: z
		.string()
		.min(10, "You have to use at least 10 characters for the title"),
	position: z.number().int().positive().min(1),
	type: z.enum(["VIDEO", "QUIZ", "DOCUMENT"]),
	video_url: z.string().optional(),
	document_url: z.string().optional(),
	is_downloadable: z.boolean().optional().default(false),
	status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export const partialLessonSchema = lessonSchema.partial();

export const optionSchema = z.object({
	text: z.string(),
	is_correct: z.boolean(),
	position: z.number().int().positive().min(1),
});

export const optionsSchema = z.array(optionSchema);

export const optionsWithQuestionIdSchema = z.object({
	question_id: z.string().uuid(),
	options: optionsSchema.min(1, "At least 1 option is required"),
});

export const questionSchema = z.object({
	text: z.string(),
	position: z.number().int().positive().min(1),
	quiz_id: z.string().uuid(),
	answer_type: z.enum(["SINGLE", "MULTIPLE"]),
	options: optionsSchema.min(2, "At least 2 options are required").optional(),
});

export const partialQuestionSchema = questionSchema.partial();
