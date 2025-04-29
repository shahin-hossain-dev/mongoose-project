import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  Username,
} from './student.interface';

const userNameSchema = new Schema<Username>({
  firstName: { type: String, require: true },
  middleName: { type: String },
  lastName: { type: String, require: true },
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
  id: { type: String, required: true },
  name: userNameSchema,
  email: { type: String, required: true },
  gender: ['male', 'female'], // এখানে ['male', 'female'] কে mongoose ename type বলে। male অথবা female যেকোনো একটা বসবে, union type এর মতো।
  dateOfBirth: { type: String },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  isActive: ['active', 'blocked'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
});

const Student = model<Student>('Student', studentSchema);
