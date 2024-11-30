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
      <label htmlFor="imageName">Image Name:</label>
      <input type="text" id="imageName" name="imageName" placeholder="Enter image name" required />

      <label htmlFor="image">Choose an image:</label>
      <input type="file" id="image" name="image" accept="image/*" capture required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
