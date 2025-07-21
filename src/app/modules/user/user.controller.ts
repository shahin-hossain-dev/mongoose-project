import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

//req, res, next ৩টা type এক সাথে define করার জন্য express এর built in RequestHandler type function আছে।
// তাহলে আলাদা আলাদা করে parameter type দিতে হবে না।
const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    // const validStudent = studentValidationSchema.parse(student);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    // res.status(201).json({
    //   success: true,
    //   message: 'Student Successfully Created',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: status.OK,
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
