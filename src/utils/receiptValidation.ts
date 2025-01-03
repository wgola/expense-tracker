import { z } from 'zod';

export const receiptSchema = z.object({
  owner: z.string(),
  name: z.string({ message: 'Name is required' }).min(3, 'Name must be at least 3 characters long'),
  imageName: z.string(),
  category: z
    .string({ message: 'Category is required' })
    .min(3, 'Category must be at least 3 characters long'),
  date: z.date().refine((date) => date <= new Date(), {
    message: 'Date should be from the past'
  }),
  totalCost: z.number()
});
