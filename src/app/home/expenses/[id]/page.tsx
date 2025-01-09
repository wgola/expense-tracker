import { EditExpenseForm } from '@/components/editExpenseForm';
import { getReceiptById } from '@/server/database/functions/getReceiptById';
import { ISavedReceipt } from '@/types/receipt.interface';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export default async function ExpenseDetails({
  params
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const receipt = await getReceiptById((await params).id);

  if (!receipt) {
    notFound();
  }
  const receiptToPass: ISavedReceipt = JSON.parse(JSON.stringify(receipt));

  return (
    <>
      <h1 className="justify-self-center text-3xl font-bold">Receipt details</h1>
      <div className="flex flex-wrap justify-center my-3">
        <div>
          Created at:
          <span className="border p-1 m-1">
            {format(new Date(receiptToPass.createdAt), 'yyyy-MM-dd HH:mm')}
          </span>
        </div>
        <div className="divider md:divider-horizontal" />
        <div>
          Latest update:
          <span className="border m-1 p-1">
            {format(new Date(receiptToPass.updatedAt), 'yyyy-MM-dd HH:mm')}
          </span>
        </div>
      </div>
      <EditExpenseForm receipt={receiptToPass} />
    </>
  );
}
