import { Types } from 'mongoose';

export interface ITimeSlot {
  start: string;
  end: string;
}

export interface IAvailability {
  doctor: Types.ObjectId;
  service: Types.ObjectId;
  day:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
  timeSlots: ITimeSlot[];
}
