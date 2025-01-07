'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SelectProps {
  options: SelectOption[];
}

interface SelectOption {
  value: string | number;
  label: string;
}

export default function CustomSelect({ options }: SelectProps) {
  const [sorting, setSorting] = useState('');
  const params = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const selectOptions = options.map((option: SelectOption, index) => (
    <option key={index} value={option.value}>
      {option.label}
    </option>
  ));

  const changeSorting = (value: string) => {
    const words = value.split('_');

    const newParams = new URLSearchParams(params);
    newParams.set('sort', words[0]);
    newParams.set('order', words[1]);

    router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const currSort = params.get('sort') || 'popular';
    const currOrder = params.get('order') || 'desc';

    setSorting(`${currSort}_${currOrder}`);
  }, [params]);

  return (
    <select
      className="select select-bordered"
      value={sorting}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        changeSorting(e.target.value);
      }}
    >
      {selectOptions}
    </select>
  );
}

export { CustomSelect };
