import { Patient } from './patient.model';

const getAllPatientFromDB = async () => {
  const result = await Patient.find();
  return result;
};

export const PatientServices = {
  getAllPatientFromDB,
};
