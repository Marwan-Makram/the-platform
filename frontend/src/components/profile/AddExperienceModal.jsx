import React, { useState, useEffect, useRef } from 'react';
import { X, Briefcase } from 'lucide-react';
import FigmaCalendarPicker from '@/components/profile/FigmaCalendarPicker';
import { searchJobTitles2026 } from '@/data/jobTitles2026';

const MAX_DESCRIPTION_LENGTH = 300;

export default function AddExperienceModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  darkMode = false,
}) {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('2024 - Present');
  const [description, setDescription] = useState('');

  // Job title autocomplete state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const positionContainerRef = useRef(null);

  const suggestions = searchJobTitles2026(position, 10);

  useEffect(() => {
    if (initialData) {
      setPosition(initialData.role || '');
      setCompany(initialData.company || '');
      setPeriod(initialData.period || '2024 - Present');
      setDescription((initialData.desc || '').slice(0, MAX_DESCRIPTION_LENGTH));
    } else {
      setPosition('');
      setCompany('');
      setPeriod('2024 - Present');
      setDescription('');
    }
    setShowSuggestions(false);
    setHighlightedIdx(0);
  }, [initialData, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        positionContainerRef.current &&
        !positionContainerRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleSelectPosition = (title) => {
    setPosition(title);
    setShowSuggestions(false);
  };

  const handlePositionKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIdx((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIdx((prev) =>
        prev - 1 < 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter' && showSuggestions) {
      e.preventDefault();
      const chosen = suggestions[highlightedIdx] || suggestions[0];
      if (chosen) {
        handleSelectPosition(chosen.title);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position.trim()) return;

    onSave({
      id: initialData ? initialData.id : Date.now(),
      role: position.trim(),
      company: company.trim() || 'THE SOCIETY',
      period: period.trim() || '2024 - Present',
      desc: description.trim().slice(0, MAX_DESCRIPTION_LENGTH),
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs"
    >
      {/* Add-Experience Modal Card (520px) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[90vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[16px] border shadow-[0_12px_40px_rgba(0,0,0,0.102)] transition-colors ${
          darkMode
            ? 'border-[#30497D] bg-[#16213E] text-[#F6F4EF]'
            : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E]'
        }`}
      >
        {/* Header */}
        <div className="flex min-h-[72px] sm:h-[81px] w-full shrink-0 items-center justify-between px-[18px] sm:px-[24px] pt-[20px] sm:pt-[24px] pb-[16px] sm:pb-[20px]">
          <h2
            className={`font-inter text-[20px] sm:text-[24px] font-bold leading-[30px] sm:leading-[37px] ${
              darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
            }`}
          >
            {initialData ? 'Edit Experience' : 'Add Experience'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-[8px] transition-colors cursor-pointer ${
              darkMode
                ? 'text-[#A9B7D6] hover:bg-[#1A2B52] hover:text-[#FFFFFF]'
                : 'text-[#455B8A] hover:bg-[#F6F4EF] hover:text-[#16213E]'
            }`}
          >
            <X className="h-[20px] w-[20px] stroke-[1.8]" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
          <div className="figma-scroll flex flex-col gap-[20px] sm:gap-[24px] overflow-y-auto px-[18px] sm:px-[24px] pb-[24px]">
            {/* Field 1: Position with 2026 Market Job Titles Autocomplete */}
            <div ref={positionContainerRef} className="relative flex flex-col gap-[8px]">
              <label
                className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                  darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                }`}
              >
                Position *
              </label>
              <input
                type="text"
                required
                value={position}
                onFocus={() => {
                  if (position.trim().length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onChange={(e) => {
                  const val = e.target.value;
                  setPosition(val);
                  setShowSuggestions(val.trim().length > 0);
                  setHighlightedIdx(0);
                }}
                onKeyDown={handlePositionKeyDown}
                placeholder="Type a role (e.g. IT Support, Product Lead, AI Engineer...)"
                className={`h-[44px] w-full rounded-[8px] border px-[14px] font-inter text-[14px] font-medium leading-[25px] focus:outline-none transition-colors ${
                  darkMode
                    ? 'border-[#30497D] bg-[#121B33] text-[#F6F4EF] placeholder:text-[#A9B7D6] focus:border-[#F2842F]'
                    : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E] placeholder:text-[#455B8A] focus:border-[#253C6D]'
                }`}
              />

              {/* 2026 Job Market Suggestions Dropdown */}
              {showSuggestions && position.trim().length > 0 && suggestions.length > 0 && (
                <ul
                  className={`figma-scroll absolute left-0 right-0 top-[76px] z-40 max-h-[210px] overflow-y-auto rounded-[10px] border py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.22)] ${
                    darkMode
                      ? 'border-[#30497D] bg-[#16213E] text-[#F6F4EF]'
                      : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E]'
                  }`}
                >
                  {suggestions.map((item, idx) => {
                    const isHighlighted = idx === highlightedIdx;
                    return (
                      <li
                        key={item.title}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectPosition(item.title);
                        }}
                        onMouseEnter={() => setHighlightedIdx(idx)}
                        className={`flex items-center justify-between gap-2 px-[14px] py-2 font-poppins text-[13px] transition-colors cursor-pointer ${
                          isHighlighted
                            ? darkMode
                              ? 'bg-[#253C6D] text-[#FFFFFF]'
                              : 'bg-[#E4E9F3] text-[#16213E]'
                            : darkMode
                            ? 'text-[#F6F4EF] hover:bg-[#1A2B52]'
                            : 'text-[#16213E] hover:bg-[#F6F4EF]'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Briefcase className="h-3.5 w-3.5 shrink-0 opacity-70" />
                          <span className="font-medium truncate">{item.title}</span>
                        </div>
                        <span
                          className={`shrink-0 rounded-[4px] px-1.5 py-0.5 text-[10px] font-semibold ${
                            darkMode
                              ? 'bg-[#121B33] text-[#A9B7D6]'
                              : 'bg-[#EAF3DD] text-[#16213E]'
                          }`}
                        >
                          {item.category}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Field 2: Company or Client */}
            <div className="flex flex-col gap-[8px]">
              <label
                className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                  darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                }`}
              >
                Company or Client
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Add your company"
                className={`h-[44px] w-full rounded-[8px] border px-[14px] font-inter text-[14px] font-medium leading-[25px] focus:outline-none transition-colors ${
                  darkMode
                    ? 'border-[#30497D] bg-[#121B33] text-[#F6F4EF] placeholder:text-[#A9B7D6] focus:border-[#F2842F]'
                    : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E] placeholder:text-[#455B8A] focus:border-[#253C6D]'
                }`}
              />
            </div>

            {/* Field 3: Interactive Calendar Date Range Picker */}
            <div className="flex flex-col gap-[8px]">
              <label
                className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                  darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                }`}
              >
                Date
              </label>
              <FigmaCalendarPicker
                value={period}
                onChange={setPeriod}
                mode="experience"
                darkMode={darkMode}
                placeholder="Select date range"
              />
            </div>

            {/* Field 4: Description (max 300 chars) */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-baseline justify-between gap-[6px]">
                <label
                  className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                    darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                  }`}
                >
                  Description
                </label>
                <span
                  className={`font-poppins text-[11px] font-medium ${
                    description.length >= MAX_DESCRIPTION_LENGTH
                      ? 'text-[#F2842F]'
                      : darkMode
                      ? 'text-[#A9B7D6]'
                      : 'text-[#455B8A]'
                  }`}
                >
                  {description.length}/{MAX_DESCRIPTION_LENGTH}
                </span>
              </div>
              <textarea
                rows={3}
                required
                maxLength={MAX_DESCRIPTION_LENGTH}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Leading the core product experience, defining design directions and cross-team workflows."
                className={`h-[80px] w-full resize-none rounded-[8px] border p-[14px] font-inter text-[14px] font-medium leading-[22px] break-words [overflow-wrap:anywhere] focus:outline-none transition-colors ${
                  darkMode
                    ? 'border-[#30497D] bg-[#121B33] text-[#F6F4EF] placeholder:text-[#A9B7D6] focus:border-[#F2842F]'
                    : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E] placeholder:text-[#455B8A] focus:border-[#253C6D]'
                }`}
              />
            </div>
          </div>

          {/* Actions Footer */}
          <div
            className={`flex h-[78px] w-full shrink-0 items-center justify-end gap-[12px] border-t px-[18px] sm:px-[24px] py-[18px] ${
              darkMode
                ? 'border-[#30497D] bg-[#121B33]'
                : 'border-[#A9B7D6] bg-[#F9F8F7]'
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`flex h-[42px] items-center justify-center rounded-[8px] border px-[18px] font-poppins text-[13px] font-semibold leading-[20px] transition-colors cursor-pointer ${
                darkMode
                  ? 'border-[#30497D] bg-[#16213E] text-[#F6F4EF] hover:bg-[#1A2B52]'
                  : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E] hover:bg-[#F6F4EF]'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex h-[42px] items-center justify-center rounded-[8px] bg-[#253C6D] px-[20px] font-poppins text-[13px] font-semibold leading-[20px] text-[#FFFFFF] hover:bg-[#30497D] transition-colors cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}