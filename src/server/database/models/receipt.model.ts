import { Model } from 'mongoose';
import { ReceiptSchema } from '../schemas/receipt.schema';

export const Receipt = new Model('Receipt', ReceiptSchema);
