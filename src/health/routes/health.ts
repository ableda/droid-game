import { Router } from 'express';
import { getHealthPing } from '../controllers/getHealthPing';

const router: Router = Router();

router.get('/health/ping', getHealthPing);

export default router;
