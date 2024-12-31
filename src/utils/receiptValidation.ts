import { z } from 'zod';

export const receiptSchema = z.object({
  owner: z.string(),
  name: z.string().min(3),
  imageName: z.string(),
  category: z.string().min(3),
  date: z.date().refine((date) => date <= new Date(), {
    message: 'Date should be from the past'
  }),
  totalCost: z.number()
});
