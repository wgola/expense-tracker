import { z } from 'zod';
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 5000000;

export const receiptSchema = z.object({
  owner: z.string(),
  name: z.string({ message: 'Name is required' }).min(3, 'Name must be at least 3 characters long'),
  imageName: z.string(),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Please choose another file type'
    }),
  category: z
    .string({ message: 'Category is required' })
    .min(3, 'Category must be at least 3 characters long'),
  date: z.date().refine((date) => date <= new Date(), {
    message: 'Date should be from the past'
  }),
  totalCost: z.number().nonnegative('Total cost must be a positive number')
});
