import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.services';
import { ObjectId } from 'mongoose';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Create Academic Semester Successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Fetched all academic semester data successfully',
    data: result,
  });
});

const getSingleSemester = catchAsync(async (req, res) => {
  const query = req.params.semesterId as string;

  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Fetched Single Semester Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleSemester,
};
