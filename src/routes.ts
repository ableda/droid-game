import { Router } from 'express';

import health from './health/routes/health';
import radar from './radar/routes/radar';

const router: Router = Router();

router.use(health);
router.use(radar);

export default router;
