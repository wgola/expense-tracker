'use server';

import { EditFormState } from '@/types/form-state.interface';
import { convertZodErrors } from '@/utils/convertZodErrors';
import { Receipt } from '@/server/database/models/receipt.model';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { editReceiptSchema } from '@/utils/editReceiptValidation';

export const editReceipt = async (_prevState: EditFormState, formData: FormData) => {
  const validated = editReceiptSchema.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    date: new Date(formData.get('date') as string),
    totalCost: parseFloat(formData.get('totalCost') as string) || 0
  });

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    console.log('Receipt to edit not found2');

    return {
      errors,
      data: validated.data
    };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return {
      otherError: 'Receipt to edit not found',
      data: validated.data
    };
  }

  try {
    const receipt = { ...validated.data };

    await Receipt.findByIdAndUpdate(id, receipt);
  } catch {
    return {
      otherError: 'Error updating receipt',
      data: validated.data
    };
  }

  revalidatePath('/home/expenses');
  redirect('/home/expenses');
};
