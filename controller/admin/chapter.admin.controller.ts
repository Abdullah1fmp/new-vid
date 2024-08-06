import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import {
  validate_chapter_body,
  validate_chapter_update_body,
  validate_uuid,
} from "../../lib/validation.lib";
import * as TeacherChapterServices from "../../services/teacher/chapter.teacher.services";
import * as TeacherCourseServices from "../../services/teacher/courses.teacher.services";

/**
 * @Get_chapters Controller
 * @param req.params.id - course_id
 * return { message: string, count: number, data: object[] }
 * @description Get all courses based on the query params
 */
export const get_chapters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course_id = req.params.id;

    const data = await TeacherChapterServices.get_all({
      search_query: { course_id },
      includes: {
        lessons: true,
        course: true,
      },
    });

    res.status(200).json({
      message: "Chapters fetched successfully.",
      count: data.length,
      data,
      status: 200,
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @get_chapter_by_id Controller
 * return { message: string, data: course, status: number }
 * @description Get the chapter by id
 */
export const get_by_chapter_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const course_id = req.params.course_id as string;

    const data = await TeacherChapterServices.get_all({
      search_query: { id, course_id },
      includes: { lessons: true, course: true },
    });

    if (data?.length === 0) throw new CustomError("Chapter not found.", 404);

    res.status(200).json({
      message: "Chapter fetched successfully.",
      data: data?.[0],
      status: 200,
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @update_chapter_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description Update the chapter by id from request body object.
 */
export const update_chapter_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Validate the req body
     */
    const body = validate_chapter_update_body(req.body);
    const chapter_id = req.params.id;
    const author_id = req.app.get("user")?.id;

    /**
     * Check if the course is created by the user
     */
    const chapter = await TeacherChapterServices.get_all({
      search_query: { id: chapter_id },
      includes: { course: true },
    });

    if (chapter.length === 0) throw new CustomError("Course not found.", 404);

    const data = await TeacherChapterServices.update_by_id({
      id: chapter_id,
      body,
    });

    res.status(201).json({
      message: "Course updated successfully.",
      data,
      status: 202,
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @reorder_chapter_by_ids Controller
 * return { message: string, data: object[], status: number }
 * @description Update the chapter orders by ids from request body object.
 */
export const reorder_chapter_by_ids = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Validate the req body
     */
    const ids = req.body?.ids as string[];
    const course_id = req.params.id;
    const author_id = req.app.get("user")?.id;

    /**
     * Check if the course is created by the user
     */
    const course = await TeacherCourseServices.get_all({
      search_query: { id: course_id },
    });

    if (course.length === 0) throw new CustomError("Course not found.", 404);
    const data = await TeacherChapterServices.reoder_by_ids({
      course_id,
      ids,
    });

    res.status(202).json({
      message: "Chapters updated successfully.",
      data,
      status: 202,
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @delete_chapter_by_id Controller
 * return { message: string, data: object[], status: number }
 * @description delete the chapter by id from request body object.
 */
export const delete_chapter_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const chapter = await TeacherChapterServices.get_all({
      search_query: { id },
      includes: { course: true },
    });
    if (chapter.length === 0) throw new CustomError("Chapter not found.", 404);

    await TeacherChapterServices.delete_by_id({
      id,
    });

    res.status(202).json({
      message: "Chapter deleted successfully.",
      status: 202,
    });
  } catch (err: any) {
    next(err);
  }
};