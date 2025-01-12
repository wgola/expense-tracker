import { createContext } from 'react';

interface TotalReceiptCostContextType {
  totalCost: number | null;
  setTotalCost: (newCost: number | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const TotalReceiptCostContext = createContext<TotalReceiptCostContextType>({
  totalCost: null,
  setTotalCost: () => {},
  loading: false,
  setLoading: () => {}
});
