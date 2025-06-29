import { Router } from 'express';
import { AvailabilityControllers } from './availability.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-availability',
  auth('doctor'),
  AvailabilityControllers.createAvailability,
);

export const AvailabilityRoutes = router;
