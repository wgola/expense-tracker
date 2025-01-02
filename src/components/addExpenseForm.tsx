'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createReceipt } from '@/server/actions/receipt.actions';
import ImageInput from './imageInput';
import { FormState } from '@/types/form-state.interface';

export function AddExpenseForm() {
  const [state, formAction] = useActionState(createReceipt, {} as FormState);

  return (
    <form action={formAction} className="flex flex-col space-y-1 mt-3">
      <label htmlFor="name" className="text-sm font-medium">
        Name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter receipt name"
        className="input input-bordered w-full"
        required
      />
      <div className="h-3 flex self-center justify-self-center">
        {state.errors?.name && <small className="text-red-400">{state.errors?.name}</small>}
      </div>
      <ImageInput />
      <div className="h-3 flex self-center justify-self-center">
        {state.errors?.pictureError && (
          <small className="text-red-400">{state.errors?.pictureError}</small>
        )}
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
        required
      />
      <div className="h-3 flex self-center justify-self-center">
        {state.errors?.date && <small className="text-red-400">{state.errors?.date}</small>}
      </div>
      <label htmlFor="totalCost" className="text-sm font-medium">
        Total cost:
      </label>
      <input
        type="text"
        id="totalCost"
        name="totalCost"
        placeholder="Receipt price"
        className="input input-bordered w-full"
      />
      <div className="h-3 flex self-center justify-self-center">
        {state.errors?.cost && <small className="text-red-400">{state.errors?.cost}</small>}
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
