'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { createReceipt } from '@/server/formActions';
import toast from 'react-hot-toast';
import { ImageInput } from './imageInput';
import { FormState } from '@/types';

const initialState: FormState = {};

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
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.successMsg) {
      toast.success(state.successMsg);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col space-y-1 mb-3 max-w-xs mx-auto"
      ref={formRef}
    >
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
        className="input input-bordered w-full max-w-xs"
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
        className="input input-bordered w-full max-w-xs"
        required
      />
      <div className="h-3 flex self-center justify-self-center">
        {state.errors?.date && <small className="text-red-400">{state.errors?.date}</small>}
      </div>
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
      <div className="h-3 flex self-center justify-self-center">
        {state.errors?.cost && <small className="text-red-400">{state.errors?.cost}</small>}
      </div>
      <SubmitButton />
    </form>
  );
}
