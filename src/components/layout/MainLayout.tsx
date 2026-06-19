import { type ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { type Page } from '../../types/page';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function MainLayout({ children, currentPage, setCurrentPage }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="lg:ml-64">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          setCurrentPage={setCurrentPage}
        />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}