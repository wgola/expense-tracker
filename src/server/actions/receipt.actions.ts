'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { receiptSchema } from '@/utils/receiptValidation';
import { EditFormState, FormState } from '@/types/form-state.interface';
import { convertZodErrors } from '@/utils/convertZodErrors';
import { Receipt } from '@/server/database/models/receipt.model';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { generateFileName } from '@/utils/generateFileName';
import { uploadReceipt } from '@/server/storage/storage.functions';
import { IEditReceipt, IReceipt } from '@/types/receipt.interface';
import { FormReceipt } from '@/types/form-data.interface';
import { editReceiptSchema } from '@/utils/editReceiptValidation';

export const createReceipt = async (_prevState: FormState, formData: FormData) => {
  const session = await getServerSession(authOptions);

  const unvalidated: FormReceipt = {
    owner: session?.user?.email as string,
    name: formData.get('name') as string,
    imageName: '',
    image: formData.get('image') as File,
    category: formData.get('category') as string,
    date: new Date(formData.get('date') as string),
    totalCost: Number(formData.get('totalCost'))
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
      otherError: 'Error uploading receipt',
      data: unvalidated
    };
  }

  revalidatePath('/home');
  redirect('/home');
};

export const editReceipt = async (_prevState: EditFormState, formData: FormData) => {
  const unvalidated: IEditReceipt = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    date: new Date(formData.get('date') as string),
    totalCost: Number(formData.get('totalCost'))
  };

  const validated = editReceiptSchema.safeParse(unvalidated);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return {
      errors,
      data: unvalidated
    };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return {
      otherError: 'Receipt to edit not found',
      data: unvalidated
    };
  }

  try {
    const receipt = { ...validated.data };

    await Receipt.findByIdAndUpdate(id, receipt);
  } catch {
    return {
      otherError: 'Error updating receipt',
      data: unvalidated
    };
  }

  revalidatePath('/home/expenses');
  redirect('/home/expenses');
};
