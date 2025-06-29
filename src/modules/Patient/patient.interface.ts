import { Types } from 'mongoose';

export interface IPatient {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}