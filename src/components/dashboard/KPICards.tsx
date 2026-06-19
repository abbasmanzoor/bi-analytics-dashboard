import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Percent } from 'lucide-react';

const kpiData = [
  { title: 'Total Revenue', value: '$54,239', change: 12.5, icon: <DollarSign size={24} />, color: 'bg-blue-500' },
  { title: 'Total Customers', value: '4,293', change: 8.2, icon: <Users size={24} />, color: 'bg-green-500' },
  { title: 'Total Orders', value: '1,284', change: 5.7, icon: <ShoppingBag size={24} />, color: 'bg-purple-500' },
  { title: 'Monthly Growth', value: '+23.5%', change: 3.1, icon: <TrendingUp size={24} />, color: 'bg-orange-500' },
  { title: 'Conversion Rate', value: '3.24%', change: -1.2, icon: <Percent size={24} />, color: 'bg-red-500' },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpiData.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{kpi.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</p>
              <div className="flex items-center gap-1 mt-2">
                {kpi.change > 0 ? <TrendingUp size={14} className="text-green-500" /> : <TrendingDown size={14} className="text-red-500" />}
                <span className={`text-xs font-medium ${kpi.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.change > 0 ? `+${kpi.change}%` : `${kpi.change}%`}
                </span>
                <span className="text-xs text-gray-400">from last month</span>
              </div>
            </div>
            <div className={`${kpi.color} p-2 rounded-lg text-white`}>{kpi.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}