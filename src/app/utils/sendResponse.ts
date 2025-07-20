import { Response } from 'express';

//response type with generic type
//এখানে data এর ক্ষেত্রে different type of data আসতে পারে তাই generic type দেয়  এটা dynamic ভাবে type define করা হয়েছে।
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

// response গুলো reuseable function দিয়ে use করা হয়েছে, ফলে code clean scalable আছে।

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
  });
};

export default sendResponse;
