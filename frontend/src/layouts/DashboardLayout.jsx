import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Folder,
  TrendingUp,
  Mail,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Search,
  Bell,
  Plus,
  Menu,
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Overview', path: '/dashboard', icon: LayoutGrid },
  { name: 'Projects', path: '/dashboard/projects', icon: Folder },
  { name: 'Insights', path: '/dashboard/insights', icon: TrendingUp },
  { name: 'Messages', path: '/dashboard/messages', icon: Mail },
  { name: 'Calendar', path: '/dashboard/calendar', icon: Calendar },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FAFAFA] font-sans text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Sidebar (Desktop Collapsible & Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r border-neutral-200 bg-white transition-all duration-300 ease-in-out select-none lg:static ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarOpen ? 'w-[240px]' : 'w-[76px]'}`}
      >
        {/* Toggle Pill Button (Border anchored on desktop) */}
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="absolute -right-3.5 top-12 z-20 hidden h-7 w-7 items-center justify-center rounded-full border border-neutral-300/80 bg-[#F4F4F5] text-neutral-600 shadow-xs transition-colors hover:bg-neutral-200 lg:flex cursor-pointer"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {/* Top Header & Brand */}
        <div>
          <div className="flex h-20 items-center px-6">
            <div className="flex items-center gap-3.5">
              {/* Brand Geometric Grid Glyph */}
              <div className="h-7 w-7 shrink-0 text-black">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-full w-full"
                >
                  <path d="M2 3h9v8H2zM13 3h9v4h-9zM13 9h9v12h-9zM2 13h9v8H2z" />
                </svg>
              </div>
              {sidebarOpen && (
                <span className="text-[17px] font-extrabold tracking-widest text-neutral-900">
                  SELECT
                </span>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 space-y-1.5 px-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex h-11 items-center gap-3.5 rounded-xl transition-colors ${
                      sidebarOpen ? 'px-4' : 'justify-center px-0'
                    } ${
                      isActive
                        ? 'bg-[#EFEFEF] font-semibold text-neutral-900'
                        : 'font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="h-4 w-4 shrink-0 stroke-[2]" />
                      {sidebarOpen && (
                        <span className="text-xs tracking-tight">
                          {item.name}
                        </span>
                      )}
                      {/* Active Indicator Strip */}
                      {isActive && (
                        <span
                          className={`absolute w-1 rounded-full bg-black ${
                            sidebarOpen ? 'right-2 h-4' : 'right-1 h-3.5'
                          }`}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card Session Footer */}
        <div className="mb-4 p-3">
          {sidebarOpen ? (
            <div className="flex items-center justify-between rounded-xl border border-neutral-200/90 bg-white p-2.5 shadow-2xs">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                  alt="Alex Mercer"
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
                <div className="truncate text-left">
                  <p className="truncate text-xs font-semibold text-neutral-900">
                    Alex Mercer
                  </p>
                  <p className="truncate text-[10px] text-neutral-400">
                    Product Lead
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                alt="Alex Mercer"
                className="h-8 w-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-neutral-400 transition-all"
                onClick={handleLogout}
                title="Alex Mercer (Click to Logout)"
              />
            </div>
          )}
        </div>
      </aside>

      {/* Main View Shell */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar Header */}
        <header className="flex h-20 items-center justify-between px-4 sm:px-8 bg-transparent">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-700 shadow-2xs lg:hidden cursor-pointer"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Search Input Container */}
            <div className="relative w-56 sm:w-72">
              <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search projects, tasks..."
                className="h-9 w-full rounded-lg border border-neutral-300/90 bg-white pl-9 pr-3 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300/90 bg-white text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-lg bg-[#9F9F9F] px-3.5 sm:px-4 text-xs font-semibold text-white hover:bg-neutral-600 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Create Project</span>
            </button>
          </div>
        </header>

        {/* Scrollable Dashboard View */}
        <main className="flex-1 overflow-y-auto px-4 pb-10 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}