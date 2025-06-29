import { Router } from 'express';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post('/register-doctor', AuthControllers.registerDoctor);
router.post('/register-patient', AuthControllers.registerPatient);
router.post('/login', AuthControllers.login);
export const AuthRoute = router;
