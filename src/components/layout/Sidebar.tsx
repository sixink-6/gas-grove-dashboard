
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home,
  BarChart,
  Settings,
  Bell,
  User,
  Gauge,
  Map,
  List,
  History,
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

  const mainMenuItems: SidebarItem[] = [
    { label: 'Dashboard', icon: Home, path: '/', active: true },
    { label: 'Analytics', icon: BarChart, path: '/analytics' },
    { label: 'Monitoring', icon: Gauge, path: '/monitoring' },
    { label: 'Map View', icon: Map, path: '/map-view' },
    { label: 'History', icon: History, path: '/history' },
    { label: 'Reports', icon: List, path: '/reports' },
  ];

  const secondaryMenuItems: SidebarItem[] = [
    { label: 'Alerts', icon: Bell, path: '/alerts' },
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'Account', icon: User, path: '/account' },
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

        <div className="mt-8 pt-4 border-t border-gas-neutral-100 dark:border-gas-neutral-800">
          <p className={cn("px-3 mb-2 text-xs uppercase text-gas-neutral-500", collapsed && "sr-only")}>
            System
          </p>
          <nav className="space-y-1">{secondaryMenuItems.map(renderMenuItem)}</nav>
        </div>
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
