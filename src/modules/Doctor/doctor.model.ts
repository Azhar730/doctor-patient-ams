import { model, Schema } from 'mongoose';
import { IDoctor } from './doctor.interface';
import config from '../../app/config';
import bcrypt from 'bcrypt';

const doctorSchema = new Schema<IDoctor>(
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
    specialization: {
      type: String,
      required: [true, 'Specialization is Required'],
    },
    hospitalName: {
      type: String,
      required: [true, 'Hospital Name is Required'],
    },
    hospitalFloor: {
      type: String,
      required: [true, 'Hospital Floor is Required'],
    },
  },
  { timestamps: true },
);

doctorSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
doctorSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const Doctor = model<IDoctor>('Doctor', doctorSchema);
