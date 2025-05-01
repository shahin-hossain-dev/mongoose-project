//controller function handle only request and response
import { Request, Response } from 'express';
import { StudentServices } from './student.services';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'get student data successfully',
      data: students,
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = await req.body;

    const result = await StudentServices.studentCreateIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
