import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  try {
    //create a new user
    // Partial key use করে TUser কে বা type কে Optionally use করা যায়।
    const userData: Partial<TUser> = {};

    // if password not given, set default password

    userData.password = password || (config.default_password as string);

    userData.role = 'student';

    //find academic Semester Info
    const admissionSemester = await AcademicSemester.findById({
      _id: payload.admissionSemester,
    });

    // set manually generated
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    //crate a user
    const newUser = await User.create(userData);

    //create a student

    if (Object.keys(newUser).length) {
      payload.id = newUser.id;
      payload.user = newUser._id; //reference id

      const newStudent = await Student.create(payload);

      return newStudent;
    }
  } catch (error: any) {
    console.log(error.message);
    throw Error(error.message);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
