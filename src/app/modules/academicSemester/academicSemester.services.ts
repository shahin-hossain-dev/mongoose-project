import { ObjectId } from 'mongoose';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //business logic/service logic here
  // "Autumn" : "01"
  // "Summer" : "02"
  // "Fall" : "03"
  //যেহেতু academic name এর জন্য same code হবে তাই চেক করা হলো same name এর জন্য same code আসতেছে কিনা।

  // যেহেতু এটা internal business logic, অর্থাৎ এটার সাথে database এর কোনো সম্পর্ক নেই তাই এটা mongoose pre hook এ ব্যবহার করা হয়নি।
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();

  return result;
};

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({ _id: semesterId });

  return result;
};

const updateAcademicSemesterIntoDB = async (
  payload: Partial<TAcademicSemester>,
  semesterId: string,
) => {
  try {
    if (
      academicSemesterNameCodeMapper[payload.name as string] !== payload.code
    ) {
      throw new Error('Invalid Semester Code');
    }

    const result = await AcademicSemester.findByIdAndUpdate(
      semesterId,
      payload,
      {
        new: true,
      },
    );

    if (!result) {
      throw new Error('Semester not found');
    }

    return result;
  } catch (error: any) {
    console.log(error.message);
    throw Error(error.message);
  }
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
