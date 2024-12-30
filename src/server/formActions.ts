'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Receipt } from '@/server/database/models/receipt.model';
import { uploadReceipt } from '@/server/storage/storage.functions';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { receiptSchema } from '@/utils/receiptValidation';
import { redirect } from 'next/navigation';
import { FormState } from '../types';
import { convertZodErrors } from '@/utils/convertZodErrors';

export async function createReceipt(prevState: FormState, formData: FormData): Promise<FormState> {
  const session = await getServerSession(authOptions);

  const validated = receiptSchema.safeParse({
    owner: session?.user?.name,
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

  try {
    const file = formData.get('image') as File;
    if (!file) {
      return {
        pictureError: 'No picture uploaded',
        data: validated.data
      };
    }
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // await uploadReceipt(parse.data.imageName, fileBuffer);

    // const receipt = new Receipt({ ...parse.data });
    // await receipt.save();
    // redirect(`/home`);

    // revalidatePath('/');
    return {
      successMsg: 'Receipt added successfully!'
    };
  } catch (e) {
    return {
      pictureError: 'Error uploading image',
      data: validated.data
    };
  }
}
