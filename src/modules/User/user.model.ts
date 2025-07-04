import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import config from '../../app/config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>(
  {
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
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['doctor', 'patient'],
      default: 'patient',
    },
  },
  { timestamps: true },
);
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
  },
});
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
// userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
//   return await User.findOne({ email }).select('+password');
// };
// userSchema.statics.isPasswordMatched = async function (
//   plainTextPassword,
//   hashedPassword,
// ) {
//   return await bcrypt.compare(plainTextPassword, hashedPassword);
// };

const User = model<IUser>('User', userSchema);

export default User;
