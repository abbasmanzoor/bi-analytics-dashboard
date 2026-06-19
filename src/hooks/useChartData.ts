import { useState, useEffect } from 'react';
import api from '../services/api';
import { type DateRange } from '../types/widget.types';

type DataType = 'revenue' | 'sales' | 'category' | 'growth';

export function useChartData(type: DataType, dateRange?: DateRange) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = '';
      const params: any = {};
      if (dateRange) params.range = dateRange;
      switch (type) {
        case 'revenue':
          endpoint = '/revenue';
          break;
        case 'sales':
          endpoint = '/sales';
          break;
        case 'category':
          endpoint = '/category';
          break;
        case 'growth':
          endpoint = '/growth';
          break;
        default:
          throw new Error('Invalid type');
      }
      const response = await api.get(endpoint, { params });
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
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