import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';
import React, { PropsWithChildren, Suspense } from 'react';
import { getLatestExpenses } from '@/server/database/functions/getLatestExpenses';
import ExpenseListItem from '@/components/expenseListItem';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Hello, {session?.user?.name}!</h1>
      <div className="flex flex-wrap gap-1 justify-center mt-3">
        <MainPageLink href="/home/add-expense">Add new expense</MainPageLink>
        <MainPageLink href="/home/statistics">View your stats</MainPageLink>
        <MainPageLink href="/home/expenses">View your expenses</MainPageLink>
      </div>
      <div className="divider" />
      <h2 className="text-xl font-bold my-2 text-center">Your latest expenses:</h2>
      <Suspense fallback={<ExpenseListLoading />}>
        <ExpenseList />
      </Suspense>
    </div>
  );
}

async function ExpenseList() {
  const latestExpenses = await getLatestExpenses(3);

  const expensesList = latestExpenses.map((expense) => (
    <ExpenseListItem receipt={expense} key={expense.imageName} />
  ));

  return (
    <div className="flex flex-col gap-3">
      {latestExpenses.length ? (
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
      <div className="w-full skeleton h-[125px]" />
      <div className="w-full skeleton h-[125px]" />
    </div>
  );
}

function MainPageLink({ children, href }: Readonly<PropsWithChildren<{ href: string }>>) {
  return (
    <Link href={href} className="border-2 p-2 rounded-xl hover:bg-gray-200">
      {children}
    </Link>
  );
}
