//controller function handle only request and response
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.services';
// import StudentValidationSchemaWithJoi from './student.joi.validation';
import studentValidationSchema from './student.validation';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const students = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'get student data successfully',
      data: students,
    });
  } catch (error) {
    //error send to globalErrorHandler
    next(error);
  }
};

//req, res, next ৩টা type এক সাথে define করার জন্য express এর built in RequestHandler type function আছে।
// তাহলে আলাদা আলাদা করে parameter type দিতে হবে না।

//catchAsync Higher Order function
// এ function use করা হবে try-catch block repeatation কমানের জন্য

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getSingleStudent = catchAsync(async (req, res, next) => {
  // try {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  // res.status(200).json({
  //   success: true,
  //   message: 'get student successfully',
  //   data: result,
  // });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Get student Successfully',
    data: result,
  });
  // } catch (error) {
  //   //error send to globalErrorHandler
  //   next(error);
  // }
});

//create student handle in user now it is invalid
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = await req.body;

    //* Schema Validation with joi validator library
    // joi যেহেতু নিজেই একটি schema create করে তাই এটাকে controller এর মধ্যে handle করতে হবে।

    // const { error } = StudentValidationSchemaWithJoi.validate(studentData); //return {error, value}

    // console.log({ error });

    /*  if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      });
    } */

    //* data validation schema using zod library
    //typescript এর সাথে zod popular validation library

    const studentValidatedData = studentValidationSchema.parse(studentData);

    const result =
      await StudentServices.studentCreateIntoDB(studentValidatedData);

    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    // res.status(201).json({
    //   success: true,
    //   message: 'Student has been Deleted',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: 'Student has been Deleted',
      data: result,
    });
  } catch (error) {
    //error send to globalErrorHandler
    next(error);
  }
};

const updateStudent: RequestHandler = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const updatedDoc = req.body;

    const result = await StudentServices.updateStudentInDB(
      studentId,
      updatedDoc,
    );
    // res.status(201).json({
    //   success: true,
    //   message: 'Document Update Successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: 'Document Updated Successfully',
      data: result,
    });
  } catch (error) {
    //error send to globalErrorHandler
    next(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
