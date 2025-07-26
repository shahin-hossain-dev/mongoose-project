import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createAcademicSemester = catchAsync((req, res) => {
  //business logic/service logic here
  const result = {};

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Create Academic Semester Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
