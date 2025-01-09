import { Receipt } from '@/server/database/models/receipt.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { IReceipt } from '@/types/receipt.interface';
import { getReceiptUrlByName } from '@/server/storage/storage.functions';

interface PaginationOptions {
  page: number;
  limit: number;
  sort: string;
  order: 'asc' | 'desc';
}

export const getTotalExpensesPaginated = async ({
  page,
  limit,
  sort,
  order
}: PaginationOptions) => {
  const session = await getServerSession(authOptions);

  const sortDirection = order === 'asc' ? 1 : -1;
  const skip = (page - 1) * limit;

  const owner = session?.user?.email;

  const receipts = await Receipt.aggregate<IReceipt>([
    { $match: { owner } },
    { $sort: { [sort]: sortDirection } },
    { $skip: skip },
    { $limit: limit }
  ]).exec();

  const enrichedReceipts = await Promise.all(
    receipts.map(async (receipt) => {
      receipt.imageName = await getReceiptUrlByName(receipt.imageName);
      return receipt;
    })
  );

  const totalReceipts = await Receipt.countDocuments({ owner });
  const totalPages = Math.ceil(totalReceipts / limit);

  return {
    receipts: enrichedReceipts,
    metadata: {
      total: totalReceipts,
      page,
      limit,
      totalPages
    }
  };
};
