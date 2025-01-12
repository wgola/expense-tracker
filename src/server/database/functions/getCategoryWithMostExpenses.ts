import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Receipt } from '@/server/database/models/receipt.model';

export const getCategoryWithMostExpenses = async () => {
  const session = await getServerSession(authOptions);

  return Receipt.aggregate<{ category: string; totalAmount: number }>([
    { $match: { owner: session?.user?.email ?? '' } },
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
    { $sort: { totalAmount: -1 } },
    { $limit: 1 }
  ])
    .exec()
    .then((result) => result[0]?.category);
};
