import { Receipt } from '@/server/database/models/receipt.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { IReceipt } from '@/types/receipt.interface';
import { getReceiptUrlByName } from '@/server/storage/storage.functions';

export const getLatestExpenses = async (count: number) => {
  const session = await getServerSession(authOptions);

  return Promise.all(
    (
      await Receipt.aggregate<IReceipt>([
        { $match: { owner: session?.user?.email ?? '' } },
        { $sort: { date: -1 } },
        { $limit: count }
      ]).exec()
    ).map(async (receipt) => {
      receipt.imageName = await getReceiptUrlByName(receipt.imageName);
      return receipt;
    })
  );
};
