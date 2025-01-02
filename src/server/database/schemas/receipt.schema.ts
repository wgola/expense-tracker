import { Schema } from 'mongoose';
import { IReceipt } from '@/types/receipt.interface';

const receiptSchema = new Schema<IReceipt>(
  {
    owner: { type: String, required: true, index: true },
    name: { type: String, required: true },
    imageName: { type: String, required: false },
    totalCost: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true,
    query: {
      byOwner(owner: string) {
        return this.where({ owner });
      }
    }
  }
);

export default receiptSchema;
