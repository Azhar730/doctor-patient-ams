import mongoose from 'mongoose';
import { IDoctor } from '../Doctor/doctor.interface';
import { IUser } from '../User/user.interface';
import User from '../User/user.model';
import AppError from '../../app/errors/AppError';
import { Doctor } from '../Doctor/doctor.model';
import { IPatient } from '../Patient/patient.interface';
import { Patient } from '../Patient/patient.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../app/config';

const registerDoctorIntoDB = async (payload: IDoctor) => {
  const userData: Partial<IUser> = {};
  userData.role = 'doctor';
  userData.email = payload.email;
  userData.password = payload.password;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user!');
    }
    payload.user = newUser[0]._id;
    // create a doctor
    const newDoctor = await Doctor.create([payload], { session });
    if (!newDoctor.length) {
      throw new AppError(400, 'Failed to create Doctor');
    }
    await session.commitTransaction();
    await session.endSession();
    return newDoctor;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const registerPatientIntoDB = async (payload: IPatient) => {
  const userData: Partial<IUser> = {};
  userData.role = 'patient';
  userData.email = payload.email;
  userData.password = payload.password;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user!');
    }
    payload.user = newUser[0]._id;
    // create a doctor
    const newPatient = await Patient.create([payload], { session });
    if (!newPatient.length) {
      throw new AppError(400, 'Failed to create Patient');
    }
    await session.commitTransaction();
    await session.endSession();
    return newPatient;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(404, 'User not found !');
  }
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(400, 'Password not match !');
  }
  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const verifiedUser = {
    id: user?._id,
    email: user?.email,
    role: user?.role
  };
  return {
    verifiedUser,
    accessToken,
  };
};

export const AuthServices = {
  registerDoctorIntoDB,
  registerPatientIntoDB,
  login
};
