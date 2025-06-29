import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AuthServices } from './auth.service';

const registerDoctor = catchAsync(async (req, res) => {
  const result = await AuthServices.registerDoctorIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor created successfully',
    data: result,
  });
});
const registerPatient = catchAsync(async (req, res) => {
  const result = await AuthServices.registerPatientIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Patient created successfully',
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully',
    data: result.verifiedUser,
    accessToken: result.accessToken,
  });
});

export const AuthControllers = {
  registerDoctor,
  registerPatient,
  login
};
