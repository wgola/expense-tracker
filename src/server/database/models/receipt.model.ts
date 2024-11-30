import { model } from 'mongoose';
import { ReceiptSchema } from '../schemas/receipt.schema';

export const Receipt = model('Receipt', ReceiptSchema);
