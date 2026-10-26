import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAYS_HEADER = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function FigmaCalendarPicker({
  value,
  onChange,
  mode = 'project', // 'project' | 'experience'
  darkMode = false,
  placeholder = 'Select date',
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const [viewYear, setViewYear] = useState(currentYear);
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(1);

  // Experience range state
  const [activeTab, setActiveTab] = useState('start'); // 'start' | 'end'
  const [startYear, setStartYear] = useState(2024);
  const [startMonth, setStartMonth] = useState(0);
  const [endYear, setEndYear] = useState(currentYear);
  const [endMonth, setEndMonth] = useState(new Date().getMonth());
  const [isPresent, setIsPresent] = useState(true);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync internal calendar state when opened
  useEffect(() => {
    if (!open || !value) return;
    if (mode === 'project') {
      const yearMatch = String(value).match(/\b(19\d\d|20\d\d)\b/);
      if (yearMatch) {
        setViewYear(Number(yearMatch[1]));
      }
    } else {
      const years = String(value).match(/\b(19\d\d|20\d\d)\b/g);
      const hasPresent = /present/i.test(String(value));
      setIsPresent(hasPresent);
      if (years && years[0]) {
        setStartYear(Number(years[0]));
        setViewYear(Number(years[0]));
      }
      if (years && years[1]) {
        setEndYear(Number(years[1]));
      }
    }
  }, [open, value, mode]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectProjectDay = (day) => {
    setSelectedDay(day);
    const formatted = `${MONTHS[viewMonth]} ${day}, ${viewYear}`;
    onChange(formatted);
    setOpen(false);
  };

  const handleSelectProjectYearOnly = (yr) => {
    setViewYear(yr);
    onChange(String(yr));
    setOpen(false);
  };

  const applyExperienceRange = (nextStartY, nextStartM, nextEndY, nextEndM, nextPresent) => {
    const startLabel = `${MONTHS[nextStartM]} ${nextStartY}`;
    const endLabel = nextPresent ? 'Present' : `${MONTHS[nextEndM]} ${nextEndY}`;
    onChange(`${startLabel} - ${endLabel}`);
  };

  const handleSelectExperienceDay = (day) => {
    setSelectedDay(day);
    if (activeTab === 'start') {
      setStartYear(viewYear);
      setStartMonth(viewMonth);
      applyExperienceRange(viewYear, viewMonth, endYear, endMonth, isPresent);
      if (!isPresent) {
        setActiveTab('end');
      } else {
        setOpen(false);
      }
    } else {
      setEndYear(viewYear);
      setEndMonth(viewMonth);
      applyExperienceRange(startYear, startMonth, viewYear, viewMonth, false);
      setOpen(false);
    }
  };

  const handleTogglePresent = () => {
    const next = !isPresent;
    setIsPresent(next);
    applyExperienceRange(startYear, startMonth, endYear, endMonth, next);
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Input Box */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-[44px] w-full items-center gap-[10px] rounded-[8px] border px-[14px] transition-colors cursor-pointer ${
          darkMode
            ? 'border-[#30497D] bg-[#121B33] hover:border-[#F2842F]'
            : 'border-[#A9B7D6] bg-[#FFFFFF] hover:border-[#253C6D]'
        }`}
      >
        <Calendar
          className={`h-[20px] w-[20px] shrink-0 stroke-[1.6] ${
            darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
          }`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          placeholder={placeholder}
          className={`w-full bg-transparent font-inter text-[14px] font-medium leading-[25px] focus:outline-none cursor-pointer ${
            darkMode
              ? 'text-[#F6F4EF] placeholder:text-[#A9B7D6]'
              : 'text-[#16213E] placeholder:text-[#455B8A]'
          }`}
        />
      </div>

      {/* Calendar Dropdown Popover */}
      {open && (
        <div
          className={`absolute left-0 top-[50px] z-50 w-full sm:w-[310px] rounded-[12px] border p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.25)] ${
            darkMode
              ? 'border-[#30497D] bg-[#16213E] text-[#F6F4EF]'
              : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E]'
          }`}
        >
          {/* Experience Mode: Start / End Tabs + Present Toggle */}
          {mode === 'experience' && (
            <div className="mb-3 flex flex-col gap-2 border-b pb-2.5 border-[#A9B7D6]/50">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('start');
                    setViewYear(startYear);
                    setViewMonth(startMonth);
                  }}
                  className={`rounded-[6px] px-2.5 py-1.5 text-[11px] font-semibold transition-colors cursor-pointer ${
                    activeTab === 'start'
                      ? 'bg-[#253C6D] text-[#FFFFFF]'
                      : darkMode
                      ? 'bg-[#121B33] text-[#A9B7D6]'
                      : 'bg-[#F6F4EF] text-[#455B8A]'
                  }`}
                >
                  Start: {MONTHS[startMonth]} {startYear}
                </button>
                <button
                  type="button"
                  disabled={isPresent}
                  onClick={() => {
                    setActiveTab('end');
                    setViewYear(endYear);
                    setViewMonth(endMonth);
                  }}
                  className={`rounded-[6px] px-2.5 py-1.5 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed ${
                    activeTab === 'end' && !isPresent
                      ? 'bg-[#253C6D] text-[#FFFFFF]'
                      : darkMode
                      ? 'bg-[#121B33] text-[#A9B7D6]'
                      : 'bg-[#F6F4EF] text-[#455B8A]'
                  }`}
                >
                  End: {isPresent ? 'Present' : `${MONTHS[endMonth]} ${endYear}`}
                </button>
              </div>

              <button
                type="button"
                onClick={handleTogglePresent}
                className="flex items-center gap-2 text-[12px] font-medium cursor-pointer self-start"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-[4px] border ${
                    isPresent
                      ? 'border-[#253C6D] bg-[#253C6D] text-white'
                      : darkMode
                      ? 'border-[#30497D] bg-[#121B33]'
                      : 'border-[#A9B7D6] bg-white'
                  }`}
                >
                  {isPresent && <Check className="h-3 w-3 stroke-[2.5]" />}
                </span>
                <span className={darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'}>
                  Currently working here (Present)
                </span>
              </button>
            </div>
          )}

          {/* Month & Year Navigation Header */}
          <div className="mb-2.5 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevMonth}
              className={`flex h-7 w-7 items-center justify-center rounded-[6px] transition-colors cursor-pointer ${
                darkMode
                  ? 'hover:bg-[#1A2B52] text-[#A9B7D6]'
                  : 'hover:bg-[#E4E9F3] text-[#253C6D]'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1.5">
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                className={`rounded-[6px] border px-1.5 py-0.5 font-poppins text-[12px] font-semibold focus:outline-none cursor-pointer ${
                  darkMode
                    ? 'border-[#30497D] bg-[#121B33] text-[#F6F4EF]'
                    : 'border-[#A9B7D6] bg-[#F6F4EF] text-[#16213E]'
                }`}
              >
                {MONTHS.map((m, idx) => (
                  <option key={m} value={idx}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                className={`rounded-[6px] border px-1.5 py-0.5 font-poppins text-[12px] font-semibold focus:outline-none cursor-pointer ${
                  darkMode
                    ? 'border-[#30497D] bg-[#121B33] text-[#F6F4EF]'
                    : 'border-[#A9B7D6] bg-[#F6F4EF] text-[#16213E]'
                }`}
              >
                {Array.from({ length: 35 }, (_, i) => currentYear + 2 - i).map(
                  (yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  )
                )}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className={`flex h-7 w-7 items-center justify-center rounded-[6px] transition-colors cursor-pointer ${
                darkMode
                  ? 'hover:bg-[#1A2B52] text-[#A9B7D6]'
                  : 'hover:bg-[#E4E9F3] text-[#253C6D]'
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {DAYS_HEADER.map((d) => (
              <span
                key={d}
                className={`font-poppins text-[10px] font-semibold ${
                  darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {blanksArray.map((b) => (
              <span key={`blank-${b}`} className="h-7 w-7" />
            ))}
            {daysArray.map((day) => {
              const isSelected = day === selectedDay;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    mode === 'project'
                      ? handleSelectProjectDay(day)
                      : handleSelectExperienceDay(day)
                  }
                  className={`flex h-7 w-7 items-center justify-center rounded-[6px] font-poppins text-[11px] font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#253C6D] text-[#FFFFFF] font-semibold'
                      : darkMode
                      ? 'text-[#F6F4EF] hover:bg-[#1A2B52]'
                      : 'text-[#16213E] hover:bg-[#E4E9F3]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick Year Pills for Project Mode */}
          {mode === 'project' && (
            <div className="mt-2.5 flex items-center justify-between border-t border-[#A9B7D6]/40 pt-2">
              <span
                className={`text-[10px] font-semibold ${
                  darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                }`}
              >
                Quick Year:
              </span>
              <div className="flex gap-1">
                {[2026, 2025, 2024, 2023, 2021].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => handleSelectProjectYearOnly(yr)}
                    className="rounded-[5px] bg-[#E4E9F3] px-1.5 py-0.5 text-[10px] font-semibold text-[#16213E] hover:bg-[#253C6D] hover:text-white transition-colors cursor-pointer"
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
