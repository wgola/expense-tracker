import { z } from 'zod';

export const receiptSchema = z.object({
  owner: z.string(),
  imageName: z.string(),
  category: z.string(),
  date: z.date(),
  totalCost: z.number().min(0)
});
