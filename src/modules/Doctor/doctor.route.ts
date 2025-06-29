import { Router } from 'express';
import { DoctorControllers } from './doctor.controller';

const router = Router();

router.get('/doctors', DoctorControllers.getAllDoctor);

export const DoctorRoute = router;
