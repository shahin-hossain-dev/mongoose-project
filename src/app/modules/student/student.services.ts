import { Student } from './student.interface';
import { StudentModel } from './student.model';

const studentCreateIntoDB = async (student: Student) => {
  // create method দিয়ে mongoose এ data insert করা হয়।
  const result = await StudentModel.create(student);
  return result;
};

export const StudentServices = {
  studentCreateIntoDB,
};
