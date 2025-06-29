import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { DoctorServices } from './doctor.service';

const getAllDoctor = catchAsync(async (req, res) => {
  const result = await DoctorServices.getAllDoctorFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All doctor retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const DoctorControllers = {
  getAllDoctor,
};
