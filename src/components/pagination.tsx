'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Pagination() {
  const params = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(1);

  const changePage = (value: number) => {
    const newParams = new URLSearchParams(params);
    newParams.set('page', (page + value).toString());

    router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const currPage = parseInt(params.get('page') || '1');
    if (currPage == 1) {
      setIsFirst(true);
    } else {
      setIsFirst(false);
    }

    setPage(currPage);
  }, [params]);

  return (
    <div className="flex join mt-5 justify-center">
      <button className="join-item btn" disabled={isFirst} onClick={() => changePage(-1)}>
        «
      </button>

      <button className="join-item btn hidden sm:block">Strona {page}</button>
      <button className="join-item btn sm:hidden">{page}</button>

      <button className="join-item btn" disabled={isLast} onClick={() => changePage(1)}>
        »
      </button>
    </div>
  );
}
