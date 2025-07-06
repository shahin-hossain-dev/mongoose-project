import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  try {
    //create a new user
    // Partial key use করে TUser কে বা type কে Optionally use করা যায়।
    const userData: Partial<TUser> = {};

    // if password not given, set default password

    userData.password = password || (config.default_password as string);

    userData.role = 'student';
    // set manually generated
    userData.id = '2025370001';

    //crate a user
    const newUser = await User.create(userData);

    //create a student

    if (Object.keys(newUser).length) {
      studentData.id = newUser.id;
      studentData.user = newUser._id; //reference id

      const newStudent = await Student.create(studentData);

      return newStudent;
    }
  } catch (error: any) {
    console.log(error.message);
    throw Error('Something Went Wrong');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
