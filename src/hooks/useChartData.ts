import { useState, useEffect } from 'react';
import api from '../services/api';
import { type DateRange } from '../types/widget.types';

type DataType = 'revenue' | 'sales' | 'category' | 'growth';

// ✅ Strong fallback – guaranteed data
const FALLBACK_DATA: Record<DataType, any[]> = {
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
  // ✅ Always start with fallback
  const [data, setData] = useState<any[]>(FALLBACK_DATA[type]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = '';
      switch (type) {
        case 'revenue': endpoint = '/revenue'; break;
        case 'sales': endpoint = '/sales'; break;
        case 'category': endpoint = '/category'; break;
        case 'growth': endpoint = '/growth'; break;
        default: throw new Error('Invalid type');
      }
      const response = await api.get(endpoint);
      console.log(`✅ API success for ${type}:`, response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setData(response.data); // Replace with real data
      }
    } catch (err: any) {
      console.warn(`⚠️ API failed for ${type}, keeping fallback:`, err.message);
      setError(err.message);
      // ✅ Keep fallback – do NOT set empty array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, dateRange]);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
}