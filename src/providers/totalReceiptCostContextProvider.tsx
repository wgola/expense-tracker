'use client';

import { TotalReceiptCostContext } from '@/contexts/totalReceiptCostContext';
import { PropsWithChildren, useMemo, useState } from 'react';

export default function TotalReceiptCostContextProvider({ children }: Readonly<PropsWithChildren>) {
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const value = useMemo(
    () => ({ totalCost, setTotalCost, loading, setLoading }),
    [loading, totalCost]
  );

  return (
    <TotalReceiptCostContext.Provider value={value}>{children}</TotalReceiptCostContext.Provider>
  );
}
