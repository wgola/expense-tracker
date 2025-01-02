import mongoose, { model } from 'mongoose';
import receiptSchema from '../schemas/receipt.schema';
import { IReceipt } from '@/types/receipt.interface';

export const Receipt = mongoose.models.Receipt || model<IReceipt>('Receipt', receiptSchema);
