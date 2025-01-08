import { getValidatedAllExpensesParams } from '@/app/constants/expensesParamsOptions';
import CustomSelect from '@/components/customSelect';
import ExpenseListItem from '@/components/expenseListItem';
import Pagination from '@/components/pagination';
import { getTotalExpensesPaginated } from '@/server/database/functions/getTotalExpensesPaginated';
import { Suspense } from 'react';

export default async function ExpensesPage({
  searchParams
}: Readonly<{
  searchParams: Promise<{ page?: string; limit?: string; sort?: string; order?: string }>;
}>) {
  const params = await searchParams;

  return (
    <>
      <div className="flex mt-8 justify-between items-center">
        <h1 className="text-3xl font-bold">Your expenses</h1>
        <div>
          <span className="pr-2">Sort:</span>
          <CustomSelect />
        </div>
      </div>
      <Suspense fallback={<ExpenseListLoading />}>
        <AllExpenses params={params} />
      </Suspense>
    </>
  );
}

async function AllExpenses({
  params
}: Readonly<{
  params: { page?: string; limit?: string; sort?: string; order?: string };
}>) {
  const validatedParams = getValidatedAllExpensesParams(params);
  const expensesData = await getTotalExpensesPaginated(validatedParams);

  const { receipts: expenses, metadata } = expensesData;

  const expensesList = expenses.map((expense) => (
    <ExpenseListItem receipt={expense} key={expense.imageName} />
  ));

  return (
    <>
      <div className="flex flex-col gap-3 p-2">
        {expenses.length ? (
          expensesList
        ) : (
          <p className="text-center my-10 ">You have no expenses yet!</p>
        )}
      </div>
      <Pagination totalPages={metadata.totalPages} />
    </>
  );
}

function ExpenseListLoading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full skeleton h-[125px]" />
    </div>
  );
}
