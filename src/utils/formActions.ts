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
    imageName: z.string()
  });

  const parse = schema.safeParse({
    imageName: formData.get('imageName')
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

    const x = await uploadReceipt(parse.data.imageName, fileBuffer);
    console.log(x);

    // const receipt = new Receipt({
    //   owner: session?.user,
    //   imageName: parse.data.imageName
    //   totalCost: data.totalCost,
    //   date: new Date(data.date)
    // });
    // await receipt.save();

    revalidatePath('/');
    return { message: `Added receipt ${parse.data.imageName}` };
  } catch (e) {
    return { message: 'Failed to create receipt' };
  }
}
