import { AddExpenseForm } from '@/components/addExpenseForm';

export default function AddExpensePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mt-8">Add new expense</h1>
      <AddExpenseForm />
    </div>
  );
}
