import { Types } from 'mongoose';

export interface IAppointmentTimeSlot {
  start: string;
  end: string;
}

export interface IAppointment {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  service: Types.ObjectId;
  availability: Types.ObjectId;
  selectedDate: string;
  timeSlot: IAppointmentTimeSlot;
  status?: 'pending' | 'accepted' | 'cancelled' | 'completed';
}
