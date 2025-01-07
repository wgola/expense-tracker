import { EditExpenseForm } from '@/components/editExpenseForm';
import { getReceiptById } from '@/server/database/functions/getReceiptById';
import { notFound } from 'next/navigation';

export default async function ExpenseDetails({
  params
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const receipt = await getReceiptById((await params).id);
  const receiptToPass = JSON.parse(JSON.stringify(receipt));

  if (!receipt) {
    notFound();
  }

  return (
    <>
      <h1 className="justify-self-center text-3xl font-bold mt-8">Receipt details</h1>
      <EditExpenseForm receipt={receiptToPass} id={(await params).id} />
    </>
  );
}
