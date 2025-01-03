'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCallback } from 'react';
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';

export default function TotalExpensesByDateChart({
  data
}: Readonly<{ data: { date: string; totalAmount: number }[] }>) {
  const tickFormatter = useCallback((tick: number) => formatCurrency(tick), []);
  const tooltipFormatter = useCallback((value: ValueType) => formatCurrency(value as number), []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={tickFormatter} />
        <Tooltip
          cursor={{ fill: 'rgba(211, 211, 211, 0.5)' }}
          formatter={tooltipFormatter}
          separator=": "
        />
        <Bar dataKey="totalAmount" name="Sum of expenses" fill="gray" stroke="black" />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
}
