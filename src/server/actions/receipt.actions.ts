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
import { FormReceipt } from '@/types/form-data.interface';

export const createReceipt = async (_prevState: FormState, formData: FormData) => {
  const session = await getServerSession(authOptions);

  const unvalidated: FormReceipt = {
    owner: session?.user?.email as string,
    name: formData.get('name') as string,
    imageName: '',
    image: formData.get('image') as File,
    category: formData.get('category') as string,
    date: new Date(formData.get('date') as string),
    totalCost: parseFloat(formData.get('totalCost') as string) || 0
  };

  const validated = receiptSchema.safeParse(unvalidated);

  if (!validated.success) {
    const errors = {
      ...convertZodErrors(validated.error),
      ...(unvalidated.image.size === 0 && { image: 'Please upload an image' })
    };
    return {
      errors,
      data: unvalidated
    };
  }

  try {
    const { image, ...receiptToSave } = validated.data;
    const receipt: IReceipt = receiptToSave;

    const imageName = generateFileName(receipt, image);
    const fileBuffer = Buffer.from(await image.arrayBuffer());

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
