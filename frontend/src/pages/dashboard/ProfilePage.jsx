import React, { useState, useRef, useEffect } from 'react';
import {
  Paperclip,
  Pencil,
  Trash2,
  PlusCircle,
  ExternalLink,
  FileText,
  X,
  Check,
  Briefcase,
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AddProjectModal from '@/components/profile/AddProjectModal';
import AddExperienceModal from '@/components/profile/AddExperienceModal';
import AddSkillsModal from '@/components/profile/AddSkillsModal';
import { searchJobTitles2026 } from '@/data/jobTitles2026';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'Dashboard Redesign',
    year: '2024',
    company: 'THE SOCIETY',
    desc: 'A clean dashboard concept optimized for productivity.',
    links: 'https://github.com/the-society/dashboard',
    attachment: { name: 'dashboard-redesign-spec.pdf', size: '2.4 MB' },
  },
  {
    id: 2,
    title: 'Society Design System',
    year: '2021',
    company: 'Arch Studio',
    desc: 'Multi-platform design language built on clean line grids.',
    links: '',
    attachment: null,
  },
  {
    id: 3,
    title: 'Mobile Workspace',
    year: '2019',
    company: 'Vertex Labs',
    desc: 'An austerity-based native app for tracking sprint velocity.',
    links: 'https://behance.net/gallery/mobile-workspace',
    attachment: { name: 'sprint-velocity-preview.png', size: '1.8 MB' },
  },
];

const INITIAL_EXPERIENCE = [
  {
    id: 1,
    role: 'Product Lead',
    company: 'THE SOCIETY',
    period: '2024 - Present',
    desc: 'Leading the core product experience, defining design directions and cross-team workflows.',
  },
  {
    id: 2,
    role: 'Senior Product Designer',
    company: 'Arch Studio',
    period: '2021 - 2024',
    desc: 'Crafted complex SaaS interfaces, dashboard patterns, and design systems for enterprise architecture software.',
  },
  {
    id: 3,
    role: 'Product Designer',
    company: 'Vertex Labs',
    period: '2019 - 2021',
    desc: 'Designed native mobile and web applications focusing on data density and high usability.',
  },
];

const INITIAL_SKILLS = [
  'UI Design',
  'Prototyping',
  'User Research',
  'Figma',
  'Design Systems',
  'Product Strategy',
  'Interaction Design',
  'Wireframing',
];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const outletContext = useOutletContext() || {};
  const darkMode = Boolean(outletContext.darkMode);

  const [isEditing, setIsEditing] = useState(false);
  const [sharedCopied, setSharedCopied] = useState(false);

  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [experience, setExperience] = useState(INITIAL_EXPERIENCE);
  const [skills, setSkills] = useState(
    user?.interests?.length
      ? Array.from(new Set([...INITIAL_SKILLS, ...user.interests]))
      : INITIAL_SKILLS
  );

  // Default position & company come from the most recent work experience (experience[0])
  const latestExperience = experience[0];
  const defaultRole = latestExperience?.role || user?.role || 'Product Lead';
  const defaultCompany = latestExperience?.company || user?.company || 'THE SOCIETY';

  // Track whether the user manually customized the header position/company
  const [customHeader, setCustomHeader] = useState(null); // { role, company } | null

  const displayedRole = customHeader ? customHeader.role : defaultRole;
  const displayedCompany = customHeader ? customHeader.company : defaultCompany;

  // Editable header fields during Edit Profile mode
  const [editRole, setEditRole] = useState(displayedRole);
  const [editCompany, setEditCompany] = useState(displayedCompany);
  const [showHeaderRoleSuggestions, setShowHeaderRoleSuggestions] = useState(false);
  const headerRoleRef = useRef(null);

  const headerRoleSuggestions = searchJobTitles2026(editRole, 8);

  // Backup snapshot when entering edit mode so Cancel restores state
  const [backupState, setBackupState] = useState(null);

  const [editingProject, setEditingProject] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);

  // Floating Popover State for project attachments with hover bridge delay + click pin
  const [activeProjectPopover, setActiveProjectPopover] = useState(null);
  const [popoverPinned, setPopoverPinned] = useState(false);
  const [popoverCoords, setPopoverCoords] = useState({ top: 0, left: 0 });
  const closeTimerRef = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClosePopover = () => {
    if (popoverPinned) return;
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveProjectPopover(null);
    }, 260);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popoverPinned) {
        setPopoverPinned(false);
        setActiveProjectPopover(null);
      }
      if (headerRoleRef.current && !headerRoleRef.current.contains(e.target)) {
        setShowHeaderRoleSuggestions(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [popoverPinned]);

  const computePopoverPosition = (targetEl) => {
    const rect = targetEl.getBoundingClientRect();
    const popoverWidth = 256;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = rect.right - popoverWidth;
    if (left < 16) left = 16;
    if (left + popoverWidth > viewportWidth - 16) {
      left = Math.max(16, viewportWidth - popoverWidth - 16);
    }

    let top = rect.bottom + 6;
    if (top + 140 > viewportHeight) {
      top = Math.max(16, rect.top - 125);
    }

    setPopoverCoords({ top, left });
  };

  const handleMouseEnterPin = (e, project) => {
    clearCloseTimer();
    computePopoverPosition(e.currentTarget);
    setActiveProjectPopover(project);
  };

  const handleMouseLeavePin = () => {
    scheduleClosePopover();
  };

  const handleClickPin = (e, project) => {
    e.stopPropagation();
    clearCloseTimer();
    if (activeProjectPopover?.id === project.id && popoverPinned) {
      setPopoverPinned(false);
      setActiveProjectPopover(null);
    } else {
      computePopoverPosition(e.currentTarget);
      setActiveProjectPopover(project);
      setPopoverPinned(true);
    }
  };

  const handleStartEditing = () => {
    setBackupState({
      projects: [...projects],
      experience: [...experience],
      skills: [...skills],
      customHeader: customHeader ? { ...customHeader } : null,
    });
    setEditRole(displayedRole);
    setEditCompany(displayedCompany);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    if (backupState) {
      setProjects(backupState.projects);
      setExperience(backupState.experience);
      setSkills(backupState.skills);
      setCustomHeader(backupState.customHeader);
      const restoredRole = backupState.customHeader
        ? backupState.customHeader.role
        : backupState.experience[0]?.role || 'Product Lead';
      const restoredCompany = backupState.customHeader
        ? backupState.customHeader.company
        : backupState.experience[0]?.company || 'THE SOCIETY';
      setEditRole(restoredRole);
      setEditCompany(restoredCompany);
    }
    setShowHeaderRoleSuggestions(false);
    setIsEditing(false);
  };

  const handleSaveEditing = () => {
    const finalRole = editRole.trim() || defaultRole;
    const finalCompany = editCompany.trim() || defaultCompany;

    setCustomHeader({
      role: finalRole,
      company: finalCompany,
    });

    updateUser({
      role: finalRole,
      company: finalCompany,
    });

    setShowHeaderRoleSuggestions(false);
    setIsEditing(false);
  };

  const handleShareProfile = () => {
    try {
      navigator.clipboard?.writeText(window.location.href);
    } catch {
      // ignore clipboard errors
    }
    setSharedCopied(true);
    setTimeout(() => setSharedCopied(false), 2000);
  };

  const handleSaveProject = (savedProj) => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((item) => (item.id === savedProj.id ? savedProj : item))
      );
    } else {
      setProjects((prev) => [savedProj, ...prev]);
    }
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveExperience = (savedExp) => {
    if (editingExperience) {
      setExperience((prev) => {
        const updated = prev.map((item) =>
          item.id === savedExp.id ? savedExp : item
        );
        // If the most recent work experience (first item) was edited, sync default header
        if (updated[0]?.id === savedExp.id) {
          setCustomHeader(null);
          setEditRole(savedExp.role);
          setEditCompany(savedExp.company);
          updateUser({ role: savedExp.role, company: savedExp.company });
        }
        return updated;
      });
    } else {
      // New work experience becomes the most recent (top) item and updates default header
      setExperience((prev) => [savedExp, ...prev]);
      setCustomHeader(null);
      setEditRole(savedExp.role);
      setEditCompany(savedExp.company);
      updateUser({ role: savedExp.role, company: savedExp.company });
    }
  };

  const handleDeleteExperience = (id) => {
    setExperience((prev) => {
      const next = prev.filter((e) => e.id !== id);
      if (prev[0]?.id === id && next[0] && !customHeader) {
        setEditRole(next[0].role);
        setEditCompany(next[0].company);
        updateUser({ role: next[0].role, company: next[0].company });
      }
      return next;
    });
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="flex w-full flex-col gap-[24px] sm:gap-[32px] font-poppins">
      {/* Profile-Header-Card */}
      <section
        className={`flex min-h-[130px] w-full flex-col justify-between gap-[16px] rounded-[16px] border p-[18px] sm:p-[24px] shadow-[0_4px_4px_rgba(0,0,0,0.25),inset_0_4px_4px_rgba(169,183,214,0.25)] md:flex-row md:items-center transition-colors ${
          darkMode
            ? 'border-[#30497D] bg-[#1A2B52]'
            : 'border-[#A9B7D6] bg-[#253C6D]'
        }`}
      >
        {/* User-Info */}
        <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-[16px] sm:gap-[24px] min-w-0">
          <img
            src={
              user?.avatar ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces'
            }
            alt={user?.name || 'Alex Mercer'}
            className="h-[68px] w-[68px] sm:h-[80px] sm:w-[80px] shrink-0 rounded-full border border-[#FFFFFF] object-cover grayscale"
          />

          <div className="flex flex-1 flex-col items-start gap-[6px] min-w-0 w-full">
            <h1 className="font-poppins text-[20px] sm:text-[24px] font-bold leading-[30px] sm:leading-[36px] text-[#FFFFFF] break-words [overflow-wrap:anywhere] max-w-full">
              {user?.name || 'Alex Mercer'}
            </h1>

            {isEditing ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full max-w-full lg:max-w-[540px] pt-1">
                {/* Editable Position with 2026 Job Suggestions (shown only when typing) */}
                <div ref={headerRoleRef} className="relative w-full sm:flex-1 min-w-0">
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditRole(val);
                      setShowHeaderRoleSuggestions(val.trim().length > 0);
                    }}
                    placeholder="Position (e.g. IT)"
                    aria-label="Position"
                    className="h-[36px] w-full rounded-[8px] border border-[#A9B7D6] bg-[#FFFFFF] px-3 font-poppins text-[13px] font-semibold text-[#16213E] placeholder:text-[#455B8A] focus:border-[#F2842F] focus:outline-none"
                  />

                  {showHeaderRoleSuggestions &&
                    editRole.trim().length > 0 &&
                    headerRoleSuggestions.length > 0 && (
                      <ul className="figma-scroll absolute left-0 right-0 top-[40px] z-50 max-h-[180px] w-full sm:min-w-[240px] overflow-y-auto rounded-[8px] border border-[#A9B7D6] bg-[#FFFFFF] py-1 shadow-xl">
                        {headerRoleSuggestions.map((item) => (
                          <li
                            key={item.title}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setEditRole(item.title);
                              setShowHeaderRoleSuggestions(false);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 font-poppins text-[12px] font-medium text-[#16213E] hover:bg-[#E4E9F3] cursor-pointer"
                          >
                            <Briefcase className="h-3 w-3 shrink-0 text-[#253C6D]" />
                            <span className="truncate">{item.title}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>

                {/* Responsive @ + Company Input */}
                <div className="flex items-center gap-2 w-full sm:flex-1 min-w-0">
                  <span className="font-poppins text-[14px] font-bold text-[#FFFFFF] shrink-0">
                    @
                  </span>
                  <input
                    type="text"
                    value={editCompany}
                    onChange={(e) => setEditCompany(e.target.value)}
                    placeholder="Company (e.g. Portabella)"
                    aria-label="Company"
                    className="h-[36px] w-full flex-1 min-w-0 rounded-[8px] border border-[#A9B7D6] bg-[#FFFFFF] px-3 font-poppins text-[13px] font-semibold text-[#16213E] placeholder:text-[#455B8A] focus:border-[#F2842F] focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 font-poppins text-[13px] sm:text-[14px] font-bold leading-[20px] sm:leading-[21px] text-[#FFFFFF] max-w-full break-words [overflow-wrap:anywhere]">
                <span>{displayedRole}</span>
                <span className="opacity-90">@</span>
                <span>{displayedCompany}</span>
              </p>
            )}
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-[12px] sm:gap-[16px] shrink-0 w-full md:w-auto justify-end">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancelEditing}
                className="flex h-[42px] flex-1 sm:flex-initial min-w-[83px] items-center justify-center rounded-[8px] border border-[#A9B7D6] bg-[#FFFFFF] px-[18px] font-poppins text-[13px] font-semibold leading-[20px] text-[#16213E] hover:bg-[#F6F4EF] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEditing}
                className="flex h-[42px] flex-1 sm:flex-initial min-w-[69px] items-center justify-center rounded-[8px] border border-[#A9B7D6] bg-[#455B8A] px-[18px] font-poppins text-[13px] font-semibold leading-[20px] text-[#FFFFFF] hover:bg-[#30497D] transition-colors cursor-pointer"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleShareProfile}
                className="flex h-[42px] flex-1 sm:flex-initial min-w-[78px] items-center justify-center gap-1.5 rounded-[8px] border border-[#A9B7D6] bg-[#FFFFFF] px-[18px] font-poppins text-[13px] font-semibold leading-[20px] text-[#16213E] hover:bg-[#F6F4EF] transition-colors cursor-pointer"
              >
                {sharedCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#253C6D]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <span>Share</span>
                )}
              </button>
              <button
                type="button"
                onClick={handleStartEditing}
                className="flex h-[42px] flex-1 sm:flex-initial min-w-[105px] items-center justify-center rounded-[8px] border border-[#A9B7D6] bg-[#FFFFFF] px-[18px] font-poppins text-[13px] font-semibold leading-[20px] text-[#16213E] hover:bg-[#F6F4EF] transition-colors cursor-pointer"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </section>

      {/* Profile-Grid: Responsive 12-column layout (7 cols Left / 5 cols Right on desktop; on small screens ordered: Projects Portfolio -> Work Experience -> Skills) */}
      <div className="grid w-full max-w-full overflow-x-hidden grid-cols-1 xl:grid-cols-12 items-start gap-[24px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {/* Left-Column: Projects Portfolio + Skills (7/12 width ~ 58% matching 733px/1267px) */}
        <div className="contents xl:flex w-full xl:col-span-7 xl:flex-col gap-[24px] min-w-0 overflow-x-hidden">
          {/* Portfolio-Card (1st on small screens) */}
          <div
            className={`order-1 xl:order-none flex w-full min-w-0 overflow-x-hidden flex-col items-start gap-[16px] rounded-[16px] border p-[18px] sm:p-[24px] transition-colors ${
              darkMode
                ? 'border-[#30497D] bg-[#16213E]'
                : 'border-[#A9B7D6] bg-[#FFFFFF]'
            }`}
          >
            {/* Card Header */}
            <div
              className={`flex min-h-[55px] w-full items-center justify-between gap-2 border-b pb-2 ${
                darkMode ? 'border-[#30497D]' : 'border-[#A9B7D6]'
              }`}
            >
              <h2
                className={`font-poppins text-[16px] font-bold leading-[24px] ${
                  darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                }`}
              >
                Projects Portfolio
              </h2>

              {(isEditing || projects.length === 0) && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject(null);
                    setProjectModalOpen(true);
                  }}
                  className="flex h-[29px] shrink-0 items-center justify-center rounded-[6px] bg-[#253C6D] px-[12px] py-[6px] font-poppins text-[11px] font-semibold leading-[16px] text-[#F6F4EF] hover:bg-[#30497D] transition-colors cursor-pointer"
                >
                  + Add
                </button>
              )}
            </div>

            {/* Portfolio Content: Populated vs Empty View */}
            {projects.length === 0 ? (
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setProjectModalOpen(true);
                }}
                className="flex h-[24px] w-full items-center gap-[8px] text-left cursor-pointer group"
              >
                <PlusCircle
                  className={`h-[20px] w-[20px] shrink-0 ${
                    darkMode
                      ? 'text-[#F2842F] group-hover:text-[#FFFFFF]'
                      : 'text-[#253C6D] group-hover:text-[#30497D]'
                  }`}
                />
                <span
                  className={`font-poppins text-[12px] font-normal leading-[18px] ${
                    darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                  }`}
                >
                  No Entries yet
                </span>
              </button>
            ) : (
              <div className="figma-scroll flex max-h-[320px] w-full min-w-0 flex-col gap-[12px] overflow-y-auto overflow-x-hidden pr-[8px] sm:pr-[12px]">
                {projects.map((project) => {
                  const hasAssets = Boolean(project.links || project.attachment);
                  const isThisPopoverOpen = activeProjectPopover?.id === project.id;

                  return (
                    <div
                      key={project.id}
                      className="flex w-full min-w-0 flex-col items-start gap-[8px]"
                    >
                      {/* Exp-Header */}
                      <div className="flex w-full min-w-0 flex-wrap items-baseline justify-between gap-2">
                        <span
                          className={`font-poppins text-[14px] font-semibold leading-[21px] break-words [overflow-wrap:anywhere] min-w-0 ${
                            darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                          }`}
                        >
                          {project.title}
                        </span>
                        <span
                          className={`font-poppins text-[12px] font-medium leading-[18px] shrink-0 ${
                            darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                          }`}
                        >
                          {project.year}
                        </span>
                      </div>

                      {/* Company */}
                      <span
                        className={`font-poppins text-[12px] font-medium leading-[18px] break-words [overflow-wrap:anywhere] max-w-full ${
                          darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                        }`}
                      >
                        {project.company}
                      </span>

                      {/* Description + Action / Attachment Row */}
                      <div className="flex w-full min-w-0 items-start justify-between gap-[12px] min-h-[24px]">
                        <p
                          className={`font-poppins text-[12px] font-normal leading-[18px] flex-1 min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:anywhere] ${
                            darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                          }`}
                        >
                          {String(project.desc || '').slice(0, 300)}
                        </p>

                        {isEditing ? (
                          <div className="flex h-[24px] items-center justify-end gap-[8px] shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProject(project);
                                setProjectModalOpen(true);
                              }}
                              aria-label={`Edit ${project.title}`}
                              className={`flex h-[24px] w-[24px] items-center justify-center rounded-md transition-colors cursor-pointer ${
                                darkMode
                                  ? 'text-[#F6F4EF] hover:bg-[#1A2B52]'
                                  : 'text-[#16213E] hover:bg-[#F6F4EF]'
                              }`}
                            >
                              <Pencil className="h-[16px] w-[16px] stroke-[2]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProject(project.id)}
                              aria-label={`Delete ${project.title}`}
                              className="flex h-[24px] w-[24px] items-center justify-center rounded-md text-[#F2842F] hover:opacity-80 transition-opacity cursor-pointer"
                            >
                              <Trash2 className="h-[16px] w-[16px] stroke-[2]" />
                            </button>
                          </div>
                        ) : (
                          hasAssets && (
                            <div
                              className="relative shrink-0"
                              onMouseEnter={(e) => handleMouseEnterPin(e, project)}
                              onMouseLeave={handleMouseLeavePin}
                            >
                              <button
                                type="button"
                                onClick={(e) => handleClickPin(e, project)}
                                aria-label="View project links and attachments"
                                title="Hover or click to view attached links & files"
                                className={`flex h-[28px] w-[28px] items-center justify-center rounded-[6px] transition-colors cursor-pointer ${
                                  isThisPopoverOpen
                                    ? darkMode
                                      ? 'bg-[#253C6D] text-[#FFFFFF]'
                                      : 'bg-[#E4E9F3] text-[#16213E]'
                                    : darkMode
                                    ? 'text-[#A9B7D6] hover:bg-[#1A2B52] hover:text-[#FFFFFF]'
                                    : 'text-[#455B8A] hover:bg-[#E4E9F3] hover:text-[#16213E]'
                                }`}
                              >
                                <Paperclip className="h-[16px] w-[16px] stroke-[2]" />
                              </button>
                            </div>
                          )
                        )}
                      </div>

                      {/* Divider Line */}
                      <div
                        className={`w-full border-b ${
                          darkMode ? 'border-[#30497D]' : 'border-[#A9B7D6]'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Skills-Card (3rd on small screens) */}
          <div
            className={`order-3 xl:order-none flex w-full min-w-0 overflow-x-hidden flex-col items-start gap-[16px] rounded-[16px] border p-[18px] sm:p-[24px] transition-colors ${
              darkMode
                ? 'border-[#30497D] bg-[#16213E]'
                : 'border-[#A9B7D6] bg-[#FFFFFF]'
            }`}
          >
            {/* Card Header */}
            <div
              className={`flex min-h-[55px] w-full items-center justify-between gap-2 border-b pb-2 ${
                darkMode ? 'border-[#30497D]' : 'border-[#A9B7D6]'
              }`}
            >
              <h2
                className={`font-poppins text-[16px] font-bold leading-[24px] ${
                  darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                }`}
              >
                Skills
              </h2>

              {(isEditing || skills.length === 0) && (
                <button
                  type="button"
                  onClick={() => setSkillsModalOpen(true)}
                  className="flex h-[29px] shrink-0 items-center justify-center rounded-[6px] bg-[#253C6D] px-[12px] py-[6px] font-poppins text-[11px] font-semibold leading-[16px] text-[#F6F4EF] hover:bg-[#30497D] transition-colors cursor-pointer"
                >
                  + Add
                </button>
              )}
            </div>

            {/* Skills Content: Populated vs Empty View */}
            {skills.length === 0 ? (
              <button
                type="button"
                onClick={() => setSkillsModalOpen(true)}
                className="flex h-[24px] w-full items-center gap-[8px] text-left cursor-pointer group"
              >
                <PlusCircle
                  className={`h-[20px] w-[20px] shrink-0 ${
                    darkMode
                      ? 'text-[#F2842F] group-hover:text-[#FFFFFF]'
                      : 'text-[#253C6D] group-hover:text-[#30497D]'
                  }`}
                />
                <span
                  className={`font-poppins text-[12px] font-normal leading-[18px] ${
                    darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                  }`}
                >
                  No Skills added yet
                </span>
              </button>
            ) : (
              <div className="flex w-full flex-wrap items-start content-start gap-[8px]">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex min-h-[34px] items-center gap-1.5 rounded-[6px] bg-[#E4E9F3] px-[12px] py-[8px] font-poppins text-[12px] font-medium leading-[18px] text-[#16213E]"
                  >
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        aria-label={`Remove ${skill}`}
                        className="text-[#455B8A] hover:text-[#F2842F] cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right-Column: Work Experience (2nd on small screens, 5/12 width on desktop) */}
        <div
          className={`order-2 xl:order-none flex w-full min-w-0 overflow-x-hidden xl:col-span-5 flex-col items-start gap-[16px] rounded-[16px] border p-[18px] sm:p-[24px] transition-colors ${
            darkMode
              ? 'border-[#30497D] bg-[#16213E]'
              : 'border-[#A9B7D6] bg-[#FFFFFF]'
          }`}
        >
          {/* Card Header */}
          <div
            className={`flex min-h-[55px] w-full items-center justify-between gap-2 border-b pb-2 ${
              darkMode ? 'border-[#30497D]' : 'border-[#A9B7D6]'
            }`}
          >
            <h2
              className={`font-poppins text-[16px] font-bold leading-[24px] ${
                darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
              }`}
            >
              Work Experience
            </h2>

            {(isEditing || experience.length === 0) && (
              <button
                type="button"
                onClick={() => {
                  setEditingExperience(null);
                  setExperienceModalOpen(true);
                }}
                className="flex h-[29px] shrink-0 items-center justify-center rounded-[6px] bg-[#253C6D] px-[12px] py-[6px] font-poppins text-[11px] font-semibold leading-[16px] text-[#F6F4EF] hover:bg-[#30497D] transition-colors cursor-pointer"
              >
                + Add
              </button>
            )}
          </div>

          {/* Work Experience Content: Populated vs Empty View */}
          {experience.length === 0 ? (
            <button
              type="button"
              onClick={() => {
                setEditingExperience(null);
                setExperienceModalOpen(true);
              }}
              className="flex h-[24px] w-full items-center gap-[8px] text-left cursor-pointer group"
            >
              <PlusCircle
                className={`h-[20px] w-[20px] shrink-0 ${
                  darkMode
                    ? 'text-[#F2842F] group-hover:text-[#FFFFFF]'
                    : 'text-[#253C6D] group-hover:text-[#30497D]'
                }`}
              />
              <span
                className={`font-poppins text-[12px] font-normal leading-[18px] ${
                  darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                }`}
              >
                No Work Experiences yet
              </span>
            </button>
          ) : (
            <div className="figma-scroll flex max-h-[420px] w-full min-w-0 flex-col gap-[12px] overflow-y-auto overflow-x-hidden pr-[8px] sm:pr-[12px]">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="flex w-full min-w-0 flex-col items-start gap-[8px]"
                >
                  {/* Exp-Header */}
                  <div className="flex w-full min-w-0 flex-wrap items-baseline justify-between gap-2">
                    <span
                      className={`font-poppins text-[14px] font-semibold leading-[21px] break-words [overflow-wrap:anywhere] min-w-0 ${
                        darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                      }`}
                    >
                      {exp.role}
                    </span>
                    <span
                      className={`font-poppins text-[12px] font-medium leading-[18px] shrink-0 ${
                        darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                      }`}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Company */}
                  <span
                    className={`font-poppins text-[12px] font-medium leading-[18px] break-words [overflow-wrap:anywhere] max-w-full ${
                      darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                    }`}
                  >
                    {exp.company}
                  </span>

                  {/* Description */}
                  <p
                    className={`font-poppins text-[12px] font-normal leading-[140%] w-full min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:anywhere] ${
                      darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                    }`}
                  >
                    {String(exp.desc || '').slice(0, 300)}
                  </p>

                  {/* Edit / Delete Row in Edit View (Frame 159) */}
                  {isEditing && (
                    <div className="flex h-[24px] w-full items-center justify-end gap-[8px]">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingExperience(exp);
                          setExperienceModalOpen(true);
                        }}
                        aria-label={`Edit ${exp.role}`}
                        className={`flex h-[24px] w-[24px] items-center justify-center rounded-md transition-colors cursor-pointer ${
                          darkMode
                            ? 'text-[#F6F4EF] hover:bg-[#1A2B52]'
                            : 'text-[#16213E] hover:bg-[#F6F4EF]'
                        }`}
                      >
                        <Pencil className="h-[16px] w-[16px] stroke-[2]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteExperience(exp.id)}
                        aria-label={`Delete ${exp.role}`}
                        className="flex h-[24px] w-[24px] items-center justify-center rounded-md text-[#F2842F] hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <Trash2 className="h-[16px] w-[16px] stroke-[2]" />
                      </button>
                    </div>
                  )}

                  {/* Divider Line */}
                  <div
                    className={`w-full border-b ${
                      darkMode ? 'border-[#30497D]' : 'border-[#A9B7D6]'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Hover / Click Popover for Project Attachments */}
      {activeProjectPopover && (
        <div
          style={{
            top: `${popoverCoords.top}px`,
            left: `${popoverCoords.left}px`,
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClosePopover}
          className={`fixed z-50 w-64 rounded-[12px] border p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition-all ${
            darkMode
              ? 'border-[#30497D] bg-[#16213E] text-[#F6F4EF]'
              : 'border-[#A9B7D6] bg-[#FFFFFF] text-[#16213E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-[10px] font-bold tracking-wider uppercase ${
                darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
              }`}
            >
              Attached Resources
            </span>
            <button
              type="button"
              onClick={() => {
                setPopoverPinned(false);
                setActiveProjectPopover(null);
              }}
              className={`rounded p-0.5 cursor-pointer ${
                darkMode
                  ? 'text-[#A9B7D6] hover:text-[#FFFFFF]'
                  : 'text-[#455B8A] hover:text-[#16213E]'
              }`}
              aria-label="Close resources popover"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-2.5 space-y-2">
            {activeProjectPopover.links && (
              <a
                href={activeProjectPopover.links}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between rounded-[8px] px-3 py-2 text-xs font-semibold transition-colors ${
                  darkMode
                    ? 'bg-[#1A2B52] text-[#F6F4EF] hover:bg-[#253C6D]'
                    : 'bg-[#E4E9F3] text-[#16213E] hover:bg-[#d5def0]'
                }`}
              >
                <span className="truncate pr-2">Open Project Link</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            )}

            {activeProjectPopover.attachment && (
              <div
                className={`flex items-center gap-2.5 rounded-[8px] px-3 py-2 text-xs ${
                  darkMode ? 'bg-[#1A2B52]' : 'bg-[#F6F4EF]'
                }`}
              >
                <FileText
                  className={`h-4 w-4 shrink-0 ${
                    darkMode ? 'text-[#A9B7D6]' : 'text-[#253C6D]'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate font-semibold ${
                      darkMode ? 'text-[#F6F4EF]' : 'text-[#16213E]'
                    }`}
                  >
                    {activeProjectPopover.attachment.name}
                  </p>
                  <p
                    className={`text-[10px] ${
                      darkMode ? 'text-[#A9B7D6]' : 'text-[#455B8A]'
                    }`}
                  >
                    {activeProjectPopover.attachment.size}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <AddProjectModal
        isOpen={projectModalOpen}
        initialData={editingProject}
        darkMode={darkMode}
        onClose={() => {
          setProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
      />

      <AddExperienceModal
        isOpen={experienceModalOpen}
        initialData={editingExperience}
        darkMode={darkMode}
        onClose={() => {
          setExperienceModalOpen(false);
          setEditingExperience(null);
        }}
        onSave={handleSaveExperience}
      />

      <AddSkillsModal
        isOpen={skillsModalOpen}
        existingSkills={skills}
        darkMode={darkMode}
        onClose={() => setSkillsModalOpen(false)}
        onAddSkills={(updatedSkillsList) => {
          setSkills(updatedSkillsList);
        }}
      />
    </div>
  );
}