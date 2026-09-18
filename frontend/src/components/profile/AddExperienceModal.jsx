import React, { useState, useEffect } from 'react';
import { Flag, X, Calendar } from 'lucide-react';

export default function AddExperienceModal({ isOpen, onClose, onSave, initialData }) {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('2023-06-12');
  const [endDate, setEndDate] = useState('2023-07-10');
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setPosition(initialData.role || '');
      setCompany(initialData.company || '');
      setDescription(initialData.desc || '');
      if (initialData.period?.includes('Present')) {
        setIsCurrent(true);
      }
    } else {
      setPosition('');
      setCompany('');
      setStartDate('2023-06-12');
      setEndDate('2023-07-10');
      setIsCurrent(false);
      setDescription('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position.trim()) return;

    const formattedPeriod = isCurrent
      ? `${new Date(startDate).getFullYear()} – Present`
      : `${formatDate(startDate)} - ${formatDate(endDate)}`;

    onSave({
      id: initialData ? initialData.id : Date.now(),
      role: position,
      company,
      period: formattedPeriod,
      desc: description,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-[500px] rounded-[24px] bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-2xs">
            <Flag className="h-5 w-5 text-neutral-800 stroke-[1.8]" />
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
          {initialData ? 'Edit Experience' : 'Add experience'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-neutral-900">Position *</label>
            <input
              type="text"
              required
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="What's your title ?"
              className="mt-1.5 h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-900">Company *</label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Add your company"
              className="mt-1.5 h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          {/* Date range picker */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-900">Date Range *</label>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="rounded border-neutral-300"
                />
                Present
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 h-4 w-4 text-neutral-400 pointer-events-none" />
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-2 text-xs font-medium text-neutral-800 focus:border-neutral-900 focus:outline-none"
                />
              </div>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 h-4 w-4 text-neutral-400 pointer-events-none" />
                <input
                  type="date"
                  disabled={isCurrent}
                  required={!isCurrent}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-2 text-xs font-medium text-neutral-800 focus:border-neutral-900 focus:outline-none disabled:bg-neutral-100 disabled:text-neutral-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-900">Description *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Leading core design architecture and sprint planning..."
              className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-white p-3 text-xs leading-relaxed text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-800 hover:bg-neutral-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 rounded-xl bg-black text-xs font-bold text-white hover:bg-neutral-800 cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}