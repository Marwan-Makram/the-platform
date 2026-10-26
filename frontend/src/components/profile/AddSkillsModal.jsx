import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';

const SUGGESTIONS_DATABASE = [
  'Photography',
  'Figma',
  'PHP',
  'UI Design',
  'Prototyping',
  'User Research',
  'Design Systems',
  'Product Strategy',
  'Interaction Design',
  'Wireframing',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Python',
  'Next.js',
];

const CHIP_BACKGROUNDS = [
  'bg-[#E4E9F3] text-[#30497D]',
  'bg-[#EAF3DD] text-[#30497D]',
  'bg-[#FFFAC0] text-[#30497D]',
];

export default function AddSkillsModal({
  isOpen,
  onClose,
  onAddSkills,
  existingSkills,
  darkMode = false,
}) {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (existingSkills) {
      setTags(
        existingSkills.map((name, idx) => ({
          name,
          colorClass: CHIP_BACKGROUNDS[idx % CHIP_BACKGROUNDS.length],
        }))
      );
    }
  }, [existingSkills, isOpen]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const matches = SUGGESTIONS_DATABASE.filter(
      (item) =>
        item.toLowerCase().includes(search.toLowerCase()) &&
        !tags.some((t) => t.name.toLowerCase() === item.toLowerCase())
    );
    setFilteredSuggestions(matches);
    setShowDropdown(matches.length > 0);
  }, [search, tags]);

  const addTag = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (!tags.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) {
      setTags((prev) => [
        ...prev,
        {
          name: trimmed,
          colorClass: CHIP_BACKGROUNDS[prev.length % CHIP_BACKGROUNDS.length],
        },
      ]);
    }
    setSearch('');
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSuggestions.length > 0) {
        addTag(filteredSuggestions[0]);
      } else if (search.trim()) {
        addTag(search.trim());
      }
    }
  };

  const removeTag = (name) => {
    setTags((prev) => prev.filter((t) => t.name !== name));
  };

  const handleConfirm = () => {
    onAddSkills(tags.map((t) => t.name));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs"
    >
      {/* Add-Skills Modal Card (520px) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-full max-w-[520px] flex-col overflow-hidden rounded-[16px] border shadow-[0_12px_40px_rgba(0,0,0,0.102)] transition-colors ${
          darkMode
            ? 'border-[#30497D] bg-[#16213E] text-[#F6F4EF]'
            : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E]'
        }`}
      >
        {/* Header */}
        <div className="flex h-[81px] w-full items-center justify-between px-[24px] pt-[24px] pb-[20px]">
          <h2
            className={`font-inter text-[24px] font-bold leading-[37px] ${
              darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
            }`}
          >
            Add Skills
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

        {/* Channel form */}
        <div className="flex flex-col gap-[24px] px-[24px] pb-[24px]">
          {/* Skills Search Input */}
          <div className="relative flex flex-col gap-[8px]">
            <label
              className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
              }`}
            >
              Skills
            </label>
            <div
              className={`flex h-[44px] w-full items-center gap-[10px] rounded-[8px] border px-[14px] transition-colors ${
                darkMode
                  ? 'border-[#30497D] bg-[#121B33] focus-within:border-[#F2842F]'
                  : 'border-[#A9B7D6] bg-[#FFFFFF] focus-within:border-[#253C6D]'
              }`}
            >
              <Search
                className={`h-[15px] w-[15px] shrink-0 stroke-[1.8] ${
                  darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                }`}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search or type a skill and press Enter..."
                className={`w-full bg-transparent font-inter text-[14px] font-medium leading-[25px] focus:outline-none ${
                  darkMode
                    ? 'text-[#F6F4EF] placeholder:text-[#A9B7D6]'
                    : 'text-[#16213E] placeholder:text-[#455B8A]'
                }`}
              />
            </div>

            {/* Suggestions Dropdown */}
            {showDropdown && (
              <ul
                className={`absolute left-0 right-0 top-[76px] z-30 max-h-40 overflow-y-auto rounded-[8px] border py-1 shadow-lg ${
                  darkMode
                    ? 'border-[#30497D] bg-[#16213E] text-[#F6F4EF]'
                    : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E]'
                }`}
              >
                {filteredSuggestions.map((item) => (
                  <li
                    key={item}
                    onClick={() => addTag(item)}
                    className={`flex items-center px-[14px] py-2 font-poppins text-[13px] font-medium cursor-pointer ${
                      darkMode ? 'hover:bg-[#1A2B52]' : 'hover:bg-[#F6F4EF]'
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Selected Skill Chips Row (Frame 1000004190) */}
          <div className="flex flex-wrap items-center gap-[12px] max-h-[120px] overflow-y-auto figma-scroll">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`inline-flex h-[28px] items-center gap-[8px] rounded-[40px] pl-[9px] pr-[8px] py-[4px] font-poppins text-[14px] font-medium leading-[20px] tracking-[0.25px] ${tag.colorClass}`}
              >
                <span>{tag.name}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag.name)}
                  aria-label={`Remove ${tag.name}`}
                  className="flex h-[16px] w-[16px] items-center justify-center text-[#30497D] hover:text-[#16213E] cursor-pointer"
                >
                  <X className="h-[13px] w-[13px] stroke-[2]" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div
          className={`flex h-[78px] w-full items-center justify-end gap-[12px] border-t px-[24px] py-[18px] ${
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
            type="button"
            onClick={handleConfirm}
            className="flex h-[42px] items-center justify-center rounded-[8px] bg-[#253C6D] px-[20px] font-poppins text-[13px] font-semibold leading-[20px] text-[#FFFFFF] hover:bg-[#30497D] transition-colors cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}