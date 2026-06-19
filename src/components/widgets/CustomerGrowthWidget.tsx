import { useState, useEffect } from 'react';
import { useChartData } from '../../hooks/useChartData';
import WidgetCard from './WidgetCard';
import CustomerGrowthChart from '../charts/CustomerGrowthChart';
import StatusIndicator from '../shared/StatusIndicator';

// ✅ LOCAL FALLBACK
const FALLBACK_DATA = [
  { month: 'Jan', customers: 1200 },
  { month: 'Feb', customers: 1450 },
  { month: 'Mar', customers: 1700 },
  { month: 'Apr', customers: 2100 },
  { month: 'May', customers: 2600 },
  { month: 'Jun', customers: 3100 },
];

export default function CustomerGrowthWidget() {
  const { data, loading, error, refetch } = useChartData('growth');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'updated'>('idle');

  const displayData = (data && data.length > 0) ? data : FALLBACK_DATA;

  useEffect(() => {
    if (!loading && displayData && displayData.length > 0) {
      setStatus('updated');
      setLastUpdated(new Date());
    } else if (loading) {
      setStatus('loading');
    }
  }, [loading, displayData]);

  const handleRefresh = async () => {
    setStatus('loading');
    await refetch();
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