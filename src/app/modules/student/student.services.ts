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

const studentCreateIntoDB = async (studentData: Student) => {
  // create method দিয়ে mongoose এ data insert করা হয়।
  // const result = await StudentModel.create(studentData); //build in static method

  //*build in instance method
  const student = new StudentModel(studentData);
  const result = await student.save();
  return result;
};

export const StudentServices = {
  studentCreateIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};

//!class কে দুই ভাবে access করা যায়---------------------------------

class Counter {
  static count: number = 0;

  static increment = () => {}; //static
  decrement = () => {}; //instance
}

//Counter.increment(); // এটা হলো  static method

//এটা হলো instance method
const counter1 = new Counter();
counter1.decrement();
