import { z } from 'zod';

export const editReceiptSchema = z.object({
  name: z.string().min(3),
  category: z.string().min(3),
  date: z.date().refine((date) => date <= new Date(), {
    message: 'Date should be from the past'
  }),
  totalCost: z.number().nonnegative('Total cost must be a positive number')
});
