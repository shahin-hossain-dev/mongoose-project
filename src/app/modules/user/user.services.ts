import { User } from './user.model';

const createStudentIntoDB = async (student) => {
  try {
    const result = await User.create(student);

    return result;
  } catch (error) {
    throw Error('Something Went Wrong');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
