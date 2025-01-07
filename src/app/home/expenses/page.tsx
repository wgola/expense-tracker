import CustomSelect from '@/components/customSelect';
import ExpenseListItem from '@/components/expenseListItem';
import Pagination from '@/components/pagination';
import { getTotalExpensesPaginated } from '@/server/database/functions/getTotalExpensesPaginated';
import { Suspense } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

export default async function ExpensesPage({
  searchParams
}: Readonly<{
  searchParams: Promise<{ page?: string; sort?: string; order?: string }>;
}>) {
  const { page, sort, order } = await searchParams;

  const optionsToSelect: SelectOption[] = [
    { value: 'date_desc', label: 'Newest to oldest' },
    { value: 'date_asc', label: 'Oldest to newest' },
    { value: 'totalCost_asc', label: 'Prize ascending' },
    { value: 'totalCost_desc', label: 'Prize descending' }
  ];

  return (
    <>
      <div className="flex mt-8 justify-between items-center">
        <h1 className="text-3xl font-bold">Your expenses</h1>
        <div>
          <span className="pr-2">Sort:</span>
          <CustomSelect options={optionsToSelect} />
        </div>
      </div>
      <div className="flex flex-col p-5 mt-5 border-2 border-gray-200">
        <Suspense fallback={<ExpenseListLoading />}>
          <AllExpenses expensesPage={page} sortBy={sort} sortOrder={order} />
        </Suspense>
      </div>
      <Pagination />
    </>
  );
}

async function AllExpenses({
  expensesPage,
  sortBy,
  sortOrder
}: Readonly<{
  expensesPage: string | undefined;
  sortBy: string | undefined;
  sortOrder: string | undefined;
}>) {
  const allExpenses = await getTotalExpensesPaginated({
    page: expensesPage ? parseInt(expensesPage, 10) : 1,
    limit: 1,
    sortBy: sortBy ? sortBy : 'date',
    sortOrder: sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'desc'
  });

  const expensesList = allExpenses.map((expense) => (
    <ExpenseListItem receipt={expense} key={expense.imageName} />
  ));

  return (
    <div className="flex flex-col gap-3">
      {allExpenses.length ? (
        expensesList
      ) : (
        <p className="text-center my-10 ">You have no expenses yet!</p>
      )}
    </div>
  );
}

function ExpenseListLoading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full skeleton h-[125px]" />
    </div>
  );
}
