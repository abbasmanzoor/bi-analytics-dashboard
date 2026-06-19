import { useState, useEffect } from 'react';
import { useChartData } from '../../hooks/useChartData';
import WidgetCard from './WidgetCard';
import CustomerGrowthChart from '../charts/CustomerGrowthChart';
import StatusIndicator from '../shared/StatusIndicator';

export default function CustomerGrowthWidget() {
  const { data, loading, error, refetch } = useChartData('growth');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<'idle' | 'loading' | 'updated'>('updated');

  const displayData = data && data.length > 0 ? data : [];

  useEffect(() => {
    setStatus('updated');
    setLastUpdated(new Date());
  }, []);

  const handleRefresh = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('updated');
      setLastUpdated(new Date());
    }, 500);
    refetch();
  };

  return (
    <WidgetCard
      title="Customer Growth"
      status={<StatusIndicator status={status} lastUpdated={lastUpdated} onRefresh={handleRefresh} />}
    >
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
        </div>
      ) : (
        <CustomerGrowthChart data={displayData} />
      )}
    </WidgetCard>
  );
}