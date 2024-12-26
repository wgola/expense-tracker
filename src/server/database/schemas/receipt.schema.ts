import { Schema } from 'mongoose';

export const ReceiptSchema = new Schema(
  {
    owner: { type: String, required: true, index: true },
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
