import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home,
  Bell,
  Settings,
  User,
  CreditCard,
  FileText,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  KeyRound
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassMorphism from '../ui/GlassMorphism';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

type SidebarItem = {
  label: string;
  icon: React.ElementType;
  path: string;
  active?: boolean;
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  const currentPath = window.location.pathname;

  const mainMenuItems: SidebarItem[] = [
    { label: 'Dashboard', icon: Home, path: '/', active: currentPath === '/' },
    { label: 'Alerting', icon: Bell, path: '/alerting', active: currentPath === '/alerting' },
    { label: 'Reporting', icon: FileText, path: '/reporting', active: currentPath === '/reporting' },
    { label: 'Payment & Billing', icon: CreditCard, path: '/billing', active: currentPath === '/billing' },
    { label: 'User Management', icon: Settings, path: '/settings', active: currentPath === '/settings' },
  ];

  const handleChangePassword = () => {
    toast({
      title: "Change Password",
      description: "Password change functionality will be implemented soon.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

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
      onClick={() => isMobile && setMobileMenuOpen(false)}
    >
      <item.icon size={20} />
      {(!collapsed || isMobile) && <span>{item.label}</span>}
    </Link>
  );

  const mobileMenuButton = isMobile && (
    <button 
      onClick={toggleMobileMenu}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gas-blue-500 text-white shadow-lg"
    >
      {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  const userProfileSection = (
    <div className="p-4 border-t border-gas-neutral-100 dark:border-gas-neutral-800">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={cn(
            "flex items-center gap-3 cursor-pointer rounded-lg hover:bg-gas-neutral-100 dark:hover:bg-gas-neutral-700 p-1",
            collapsed && !isMobile && "justify-center"
          )}>
            <div className="h-8 w-8 rounded-full bg-gas-neutral-200 dark:bg-gas-neutral-700 flex items-center justify-center">
              <User size={16} className="text-gas-neutral-600 dark:text-gas-neutral-300" />
            </div>
            {(!collapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gas-neutral-900 dark:text-white truncate">
                  John Doe
                </p>
                <p className="text-xs text-gas-neutral-500 truncate">
                  Administrator
                </p>
              </div>
            )}
            {(!collapsed || isMobile) && (
              <Settings size={16} className="text-gas-neutral-500" />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleChangePassword} className="cursor-pointer">
            <KeyRound className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {mobileMenuButton}
        
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleMobileMenu}
        ></div>
        
        <GlassMorphism
          intensity="medium"
          className={`fixed top-0 left-0 z-40 h-screen w-64 transition-transform duration-300 ease-in-out border-r border-gas-neutral-100 dark:border-gas-neutral-800 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gas-neutral-100 dark:border-gas-neutral-800">
            <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="h-8 w-8 bg-gas-blue-500 text-white rounded-md flex items-center justify-center font-semibold">
                GM
              </div>
              <span className="font-semibold text-gas-neutral-900 dark:text-white">
                Gas Monitor
              </span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">{mainMenuItems.map(renderMenuItem)}</nav>
          </div>

          {userProfileSection}
        </GlassMorphism>
      </>
    );
  }

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

      {userProfileSection}
    </GlassMorphism>
  );
};

export default Sidebar;
