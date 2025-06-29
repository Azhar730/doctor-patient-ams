import { query } from 'express';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { Doctor } from './doctor.model';

const getAllDoctorFromDB = async (query: Record<string, unknown>) => {
  const doctorQuery = new QueryBuilder(Doctor.find(), query)
    .filter()
    .paginate();
  const result = await doctorQuery.modelQuery;
  const meta = await doctorQuery.countTotal();
  return {
    meta,
    result,
  };
};

export const DoctorServices = {
  getAllDoctorFromDB,
};
