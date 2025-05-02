import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  Username,
} from './student.interface';

const userNameSchema = new Schema<Username>({
  firstName: { type: String, require: [true, 'First name is required'] }, //mongoose এ required field validation message pass করা যায়। যদি field না পাঠানো হয় তাহলে error message show করবে ।
  middleName: { type: String },
  lastName: { type: String, require: [true, 'last name is required '] },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String },
  fatherContactNo: { type: String },
  fatherOccupation: { type: String },
  motherName: { type: String },
  motherContactNo: { type: String },
  motherOccupation: { type: String },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  contactNo: { type: String },
  occupation: { type: String },
  address: { type: String },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true }, // unique হলো এই field value unique হতে হবে, duplicate হবে পারবে না। field unique করলে auto indexing হয়ে যায়।
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'], //mongoose এ required field validation message pass করা যায়। যদি field না পাঠানো হয় তাহলে error message show করবে ।
  },
  email: { type: String, required: true, unique: true }, // unique হলো এই field value unique হতে হবে, duplicate হবে পারবে না। field unique করলে auto indexing হয়ে যায়।
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'], // enum value গুলো values property এর মধ্যে দিতে হবে।
      message: '{VALUE} is not valid', //enum এর ক্ষেত্রে message property তে error message পাঠাতে হবে। {VALUE} এর মধ্যে user যে value পাঠাবে সেটা পাওয়া যাবে।
    }, // এখানে ['male', 'female'] কে mongoose ename type বলে। male অথবা female যেকোনো একটা বসবে, union type এর মতো।
    required: true,
  },
  dateOfBirth: { type: String },
  contactNo: { type: String, required: [true, 'contactNo is required'] },
  emergencyContactNo: { type: String },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], //enum যেকোনো একটা নিবে এটা mongoose built in property
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active', // default হিসাবে active থাকবে
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required'],
  },
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
});

export const StudentModel = model<Student>('Student', studentSchema);
