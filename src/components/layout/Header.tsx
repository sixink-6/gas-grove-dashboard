
import React from 'react';
import { Bell, Search, Settings, Moon, Sun, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassMorphism from '../ui/GlassMorphism';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  sidebarCollapsed?: boolean;
}

export const Header = ({ title = "Dashboard", subtitle, sidebarCollapsed = false }: HeaderProps) => {
  // This would be connected to a theme provider in a real app
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would toggle the theme in the theme provider
  };

  return (
    <GlassMorphism
      intensity="light"
      className={cn(
        'sticky top-0 z-30 w-full border-b border-gas-neutral-100 dark:border-gas-neutral-800',
        'transition-all duration-300 ease-in-out',
        'animate-fade-in'
      )}
    >
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className={cn("flex-1", !isMobile && (sidebarCollapsed ? "pl-16" : "pl-0"))}>
          <div className="flex items-center">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gas-neutral-900 dark:text-white">{title}</h1>
              {subtitle && <p className="text-xs sm:text-sm text-gas-neutral-500">{subtitle}</p>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isMobile && (
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gas-neutral-400" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="py-2 pl-10 pr-4 w-64 rounded-lg border border-gas-neutral-200 bg-white/50 dark:bg-black/20 dark:border-gas-neutral-700 focus:outline-none focus:ring-2 focus:ring-gas-blue-500 dark:focus:ring-gas-blue-400 text-gas-neutral-900 dark:text-white text-sm backdrop-blur-sm transition-all duration-200"
              />
            </div>
          )}

          <button className="p-2 rounded-lg text-gas-neutral-500 hover:text-gas-neutral-900 dark:hover:text-white hover:bg-gas-neutral-100 dark:hover:bg-gas-neutral-800 transition-colors-200">
            <Bell className="h-5 w-5" />
          </button>

          <button 
            className="p-2 rounded-lg text-gas-neutral-500 hover:text-gas-neutral-900 dark:hover:text-white hover:bg-gas-neutral-100 dark:hover:bg-gas-neutral-800 transition-colors-200"
            onClick={toggleTheme}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {!isMobile && (
            <button className="p-2 rounded-lg text-gas-neutral-500 hover:text-gas-neutral-900 dark:hover:text-white hover:bg-gas-neutral-100 dark:hover:bg-gas-neutral-800 transition-colors-200">
              <Settings className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </GlassMorphism>
  );
};

export default Header;
