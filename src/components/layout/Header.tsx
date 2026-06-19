import { useState, useEffect, useRef } from 'react';
import { Menu, Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { getSearchIndex, search } from '../../utils/search';
import { type SearchResult } from '../../utils/search';
import { type Page } from '../../types/page';
import { useTransactionStore } from '../../store/transactionStore';
import ProfileDropdown from './ProfileDropdown';

interface HeaderProps {
  onMenuClick: () => void;
  setCurrentPage: (page: Page) => void;
}

export default function Header({ onMenuClick, setCurrentPage }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearchTerm } = useTransactionStore();

  const searchIndex = getSearchIndex();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    const searchResults = search(val, searchIndex);
    setResults(searchResults);
    setIsOpen(val.trim().length > 0);
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setResults([]);
    setIsOpen(false);

    if (result.page) {
      setCurrentPage(result.page as Page);
    }

    if (result.page === 'dashboard' && result.scrollId) {
      setTimeout(() => {
        const el = document.getElementById(result.scrollId!);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }

    if (result.type === 'transaction' && result.page === 'dashboard') {
      setSearchTerm(result.title);
    }
  };

  const handleInputFocus = () => {
    if (query.trim().length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-3 md:px-6 sticky top-0 z-30">
      {/* Left section */}
      <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-shrink">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition flex-shrink-0 cursor-pointer"
          aria-label="Menu"
        >
          <Menu size={20} className="text-gray-700 dark:text-gray-300" />
        </button>

        <div className="overflow-hidden">
          <h1 className="text-sm sm:text-base md:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap truncate">
            <span className="sm:hidden">BI Analytics</span>
            <span className="hidden sm:inline">{t('welcome')}</span>
          </h1>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 relative" ref={searchRef}>
        {/* Search Bar */}
        <div className="relative flex-1 sm:flex-initial min-w-[90px] sm:min-w-0" onClick={() => inputRef.current?.focus()}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
          <input
            ref={inputRef}
            type="text"
            placeholder={t('search') || "Search..."}
            value={query}
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
            className="pl-8 pr-2 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm w-28 sm:w-40 md:w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-400 dark:placeholder-gray-500 cursor-text"
          />
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 sm:w-72 md:w-80 bg-white dark:bg-[#1e293b] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-72 overflow-y-auto z-50">
              {results.length > 0 ? (
                results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 last:border-0 cursor-pointer"
                  >
                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 uppercase flex-shrink-0">
                      {result.type}
                    </span>
                    <div className="overflow-hidden">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{result.title}</div>
                      {result.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{result.description}</div>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* ====== Notification with custom tooltip ====== */}
        <div className="relative group flex-shrink-0">
          <button
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={18} className="sm:size-5 text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full" />
          </button>
          {/* ✅ Tooltip – sirf text, no background */}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none bg-transparent">
            Notifications
          </span>
        </div>

        {/* ====== Dark/Light Toggle with custom tooltip ====== */}
        <div className="relative group flex-shrink-0">
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} className="sm:size-5 text-gray-700" /> : <Sun size={18} className="sm:size-5 text-yellow-500" />}
          </button>
          {/* ✅ Tooltip – dynamically shows "Dark" or "Light" */}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none bg-transparent">
            {theme === 'light' ? 'Dark' : 'Light'}
          </span>
        </div>

        {/* ====== Profile with custom tooltip ====== */}
        <div className="relative group flex-shrink-0">
          <ProfileDropdown />
          {/* ✅ Tooltip for profile */}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none bg-transparent">
            Profile
          </span>
        </div>
      </div>
    </header>
  );
}