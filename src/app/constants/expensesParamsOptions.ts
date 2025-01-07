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

  const validSorting = params.sort && SORTING_OPTIONS[params.sort as keyof typeof SORTING_OPTIONS];
  const sort = validSorting && params.sort ? params.sort.split('_')[0] : 'date';
  const order = validSorting ? (params.sort?.split('_')[1] as 'desc' | 'asc') || 'desc' : 'desc';

  return { page, limit, sort, order };
};
