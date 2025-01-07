'use server';

import { EditFormState } from '@/types/form-state.interface';
import { convertZodErrors } from '@/utils/convertZodErrors';
import { Receipt } from '@/server/database/models/receipt.model';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { editReceiptSchema } from '@/utils/editReceiptValidation';
import { IEditReceipt } from '@/types/receipt.interface';

export const editReceipt = async (_prevState: EditFormState, formData: FormData) => {
  const unvalidated: IEditReceipt = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    date: new Date(formData.get('date') as string),
    totalCost: parseFloat(formData.get('totalCost') as string) || 0
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
