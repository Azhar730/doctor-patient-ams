export interface IUser {
  email: string;
  password: string;
  role: 'doctor' | 'patient';
}