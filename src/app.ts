import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { AuthRoute } from './modules/Auth/auth.route';
import { ServiceRoute } from './modules/Service/service.route';
import { AvailabilityRoutes } from './modules/Availability/availability.route';
import { AppointmentRoute } from './modules/Appointments/appointments.route';
import { DoctorRoute } from './modules/Doctor/doctor.route';
import { PatientRoute } from './modules/Patient/patient.route';
const app: Application = express();
app.use(express.json());
// app.use(cors({ origin: ['https://medimart-nu.vercel.app','http://localhost:3000'], credentials: true }));
app.use(cors());
app.use('/auth', AuthRoute);
app.use('/doctor', ServiceRoute,AvailabilityRoutes);
app.use('/patient', AppointmentRoute,PatientRoute);
app.use('/doctor', AppointmentRoute,DoctorRoute);

const getController = (req: Request, res: Response) => {
  res.send('Hello from Doctor Patient Appointment Management System!');
};

app.get('/', getController);
app.use(globalErrorHandler);
app.use(notFound);
export default app;
