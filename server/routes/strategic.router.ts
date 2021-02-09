import { Request, Response } from 'express';
import express from 'express';
import rejectUnauthenticated from '../modules/authentication-middleware';
import strategic from '../controllers/strategic.controller';
import strategicPaidPlan from '../controllers/strategicPaidPlan.controller';

const router: express.Router = express.Router();

router.get('/', rejectUnauthenticated, strategic);

router.get('/paid', rejectUnauthenticated, strategicPaidPlan);

// router.post(
//   '/',
//   (req: Request, res: Response, next: express.NextFunction): void => {}
// );

export default router;