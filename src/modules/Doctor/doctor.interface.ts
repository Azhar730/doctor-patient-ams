import { Types } from 'mongoose';

export interface IDoctor {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  specialization: string;
  hospitalName: string;
  hospitalFloor: string;
}
