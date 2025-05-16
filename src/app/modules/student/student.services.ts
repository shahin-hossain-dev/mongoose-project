import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await Student.find();

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  //const student = await Student.findOne({ id });
  const student = await Student.aggregate([{ $match: { id } }]);
  return student;
};

const studentCreateIntoDB = async (studentData: TStudent) => {
  //* এখানে mongoose static method use করে custom method (isUserExist) কে যুক্ত করে operation করা হয়েছে।
  if (await Student.isUserExist(studentData.id)) {
    throw Error('User already exist');
  }

  // create method দিয়ে mongoose এ data insert করা হয়।
  const result = await Student.create(studentData); //build in static method to create a new student

  //* এখানে mongoose instance use করে customs instance method (isUserExist) যুক্ত করে operation করা হয়েছে।
  /*
 const student = new Student(studentData); // create mongoose instance

  if (await student.isUserExist(studentData.id)) {
    throw new Error('Student Already Exists');
  }

  //*mongoose build in instance method to create a student in database
  const result = await student.save(); 
  */
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  return result;
};

const updateStudentInDB = async (id: string, updatedDoc: any) => {
  const result = await Student.updateOne({ id }, updatedDoc);

  return result;
};

export const StudentServices = {
  studentCreateIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentInDB,
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
