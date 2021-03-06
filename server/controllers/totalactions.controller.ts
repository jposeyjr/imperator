import { CompanyDB } from '../models/documents/Company';
import { Request, Response } from 'express';

// Aggregation for total actions of all companies in Aurelius (Operational Dashboard)
// There are 0's in the project portion because we hard coded those values for the presentation
export const getTotalActions = async (req: Request, res: Response) => {
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
          from: 'documents',
          pipeline: [
            {
              $group: {
                _id: 0,
                count: { $sum: 1 },
              },
            },
          ],
          as: 'documents',
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
      { $unwind: { path: '$documents' } },
      { $unwind: { path: '$insights' } },
      { $unwind: { path: '$notes' } },
      { $unwind: { path: '$projects' } },
      {
        $project: {
          'hashtags._id': 0,
          'documents._id': 0,
          'insights._id': 0,
          'notes._id': 0,
          'projects._id': 0,
        },
      },
    ]);
    res.send(data[0]);
  } catch (error) {
    console.error('Error getting total actions: ', error);
  }
};
