import { model, Schema } from 'mongoose';
import { IService } from './service.interface';

const serviceSchema = new Schema<IService>(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Doctor ID is Required'],
    },
    title: {
      type: String,
      required: [true, 'Title is Required'],
    },
    description: {
      type: String,
      required: [true, 'Description is Required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is Required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
  },
  { timestamps: true },
);

export const Service = model<IService>('Service', serviceSchema);
