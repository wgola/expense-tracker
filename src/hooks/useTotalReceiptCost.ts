import { TotalReceiptCostContext } from '@/contexts/totalReceiptCostContext';
import { useContext } from 'react';
import { Slide, toast, ToastOptions } from 'react-toastify';

const TOAST_OPTIONS: ToastOptions = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: true,
  transition: Slide,
  theme: 'light'
};

const RECEIPT_ANALYZER_URL = process.env.NEXT_PUBLIC_RECEIPT_ANALYZER_URL;

export const useTotalReceiptCost = () => {
  const { totalCost, setTotalCost, loading, setLoading } = useContext(TotalReceiptCostContext);

  const sendImageForAnalysis = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      setLoading(true);
      const response = await fetch(`${RECEIPT_ANALYZER_URL}/analyze-receipt`, {
        method: 'POST',
        body: formData
      });
      const data = (await response.json()) as { totalAmount: number | null };
      if (!data.totalAmount) {
        toast.warning('Total cost not found in receipt image', TOAST_OPTIONS);
      } else {
        toast.success('Total cost successfully retrieved from receipt image', TOAST_OPTIONS);
      }

      setTotalCost(data.totalAmount);
    } catch {
      toast.error('Failed to analyze receipt image', TOAST_OPTIONS);
    } finally {
      setLoading(false);
    }
  };

  return { totalCost, sendImageForAnalysis, loading, setTotalCost };
};
