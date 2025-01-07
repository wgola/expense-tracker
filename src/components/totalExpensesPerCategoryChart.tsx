'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCallback } from 'react';
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';

const COLORS = ['#A9A9A9', '#B0C4DE', '#C0C0C0', '#D3D3D3', '#DCDCDC', '#E0E0E0', '#F5F5F5'];

export default function TotalExpensesPerCategoryChart({
  data
}: Readonly<{
  data: { category: string; totalAmount: number }[];
}>) {
  const tooltipFormatter = useCallback((value: ValueType) => formatCurrency(value as number), []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="totalAmount" nameKey="category" isAnimationActive data={data}>
          {data.map((entry, index) => (
            <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={tooltipFormatter} separator=": " />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
