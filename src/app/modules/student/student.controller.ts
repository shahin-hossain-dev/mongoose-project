//controller function handle only request and response
import { Request, Response } from 'express';
import { StudentServices } from './student.services';
import Joi from 'joi';

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

    // Schema Validation with joi validator package
    // joi যেহেতু নিজেই একটি schema create করে তাই এটাকে controller এর মধ্যে handle করতে হবে।

    const StudentSchemaValidatorWithJoi = Joi.object({
      name: {
        firstName: Joi.string().max(20).required(),
        middleName: Joi.string().max(20),
        lastName: Joi.string().max(20).required(),
      },
      gender: Joi.string().valid(['male', 'female', 'other']), //joi package এ enum valid() method এর মধ্যে define করতে হয়।
    });

    const result = await StudentServices.studentCreateIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
