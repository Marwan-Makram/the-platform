import React, { useState, useEffect } from 'react';
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
  Menu,
  X,
  Briefcase,
  MessageCircle,
  CheckCircle,
  Flag,
  Clock,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import SelectLogo from '@/components/ui/SelectLogo';

const NAV_ITEMS = [
  { name: 'Overview', path: '/dashboard', icon: LayoutGrid, activeItem: true },
  { name: 'Projects', path: '/dashboard', icon: Folder, activeItem: false },
  { name: 'Insights', path: '/dashboard', icon: TrendingUp, activeItem: false },
  { name: 'Messages', path: '/dashboard', icon: Mail, badge: 2, activeItem: false },
  { name: 'Calendar', path: '/dashboard', icon: Calendar, activeItem: false },
  { name: 'Settings', path: '/dashboard', icon: Settings, activeItem: false },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    section: 'today',
    title: 'Marwan A.',
    time: '2m ago',
    unread: true,
    iconType: 'briefcase',
    iconBg: 'bg-[#E4E9F3]',
    iconColor: 'text-[#30497D]',
    body: 'Assigned to Concept Society redesign. Review scope, milestones, and kickoff checklist.',
    actionType: 'accept_decline',
    decision: null, // null | 'accepted' | 'declined'
  },
  {
    id: 'n2',
    section: 'today',
    title: 'Calendar',
    time: '18m ago',
    unread: true,
    iconType: 'calendar',
    iconBg: 'bg-[#EAF3DD]',
    iconColor: 'text-[#253C6D]',
    body: 'Concept Society redesign is due in 3 days. Review latest files and confirm availability.',
    actionType: 'link',
    actionLabel: 'Open calendar',
    actionPath: '/dashboard',
  },
  {
    id: 'n3',
    section: 'today',
    title: 'Karim E.',
    time: '45m ago',
    unread: true,
    iconType: 'message',
    iconBg: 'bg-[#E4E9F3]',
    iconColor: 'text-[#30497D]',
    body: 'Karim replied to your comment on the homepage hero section and mentioned you.',
    actionType: 'link',
    actionLabel: 'Open thread',
    actionPath: '/dashboard',
  },
  {
    id: 'n4',
    section: 'today',
    title: 'Profile review',
    time: '1h ago',
    unread: false,
    iconType: 'check',
    iconBg: 'bg-[#EAF3DD]',
    iconColor: 'text-[#253C6D]',
    body: 'Profile status updated to approved. Access full workspace and billing tools.',
    actionType: 'link',
    actionLabel: 'Open profile',
    actionPath: '/dashboard/profile',
  },
  {
    id: 'n5',
    section: 'earlier',
    title: 'Calendar',
    time: '2h ago',
    unread: false,
    iconType: 'calendar',
    iconBg: 'bg-[#EAF3DD]',
    iconColor: 'text-[#253C6D]',
    body: 'Calendar is empty next week. Add blocks for reviews and syncs.',
    actionType: 'link',
    actionLabel: 'Open calendar',
    actionPath: '/dashboard',
  },
  {
    id: 'n6',
    section: 'earlier',
    title: 'Project status',
    time: '4h ago',
    unread: false,
    iconType: 'flag',
    iconBg: 'bg-[#EAF3DD]',
    iconColor: 'text-[#253C6D]',
    body: 'Concept Society redesign hit “wireframes approved”. Next step is visual design review.',
    actionType: 'link',
    actionLabel: 'Open project',
    actionPath: '/dashboard',
  },
  {
    id: 'n7',
    section: 'earlier',
    title: 'Project status',
    time: '6h ago',
    unread: false,
    iconType: 'clock',
    iconBg: 'bg-[#EAF3DD]',
    iconColor: 'text-[#253C6D]',
    body: 'Concept Society redesign deadline moved to next Friday. Updated timeline is live.',
    actionType: 'link',
    actionLabel: 'Open project',
    actionPath: '/dashboard',
  },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState('all'); // 'all' | 'unread'
  const [showEarlier, setShowEarlier] = useState(true);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('select_theme_dark') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('select_theme_dark', String(darkMode));
    } catch {
      // ignore storage errors
    }
  }, [darkMode]);

  const navigate = useNavigate();
  const { user } = useAuth();

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = (e) => {
    e.stopPropagation();
    navigate('/login');
  };

  const handleOpenProfile = () => {
    navigate('/dashboard/profile');
    setMobileMenuOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        unread: false,
        decision: n.actionType === 'accept_decline' && !n.decision ? 'accepted' : n.decision,
      }))
    );
    setNotifFilter('all');
    setShowEarlier(true);
  };

  const handleNotificationDecision = (id, decision) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, decision, unread: false } : n))
    );
  };

  const handleNotificationActionClick = (id, path) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    setNotificationsOpen(false);
    if (path) navigate(path);
  };

  const renderNotifIcon = (type, colorClass) => {
    switch (type) {
      case 'briefcase':
        return <Briefcase className={`h-4 w-4 ${colorClass}`} />;
      case 'calendar':
        return <Calendar className={`h-4 w-4 ${colorClass}`} />;
      case 'message':
        return <MessageCircle className={`h-4 w-4 ${colorClass}`} />;
      case 'check':
        return <CheckCircle className={`h-4 w-4 ${colorClass}`} />;
      case 'flag':
        return <Flag className={`h-4 w-4 ${colorClass}`} />;
      case 'clock':
        return <Clock className={`h-4 w-4 ${colorClass}`} />;
      default:
        return <Bell className={`h-4 w-4 ${colorClass}`} />;
    }
  };

  const todayItems = notifications.filter(
    (n) => n.section === 'today' && (notifFilter === 'all' || n.unread)
  );
  const earlierItems = notifications.filter(
    (n) => n.section === 'earlier' && (notifFilter === 'all' || n.unread)
  );

  return (
    <div
      className={`relative flex h-screen w-screen overflow-hidden font-poppins antialiased select-none transition-colors duration-200 ${
        darkMode
          ? 'dark-dashboard bg-[#121B33] text-[#F6F4EF]'
          : 'bg-[#F6F4EF] text-[#16213E]'
      }`}
    >
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Menu */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col justify-between border-r pt-[24px] pb-[32px] px-[24px] transition-all duration-300 ease-in-out md:static shrink-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${sidebarOpen ? 'w-[250px] items-start' : 'w-[92px] items-center'} ${
          darkMode
            ? 'border-[#30497D] bg-[#16213E]'
            : 'border-[#A9B7D6] bg-[#FFFFFF]'
        }`}
      >
        {/* Collapse / Expand Tag Button */}
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className={`absolute -right-3.5 top-[42px] z-30 hidden h-[32px] w-[32px] items-center justify-center rounded-[8px] border shadow-xs transition-colors md:flex cursor-pointer ${
            darkMode
              ? 'border-[#30497D] bg-[#253C6D] text-[#F6F4EF] hover:bg-[#30497D]'
              : 'border-[#A9B7D6] bg-[#E4E9F3] text-[#253C6D] hover:bg-[#d5def0]'
          }`}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4 stroke-[2.2]" />
          ) : (
            <ChevronRight className="h-4 w-4 stroke-[2.2]" />
          )}
        </button>

        {/* Top Section */}
        <div
          className={`flex flex-col gap-[44px] ${
            sidebarOpen ? 'w-[202px] items-start' : 'w-[56px] items-center'
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div
              onClick={() => navigate('/dashboard')}
              className={`flex items-center cursor-pointer ${
                !sidebarOpen ? 'justify-center w-full' : ''
              }`}
            >
              {sidebarOpen ? (
                <div
                  className={
                    darkMode
                      ? 'rounded-[10px] bg-[#F6F4EF] px-2.5 py-1.5 shadow-xs'
                      : ''
                  }
                >
                  <SelectLogo
                    variant="lockup"
                    size="md"
                    className="h-[32px] w-[134px] object-contain object-left"
                  />
                </div>
              ) : (
                <SelectLogo
                  variant="icon"
                  size="md"
                  className="h-[38px] w-[38px] rounded-[8px]"
                />
              )}
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className={`md:hidden p-1 ${
                darkMode
                  ? 'text-[#A9B7D6] hover:text-[#FFFFFF]'
                  : 'text-[#455B8A] hover:text-[#16213E]'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation-Menu */}
          <nav
            className={`flex flex-col w-full ${
              sidebarOpen ? 'gap-[6px] pt-[4px]' : 'gap-[9px]'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => {
                    const active = item.activeItem && isActive;
                    return `group relative flex items-center gap-[12px] rounded-[8px] px-[16px] py-[12px] transition-colors ${
                      sidebarOpen ? 'w-[202px] h-[45px]' : 'w-[56px] h-[42px] justify-center'
                    } ${
                      active
                        ? 'bg-[#253C6D] text-[#FFFFFF] font-semibold'
                        : darkMode
                        ? 'text-[#A9B7D6] font-medium hover:bg-[#1A2B52] hover:text-[#FFFFFF]'
                        : 'text-[#455B8A] font-medium hover:bg-[#F6F4EF] hover:text-[#253C6D]'
                    }`;
                  }}
                >
                  {({ isActive }) => {
                    const active = item.activeItem && isActive;
                    return (
                      <>
                        <Icon
                          className={`h-[18px] w-[18px] shrink-0 stroke-[2] ${
                            active
                              ? 'text-[#FFFFFF]'
                              : darkMode
                              ? 'text-[#A9B7D6] group-hover:text-[#FFFFFF]'
                              : 'text-[#455B8A] group-hover:text-[#253C6D]'
                          }`}
                        />
                        {sidebarOpen && (
                          <span className="flex-1 text-[14px] leading-[21px] truncate">
                            {item.name}
                          </span>
                        )}

                        {/* Unread Badge on Messages */}
                        {item.badge && (
                          <span
                            className={`flex h-[19px] min-w-[18px] items-center justify-center rounded-[10px] bg-[#FF385C] px-[6px] py-[2px] font-poppins text-[10px] font-semibold leading-[15px] text-[#FFFFFF] ${
                              sidebarOpen ? '' : 'absolute left-[34px] top-[20px]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* Active White Indicator */}
                        {active && (
                          <span
                            className={`h-[16px] w-[4px] shrink-0 rounded-[2px] bg-[#FFFFFF] ${
                              sidebarOpen ? '' : 'ml-auto'
                            }`}
                          />
                        )}
                      </>
                    );
                  }}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Profile + Bottom-Left Corner Theme Switcher Button */}
        <div
          className={`flex flex-col gap-[8px] ${
            sidebarOpen ? 'w-[202px] items-start' : 'w-[62.5px] items-center'
          }`}
        >
          {sidebarOpen ? (
            <div
              onClick={handleOpenProfile}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenProfile()}
              className={`flex h-[61px] w-[202px] items-center gap-[12px] rounded-[12px] border p-[12px] transition-colors cursor-pointer ${
                darkMode
                  ? 'border-[#30497D] bg-[#1A2B52] hover:border-[#F2842F]'
                  : 'border-[#A9B7D6] bg-[#F6F4EF] hover:border-[#253C6D]'
              }`}
            >
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
                }
                alt={user?.name || 'Alex Mercer'}
                className="h-[36px] w-[36px] shrink-0 rounded-[18px] object-cover grayscale"
              />
              <div className="flex flex-1 flex-col items-start gap-[2px] min-w-0">
                <p
                  className={`w-full truncate font-poppins text-[13px] font-semibold leading-[20px] ${
                    darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                  }`}
                >
                  {user?.name || 'Alex Mercer'}
                </p>
                <p
                  className={`w-full truncate font-poppins text-[10px] font-normal leading-[15px] ${
                    darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                  }`}
                >
                  {user?.role || 'Product Lead'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className={`shrink-0 transition-colors cursor-pointer ${
                  darkMode
                    ? 'text-[#A9B7D6] hover:text-[#FFFFFF]'
                    : 'text-[#455B8A] hover:text-[#16213E]'
                }`}
                title="Log Out"
              >
                <LogOut className="h-[16px] w-[16px]" />
              </button>
            </div>
          ) : (
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[8px]">
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
                }
                alt={user?.name || 'Alex Mercer'}
                onClick={handleOpenProfile}
                className="h-[36px] w-[36px] rounded-[18px] object-cover grayscale cursor-pointer hover:ring-2 hover:ring-[#F2842F]"
                title={user?.name || 'Alex Mercer'}
              />
            </div>
          )}

          {/* Group 3: Bottom-Left Corner Theme Switcher Pill */}
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`relative h-[30px] w-[62.5px] rounded-[14.2px] border transition-all duration-200 cursor-pointer ${
              darkMode
                ? 'border-[#30497D] bg-[#121B33] shadow-[inset_0_2px_6px_rgba(0,0,0,0.6),0_4px_10px_rgba(0,0,0,0.4)]'
                : 'border-[#A9B7D6] bg-[#FFFFFF] shadow-[-4px_-4px_10px_rgba(233,234,240,0.7),4px_4px_10px_rgba(36,39,44,0.22)]'
            }`}
          >
            <span
              className={`absolute top-[3.5px] flex h-[21.87px] w-[21.87px] items-center justify-center rounded-full bg-[#24272C] shadow-[0_2.84px_2.84px_rgba(0,0,0,0.25),4px_4px_10px_rgba(36,39,44,0.5)] transition-all duration-200 ${
                darkMode ? 'left-[35px]' : 'left-[4.69px]'
              }`}
            >
              {darkMode ? (
                <Moon className="h-[12px] w-[12px] text-[#FFCC00] fill-[#FFCC00]" />
              ) : (
                <Sun className="h-[12.5px] w-[12.5px] text-[#FFCC00] fill-[#FFCC00]" />
              )}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`relative flex flex-1 flex-col h-screen overflow-y-auto px-4 sm:px-6 lg:px-[40px] pt-[24px] pb-[40px] gap-[32px] min-w-0 transition-colors duration-200 ${
          darkMode ? 'bg-[#121B33]' : 'bg-[#F5F6F9]'
        }`}
      >
        {/* Top-Bar */}
        <header className="flex h-[38px] w-full shrink-0 items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-[360px]">
            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] border md:hidden cursor-pointer ${
                darkMode
                  ? 'border-[#30497D] bg-[#16213E] text-[#F6F4EF]'
                  : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#253C6D]'
              }`}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Search-Field */}
            <div
              className={`flex h-[36px] w-full max-w-[320px] items-center gap-[10px] rounded-[8px] border px-[16px] py-[8px] transition-colors ${
                darkMode
                  ? 'border-[#30497D] bg-[#16213E]'
                  : 'border-[#A9B7D6] bg-[#FFFFFF]'
              }`}
            >
              <Search
                className={`h-[16px] w-[16px] shrink-0 stroke-[2] ${
                  darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, tasks..."
                className={`w-full bg-transparent font-poppins text-[13px] font-normal leading-[20px] focus:outline-none ${
                  darkMode
                    ? 'text-[#F6F4EF] placeholder:text-[#A9B7D6]'
                    : 'text-[#16213E] placeholder:text-[#455B8A]'
                }`}
              />
            </div>
          </div>

          {/* Top-Actions */}
          <div className="flex items-center gap-[16px]">
            <button
              type="button"
              onClick={() => setNotificationsOpen((prev) => !prev)}
              aria-label="Notifications"
              className={`relative flex h-[38px] w-[38px] items-center justify-center rounded-[8px] p-[10px] transition-colors cursor-pointer ${
                notificationsOpen
                  ? darkMode
                    ? 'bg-[#1A2B52] border border-[#30497D] text-[#A9B7D6]'
                    : 'bg-[#F6F4EF] border border-[#A9B7D6] text-[#A9B7D6]'
                  : unreadCount > 0
                  ? darkMode
                    ? 'bg-[#16213E] border border-[#F2842F] text-[#F2842F]'
                    : 'bg-[#FFFFFF] border border-[#F2842F] text-[#F2842F]'
                  : darkMode
                  ? 'bg-[#16213E] border border-[#30497D] text-[#A9B7D6]'
                  : 'bg-[#F6F4EF] border border-[#A9B7D6] text-[#455B8A]'
              }`}
            >
              <Bell className="h-[18px] w-[18px] stroke-[2]" />
              {unreadCount > 0 && !notificationsOpen && (
                <span className="absolute -left-[6px] top-[24px] flex h-[19px] min-w-[18px] items-center justify-center rounded-[10px] bg-[#FF385C] px-[6px] py-[2px] font-poppins text-[10px] font-semibold leading-[15px] text-[#F6F4EF]">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="w-full flex-1">
          <Outlet
            context={{
              searchQuery,
              darkMode,
              setDarkMode,
              openNotifications: () => setNotificationsOpen(true),
              notifications,
              onNotificationDecision: handleNotificationDecision,
            }}
          />
        </main>
      </div>

      {/* Notifications Side Window Backdrop */}
      {notificationsOpen && (
        <div
          onClick={() => setNotificationsOpen(false)}
          className="fixed inset-0 z-40 bg-black/25"
        />
      )}

      {/* Notifications-Side-Window */}
      {notificationsOpen && (
        <aside
          aria-label="Notifications panel"
          className={`fixed right-0 top-0 z-50 flex h-full w-full sm:w-[624px] flex-col items-start gap-[16px] overflow-y-auto rounded-l-[15px] border px-[24px] py-[16px] shadow-[5px_20px_50px_rgba(0,0,0,0.35)] transition-colors ${
            darkMode
              ? 'border-[#30497D] bg-[#16213E] text-[#F6F4EF]'
              : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E]'
          }`}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setNotificationsOpen(false)}
            aria-label="Close notifications"
            className={`flex h-[24px] w-[24px] -ml-1 items-center justify-center rounded-md transition-colors cursor-pointer ${
              darkMode
                ? 'text-[#A9B7D6] hover:bg-[#1A2B52] hover:text-[#FFFFFF]'
                : 'text-[#455B8A] hover:bg-[#F6F4EF] hover:text-[#16213E]'
            }`}
          >
            <X className="h-[16px] w-[16px] stroke-[2]" />
          </button>

          {/* thread-header */}
          <div className="flex w-full flex-col items-start gap-[12px]">
            {/* header-top */}
            <div className="flex h-[25px] w-full flex-row items-center justify-between">
              <span
                className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                  darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                }`}
              >
                Notifications
              </span>

              {/* thread-meta */}
              <div className="flex flex-row items-center gap-[8px]">
                <span
                  className={`flex h-[25px] items-center justify-center rounded-full px-[8px] py-[4px] font-poppins text-[11px] font-semibold leading-[16px] ${
                    darkMode
                      ? 'bg-[#253C6D] text-[#E4E9F3]'
                      : 'bg-[#E4E9F3] text-[#30497D]'
                  }`}
                >
                  {unreadCount} unread
                </span>
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  className={`font-poppins text-[13px] font-medium leading-[20px] transition-colors cursor-pointer ${
                    darkMode
                      ? 'text-[#A9B7D6] hover:text-[#FFFFFF]'
                      : 'text-[#455B8A] hover:text-[#16213E]'
                  }`}
                >
                  Mark all as read
                </button>
              </div>
            </div>

            {/* filters */}
            <div className="flex h-[34px] flex-row items-center gap-[8px]">
              <button
                type="button"
                onClick={() => setNotifFilter('all')}
                className={`flex h-[34px] items-center justify-center rounded-full border px-[12px] py-[8px] font-poppins text-[12px] font-semibold leading-[18px] transition-colors cursor-pointer ${
                  darkMode
                    ? notifFilter === 'all'
                      ? 'border-[#F2842F] bg-[#253C6D] text-[#FFFFFF]'
                      : 'border-[#30497D] bg-[#121B33] text-[#A9B7D6] hover:bg-[#1A2B52]'
                    : notifFilter === 'all'
                    ? 'border-[#A9B7D6] bg-[#E4E9F3] text-[#16213E]'
                    : 'border-[#A9B7D6] bg-[#F6F4EF] text-[#16213E] hover:bg-[#E4E9F3]/60'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setNotifFilter('unread')}
                className={`flex h-[34px] items-center justify-center rounded-full px-[12px] py-[8px] font-poppins text-[12px] font-semibold leading-[18px] transition-colors cursor-pointer ${
                  darkMode
                    ? notifFilter === 'unread'
                      ? 'border border-[#F2842F] bg-[#253C6D] text-[#FFFFFF]'
                      : 'border border-[#30497D] bg-[#121B33] text-[#A9B7D6] hover:bg-[#1A2B52]'
                    : notifFilter === 'unread'
                    ? 'bg-[#E4E9F3] text-[#30497D]'
                    : 'border border-[#A9B7D6] bg-[#F6F4EF] text-[#16213E] hover:bg-[#E4E9F3]/60'
                }`}
              >
                Unread
              </button>
            </div>
          </div>

          {/* notification-thread */}
          <div className="flex w-full flex-col items-start gap-[16px]">
            {/* today-section */}
            <div className="flex w-full flex-col items-start gap-[12px]">
              <div className="flex h-[18px] w-full flex-row items-center justify-between">
                <span
                  className={`font-poppins text-[12px] font-semibold leading-[18px] ${
                    darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                  }`}
                >
                  Today
                </span>
                <span
                  className={`font-poppins text-[12px] font-medium leading-[18px] ${
                    darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                  }`}
                >
                  {todayItems.length} items
                </span>
              </div>

              {todayItems.length === 0 ? (
                <div
                  className={`flex w-full items-center justify-center rounded-[16px] border py-6 text-[13px] font-medium ${
                    darkMode
                      ? 'border-[#30497D] bg-[#121B33] text-[#A9B7D6]'
                      : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#455B8A]'
                  }`}
                >
                  No unread notifications for today.
                </div>
              ) : (
                todayItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex w-full flex-row items-center gap-[12px] rounded-[16px] border p-[12px] transition-colors ${
                      darkMode
                        ? item.unread && unreadCount > 0
                          ? 'border-[#30497D] bg-[#1A2B52]'
                          : 'border-[#30497D] bg-[#121B33]'
                        : item.unread && unreadCount > 0
                        ? 'border-[#A9B7D6] bg-[#F6F4EF]'
                        : 'border-[#A9B7D6] bg-[#FFFFFF]'
                    }`}
                  >
                    {/* icon-wrap */}
                    <div
                      className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[16px] ${item.iconBg}`}
                    >
                      {renderNotifIcon(item.iconType, item.iconColor)}
                    </div>

                    {/* meta */}
                    <div className="flex flex-1 flex-col items-start gap-[4px] min-w-0">
                      <div className="flex w-full flex-row items-center gap-[8px] flex-wrap">
                        <span
                          className={`font-poppins text-[14px] font-semibold leading-[21px] ${
                            darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`font-poppins text-[12px] font-medium leading-[18px] ${
                            darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                          }`}
                        >
                          {item.time}
                        </span>
                        <span
                          className={`flex h-[25px] items-center justify-center rounded-[4px] px-[8px] py-[4px] font-poppins text-[11px] font-semibold leading-[16px] ${
                            item.unread
                              ? 'bg-[#E4E9F3] text-[#30497D]'
                              : 'bg-[#EAF3DD] text-[#16213E]'
                          }`}
                        >
                          {item.unread ? 'New' : 'Read'}
                        </span>
                      </div>

                      <p
                        className={`font-poppins text-[13px] font-medium leading-[18px] ${
                          darkMode ? 'text-[#E4E9F3]' : 'text-[#16213E]'
                        }`}
                      >
                        {item.body}
                      </p>
                    </div>

                    {/* actions */}
                    <div className="flex shrink-0 flex-col items-end gap-[8px]">
                      {item.actionType === 'accept_decline' ? (
                        item.decision === 'accepted' ? (
                          <span className="flex h-[30px] items-center justify-center rounded-full bg-[#EAF3DD] px-[10px] py-[6px] font-poppins text-[12px] font-semibold leading-[18px] text-[#16213E]">
                            Accepted
                          </span>
                        ) : item.decision === 'declined' ? (
                          <span className="flex h-[30px] items-center justify-center rounded-full bg-[#E4E9F3] px-[10px] py-[6px] font-poppins text-[12px] font-semibold leading-[18px] text-[#455B8A]">
                            Declined
                          </span>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleNotificationDecision(item.id, 'accepted')}
                              className="flex h-[30px] w-[64px] items-center justify-center rounded-full bg-[#EAF3DD] px-[10px] py-[6px] font-poppins text-[12px] font-semibold leading-[18px] text-[#16213E] hover:bg-[#dce9c8] transition-colors cursor-pointer"
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              onClick={() => handleNotificationDecision(item.id, 'declined')}
                              className="flex h-[30px] w-[66px] items-center justify-center rounded-full bg-[#F2842F] px-[10px] py-[6px] font-poppins text-[12px] font-semibold leading-[18px] text-[#F6F4EF] hover:bg-[#e07520] transition-colors cursor-pointer"
                            >
                              Decline
                            </button>
                          </>
                        )
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleNotificationActionClick(item.id, item.actionPath)}
                          className={`font-poppins text-[12px] font-semibold leading-[18px] transition-colors cursor-pointer whitespace-nowrap ${
                            darkMode
                              ? 'text-[#A9B7D6] hover:text-[#FFFFFF]'
                              : 'text-[#455B8A] hover:text-[#253C6D]'
                          }`}
                        >
                          {item.actionLabel}
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* earlier-section */}
            {showEarlier && earlierItems.length > 0 && (
              <div className="flex w-full flex-col items-start gap-[12px]">
                <div className="flex h-[18px] w-full flex-row items-center justify-between">
                  <span
                    className={`font-poppins text-[12px] font-semibold leading-[18px] ${
                      darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                    }`}
                  >
                    Earlier
                  </span>
                  <span
                    className={`font-poppins text-[12px] font-medium leading-[18px] ${
                      darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                    }`}
                  >
                    {earlierItems.length} items
                  </span>
                </div>

                {earlierItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex w-full flex-row items-center gap-[12px] rounded-[16px] border p-[12px] ${
                      darkMode
                        ? 'border-[#30497D] bg-[#121B33]'
                        : 'border-[#A9B7D6] bg-[#FFFFFF]'
                    }`}
                  >
                    <div
                      className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[16px] ${item.iconBg}`}
                    >
                      {renderNotifIcon(item.iconType, item.iconColor)}
                    </div>

                    <div className="flex flex-1 flex-col items-start gap-[4px] min-w-0">
                      <div className="flex w-full flex-row items-center gap-[8px] flex-wrap">
                        <span
                          className={`font-poppins text-[14px] font-semibold leading-[21px] ${
                            darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`font-poppins text-[12px] font-medium leading-[18px] ${
                            darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                          }`}
                        >
                          {item.time}
                        </span>
                        <span className="flex h-[25px] items-center justify-center rounded-[4px] bg-[#EAF3DD] px-[8px] py-[4px] font-poppins text-[11px] font-semibold leading-[16px] text-[#16213E]">
                          Read
                        </span>
                      </div>

                      <p
                        className={`font-poppins text-[13px] font-medium leading-[18px] ${
                          darkMode ? 'text-[#E4E9F3]' : 'text-[#16213E]'
                        }`}
                      >
                        {item.body}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-end">
                      <button
                        type="button"
                        onClick={() => handleNotificationActionClick(item.id, item.actionPath)}
                        className={`font-poppins text-[12px] font-semibold leading-[18px] transition-colors cursor-pointer whitespace-nowrap ${
                          darkMode
                            ? 'text-[#A9B7D6] hover:text-[#FFFFFF]'
                            : 'text-[#455B8A] hover:text-[#253C6D]'
                        }`}
                      >
                        {item.actionLabel}
                      </button>
                    </div>
                  </div>
                ))}

                {/* empty-state / All caught up */}
                <div
                  className={`flex h-[93px] w-full flex-col items-center justify-center gap-[12px] rounded-[16px] border px-[20px] py-[10px] ${
                    darkMode
                      ? 'border-[#30497D] bg-[#121B33]'
                      : 'border-[#A9B7D6] bg-[#FFFFFF]'
                  }`}
                >
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[20px] bg-[#EAF3DD]">
                    <CheckCircle className="h-[18px] w-[18px] text-[#253C6D]" />
                  </div>
                  <span
                    className={`font-poppins text-[14px] font-semibold leading-[21px] ${
                      darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                    }`}
                  >
                    All caught up
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom View All Notifications Button */}
          <button
            type="button"
            onClick={() => {
              setNotifFilter('all');
              setShowEarlier((prev) => !prev);
            }}
            className={`flex h-[34px] items-center justify-center rounded-full border px-[12px] py-[8px] font-poppins text-[12px] font-semibold leading-[18px] transition-colors cursor-pointer ${
              darkMode
                ? 'border-[#30497D] bg-[#1A2B52] text-[#F6F4EF] hover:bg-[#253C6D]'
                : 'border-[#A9B7D6] bg-[#F6F4EF] text-[#16213E] hover:bg-[#E4E9F3]'
            }`}
          >
            {showEarlier ? 'View All Notifications' : 'Show Earlier Notifications'}
          </button>
        </aside>
      )}
    </div>
  );
}