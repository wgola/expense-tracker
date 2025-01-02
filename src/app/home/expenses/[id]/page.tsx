import { getReceiptById } from '@/server/database/functions/getReceiptById';
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

  return <div>Details of receipt {receipt.name}</div>;
}
