'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: Readonly<PaginationProps>) {
  const params = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(1);

  const changePage = useCallback(
    (value: number) => {
      const newPage = Math.min(Math.max(page + value, 1), totalPages);
      const newParams = new URLSearchParams(params);
      newParams.set('page', newPage.toString());

      router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
    },
    [page, params, router, pathName]
  );

  useEffect(() => {
    const currPage = parseInt(params.get('page') || '1');
    const newPage = Math.max(currPage, 1);
    newPage == 1 ? setIsFirst(true) : setIsFirst(false);
    newPage == totalPages ? setIsLast(true) : setIsLast(false);

    setPage(newPage);
  }, [params]);

  return (
    <div className="flex join mt-5 justify-center">
      <button className="join-item btn" disabled={isFirst} onClick={() => changePage(-1)}>
        «
      </button>

      <button className="join-item btn hidden sm:block">Page {page}</button>
      <button className="join-item btn sm:hidden">{page}</button>

      <button className="join-item btn" disabled={isLast} onClick={() => changePage(1)}>
        »
      </button>
    </div>
  );
}
