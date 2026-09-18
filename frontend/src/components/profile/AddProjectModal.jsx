import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, X, Calendar, Plus, Paperclip } from 'lucide-react';

export default function AddProjectModal({ isOpen, onClose, onSave, initialData }) {
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
      setDescription(initialData.desc || '');
      setAttachment(initialData.attachment || null);
    } else {
      setProject('');
      setCompany('');
      setDate(new Date().getFullYear().toString());
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
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!project.trim()) return;

    onSave({
      id: initialData ? initialData.id : Date.now(),
      title: project,
      company,
      year: date,
      desc: description,
      links: links.trim(),
      attachment,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-[500px] rounded-[24px] bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-2xs">
            <Briefcase className="h-5 w-5 text-neutral-800 stroke-[1.8]" />
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
          {initialData ? 'Edit Project' : 'Add Projects to Portfolio'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-neutral-900">Project *</label>
            <input
              type="text"
              required
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="What's the project?"
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

          <div>
            <label className="text-xs font-bold text-neutral-900">Year *</label>
            <div className="relative mt-1.5 flex items-center">
              <Calendar className="absolute left-3.5 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="number"
                min="1990"
                max="2099"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-9 text-xs font-semibold text-neutral-800 focus:border-neutral-900 focus:outline-none"
              />
              {date && (
                <button
                  type="button"
                  onClick={() => setDate('')}
                  className="absolute right-3.5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Optional Links field */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-900">Links</label>
              <span className="text-[10px] text-neutral-400 font-medium">Optional</span>
            </div>
            <input
              type="url"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              placeholder="Link your Github, Behance... etc"
              className="mt-1.5 h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-900">Description *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. I joined Stripe's Customer Success team to help them scale their checkout product..."
              className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-white p-3 text-xs leading-relaxed text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          {/* Optional Attachment File Picker */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex items-center gap-3 py-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-neutral-300 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 cursor-pointer transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
              {attachment ? (
                <div className="flex items-center gap-2 rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-medium text-neutral-800">
                  <Paperclip className="h-3.5 w-3.5 text-neutral-500" />
                  <span className="max-w-[150px] truncate">{attachment.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    className="ml-1 text-neutral-400 hover:text-neutral-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <span className="text-xs font-medium text-neutral-400">
                  Add Attachment (Optional)
                </span>
              )}
            </div>
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