import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AppointmentServices } from './appointments.service';

const bookAppointment = catchAsync(async (req, res) => {
  const result = await AppointmentServices.bookAppointmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Appointment booked successfully',
    data: result,
  });
});
const getMyAppointments = catchAsync(async (req, res) => {
  const  {patientId}  = req.params
  const result = await AppointmentServices.getMyAppointmentsFromDB(patientId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My Appointments retrieved successfully',
    data: result,
  });
});
const getDoctorAppointments = catchAsync(async (req, res) => {
  const { status } = req.query;
  const result = await AppointmentServices.getDoctorAppointmentsFromDB(status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor Appointments retrieved successfully',
    data: result,
  });
});

const updateAppointmentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {status} = req.body;
  const result = await AppointmentServices.updateAppointmentStatusIntoDB(
    id,
    status,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Appointment status is ${status} successfully`,
    data: result,
  });
});

export const AppointmentControllers = {
  bookAppointment,
  getMyAppointments,
  updateAppointmentStatus,
  getDoctorAppointments,
};
