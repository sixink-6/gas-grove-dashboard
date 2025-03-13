
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home,
  Bell,
  Settings,
  User,
  CreditCard,
  FileText,
  Activity,
  BarChart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassMorphism from '../ui/GlassMorphism';

type SidebarItem = {
  label: string;
  icon: React.ElementType;
  path: string;
  active?: boolean;
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Get current path to determine active menu item
  const currentPath = window.location.pathname;

  const mainMenuItems: SidebarItem[] = [
    { label: 'Dashboard', icon: Home, path: '/', active: currentPath === '/' },
    { label: 'Alerting', icon: Bell, path: '/alerting', active: currentPath === '/alerting' },
    { label: 'Monitoring', icon: Activity, path: '/monitoring', active: currentPath === '/monitoring' },
    { label: 'Reporting', icon: FileText, path: '/reporting', active: currentPath === '/reporting' },
    { label: 'Payment & Billing', icon: CreditCard, path: '/billing', active: currentPath === '/billing' },
    { label: 'Settings', icon: Settings, path: '/settings', active: currentPath === '/settings' },
  ];

  const renderMenuItem = (item: SidebarItem) => (
    <Link
      key={item.label}
      to={item.path}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium',
        'transition-colors-200 hover:bg-gas-blue-50 dark:hover:bg-gas-blue-900/20',
        item.active
          ? 'bg-gas-blue-100 text-gas-blue-700 dark:bg-gas-blue-900/30 dark:text-gas-blue-400'
          : 'text-gas-neutral-700 dark:text-gas-neutral-300'
      )}
    >
      <item.icon size={20} />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );

  return (
    <GlassMorphism
      intensity="medium"
      className={cn(
        'fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64',
        'border-r border-gas-neutral-100 dark:border-gas-neutral-800',
        'flex flex-col'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gas-neutral-100 dark:border-gas-neutral-800">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gas-blue-500 text-white rounded-md flex items-center justify-center font-semibold">
              GM
            </div>
            <span className="font-semibold text-gas-neutral-900 dark:text-white">
              Gas Monitor
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="h-8 w-8 mx-auto bg-gas-blue-500 text-white rounded-md flex items-center justify-center font-semibold">
            GM
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1 text-gas-neutral-500 hover:text-gas-neutral-900 dark:hover:text-white hover:bg-gas-neutral-100 dark:hover:bg-gas-neutral-800 transition-colors-200"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">{mainMenuItems.map(renderMenuItem)}</nav>
      </div>

      <div className="p-4 border-t border-gas-neutral-100 dark:border-gas-neutral-800">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-gas-neutral-200 dark:bg-gas-neutral-700 flex items-center justify-center">
            <User size={16} className="text-gas-neutral-600 dark:text-gas-neutral-300" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gas-neutral-900 dark:text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-gas-neutral-500 truncate">
                Administrator
              </p>
            </div>
          )}
        </div>
      </div>
    </GlassMorphism>
  );
};

export default Sidebar;
