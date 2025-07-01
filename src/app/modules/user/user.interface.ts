export type TUser = {
  id: string;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  password: string;
  needsPasswordChange: boolean;
};
