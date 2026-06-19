import { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

interface DropdownMenuProps {
  options: { label: string; onClick: () => void; icon?: React.ReactNode }[];
  className?: string;
}

export default function DropdownMenu({ options, className = '' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        aria-label="More options"
      >
        <MoreVertical size={18} className="text-gray-500 dark:text-gray-400" />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-[#1e293b] rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                opt.onClick();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              {opt.icon && <span className="w-4">{opt.icon}</span>}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}