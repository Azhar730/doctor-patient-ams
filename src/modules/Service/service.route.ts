import { Router } from 'express';
import { ServiceControllers } from './service.controller';

const router = Router();

router.post('/services', ServiceControllers.createService);
router.patch('/services/:id', ServiceControllers.updateService);
router.delete('/services/:id', ServiceControllers.deleteService);

export const ServiceRoute = router;
