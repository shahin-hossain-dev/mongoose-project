import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  Username,
} from './student.interface';

const userNameSchema = new Schema<Username>({
  firstName: {
    type: String,
    require: [true, 'First name is required'], //mongoose এ required field validation message pass করা যায়। যদি field না পাঠানো হয় তাহলে error message show করবে ।
    maxlength: [15, 'first name max length is 15'], //max character length validation
    trim: true, // text এর start-end space গুলো trim করার জন্য trim use করা হয়।
    validate: {
      validator: function (value: string) {
        //Title case validation for firstname through custom validation
        // validator function এর মধ্যে main value টা পাওয়া যায় যেটা client থেকে আসবে।
        const firstName = value
          .charAt(0)
          .toUpperCase()
          .concat(value.slice(1).toLowerCase());
        return value === firstName; //return true or false
      },
      message: '{VALUE} is not Title Case',
    },
  },
  middleName: {
    type: String,
    trim: true, // text এর start-end space গুলো trim করার জন্য trim use করা হয়।
    maxlength: [15, 'middle name max length is 15'],
  },
  lastName: {
    type: String,
    require: [true, 'last name is required '],
    trim: true,
    maxlength: [15, 'last name max length is 15'],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, trim: true },
  fatherContactNo: { type: String, trim: true },
  fatherOccupation: { type: String, trim: true },
  motherName: { type: String, trim: true },
  motherContactNo: { type: String, trim: true },
  motherOccupation: { type: String, trim: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, trim: true },
  contactNo: { type: String, trim: true },
  occupation: { type: String, trim: true },
  address: { type: String, trim: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true }, // unique হলো এই field value unique হতে হবে, duplicate হবে পারবে না। field unique করলে auto indexing হয়ে যায়।
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'], //mongoose এ required field validation message pass করা যায়। যদি field না পাঠানো হয় তাহলে error message show করবে ।
  },
  email: { type: String, required: true, unique: true, trim: true }, // unique হলো এই field value unique হতে হবে, duplicate হবে পারবে না। field unique করলে auto indexing হয়ে যায়।
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'], // enum value গুলো values property এর মধ্যে array আকারে দিতে হবে।
      message: '{VALUE} is not valid', //enum এর ক্ষেত্রে message property তে error message পাঠাতে হবে। {VALUE} এর মধ্যে user যে value পাঠাবে সেটা পাওয়া যাবে।
    }, // এখানে ['male', 'female'] কে mongoose ename type বলে। male অথবা female যেকোনো একটা বসবে, union type এর মতো।
    required: true,
  },
  dateOfBirth: { type: String },
  contactNo: { type: String, required: [true, 'contact no is required'] },
  emergencyContactNo: { type: String },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], //enum যেকোনো একটা নিবে এটা mongoose built in property
      message: '{VALUE} is not valid',
    },
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not supported',
    },
    default: 'active', // default হিসাবে active থাকবে
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required'],
  },
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
});

export const StudentModel = model<Student>('Student', studentSchema);
