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

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
