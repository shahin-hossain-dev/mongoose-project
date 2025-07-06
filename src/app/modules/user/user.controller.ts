import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.services';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // const validStudent = studentValidationSchema.parse(student);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    res.status(201).json({
      success: true,
      message: 'Student Successfully Created',
      data: result,
    });
  } catch (error) {
    //error send to globalErrorHandler
    next(error);
  }
};

export const UserController = {
  createStudent,
};
