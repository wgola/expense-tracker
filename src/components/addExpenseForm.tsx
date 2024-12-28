'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createReceipt } from '@/utils/formActions';
import { ImageInput } from './imageInput';

const initialState = {
  message: ''
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" aria-disabled={pending}>
      Add
    </button>
  );
}

export function AddExpenseForm() {
  const [state, formAction] = useActionState(createReceipt, initialState);

  return (
    <form action={formAction} className="flex flex-col space-y-2 mb-3 max-w-xs mx-auto">
      <ImageInput />
      <label htmlFor="category" className="text-sm font-medium">
        Category:
      </label>
      <input
        type="text"
        id="category"
        name="category"
        placeholder="Enter receipt category"
        className="input input-bordered w-full max-w-xs"
        required
      />
      <label htmlFor="date" className="text-sm font-medium">
        Date:
      </label>
      <input
        type="date"
        id="date"
        name="date"
        placeholder="Enter date"
        className="input input-bordered w-full max-w-xs"
        required
      />
      <label htmlFor="cost" className="text-sm font-medium">
        Total cost:
      </label>
      <input
        type="text"
        id="cost"
        name="cost"
        placeholder="Receipt price"
        className="input input-bordered w-full max-w-xs"
        disabled
      />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
