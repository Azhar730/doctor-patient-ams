import AppError from '../../app/errors/AppError';
import { Doctor } from '../Doctor/doctor.model';
import { IService } from './service.interface';
import { Service } from './service.model';

const createServiceIntoDB = async (payload: IService) => {
  const doctor = await Doctor.findById(payload.doctor);
  if (!doctor) {
    throw new AppError(404, 'Doctor not found');
  }
  const result = await Service.create(payload);
  return result;
};

const updateServiceIntoDB = async (id: string, payload: IService) => {
  const result = await Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteServiceIntoDB = async (id: string) => {
  const result = await Service.findByIdAndDelete(id);
  return result;
};
export const ServiceServices = {
  createServiceIntoDB,
  updateServiceIntoDB,
  deleteServiceIntoDB,
};
