'use client';

import { ChangeEvent, useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createReceipt } from '@/utils/formActions';

const initialState = {
  message: ''
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary my-5" aria-disabled={pending}>
      Add
    </button>
  );
}

export function AddExpenseForm() {
  const [state, formAction] = useActionState(createReceipt, initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action={formAction} className="flex flex-col space-y-1 max-w-xs mx-auto">
      <label htmlFor="image" className="mb-2 text-sm font-medium">
        Choose an image:
      </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
        required
      />
      {imagePreview && (
        <div className="mt-2 self-center">
          <img src={imagePreview} width={125} height={125} alt="Selected" />
        </div>
      )}
      <label htmlFor="category" className="mb-2 text-sm font-medium">
        Category
      </label>
      <input
        type="text"
        id="category"
        name="category"
        placeholder="Enter receipt category"
        className="input input-bordered w-full max-w-xs"
        required
      />
      <label htmlFor="date" className="mb-2 text-sm font-medium">
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
      <label htmlFor="cost" className="mb-2 text-sm font-medium">
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
