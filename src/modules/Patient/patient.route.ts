import { Router } from 'express';
import { PatientControllers } from './patient.controller';

const router = Router();

router.get('/patients', PatientControllers.getAllPatient);

export const PatientRoute = router;
