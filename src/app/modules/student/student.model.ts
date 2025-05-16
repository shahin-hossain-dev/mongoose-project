import { model, Schema } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUsername,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUsername>({
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
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, trim: true },
  fatherContactNo: { type: String, trim: true },
  fatherOccupation: { type: String, trim: true },
  motherName: { type: String, trim: true },
  motherContactNo: { type: String, trim: true },
  motherOccupation: { type: String, trim: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, trim: true },
  contactNo: { type: String, trim: true },
  occupation: { type: String, trim: true },
  address: { type: String, trim: true },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true }, // unique হলো এই field value unique হতে হবে, duplicate হবে পারবে না। field unique করলে auto indexing হয়ে যায়।
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'], //mongoose এ required field validation message pass করা যায়। যদি field না পাঠানো হয় তাহলে error message show করবে ।
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      trim: true,
      maxlength: [20, 'password can not be more than 20'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: { validator: (value: string) => validator.isEmail(value) },
    }, // unique হলো এই field value unique হতে হবে, duplicate হবে পারবে না। field unique করলে auto indexing হয়ে যায়।
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true } }, //active virtuals - toJSON হলো json এর মধ্যে set হবে।
);

//! mongoose virtual
// virtual হলো virtually property define করা যা database এ exist করে না, কিন্তু existing property থেকে single or combine করে data get করে virtual property এর মধ্যে set করে দেয়।
//virtual কে schema এর মধ্যে active করতে হয়।

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//!mongoose middleware

//?Document Middleware

//pre middleware -> pre middleware data save হওয়ার আগে কাজ করবে

studentSchema.pre('save', async function (next) {
  //console.log(this, 'Pre Hook: It works before save the data'); //এখানে this keyword দিয়ে data/document টাকে পাওয়া যাবে।
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const student = this;

  //password hashing and save to db
  student.password = await bcrypt.hash(
    student.password,
    Number(config.password_salt_rounds),
  );
  next();
});

//post middleware -> post middleware data save হওয়ার পরে কাজ করবে
studentSchema.post('save', function (updatedDoc, next) {
  //console.log(this, 'Post Hook: It works after save the data'); //এখানে this keyword দিয়ে data/document টাকে পাওয়া যাবে।
  updatedDoc.password = '';
  next();
});

//? Query Middleware
//query middleware হলো যখন query করা হবে query হওয়ার আগে এবং পরে middleware এর সাহায্যে বিভিন্ন অপারেশন করা
studentSchema.pre('find', function (next) {
  //query: যে data গুলো deleted না সেগুলো পাবে। $ne = not equal
  this.find({ isDeleted: { $ne: true } }); //এখানে this হলো যে data গুলো find করে পাবে সব this এর মধ্যে থাকবে

  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline()); //[ { '$match': { id: 'STU12351' } } ] //* this.pipeline() এর pipeline পাওয়া যাবে।
  //এখন service এ pipeline এ যে $match method define করা হয়েছে তার আগে যদি আরেকটা pipeline use match use করা যায় তাহলে deleted গুলো ignore করা যাবে।

  //like this: [ {$match: {isDeleted: {$ne: true}}}, { '$match': { id: 'STU12351' } } ]
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // unshift method use করে new $match logic কে প্রথমে inject করে দেয়া হয়েছে।
  next();
});

//crate custom instance method
//*custom instance method দিয়ে isUserExist method এর মধ্যে একটি async function set করা হলো user exist কিনা পাওয়ার জন্য।
/*  
studentSchema.methods.isUserExist = async function (id: string) {
  const isUserExist = Student.findOne({ id });

  return isUserExist; //return student or null
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema); //student mongoose model
*/

// create a custom static method
//*custom static method দিয়ে isUserExist method এর মধ্যে একটি async function set করা হলো user exist কিনা পাওয়ার জন্য।

studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
