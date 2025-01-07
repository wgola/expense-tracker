'use client';

import { editReceipt } from '@/server/actions/edit-receipt.action';
import { EditFormState, FormState } from '@/types/form-state.interface';
import { IReceipt } from '@/types/receipt.interface';
import Image from 'next/image';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

export function EditExpenseForm({ receipt, id }: { receipt: IReceipt; id: string }) {
  const [state, formAction] = useActionState(editReceipt, {} as EditFormState);

  return (
    <div className="w-full flex lg:flex-row flex-col mt-5 justify-between items-center">
      <Image src={receipt.imageName} alt={receipt.name} width={250} height={250} />
      <form action={formAction} className="lg:max-w-6/12 flex flex-col space-y-1 mt-3">
        <input type="hidden" id="id" name="id" value={id} />
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
          defaultValue={receipt.date.toString().split('T')[0]}
          required
        />
        <div className="h-5 flex self-center justify-self-center">
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
          defaultValue={receipt.totalCost}
          className="input input-bordered w-full"
        />
        <div className="h-5 flex self-center justify-self-center">
          {state.errors?.totalcost && (
            <small className="text-red-400">{state.errors?.totalcost}</small>
          )}
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
