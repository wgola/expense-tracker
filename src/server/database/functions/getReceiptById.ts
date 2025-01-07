import { Receipt } from '@/server/database/models/receipt.model';
import { IReceipt } from '@/types/receipt.interface';
import { getReceiptUrlByName } from '@/server/storage/storage.functions';

export const getReceiptById = async (id: string) => {
  const receipt = await Receipt.findById<IReceipt>(id);

  if (receipt) {
    receipt.imageName = await getReceiptUrlByName(receipt.imageName);
  }

  return receipt;
};
