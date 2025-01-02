import { IReceipt } from '@/types/receipt.interface';
import { v4 as uuidV4 } from 'uuid';

export const generateFileName = (receipt: IReceipt, file: File) => {
  const timestamp = new Date().toISOString();
  const uniqueId = uuidV4();
  const extension = file.name.split('.').pop() ?? '.png';

  return `${receipt.owner}_${receipt.name}_${timestamp}_${uniqueId}.${extension}`;
};
