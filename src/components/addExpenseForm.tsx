'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createReceipt } from '@/server/actions/receipt.actions';
import ImageInput from './imageInput';
import { FormState } from '@/types/form-state.interface';
import { format } from 'date-fns';
import { useTotalReceiptCost } from '@/hooks/useTotalReceiptCost';

export function AddExpenseForm() {
  const [state, formAction] = useActionState(createReceipt, {} as FormState);
  const [clearImage, setClearImage] = useState(false);
  const { totalCost, loading } = useTotalReceiptCost();

  useEffect(() => {
    if (state.errors) {
      setClearImage((val) => !val);
    }
  }, [state.errors]);

  return (
    <form action={formAction} className="w-full flex flex-col space-y-1 mt-2">
      <label htmlFor="name" className="text-sm font-medium">
        Name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter receipt name"
        className="input input-bordered w-full"
        defaultValue={state.data?.name}
        required
      />
      <div className="h-3 flex self-center justify-self-center">
        {state.errors?.name && <small className="text-red-400">{state.errors?.name}</small>}
      </div>
      <ImageInput clearTrigger={clearImage} />
      <div className="h-3 flex self-center justify-self-center">
        {state.errors?.image && <small className="text-red-400">{state.errors?.image}</small>}
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
        defaultValue={state.data?.category}
        required
      />
      <div className="h-3 flex self-center justify-self-center">
        {state.errors?.category && <small className="text-red-400">{state.errors?.category}</small>}
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
        defaultValue={state.data?.date ? format(state.data.date, 'yyyy-MM-dd') : undefined}
        required
      />
      <div className="h-3 flex self-center justify-self-center">
        {state.errors?.date && <small className="text-red-400">{state.errors?.date}</small>}
      </div>
      <label htmlFor="totalCost" className="text-sm font-medium">
        Total cost:
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          disabled={loading}
          type="number"
          step="0.01"
          id="totalCost"
          name="totalCost"
          placeholder="Receipt price"
          defaultValue={totalCost ?? state.data?.totalCost}
          className="grow"
        />
        <span className="text-gray-500">PLN</span>
      </label>
      <div className="h-5 flex self-center justify-self-center">
        {(state.errors?.totalCost && (
          <small className="text-red-400">{state.errors?.totalCost}</small>
        )) ||
          (state.otherError && <small className="text-red-400">{state.otherError}</small>)}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      Add
    </button>
  );
}
