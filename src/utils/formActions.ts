'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Receipt } from '@/server/database/models/receipt.model';
import { uploadReceipt } from '@/server/storage/storage.functions';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createReceipt(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const session = await getServerSession(authOptions);

  const schema = z.object({
    owner: z.string(),
    imageName: z.string(),
    category: z.string(),
    date: z.date(),
    totalCost: z.number()
  });

  const parse = schema.safeParse({
    owner: session?.user,
    imageName: formData.get('imageName'),
    category: formData.get('category'),
    date: formData.get('date'),
    totalCost: formData.get('totalCost')
  });

  if (!parse.success) {
    return { message: 'Failed to create a receipt' };
  }

  try {
    const file = formData.get('image') as File;

    if (!file) {
      return { message: 'No file uploaded' };
    }
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await uploadReceipt(parse.data.imageName, fileBuffer);

    const receipt = new Receipt({ ...parse.data });
    await receipt.save();

    revalidatePath('/');
    return { message: `Added receipt ${parse.data.imageName}` };
  } catch (e) {
    return { message: 'Failed to create receipt' };
  }
}
