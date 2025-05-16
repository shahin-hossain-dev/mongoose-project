//controller function handle only request and response
import { Request, Response } from 'express';
import { StudentServices } from './student.services';
// import StudentValidationSchemaWithJoi from './student.joi.validation';
import studentValidationSchema from './student.validation';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'get student data successfully',
      data: students,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'get student successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

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

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(201).json({
      success: true,
      message: 'Student has been Deleted',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const updatedDoc = req.body;

    const result = await StudentServices.updateStudentInDB(
      studentId,
      updatedDoc,
    );
    res.status(201).json({
      success: true,
      message: 'Document Update Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something Went Wrong',
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
