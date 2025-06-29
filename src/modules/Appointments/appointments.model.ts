import { model, Schema } from 'mongoose';
import { IAppointment } from './appointments.interface';

const appointmentSchema = new Schema<IAppointment>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient id is required'],
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Doctor id is required'],
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service id is required'],
    },
    availability: {
      type: Schema.Types.ObjectId,
      ref: 'Availability',
      required: [true, 'Availability id is required'],
    },
    selectedDate: {
      type: String,
      required: [true, 'Selected date is required'],
    },
    timeSlot: {
      start: { type: String, required: [true, 'Start time is required'] },
      end: { type: String, required: [true, 'End time is required'] },
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);
export const Appointment = model<IAppointment>(
  'Appointment',
  appointmentSchema,
);
