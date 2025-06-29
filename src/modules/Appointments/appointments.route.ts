import { Router } from 'express';
import { AppointmentControllers } from './appointments.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/appointments',
  auth('patient'),
  AppointmentControllers.bookAppointment,
);
router.get(
  '/appointments/:patientId',
  auth('patient'),
  AppointmentControllers.getMyAppointments,
);
router.get(
  '/appointments',
  auth('doctor'),
  AppointmentControllers.getDoctorAppointments,
);
router.patch(
  '/appointments/:id/status',
  auth('doctor'),
  AppointmentControllers.updateAppointmentStatus,
);
export const AppointmentRoute = router;
