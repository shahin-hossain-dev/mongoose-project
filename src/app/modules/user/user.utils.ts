import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudentId = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean(); //lean use করলে pure JavaScript return করবে, ফলে query টা একটু Fast হবে। কিন্তু এটা শুধু মাত্র যখন query এর উপর mongoose এর অপারেশন না চালানো হয় তখন ব্যবহার করা যায়।

  return lastStudentId?.id ? lastStudentId.id.substring(6) : undefined;
};

//first time generate student id when not exist any student in the db.
export const generateStudentId = async (payload: TAcademicSemester) => {
  //id generated logic here
  const currentId = (await findLastStudentId()) || (0).toString();

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
