import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Receipt } from '@/server/database/models/receipt.model';

export const getTotalExpenses = async (dateFrom: Date | null, dateTo: Date | null) => {
  const session = await getServerSession(authOptions);

  return Receipt.aggregate<{ totalAmount: number }>([
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
        _id: null,
        totalAmount: { $sum: '$totalCost' }
      }
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1
      }
    }
  ])
    .exec()
    .then((result) => result[0].totalAmount || 0);
};
