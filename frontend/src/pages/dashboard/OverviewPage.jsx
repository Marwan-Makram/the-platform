import React from 'react';

const STATS = [
  {
    title: 'TOTAL PROJECTS',
    value: '24',
    subtitle: '3 completed this week',
    subtitleColor: 'text-neutral-500',
  },
  {
    title: 'ACTIVE TASKS',
    value: '10',
    subtitle: '5 urgent priorities',
    subtitleColor: 'text-[#E0533C]',
  },
  {
    title: 'COMPLETED TASKS',
    value: '106',
    subtitle: '+24 from last sprint',
    subtitleColor: 'text-neutral-500',
  },
  {
    title: 'TEAM MEMBERS',
    value: '8',
    subtitle: '2 currently active',
    subtitleColor: 'text-neutral-500',
  },
];

const TASKS = [
  {
    id: 1,
    title: 'Brand Guideline Redesign',
    desc: 'Approved logo assets packaging',
    status: 'Completed',
    statusColor: 'bg-[#EBF7EE] text-[#227D3B]',
    time: 'Today, 2:14 PM',
  },
  {
    id: 2,
    title: 'Concept Society Website',
    desc: 'Configuring domain & DNS records',
    status: 'In Progress',
    statusColor: 'bg-[#F1F1F8] text-[#4F4B7E]',
    time: 'Today, 11:30 AM',
  },
  {
    id: 3,
    title: 'Client Portal Blueprint',
    desc: 'Wireframing user validation screens',
    status: 'Completed',
    statusColor: 'bg-[#EBF7EE] text-[#227D3B]',
    time: 'Yesterday',
  },
  {
    id: 4,
    title: 'SaaS App Development',
    desc: 'Drafting environment variables list',
    status: 'In Progress',
    statusColor: 'bg-[#F1F1F8] text-[#4F4B7E]',
    time: '2 days ago',
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Title */}
      <div>
        <h1 className="text-[26px] font-bold tracking-tight text-neutral-900">
          Welcome back, Alex
        </h1>
        <p className="mt-1 text-xs font-normal text-neutral-500">
          Here is the update on your workspace and active sprints today.
        </p>
      </div>

      {/* 4 Metric Top Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.title}
            className="flex flex-col justify-between rounded-[20px] border border-neutral-700 bg-white p-6 min-h-[145px] shadow-[0_5px_15px_rgba(0,0,0,0.06)]"
          >
            <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
              {stat.title}
            </span>
            <div className="my-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-neutral-900">
                {stat.value}
              </span>
            </div>
            <span className={`text-[11px] font-medium ${stat.subtitleColor}`}>
              {stat.subtitle}
            </span>
          </div>
        ))}
      </div>

      {/* Lower Section Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 items-start">
        {/* Ongoing Project Gauge Card */}
        <div className="lg:col-span-4 rounded-[20px] border border-neutral-700 bg-white p-6 flex flex-col justify-between min-h-[380px] shadow-[0_5px_15px_rgba(0,0,0,0.06)]">
          <h3 className="text-sm font-bold text-neutral-900">
            Ongoing Project
          </h3>

          {/* SVG Donut Chart */}
          <div className="relative flex items-center justify-center my-6">
            <svg className="h-44 w-44 -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#EFEFEF"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#4F46E5"
                strokeWidth="10"
                strokeDasharray="238.76"
                strokeDashoffset="59.69"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold tracking-tight text-neutral-900">
                75%
              </span>
              <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                DONE
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                <span className="font-semibold text-neutral-800">Done tasks</span>
              </div>
              <span className="font-bold text-neutral-900">20</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E5E7EB]" />
                <span className="font-semibold text-neutral-800">In progress</span>
              </div>
              <span className="font-bold text-neutral-900">10</span>
            </div>
          </div>
        </div>

        {/* Recent Tracked Tasks Card */}
        <div className="lg:col-span-8 rounded-[20px] border border-neutral-700 bg-white p-6 min-h-[380px] shadow-[0_5px_15px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-neutral-900">
              Recent Tracked Tasks
            </h3>
            <button
              type="button"
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 underline underline-offset-4 cursor-pointer"
            >
              View all
            </button>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-neutral-100">
            {TASKS.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-4 transition-colors hover:bg-neutral-50/70 rounded-xl px-2"
              >
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">
                    {task.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] font-normal text-neutral-400">
                    {task.desc}
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:gap-8">
                  <span
                    className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${task.statusColor}`}
                  >
                    {task.status}
                  </span>
                  <span className="w-24 text-right text-[11px] font-normal text-neutral-400">
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