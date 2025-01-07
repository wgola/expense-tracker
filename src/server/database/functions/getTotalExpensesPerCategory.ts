import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Receipt } from '@/server/database/models/receipt.model';

export const getTotalExpensesPerCategory = async (dateFrom: Date | null, dateTo: Date | null) => {
  const session = await getServerSession(authOptions);

  return await Receipt.aggregate<{ category: string; totalAmount: number }>([
    { $match: { owner: session?.user?.email ?? '' } },
    {
      $match: {
        date: {
          $gte: dateFrom ?? new Date(0),
          $lte: dateTo ?? new Date()
        }
      }
    },
    {
      $group: {
        _id: '$category',
        totalAmount: { $sum: '$totalCost' }
      }
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        totalAmount: 1
      }
    },
    { $sort: { totalAmount: -1 } }
  ]).exec();
};
