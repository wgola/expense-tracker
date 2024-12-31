'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { receiptSchema } from '@/utils/receiptValidation';
import { FormState } from '@/types/form-state.interface';
import { convertZodErrors } from '@/utils/convertZodErrors';
import { Receipt } from '@/server/database/models/receipt.model';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { generateFileName } from '@/utils/generateFileName';
import { uploadReceipt } from '@/server/storage/storage.functions';

export const createReceipt = async (_prevState: FormState, formData: FormData) => {
  const session = await getServerSession(authOptions);

  const validated = receiptSchema.safeParse({
    owner: session?.user?.email,
    name: formData.get('name'),
    imageName: '',
    category: formData.get('category'),
    date: new Date(formData.get('date') as string),
    totalCost: parseFloat(formData.get('totalCost') as string) || 0
  });

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return {
      errors,
      data: validated.data
    };
  }

  const file = formData.get('image') as File;
  if (!file) {
    return {
      pictureError: 'No picture uploaded',
      data: validated.data
    };
  }

  try {
    const receipt = { ...validated.data };

    const imageName = generateFileName(receipt, file);
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await uploadReceipt(imageName, fileBuffer);

    receipt.imageName = imageName;

    await Receipt.create(receipt);
  } catch {
    return {
      pictureError: 'Error uploading image',
      data: validated.data
    };
  }

  revalidatePath('/home');
  redirect('/home');
};
