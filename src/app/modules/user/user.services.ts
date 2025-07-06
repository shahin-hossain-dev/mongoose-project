import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TNewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  try {
    //create a new user

    const user: TNewUser = {};

    // if password not given, set default password

    user.password = password || (config.default_password as string);

    user.role = 'student';
    // set manually generated
    user.id = '2025370001';

    //crate a user
    const result = await User.create(user);

    //create a student

    if (Object.keys(result).length) {
      studentData.id = result.id;
      studentData.user = result._id;
    }
  } catch (error) {
    throw Error('Something Went Wrong');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
