'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createReceipt } from '@/utils/formActions';

const initialState = {
  message: ''
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export function AddExpenseForm() {
  const [state, formAction] = useActionState(createReceipt, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Receipt</label>
      <input type="text" id="receipt" name="receipt" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
