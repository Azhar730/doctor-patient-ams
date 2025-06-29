import AppError from '../../app/errors/AppError';
import { Doctor } from '../Doctor/doctor.model';
import { Service } from '../Service/service.model';
import { IAvailability } from './availability.interface';
import { Availability } from './availability.model';

const createAvailabilityIntoDB = async (payload: IAvailability) => {
  const doctor = await Doctor.findById(payload.doctor);
  if (!doctor) {
    throw new AppError(404, 'Doctor not found');
  }
  const service = await Service.findById(payload.service);
  if (!service) {
    throw new AppError(404, 'Service not found');
  }
  const result = await Availability.create(payload);
  return result;
};

export const AvailabilityServices = {
  createAvailabilityIntoDB,
};
