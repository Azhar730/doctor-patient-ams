import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { PatientServices } from './patient.service';

const getAllPatient = catchAsync(async (req, res) => {
  const result = await PatientServices.getAllPatientFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All patient retrieved successfully',
    data: result,
  });
});

export const PatientControllers = {
  getAllPatient,
};
