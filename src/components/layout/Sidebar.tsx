import { Home, BarChart3, Users, Settings, X, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Page = 'dashboard' | 'analytics' | 'reports' | 'customers' | 'settings';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Sidebar({ isOpen, onClose, currentPage, setCurrentPage }: SidebarProps) {
  const { t } = useTranslation();

  const navItems = [
    { id: 'dashboard', name: t('dashboard'), icon: Home },
    { id: 'analytics', name: t('analytics'), icon: BarChart3 },
    { id: 'reports', name: t('reports'), icon: BarChart3 },
    { id: 'customers', name: t('customers'), icon: Users },
    { id: 'settings', name: t('settings'), icon: Settings },
  ];

  const handleNavigation = (id: string) => {
    setCurrentPage(id as Page);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full w-64 
          bg-white dark:bg-[#0f172a] 
          text-gray-900 dark:text-white 
          border-r border-gray-200 dark:border-gray-800
          flex flex-col transition-all duration-300 ease-in-out z-50 
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg lg:hidden hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <X size={20} className="text-gray-700 dark:text-gray-300" />
        </button>

        {/* Logo + Website Name */}
        <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
          <img
            src="/assets/business-logo.png"
            alt="BI Analytics Logo"
            className="w-10 h-10 object-contain rounded-lg"
          />
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">BI Analytics</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Enterprise Suite</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 
                text-gray-700 dark:text-gray-300 
                hover:bg-gray-100 dark:hover:bg-gray-700 
                hover:text-gray-900 dark:hover:text-white
                transition-all duration-200 
                ${currentPage === item.id ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : ''}
              `}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <button className="flex items-center gap-3 px-2 py-2 w-full 
            text-gray-700 dark:text-gray-300 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            hover:text-gray-900 dark:hover:text-white
            rounded-lg transition-all duration-200"
          >
            <LogOut size={20} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}