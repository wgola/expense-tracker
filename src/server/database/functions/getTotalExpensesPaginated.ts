import { Receipt } from '@/server/database/models/receipt.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { IReceipt } from '@/types/receipt.interface';
import { getReceiptUrlByName } from '@/server/storage/storage.functions';

interface PaginationOptions {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export const getTotalExpensesPaginated = async ({
  page,
  limit,
  sortBy,
  sortOrder
}: PaginationOptions) => {
  const session = await getServerSession(authOptions);

  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  const skip = (page - 1) * limit;

  return Promise.all(
    (
      await Receipt.aggregate<IReceipt>([
        { $match: { owner: session?.user?.email ?? '' } },
        { $sort: { [sortBy]: sortDirection } },
        { $skip: skip },
        { $limit: limit }
      ]).exec()
    ).map(async (receipt) => {
      receipt.imageName = await getReceiptUrlByName(receipt.imageName);
      return receipt;
    })
  );
};
