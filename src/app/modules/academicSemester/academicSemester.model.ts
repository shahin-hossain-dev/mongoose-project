import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  MonthsEnum,
} from './academicSemester.constant';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: MonthsEnum,
    },
    endMonth: {
      type: String,
      required: true,
      enum: MonthsEnum,
    },
  },
  { timestamps: true },
);

//mongoose built in pre-hook
// pre hook er কাছে client থেকে send data এর access আছে, সে database এ query করে চেক করে data আছে কিনা।
AcademicSemesterSchema.pre('save', async function (next) {
  // যেহেতু এটা database এর সাথে সর্ম্পকিত তাই  database এ same data exist করে কিনা তা mongoose pre hook check করা safe and secure
  const isSemesterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExist) {
    throw new Error('Semester already exist');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
