import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.services';
import { UpdateQuery } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';

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

const updateAcademicSemester = catchAsync(async (req, res) => {
  const updateDoc: UpdateQuery<TAcademicSemester> = req.body;
  const semesterId = req.params.semesterId;

  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    updateDoc,
    semesterId,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semester updated Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleSemester,
  updateAcademicSemester,
};
