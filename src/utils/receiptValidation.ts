import { z } from 'zod';
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const receiptSchema = z.object({
  owner: z.string(),
  name: z.string({ message: 'Name is required' }).min(3, 'Name must be at least 3 characters long'),
  imageName: z.string(),
  image: z.instanceof(File).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: 'Please choose another file type'
  }),
  category: z
    .string({ message: 'Category is required' })
    .min(3, 'Category must be at least 3 characters long'),
  date: z.date().refine((date) => date <= new Date(), {
    message: 'Date should be from the past'
  }),
  totalCost: z.number()
});
