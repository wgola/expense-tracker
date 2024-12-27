'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Receipt } from '@/server/database/models/receipt.model';
import { uploadReceipt } from '@/server/storage/storage.functions';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { receiptSchema } from '@/utils/receiptValidation';

export async function createReceipt(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const session = await getServerSession(authOptions);

  const parse = receiptSchema.safeParse({
    owner: session?.user?.name,
    imageName: '',
    category: formData.get('category'),
    date: new Date(formData.get('date') as string),
    totalCost: parseFloat(formData.get('totalCost') as string) || 0
  });

  if (!parse.success) {
    console.log(parse.error);
    return { message: 'Failed to create a receipt' };
  }

  try {
    const file = formData.get('image') as File;
    if (!file) {
      return { message: 'No file uploaded' };
    }
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // await uploadReceipt(parse.data.imageName, fileBuffer);

    // const receipt = new Receipt({ ...parse.data });
    // await receipt.save();

    // revalidatePath('/');
    return { message: `Added receipt ${parse.data.imageName}` };
  } catch (e) {
    return { message: 'Failed to create receipt' };
  }
}
