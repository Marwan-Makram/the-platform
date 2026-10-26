import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useOutletContext } from 'react-router-dom';

const KPI_CARDS = [
  {
    title: 'ACTIVE PROJECTS',
    value: '3',
    subtitle: '1 active this week',
    isUrgent: false,
  },
  {
    title: 'ACTIVE TASKS',
    value: '10',
    subtitle: '5 urgent priorities',
    isUrgent: true,
  },
  {
    title: 'COMPLETED TASKS',
    value: '106',
    subtitle: '+24 from last sprint',
    isUrgent: false,
  },
  {
    title: 'TEAM MEMBERS',
    value: '8',
    subtitle: '2 currently active',
    isUrgent: false,
  },
];

const RECENT_TASKS = [
  {
    id: 1,
    title: 'Brand Guideline Redesign',
    desc: 'Approved logo assets packaging',
    status: 'Completed',
    statusBg: 'bg-[#EAF3DD]',
    time: 'Today, 2:14 PM',
  },
  {
    id: 2,
    title: 'Concept Society Website',
    desc: 'Configuring domain & DNS records',
    status: 'In Progress',
    statusBg: 'bg-[#E4E9F3]',
    time: 'Today, 11:30 AM',
  },
  {
    id: 3,
    title: 'Client Portal Blueprint',
    desc: 'Wireframing user validation screens',
    status: 'Completed',
    statusBg: 'bg-[#EAF3DD]',
    time: 'Yesterday',
  },
  {
    id: 4,
    title: 'SaaS App Development',
    desc: 'Drafting environment variables list',
    status: 'In Progress',
    statusBg: 'bg-[#E4E9F3]',
    time: '2 days ago',
  },
];

export default function OverviewPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};
  const { searchQuery = '', darkMode = false } = outletContext;

  const [bannerDecision, setBannerDecision] = useState(null); // null | 'accepted' | 'declined'

  const firstName = user?.name ? user.name.split(' ')[0] : 'Alex';

  const filteredTasks = RECENT_TASKS.filter((task) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(q) ||
      task.desc.toLowerCase().includes(q) ||
      task.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex w-full flex-col gap-[32px] font-poppins">
      {/* Greeting */}
      <div
        className={`flex w-full flex-col items-start gap-[6px] border-b pb-[16px] ${
          darkMode ? 'border-[#30497D]' : 'border-[#A9B7D6]'
        }`}
      >
        <h1
          className={`font-poppins text-[24px] sm:text-[28px] font-bold leading-[36px] sm:leading-[42px] ${
            darkMode ? 'text-[#F6F4EF]' : 'text-[#253C6D]'
          }`}
        >
          Welcome back, {firstName}
        </h1>
        <p
          className={`font-poppins text-[14px] font-normal leading-[21px] ${
            darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
          }`}
        >
          Your active projects, upcoming deadlines and latest updates, all in one place.
        </p>
      </div>

      {/* notification-row (Action Required Banner) */}
      <div
        className={`flex w-full flex-col sm:flex-row sm:items-center justify-between gap-[12px] min-h-[92px] rounded-[16px] border px-[24px] py-[12px] ${
          darkMode
            ? 'border-[#30497D] bg-[#1A2B52]'
            : 'border-[#A9B7D6] bg-[#253C6D]'
        }`}
      >
        {/* meta */}
        <div className="flex flex-1 flex-col items-start gap-[10px]">
          {/* meta-top */}
          <div className="flex flex-row items-center gap-[8px] flex-wrap">
            <span className="flex h-[20px] items-center justify-center rounded-full bg-[#E4E9F3] px-[10px] py-[6px] font-poppins text-[12px] font-semibold leading-[18px] text-[#F2842F]">
              Action Required
            </span>
            <span className="font-poppins text-[14px] font-semibold leading-[21px] text-[#FFFFFF]">
              Karim E.
            </span>
          </div>

          <p className="font-poppins text-[13px] font-medium leading-[18px] text-[#FFFFFF]">
            Assigned to Concept Society redesign. Review scope, milestones, and kickoff checklist.
          </p>
        </div>

        {/* actions */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-end gap-[8px] shrink-0">
          {bannerDecision === 'accepted' ? (
            <div className="flex items-center gap-2">
              <span className="flex h-[30px] items-center justify-center rounded-full bg-[#EAF3DD] px-[12px] py-[6px] font-poppins text-[12px] font-semibold leading-[18px] text-[#16213E]">
                Accepted
              </span>
              <button
                type="button"
                onClick={() => setBannerDecision(null)}
                className="text-[11px] font-medium text-[#E4E9F3] underline hover:text-white cursor-pointer"
              >
                Undo
              </button>
            </div>
          ) : bannerDecision === 'declined' ? (
            <div className="flex items-center gap-2">
              <span className="flex h-[30px] items-center justify-center rounded-full bg-[#455B8A] px-[12px] py-[6px] font-poppins text-[12px] font-semibold leading-[18px] text-[#F6F4EF]">
                Declined
              </span>
              <button
                type="button"
                onClick={() => setBannerDecision(null)}
                className="text-[11px] font-medium text-[#E4E9F3] underline hover:text-white cursor-pointer"
              >
                Undo
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setBannerDecision('accepted')}
                className="flex h-[30px] w-[64px] items-center justify-center rounded-full bg-[#FAFAFA] px-[10px] py-[6px] font-poppins text-[12px] font-semibold leading-[18px] text-[#16213E] hover:bg-white transition-colors cursor-pointer"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => setBannerDecision('declined')}
                className="flex h-[30px] w-[66px] items-center justify-center rounded-full bg-[#455B8A] px-[10px] py-[6px] font-poppins text-[12px] font-semibold leading-[18px] text-[#F6F4EF] hover:bg-[#384b73] transition-colors cursor-pointer"
              >
                Decline
              </button>
            </>
          )}
        </div>
      </div>

      {/* KPI-Grid */}
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {KPI_CARDS.map((card) => (
          <div
            key={card.title}
            className={`flex h-[165px] flex-col items-start justify-between rounded-[16px] border p-[24px] transition-colors ${
              darkMode
                ? 'border-[#30497D] bg-[#16213E]'
                : 'border-[#A9B7D6] bg-[#FFFFFF]'
            }`}
          >
            <span
              className={`font-poppins text-[13px] font-medium leading-[20px] tracking-[0.05em] uppercase ${
                darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
              }`}
            >
              {card.title}
            </span>

            <div className="flex w-full flex-row items-baseline gap-[8px]">
              <span
                className={`font-poppins text-[32px] font-bold leading-[48px] ${
                  darkMode ? 'text-[#FFFFFF]' : 'text-[#253C6D]'
                }`}
              >
                {card.value}
              </span>
            </div>

            <span
              className={`font-poppins text-[11px] leading-[16px] ${
                card.isUrgent
                  ? 'font-semibold text-[#FF385C]'
                  : darkMode
                  ? 'font-normal text-[#A9B7D6]'
                  : 'font-normal text-[#455B8A]'
              }`}
            >
              {card.subtitle}
            </span>
          </div>
        ))}
      </div>

      {/* Middle-Layout */}
      <div className="flex w-full flex-col lg:flex-row items-start gap-[24px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {/* Sprint-Progress-Card */}
        <div
          className={`flex h-[296px] w-full lg:w-[380px] shrink-0 flex-col items-start justify-between rounded-[16px] border p-[24px] transition-colors ${
            darkMode
              ? 'border-[#30497D] bg-[#16213E]'
              : 'border-[#A9B7D6] bg-[#FFFFFF]'
          }`}
        >
          <h2
            className={`font-poppins text-[16px] font-bold leading-[24px] ${
              darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
            }`}
          >
            Ongoing Project
          </h2>

          {/* Visual-Ring-Block */}
          <div className="flex h-[140px] w-full flex-col items-center justify-center py-[10px]">
            <div className="relative flex h-[120px] w-[120px] items-center justify-center">
              <svg className="h-[120px] w-[120px] -rotate-90 transform" viewBox="0 0 120 120">
                {/* ring-track */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="transparent"
                  stroke={darkMode ? '#253C6D' : '#E4E9F3'}
                  strokeWidth="12"
                />
                {/* ring-progress */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="transparent"
                  stroke="#F2842F"
                  strokeWidth="12"
                  strokeDasharray="301.59"
                  strokeDashoffset="75.4"
                  strokeLinecap="round"
                />
              </svg>

              {/* center-labels */}
              <div className="absolute flex flex-col items-center justify-center gap-[2px]">
                <span
                  className={`font-poppins text-[22px] font-bold leading-[33px] ${
                    darkMode ? 'text-[#FFFFFF]' : 'text-[#253C6D]'
                  }`}
                >
                  75%
                </span>
                <span
                  className={`font-poppins text-[10px] font-normal leading-[15px] uppercase ${
                    darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                  }`}
                >
                  done
                </span>
              </div>
            </div>
          </div>

          {/* Progress-Breakdown */}
          <div className="flex w-full flex-col items-start gap-[12px]">
            <div className="flex h-[20px] w-full flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-[8px]">
                <span
                  className={`h-[8px] w-[8px] rounded-full ${
                    darkMode ? 'bg-[#F2842F]' : 'bg-[#30497D]'
                  }`}
                />
                <span
                  className={`font-poppins text-[13px] font-normal leading-[20px] ${
                    darkMode ? 'text-[#E4E9F3]' : 'text-[#16213E]'
                  }`}
                >
                  Done tasks
                </span>
              </div>
              <span
                className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                  darkMode ? 'text-[#FFFFFF]' : 'text-[#16213E]'
                }`}
              >
                20
              </span>
            </div>

            <div className="flex h-[20px] w-full flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-[8px]">
                <span
                  className={`h-[8px] w-[8px] rounded-full ${
                    darkMode ? 'bg-[#30497D]' : 'bg-[#E4E9F3]'
                  }`}
                />
                <span
                  className={`font-poppins text-[13px] font-normal leading-[20px] ${
                    darkMode ? 'text-[#E4E9F3]' : 'text-[#16213E]'
                  }`}
                >
                  In progress
                </span>
              </div>
              <span
                className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                  darkMode ? 'text-[#FFFFFF]' : 'text-[#16213E]'
                }`}
              >
                10
              </span>
            </div>
          </div>
        </div>

        {/* Recent-Activity-Card */}
        <div
          className={`flex min-h-[388px] flex-1 w-full flex-col items-start gap-[16px] rounded-[16px] border p-[24px] transition-colors ${
            darkMode
              ? 'border-[#30497D] bg-[#16213E]'
              : 'border-[#A9B7D6] bg-[#FFFFFF]'
          }`}
        >
          <div className="flex h-[24px] w-full flex-row items-center justify-between">
            <h2
              className={`font-poppins text-[16px] font-bold leading-[24px] ${
                darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
              }`}
            >
              Recent Tracked Tasks
            </h2>
            <button
              type="button"
              onClick={() => navigate('/dashboard/profile')}
              className={`font-poppins text-[12px] font-semibold leading-[18px] underline transition-colors cursor-pointer ${
                darkMode
                  ? 'text-[#A9B7D6] hover:text-[#FFFFFF]'
                  : 'text-[#455B8A] hover:text-[#253C6D]'
              }`}
            >
              View all
            </button>
          </div>

          <div className="flex w-full flex-col items-start">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex min-h-[75px] w-full flex-col sm:flex-row sm:items-center justify-between gap-[12px] sm:gap-[16px] border-b px-[12px] py-[16px] transition-colors ${
                  darkMode
                    ? 'border-[#30497D] hover:bg-[#1A2B52]/70'
                    : 'border-[#A9B7D6] hover:bg-[#F6F4EF]/50'
                }`}
              >
                <div className="flex flex-1 flex-col items-start gap-[4px] min-w-0">
                  <h3
                    className={`w-full truncate font-poppins text-[14px] font-semibold leading-[21px] ${
                      darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`w-full truncate font-poppins text-[12px] font-normal leading-[18px] ${
                      darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                    }`}
                  >
                    {task.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-[16px] shrink-0">
                  <div className="flex w-auto sm:w-[120px] items-start">
                    <span
                      className={`inline-flex h-[25px] items-center justify-center rounded-[4px] px-[8px] py-[4px] font-poppins text-[11px] font-semibold leading-[16px] !text-[#16213E] ${task.statusBg}`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <span
                    className={`w-auto sm:w-[100px] text-right font-poppins text-[13px] font-normal leading-[20px] ${
                      darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                    }`}
                  >
                    {task.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}