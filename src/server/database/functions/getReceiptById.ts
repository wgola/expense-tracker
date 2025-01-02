import { Receipt } from '@/server/database/models/receipt.model';
import { IReceipt } from '@/types/receipt.interface';

export const getReceiptById = async (id: string) => await Receipt.findById<IReceipt>(id);
