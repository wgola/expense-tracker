import { Schema } from 'mongoose';
import { IReceipt } from '@/types/receipt.interface';

const receiptSchema = new Schema<IReceipt>(
  {
    owner: { type: String, required: true, index: true },
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long']
    },
    imageName: {
      type: String,
      required: false
    },
    totalCost: {
      type: Number,
      required: [true, 'Total cost is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      minlength: [3, 'Category must be at least 3 characters long']
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      validate: {
        validator: (date: Date) => date <= new Date(),
        message: 'Date should be from the past'
      }
    }
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
