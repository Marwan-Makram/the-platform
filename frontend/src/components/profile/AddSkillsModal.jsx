import React, { useState, useRef, useEffect } from 'react';
import { Tag, X, Search } from 'lucide-react';

const SUGGESTIONS_DATABASE = [
  'PHP',
  'Photoshop',
  'Photography',
  'Python',
  'Prototyping',
  'Product Strategy',
  'Product Design',
  'PostgreSQL',
  'Public Relations',
  'Performance Optimization',
  'React',
  'Ruby',
  'Rust',
  'Redux',
  'Rest API',
  'Figma',
  'FastAPI',
  'Frontend Architecture',
  'Tailwind CSS',
  'TypeScript',
  'Three.js',
  'Next.js',
  'Node.js',
];

const COLOR_PALETTE = [
  'bg-[#F0F8FF] text-[#0284C7]',
  'bg-[#F4F5FF] text-[#4F46E5]',
  'bg-[#FFF0F5] text-[#DB2777]',
  'bg-[#ECFDF5] text-[#059669]',
  'bg-[#FEF3C7] text-[#D97706]',
];

export default function AddSkillsModal({ isOpen, onClose, onAddSkills, existingSkills }) {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (existingSkills) {
      setTags(
        existingSkills.map((name, idx) => ({
          name,
          color: COLOR_PALETTE[idx % COLOR_PALETTE.length],
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
    if (!name.trim()) return;
    if (!tags.some((t) => t.name.toLowerCase() === name.toLowerCase())) {
      setTags((prev) => [
        ...prev,
        {
          name: name.trim(),
          color: COLOR_PALETTE[prev.length % COLOR_PALETTE.length],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-[480px] rounded-[24px] bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-2xs">
            <Tag className="h-5 w-5 text-neutral-800 stroke-[1.8]" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-900 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-neutral-900">
          Add Skills
        </h2>

        <div className="mt-6 space-y-4" ref={containerRef}>
          <div className="relative">
            <label className="text-xs font-bold text-neutral-900">Title *</label>
            <div className="relative mt-1.5 flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for Skills (e.g. type 'ph' for PHP)"
                className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
              />
            </div>

            {/* Suggestions Dropdown */}
            {showDropdown && (
              <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-40 overflow-y-auto rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
                {filteredSuggestions.map((item) => (
                  <li
                    key={item}
                    onClick={() => addTag(item)}
                    className="flex items-center px-4 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-100 cursor-pointer"
                  >
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Active Tag Pills */}
          <div className="flex flex-wrap gap-2 pt-1 max-h-36 overflow-y-auto">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tag.color}`}
              >
                {tag.name}
                <button
                  type="button"
                  onClick={() => removeTag(tag.name)}
                  className="cursor-pointer opacity-70 hover:opacity-100"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-800 hover:bg-neutral-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="h-11 rounded-xl bg-black text-xs font-bold text-white hover:bg-neutral-800 cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}