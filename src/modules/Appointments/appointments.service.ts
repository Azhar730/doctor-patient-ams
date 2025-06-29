import AppError from '../../app/errors/AppError';
import { Availability } from '../Availability/availability.model';
import { Doctor } from '../Doctor/doctor.model';
import { Patient } from '../Patient/patient.model';
import { Service } from '../Service/service.model';
import { IAppointment } from './appointments.interface';
import { Appointment } from './appointments.model';

const bookAppointmentIntoDB = async (payload: IAppointment) => {
  const patient = await Patient.findById(payload.patient);
  if (!patient) {
    throw new AppError(404, 'Patient not found');
  }
  const doctor = await Doctor.findById(payload.doctor);
  if (!doctor) {
    throw new AppError(404, 'Doctor not found');
  }
  const service = await Service.findById(payload.service);
  if (!service) {
    throw new AppError(404, 'Service not found');
  }
  const availability = await Availability.findById(payload.availability);
  if (!availability) {
    throw new AppError(404, 'Availability not found');
  }
  const existing = await Appointment.findOne({
    doctor: payload.doctor,
    selectedDate: payload.selectedDate,
    'timeSlot.start': payload.timeSlot.start,
    'timeSlot.end': payload.timeSlot.end,
    status: { $in: ['pending', 'accepted'] },
  });
  if (existing) {
    throw new AppError(409, 'This time slot is already booked');
  }
  const result = await Appointment.create(payload);
  return result;
};

const getMyAppointmentsFromDB = async (patientId: string) => {
  const result = await Appointment.find({ patient: patientId })
    .populate('doctor')
    .populate('service');
  return result;
};

const getDoctorAppointmentsFromDB = async (status: any) => {
  const result = await Appointment.find({ status })
    .populate('patient')
    .populate('service');
  return result;
};

const updateAppointmentStatusIntoDB = async (id: string, status: string) => {
  const result = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  return result
};

export const AppointmentServices = {
  bookAppointmentIntoDB,
  getMyAppointmentsFromDB,
  updateAppointmentStatusIntoDB,
  getDoctorAppointmentsFromDB,
};
