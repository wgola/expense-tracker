'use client';

import { editReceipt } from '@/server/actions/edit-receipt.action';
import { EditFormState } from '@/types/form-state.interface';
import { ISavedReceipt } from '@/types/receipt.interface';
import Image from 'next/image';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { format } from 'date-fns';

export function EditExpenseForm({ receipt }: { receipt: ISavedReceipt }) {
  const [state, formAction] = useActionState(editReceipt, {} as EditFormState);

  return (
    <div className="w-full flex md:flex-row flex-col justify-between items-center">
      <Image src={receipt.imageName} alt={receipt.name} width={250} height={250} />
      <form action={formAction} className="w-10/12 md:w-5/12 flex flex-col space-y-1 mt-3">
        <input type="hidden" id="id" name="id" value={receipt._id} />
        <label htmlFor="name" className="text-sm font-medium">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter receipt name"
          className="input input-bordered w-full"
          defaultValue={receipt.name}
          required
        />
        <div className="h-5 flex self-center justify-self-center">
          {state.errors?.name && <small className="text-red-400">{state.errors?.name}</small>}
        </div>
        <label htmlFor="category" className="text-sm font-medium">
          Category:
        </label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter receipt category"
          className="input input-bordered w-full"
          defaultValue={receipt.category}
          required
        />
        <div className="h-5 flex self-center justify-self-center">
          {state.errors?.category && (
            <small className="text-red-400">{state.errors?.category}</small>
          )}
        </div>
        <label htmlFor="date" className="text-sm font-medium">
          Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          placeholder="Enter date"
          className="input input-bordered w-full"
          defaultValue={format(receipt.date, 'yyyy-MM-dd')}
          required
        />
        <div className="h-5 flex self-center justify-self-center">
          {state.errors?.date && <small className="text-red-400">{state.errors?.date}</small>}
        </div>
        <label htmlFor="totalCost" className="text-sm font-medium">
          Total cost:
        </label>
        <input
          type="number"
          step="0.01"
          id="totalCost"
          name="totalCost"
          placeholder="Receipt price"
          defaultValue={receipt.totalCost}
          className="input input-bordered w-full"
        />
        <div className="h-7 flex self-center justify-self-center">
          {(state.errors?.totalCost && (
            <small className="text-red-400">{state.errors?.totalCost}</small>
          )) ||
            (state.otherError && <small className="text-red-400">{state.otherError}</small>)}
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      Edit
    </button>
  );
}
