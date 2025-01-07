'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SORTING_OPTIONS } from '@/app/constants/expensesParamsOptions';

export default function CustomSelect() {
  const params = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const words = event.target.value.split('_');

      const newParams = new URLSearchParams(params);
      newParams.set('sort', words[0]);
      newParams.set('order', words[1]);
      router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
    },
    [params, router, pathName]
  );

  useEffect(() => {
    const currSort = params.get('sort') || 'date';
    const currOrder = params.get('order') || 'desc';

    setSelectedValue(`${currSort}_${currOrder}`);
  }, [params]);

  return (
    <select className="select select-bordered" value={selectedValue} onChange={handleChange}>
      {Object.entries(SORTING_OPTIONS).map(([value, { label }]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
