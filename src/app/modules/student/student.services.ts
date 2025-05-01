import { Student } from './student.interface';
import { StudentModel } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const student = await StudentModel.findOne({ id });
  return student;
};

const studentCreateIntoDB = async (student: Student) => {
  // create method দিয়ে mongoose এ data insert করা হয়।
  const result = await StudentModel.create(student);
  return result;
};

export const StudentServices = {
  studentCreateIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
