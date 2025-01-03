import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Receipt } from '@/server/database/models/receipt.model';

export const getTotalExpensesPerDate = async (dateFrom: Date | null, dateTo: Date | null) => {
  const session = await getServerSession(authOptions);

  return await Receipt.aggregate<{ date: string; totalAmount: number }>([
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
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        totalAmount: { $sum: '$totalCost' }
      }
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        totalAmount: 1
      }
    },
    { $sort: { date: 1 } }
  ]).exec();
};
