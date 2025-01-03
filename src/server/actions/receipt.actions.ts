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
import { IReceipt } from '@/types/receipt.interface';

export const createReceipt = async (_prevState: FormState, formData: FormData) => {
  const session = await getServerSession(authOptions);

  const unvalidated: IReceipt = {
    owner: session?.user?.email as string,
    name: formData.get('name') as string,
    imageName: '',
    category: formData.get('category') as string,
    date: new Date(formData.get('date') as string),
    totalCost: parseFloat(formData.get('totalCost') as string) || 0
  };

  const validated = receiptSchema.safeParse(unvalidated);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return {
      errors,
      data: unvalidated
    };
  }

  const file = formData.get('image') as File;
  if (!file) {
    return {
      pictureError: 'No picture uploaded',
      data: unvalidated
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
      data: unvalidated
    };
  }

  revalidatePath('/home');
  redirect('/home');
};
