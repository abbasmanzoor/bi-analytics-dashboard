import { useState, useEffect } from 'react';
import { useChartData } from '../../hooks/useChartData';
import WidgetCard from './WidgetCard';
import CustomerGrowthChart from '../charts/CustomerGrowthChart';
import StatusIndicator from '../shared/StatusIndicator';

export default function CustomerGrowthWidget() {
  const { data, loading, error, refetch } = useChartData('growth');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'updated'>('idle');

  useEffect(() => {
    if (!loading && data) {
      setStatus('updated');
      setLastUpdated(new Date());
    } else if (loading) {
      setStatus('loading');
    }
  }, [loading, data]);

  const handleRefresh = async () => {
    setStatus('loading');
    await refetch();
  };

  if (error) return <WidgetCard title="Customer Growth" status={<span className="text-red-500">Error</span>}><div>Error</div></WidgetCard>;

  return (
    <WidgetCard
      title="Customer Growth"
      status={<StatusIndicator status={status} lastUpdated={lastUpdated} onRefresh={handleRefresh} />}
    >
      {loading ? (
        <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8 border-b-2 border-primary-500" /></div>
      ) : (
        <CustomerGrowthChart data={data} />
      )}
    </WidgetCard>
  );
}