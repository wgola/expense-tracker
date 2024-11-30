'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createReceipt(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    receipt: z.string().min(1)
  });
  const parse = schema.safeParse({
    receipt: formData.get('receipt')
  });

  if (!parse.success) {
    return { message: 'Failed to create a receipt' };
  }

  const data = parse.data;

  try {
    revalidatePath('/');
    return { message: `Added receipt ${data.receipt}` };
  } catch (e) {
    return { message: 'Failed to create receipt' };
  }
}
