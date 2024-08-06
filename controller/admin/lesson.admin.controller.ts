import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import {
  validate_lesson_body,
  validate_lesson_update_body,
  validate_uuid,
} from "../../lib/validation.lib";
import * as TeacherChapterServices from "../../services/teacher/chapter.teacher.services";
import * as TeacherLessonServices from "../../services/teacher/lesson.teacher.services";

/**
 * @Get_chapters Controller
 * @param req.params.id - course_id
 * return { message: string, count: number, data: object[] }
 * @description Get all lessons based on the query params
 */
export const get_lessons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chapter_id = req.params.id;

    const data = await TeacherLessonServices.get_all({
      search_query: { chapter_id },
    });

    res.status(200).json({
      message: "Lessons fetched successfully.",
      count: data.length,
      data: data.map((lesson) => {
        const { chapter, ...rest } = lesson;
        return rest;
      }),
      status: 200,
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @get_lesson_by_id Controller
 * return { message: string, data: lesson, status: number }
 * @description Get the chapter by id
 */
export const get_by_lesson_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const chapter_id = req.params.chapter_id as string;

    if (!validate_uuid(chapter_id))
      throw new CustomError("Invalid chapter id", 400);

    const data = await TeacherLessonServices.get_all({
      search_query: { id, chapter_id },
      includes: { course: true, chapter: true },
    });

    if (data?.length === 0) throw new CustomError("Lessons not found.", 404);

    const { chapter, ...rest } = data?.[0];

    res.status(200).json({
      message: "Lessons fetched successfully.",
      data: rest,
      status: 200,
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @update_lesson_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description Update the lesson by id from request body object.
 */
export const update_lesson_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Validate the req body
     */
    const body = validate_lesson_update_body(req.body);
    const lesson_id = req.params.id;

    const lesson = await TeacherLessonServices.get_all({
      search_query: { id: lesson_id },
      includes: { course: true, chapter: true },
    });

    if (lesson.length === 0) throw new CustomError("Lesson not found.", 404);

    const data = await TeacherLessonServices.update_by_id({
      id: lesson_id,
      body,
    });

    res.status(202).json({
      message: "Lesson updated successfully.",
      data,
      status: 202,
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @reorder_lesson_by_ids Controller
 * return { message: string, data: object[], status: number }
 * @description Update the lesson orders by ids from request body object.
 */
export const reorder_lesson_by_ids = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Validate the req body
     */
    const ids = req.body?.ids as string[];
    const chapter_id = req.params.id;
    const author_id = req.app.get("user")?.id;

    const chapter = await TeacherChapterServices.get_all({
      search_query: { id: chapter_id },
      includes: {
        course: true,
      },
    });

    if (chapter.length === 0) throw new CustomError("Chapter not found.", 404);

    const data = await TeacherLessonServices.reoder_by_ids({
      chapter_id,
      ids,
    });

    res.status(202).json({
      message: "Lessons updated successfully.",
      data,
      status: 202,
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @delete_lesson_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description delete the lesson by id from request body object.
 */
export const delete_lesson_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const chapter = await TeacherLessonServices.get_all({
      search_query: { id },
      includes: { course: true, chapter: true },
    });
    if (chapter.length === 0) throw new CustomError("Lesson not found.", 404);

    await TeacherLessonServices.delete_by_id({
      id,
    });

    res.status(202).json({
      message: "Lesson deleted successfully.",
      status: 202,
    });
  } catch (err: any) {
    next(err);
  }
};
