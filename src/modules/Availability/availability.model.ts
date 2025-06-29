import { model, Schema } from 'mongoose';
import { IAvailability, ITimeSlot } from './availability.interface';

const timeSlotSchema = new Schema<ITimeSlot>({
  start: {
    type: String,
    required: [true, 'Start time is required'],
  },
  end: {
    type: String,
    required: [true, 'End time is required'],
  },
});

const availabilitySchema = new Schema<IAvailability>(
  {
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
    day: {
      type: String,
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      required: [true, 'Day is required'],
    },
    timeSlots: [timeSlotSchema],
  },
  { timestamps: true },
);

export const Availability = model<IAvailability>(
  'Availability',
  availabilitySchema,
);
