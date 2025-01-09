export const SORTING_OPTIONS = {
  date_desc: { label: 'Newest First' },
  date_asc: { label: 'Oldest First' },
  totalCost_desc: { label: 'Price: High to Low' },
  totalCost_asc: { label: 'Price: Low to High' }
};

export const getValidatedAllExpensesParams = (params: {
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
}) => {
  const page = params.page ? Math.max(parseInt(params.page, 10), 1) : 1;
  const limit = params.limit ? Math.max(parseInt(params.limit, 10), 1) : 5;

  const validSorting =
    params.sort &&
    params.order &&
    SORTING_OPTIONS[`${params.sort}_${params.order}` as keyof typeof SORTING_OPTIONS];
  const sort = validSorting ? (params.sort as string) : 'date';
  const order = validSorting ? (params.order as 'desc' | 'asc') : 'desc';

  return { page, limit, sort, order };
};
