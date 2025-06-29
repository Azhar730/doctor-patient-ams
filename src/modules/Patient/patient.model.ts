import { model, Schema } from 'mongoose';
import { IPatient } from './patient.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';

const patientSchema = new Schema<IPatient>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is Required'],
    },
    name: {
      type: String,
      required: [true, 'Name is Required'],
      trim: true,
      maxlength: [20, 'Name can not be more than 20 Characters'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      validate: {
        validator: (value: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: '{VALUE} is not Valid, Please Provide Valid Email',
      },
    },
    phone: {
      type: String,
      required: [true, 'Phone is Required'],
      trim: true,
      maxlength: [11, 'Phone can not be more than 11 Characters'],
    },
    password: { type: String, required: true, select: false },
    age: { type: Number, required: [true, 'Age is Required'] },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
  },
  { timestamps: true },
);

patientSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
patientSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const Patient = model<IPatient>('Patient', patientSchema);
