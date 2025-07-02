import { Request, Response } from 'express';
import { StudentServices } from '../student/student.services';
import studentValidationSchema from '../student/student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    const validStudent = studentValidationSchema.parse(student);
    const result = await StudentServices.studentCreateIntoDB(validStudent);
    res.status(201).json({
      success: true,
      message: 'Student Successfully Created',
      data: '',
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const UserController = {
  createStudent,
};
