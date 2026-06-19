import { useState, useRef, useEffect } from 'react';
import { LogOut, Upload, Pencil, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';


export default function ProfileDropdown() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>(() => {
    return localStorage.getItem('userAvatar') || '';
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // User info state – stored in localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userInfo');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return { name: 'User', email: 'user@example.com', role: 'Analyst' };
  });

  // Local copies for editing
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editRole, setEditRole] = useState(user.role);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsEditing(false); // close edit mode too
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync user info when changed
  const saveUserInfo = (newUser: typeof user) => {
    setUser(newUser);
    localStorage.setItem('userInfo', JSON.stringify(newUser));
    setEditName(newUser.name);
    setEditEmail(newUser.email);
    setEditRole(newUser.role);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setAvatar(result);
      localStorage.setItem('userAvatar', result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const getInitials = () => {
    if (!user.name) return 'U';
    const parts = user.name.split(' ');
    if (parts.length >= 2) return parts[0][0] + parts[1][0];
    return user.name.slice(0, 2).toUpperCase();
  };

  const avatarSrc = avatar || '';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar button with hover effect */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:ring-2 hover:ring-primary-500 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none relative group"
        aria-label="Profile"
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 group-hover:border-primary-500 transition-all"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center text-sm font-bold border-2 border-gray-300 dark:border-gray-600 group-hover:border-primary-500 transition-all">
            {getInitials()}
          </div>
        )}
        {/* Subtle glow ring on hover */}
        <span className="absolute inset-0 rounded-full ring-2 ring-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-110 group-hover:scale-100" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
            {/* Avatar in dropdown */}
            <div className="flex-shrink-0">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center text-2xl font-bold">
                  {getInitials()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                // Edit mode
                <div className="space-y-1">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full text-sm font-semibold bg-transparent border-b border-primary-500 focus:outline-none text-gray-900 dark:text-white"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full text-xs bg-transparent border-b border-primary-500 focus:outline-none text-gray-500 dark:text-gray-400"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full text-xs bg-transparent border-b border-primary-500 focus:outline-none text-primary-600 dark:text-primary-400"
                    placeholder="Role"
                  />
                </div>
              ) : (
                // Display mode
                <>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  <p className="text-xs text-primary-600 dark:text-primary-400">{user.role}</p>
                </>
              )}
            </div>
          </div>

          <div className="p-2 space-y-1">
            {/* Add / Change Photo button */}
            <button
              onClick={triggerFileInput}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <Upload size={16} />
              <span>{avatar ? t('changePhoto') || 'Change Photo' : t('addPhoto') || 'Add Photo'}</span>
            </button>

            {/* Edit / Save button */}
            {isEditing ? (
              <button
                onClick={() => {
                  // Save changes
                  const updated = { name: editName, email: editEmail, role: editRole };
                  saveUserInfo(updated);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition"
              >
                <Check size={16} />
                <span>{t('save') || 'Save'}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditName(user.name);
                  setEditEmail(user.email);
                  setEditRole(user.role);
                  setIsEditing(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
              >
                <Pencil size={16} />
                <span>{t('editProfile') || 'Edit Profile'}</span>
              </button>
            )}

            {/* Logout */}
            <button
              onClick={() => {
                alert('Logout clicked');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
            >
              <LogOut size={16} />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}          