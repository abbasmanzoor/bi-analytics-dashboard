import { RefreshCw } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'idle' | 'loading' | 'updated';
  lastUpdated: Date | null;
  onRefresh: () => void;
}

export default function StatusIndicator({ status, lastUpdated, onRefresh }: StatusIndicatorProps) {
  const getStatusText = () => {
    if (status === 'loading') return 'Updating...';
    if (status === 'updated' && lastUpdated) {
      const diff = Math.floor((Date.now() - lastUpdated.getTime()) / 60000);
      if (diff < 1) return 'Updated just now';
      return `Last Updated: ${diff} min ago`;
    }
    return 'Ready';
  };

  return (
    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
      <span className="flex items-center gap-1">
        <span className={`inline-block w-2 h-2 rounded-full ${status === 'loading' ? 'animate-pulse bg-yellow-500' : 'bg-green-500'}`} />
        {getStatusText()}
      </span>
      <button
        onClick={onRefresh}
        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        disabled={status === 'loading'}
      >
        <RefreshCw size={14} className={status === 'loading' ? 'animate-spin' : ''} />
      </button>
    </div>
  );
}