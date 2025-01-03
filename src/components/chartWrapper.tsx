'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, PropsWithChildren, useCallback } from 'react';
import { DATE_RANGE_OPTIONS } from '@/app/constants/dateRangeOptions';

export default function ChartWrapper({
  children,
  paramsKey,
  title
}: Readonly<
  PropsWithChildren<{
    paramsKey: string;
    title: string;
  }>
>) {
  const params = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const onDateRangeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newParams = new URLSearchParams(params);
      newParams.set(paramsKey, event.target.value);

      router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
    },
    [params, router, pathName, paramsKey]
  );

  return (
    <div className="p-3 border-2 border-gray-200 min-h-[300px]">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{title}</h2>
        <select
          className="select select-bordered select-sm w-1/3"
          onChange={onDateRangeChange}
          defaultValue={params.get(paramsKey) ?? undefined}
        >
          {Object.entries(DATE_RANGE_OPTIONS).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>
      </div>
      {children}
    </div>
  );
}
