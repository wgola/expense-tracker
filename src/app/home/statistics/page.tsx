import { getTotalExpensesPerDate } from '@/server/database/functions/getTotalExpensesPerDate';
import TotalExpensesByDateChart from '@/components/totalExpensesByDateChart';
import { getDateRange } from '@/app/constants/dateRangeOptions';
import { Suspense } from 'react';
import { getTotalExpensesPerCategory } from '@/server/database/functions/getTotalExpensesPerCategory';
import TotalExpensesPerCategoryChart from '@/components/totalExpensesPerCategoryChart';
import ChartWrapper from '@/components/chartWrapper';
import { getTotalExpenses } from '@/server/database/functions/getTotalExpenses';
import { formatCurrency } from '@/utils/formatCurrency';
import { startOfMonth } from 'date-fns';
import { getCategoryWithMostExpenses } from '@/server/database/functions/getCategoryWithMostExpenses';

export default async function StatisticsPage({
  searchParams
}: Readonly<{
  searchParams: Promise<{ expensesByDateRange?: string; expensesByCategoryRange?: string }>;
}>) {
  const { expensesByDateRange, expensesByCategoryRange } = await searchParams;

  return (
    <>
      <h1 className="text-3xl font-bold mt-8">Your stats</h1>
      <div className="flex flex-col gap-3">
        <Suspense fallback={<LoadingPlaceholder />}>
          <GeneralStatisticsSection />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <TotalExpensesByDateChartWrapper expensesRange={expensesByDateRange} />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <TotalExpensesPerCategoryChartWrapper expensesRange={expensesByCategoryRange} />
        </Suspense>
      </div>
    </>
  );
}

async function GeneralStatisticsSection() {
  const totalExpenses = await getTotalExpenses(null, null);
  const expensesThisMonth = await getTotalExpenses(startOfMonth(new Date()), null);
  const categoryWithMostExpenses = await getCategoryWithMostExpenses();

  return (
    <div className="flex flex-col p-5 mt-5 border-2 border-gray-200">
      <div className="flex justify-between items-center">
        <p className="text-md font-semibold">Total expenses</p>
        <p className="text-xl font-bold">{formatCurrency(totalExpenses)}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-md font-semibold">Expenses this month</p>
        <p className="text-xl font-bold">{formatCurrency(expensesThisMonth)}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-md font-semibold">Category with most expenses</p>
        <p className="text-xl font-bold">{categoryWithMostExpenses}</p>
      </div>
    </div>
  );
}

async function TotalExpensesByDateChartWrapper({
  expensesRange
}: Readonly<{
  expensesRange: string | undefined;
}>) {
  const { dateFrom, dateTo } = getDateRange(expensesRange);
  const data = await getTotalExpensesPerDate(dateFrom, dateTo);

  return (
    <ChartWrapper paramsKey="expensesByDateRange" title="Sum of expenses per date">
      {data.length === 0 ? <NoDataPlaceholder /> : <TotalExpensesByDateChart data={data} />}
    </ChartWrapper>
  );
}

async function TotalExpensesPerCategoryChartWrapper({
  expensesRange
}: Readonly<{
  expensesRange: string | undefined;
}>) {
  const { dateFrom, dateTo } = getDateRange(expensesRange);
  const data = await getTotalExpensesPerCategory(dateFrom, dateTo);

  return (
    <ChartWrapper paramsKey="expensesByCategoryRange" title="Sum of expenses per category">
      {data.length === 0 ? <NoDataPlaceholder /> : <TotalExpensesPerCategoryChart data={data} />}
    </ChartWrapper>
  );
}

function NoDataPlaceholder() {
  return (
    <div className="text-center mt-16">
      <p>There is no data available for this period!</p>
      <p>Try selecting another range.</p>
    </div>
  );
}

function LoadingPlaceholder() {
  return <div className="w-full skeleton h-[300px]" />;
}
