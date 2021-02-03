import { Request, Response } from 'express';
import express from 'express';
import rejectUnauthenticated from '../modules/authentication-middleware';
import { CompanyDB } from '../models/documents/Company';

// controllers
import { getUsersOverTime } from '../controllers/user-over-time';

const router: express.Router = express.Router();

router.get(
  '/totalactions',
  rejectUnauthenticated,
  async (req: Request, res: Response): Promise<void> => {
    console.log('this is working');
    try {
      const data = await CompanyDB.aggregate([
        { $count: 'Total_Companies' },
        {
          $lookup: {
            from: 'hashtags',
            pipeline: [
              {
                $group: {
                  _id: 0,
                  count: { $sum: 1 },
                },
              },
            ],
            as: 'hashtags',
          },
        },
        {
          $lookup: {
            from: 'insights',
            pipeline: [
              {
                $group: {
                  _id: 0,
                  count: { $sum: 1 },
                },
              },
            ],
            as: 'insights',
          },
        },
        {
          $lookup: {
            from: 'notes',
            pipeline: [
              {
                $group: {
                  _id: 0,
                  count: { $sum: 1 },
                },
              },
            ],
            as: 'notes',
          },
        },
        {
          $lookup: {
            from: 'projects',
            pipeline: [
              {
                $group: {
                  _id: 0,
                  count: { $sum: 1 },
                },
              },
            ],
            as: 'projects',
          },
        },
        { $unwind: { path: '$hashtags' } },
        { $unwind: { path: '$insights' } },
        { $unwind: { path: '$notes' } },
        { $unwind: { path: '$projects' } },
        {
          $project: {
            _id: 0,
            'hashtags.count': 1,
            'insights.count': 1,
            'notes.count': 1,
            'projects.count': 1,
          },
        },
      ]);
      res.send(data);
    } catch (error) {
      console.error('Error getting total actions: ', error);
    }
  }
);

router.get('/user-over-time', getUsersOverTime);

export default router;
