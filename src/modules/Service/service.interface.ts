import { Types } from 'mongoose';

export interface IService {
  doctor: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  duration: number;
}