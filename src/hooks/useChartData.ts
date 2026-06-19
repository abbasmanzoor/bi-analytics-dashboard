import { useState } from 'react';
import { type DateRange } from '../types/widget.types';

type DataType = 'revenue' | 'sales' | 'category' | 'growth';

// ✅ Static data – no API
const STATIC_DATA: Record<DataType, any[]> = {
  revenue: [
    { month: 'Jan', revenue: 32000 },
    { month: 'Feb', revenue: 35000 },
    { month: 'Mar', revenue: 38000 },
    { month: 'Apr', revenue: 42000 },
    { month: 'May', revenue: 48000 },
    { month: 'Jun', revenue: 54239 },
  ],
  sales: [
    { category: 'Electronics', sales: 18500 },
    { category: 'Clothing', sales: 12500 },
    { category: 'Home & Living', sales: 9800 },
    { category: 'Books', sales: 4200 },
  ],
  category: [
    { name: 'Solvency', value: 45 },
    { name: 'Revenue', value: 30 },
    { name: 'Handles', value: 15 },
    { name: 'Other', value: 10 },
  ],
  growth: [
    { month: 'Jan', customers: 1200 },
    { month: 'Feb', customers: 1450 },
    { month: 'Mar', customers: 1700 },
    { month: 'Apr', customers: 2100 },
    { month: 'May', customers: 2600 },
    { month: 'Jun', customers: 3100 },
  ],
};

export function useChartData(type: DataType, dateRange?: DateRange) {
  const [data] = useState(STATIC_DATA[type]);
  const [loading] = useState(false);
  const [error] = useState(null);

  const refetch = () => {};

  return { data, loading, error, refetch };
}