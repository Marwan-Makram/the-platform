import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Paperclip } from 'lucide-react';
import FigmaCalendarPicker from '@/components/profile/FigmaCalendarPicker';

const MAX_DESCRIPTION_LENGTH = 300;

export default function AddProjectModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  darkMode = false,
}) {
  const [project, setProject] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('2024');
  const [links, setLinks] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setProject(initialData.title || '');
      setCompany(initialData.company || '');
      setDate(initialData.year || '2024');
      setLinks(initialData.links || '');
      setDescription((initialData.desc || '').slice(0, MAX_DESCRIPTION_LENGTH));
      setAttachment(initialData.attachment || null);
    } else {
      setProject('');
      setCompany('');
      setDate('2024');
      setLinks('');
      setDescription('');
      setAttachment(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment({
        name: file.name,
        size: `${Math.max(0.1, file.size / (1024 * 1024)).toFixed(1)} MB`,
      });
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!project.trim()) return;

    onSave({
      id: initialData ? initialData.id : Date.now(),
      title: project.trim(),
      company: company.trim() || 'THE SOCIETY',
      year: date.trim() || '2024',
      desc: description.trim().slice(0, MAX_DESCRIPTION_LENGTH),
      links: links.trim(),
      attachment,
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs"
    >
      {/* Add-Portfolio Modal Card (520px) */}
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
            {initialData ? 'Edit Project' : 'Add Projects to Portfolio'}
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
            {/* Field 1: Project */}
            <div className="flex flex-col gap-[8px]">
              <label
                className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                  darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                }`}
              >
                Project *
              </label>
              <input
                type="text"
                required
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="What's the project?"
                className={`h-[44px] w-full rounded-[8px] border px-[14px] font-inter text-[14px] font-medium leading-[25px] focus:outline-none transition-colors ${
                  darkMode
                    ? 'border-[#30497D] bg-[#121B33] text-[#F6F4EF] placeholder:text-[#A9B7D6] focus:border-[#F2842F]'
                    : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E] placeholder:text-[#455B8A] focus:border-[#253C6D]'
                }`}
              />
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

            {/* Field 3: Interactive Calendar Date Picker */}
            <div className="flex flex-col gap-[8px]">
              <label
                className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                  darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                }`}
              >
                Date
              </label>
              <FigmaCalendarPicker
                value={date}
                onChange={setDate}
                mode="project"
                darkMode={darkMode}
                placeholder="Select date or year"
              />
            </div>

            {/* Field 4: Links (Optional) */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-baseline gap-[6px]">
                <label
                  className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                    darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                  }`}
                >
                  Links
                </label>
                <span
                  className={`font-poppins text-[12px] font-normal leading-[18px] ${
                    darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                  }`}
                >
                  (Optional)
                </span>
              </div>
              <input
                type="url"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                placeholder="Link your Github, Behance... etc"
                className={`h-[44px] w-full rounded-[8px] border px-[14px] font-inter text-[14px] font-medium leading-[25px] focus:outline-none transition-colors ${
                  darkMode
                    ? 'border-[#30497D] bg-[#121B33] text-[#F6F4EF] placeholder:text-[#A9B7D6] focus:border-[#F2842F]'
                    : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E] placeholder:text-[#455B8A] focus:border-[#253C6D]'
                }`}
              />
            </div>

            {/* Field 5: Description (Optional, max 300 chars) */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-baseline justify-between gap-[6px]">
                <div className="flex items-baseline gap-[6px]">
                  <label
                    className={`font-poppins text-[13px] font-semibold leading-[20px] ${
                      darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                    }`}
                  >
                    Description
                  </label>
                  <span
                    className={`font-poppins text-[12px] font-normal leading-[18px] ${
                      darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                    }`}
                  >
                    (Optional)
                  </span>
                </div>
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
                maxLength={MAX_DESCRIPTION_LENGTH}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="A clean dashboard concept optimized for productivity."
                className={`h-[80px] w-full resize-none rounded-[8px] border p-[14px] font-inter text-[14px] font-medium leading-[22px] break-words [overflow-wrap:anywhere] focus:outline-none transition-colors ${
                  darkMode
                    ? 'border-[#30497D] bg-[#121B33] text-[#F6F4EF] placeholder:text-[#A9B7D6] focus:border-[#F2842F]'
                    : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E] placeholder:text-[#455B8A] focus:border-[#253C6D]'
                }`}
              />
            </div>

            {/* Field 6: Upload Attachment (Frame 1000004191) */}
            <div className="flex h-[48px] items-center gap-[12px]">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[9px] border border-dashed transition-colors cursor-pointer ${
                  darkMode
                    ? 'border-[#30497D] text-[#A9B7D6] hover:border-[#F2842F] hover:text-[#FFFFFF]'
                    : 'border-[#A9B7D6] text-[#30497D] hover:border-[#253C6D] hover:bg-[#F6F4EF]'
                }`}
              >
                <Plus className="h-[20px] w-[20px] stroke-[1.8]" />
              </button>

              {attachment ? (
                <div className="flex items-center gap-2 rounded-[8px] bg-[#E4E9F3] px-3 py-1.5 text-[13px] font-medium text-[#16213E] min-w-0">
                  <Paperclip className="h-3.5 w-3.5 shrink-0 text-[#253C6D]" />
                  <span className="max-w-[220px] truncate">{attachment.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    className="ml-1 shrink-0 text-[#455B8A] hover:text-[#16213E] cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <span
                  onClick={() => fileInputRef.current?.click()}
                  className={`font-inter text-[14px] font-medium leading-[25px] cursor-pointer ${
                    darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                  }`}
                >
                  Upload Attachment
                </span>
              )}
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