import { Router } from 'express';
import { postRadarQuery } from '../controllers';

const router: Router = Router();

router.post('/radar', postRadarQuery);

export default router;
