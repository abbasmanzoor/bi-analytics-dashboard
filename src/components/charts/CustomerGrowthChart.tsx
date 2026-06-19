import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

interface CustomerGrowthChartProps {
  data: { month: string; customers: number }[];
}

export default function CustomerGrowthChart({ data }: CustomerGrowthChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Empty state handling
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
          <XAxis dataKey="month" stroke={isDark ? '#94a3b8' : '#64748b'} />
          <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#fff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="customers"
            stroke="#8b5cf6"
            fill="url(#colorCustomers)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}