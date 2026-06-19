import { type ReactNode } from 'react';
import DropdownMenu from '../shared/DropdownMenu';   // ✅ correct relative path

interface WidgetCardProps {
  title: string;
  children: ReactNode;
  menuOptions?: { label: string; onClick: () => void; icon?: React.ReactNode }[];
  status?: ReactNode;
}

export default function WidgetCard({ title, children, menuOptions, status }: WidgetCardProps) {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4 transition-colors relative">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-center gap-2">
          {status && <div>{status}</div>}
          {menuOptions && <DropdownMenu options={menuOptions} />}
        </div>
      </div>
      {children}
    </div>
  );
}