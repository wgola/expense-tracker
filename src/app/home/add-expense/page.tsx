import { AddExpenseForm } from '@/components/addExpenseForm';
import TotalReceiptCostContextProvider from '@/providers/totalReceiptCostContextProvider';
import { ToastContainer } from 'react-toastify';

export default function AddExpensePage() {
  return (
    <TotalReceiptCostContextProvider>
      <h1 className="text-3xl font-bold text-gray-800">Add new expense</h1>
      <AddExpenseForm />
      <ToastContainer />
    </TotalReceiptCostContextProvider>
  );
}
