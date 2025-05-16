import { Model } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUsername = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUsername;
  email: string;
  password: string;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
  // fullName?: string;
};

//* এখানে mongoose custom instance method type declare করা হয়েছে।
//type: checking isExist student by id
//*student schema এর মধ্যে student method গুলো পাওয়ার জন্য এখানে studentMethod গুলো declare করা হচ্ছে
/* 
export type StudentMethod = {
  isUserExist: (id: string) => Promise<TStudent | null>;
};

//type: create student model type
export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethod
>;
 */

//* এখানে mongoose custom static method type declare করা হয়েছে

export interface StudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;
}
