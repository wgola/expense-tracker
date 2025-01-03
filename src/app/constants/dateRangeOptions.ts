import { startOfDay, subDays } from 'date-fns';

export const DATE_RANGE_OPTIONS = {
  last_7_days: {
    label: 'Last 7 days',
    dateFrom: startOfDay(subDays(new Date(), 6)),
    dateTo: null
  },
  last_30_days: {
    label: 'Last 30 days',
    dateFrom: startOfDay(subDays(new Date(), 29)),
    dateTo: null
  },
  last_90_days: {
    label: 'Last 90 days',
    dateFrom: startOfDay(subDays(new Date(), 89)),
    dateTo: null
  },
  last_year: {
    label: 'Last 365 days',
    dateFrom: startOfDay(subDays(new Date(), 364)),
    dateTo: null
  },
  all_time: {
    label: 'All time',
    dateFrom: null,
    dateTo: null
  }
};

export const getDateRange = (range?: string) => {
  if (!range) {
    return DATE_RANGE_OPTIONS.last_7_days;
  }

  return DATE_RANGE_OPTIONS[range as keyof typeof DATE_RANGE_OPTIONS];
};
