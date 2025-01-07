import { IReceipt } from '@/types/receipt.interface';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowCircleRight } from 'react-icons/fa';
import { formatCurrency } from '@/utils/formatCurrency';
import { format } from 'date-fns';

export default function ExpenseListItem({
  receipt
}: Readonly<{ receipt: IReceipt & { _id?: string } }>) {
  return (
    <div className="card card-side bg-base-200 w-full h-[125px] border-2 border-gray-200">
      <figure className="relative w-1/3 lg:w-2/5">
        <Image
          src={receipt.imageName}
          alt={receipt.name}
          fill
          sizes="(min-width: 1024px) 210px, 150px"
          priority
        />
      </figure>
      <div className="card-body py-4 px-4">
        <h2 className="card-title">
          {receipt.name}
          <div className="badge badge-secondary">{formatCurrency(receipt.totalCost)}</div>
        </h2>
        <div className="card-actions justify-start">
          <div className="badge badge-outline">{format(receipt.date, 'yyyy-MM-dd')}</div>
          <div className="badge badge-outline">{receipt.category}</div>
        </div>
        <div className="card-actions justify-end">
          <Link
            href={`/home/expenses/${receipt._id}`}
            className="border-2 border-gray-300 p-1 flex gap-2 items-center hover:bg-gray-300"
          >
            Details <FaArrowCircleRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
