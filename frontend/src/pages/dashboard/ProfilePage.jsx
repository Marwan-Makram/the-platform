import React, { useState } from 'react';
import { Paperclip, Pencil, Trash2, Plus, X, ExternalLink, FileText } from 'lucide-react';
import AddProjectModal from '@/components/profile/AddProjectModal';
import AddExperienceModal from '@/components/profile/AddExperienceModal';
import AddSkillsModal from '@/components/profile/AddSkillsModal';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'Dashboard Redesign',
    year: '2024',
    company: 'THE SOCIETY',
    desc: 'A clean dashboard concept optimized for productivity.',
    links: 'https://github.com/the-society/dashboard',
    attachment: null,
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
    desc: 'An platform-based native app for tracking sprint velocity.',
    links: 'https://behance.net/gallery/workspace',
    attachment: null,
  },
  {
    id: 4,
    title: 'Cloud Infrastructure Portal',
    year: '2018',
    company: 'DevCore Systems',
    desc: 'Internal DevOps tooling console designed for large-scale microservice deployments.',
    links: 'https://github.com/devcore/portal',
    attachment: { name: 'architecture-diagram.png', size: '1.1 MB' },
  },
];

const INITIAL_EXPERIENCE = [
  {
    id: 1,
    role: 'Product Lead',
    company: 'THE SOCIETY',
    period: '2024 – Present',
    desc: 'Leading the core product experience, defining design directions and cross-team workflows.',
  },
  {
    id: 2,
    role: 'Senior Product Designer',
    company: 'Arch Studio',
    period: '2021 – 2024',
    desc: 'Crafted complex SaaS interfaces, dashboard patterns, and design systems for enterprise architecture software.',
  },
  {
    id: 3,
    role: 'Product Designer',
    company: 'Vertex Labs',
    period: '2019 – 2021',
    desc: 'Designed native mobile and web applications focusing on data density and high usability.',
  },
  {
    id: 4,
    role: 'UI/UX Specialist',
    company: 'Studio Monochrome',
    period: '2017 – 2019',
    desc: 'Executed end-to-end design research, prototyping, and wireframing for emerging fintech products.',
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
  const [isEditing, setIsEditing] = useState(false);

  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [experience, setExperience] = useState(INITIAL_EXPERIENCE);
  const [skills, setSkills] = useState(INITIAL_SKILLS);

  const [editingProject, setEditingProject] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);

  // Floating Popover State
  const [hoveredProject, setHoveredProject] = useState(null);
  const [popoverCoords, setPopoverCoords] = useState({ top: 0, left: 0 });

  const handleMouseEnterPin = (e, project) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverCoords({
      top: rect.top - 10,
      left: rect.left - 240, // Positions directly on top/left of the pin
    });
    setHoveredProject(project);
  };

  const handleMouseLeavePin = () => {
    setHoveredProject(null);
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
      setExperience((prev) =>
        prev.map((item) => (item.id === savedExp.id ? savedExp : item))
      );
    } else {
      setExperience((prev) => [savedExp, ...prev]);
    }
  };

  const handleDeleteExperience = (id) => {
    setExperience((prev) => prev.filter((e) => e.id !== id));
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header Card */}
      <div className="flex shrink-0 flex-col justify-between gap-3 rounded-[20px] border border-neutral-700 bg-white p-5 shadow-[0_5px_15px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces"
            alt="Alex Mercer"
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">Alex Mercer</h1>
            <p className="text-xs font-semibold text-neutral-500">
              Product Lead <span className="font-normal text-neutral-400">@ THE SOCIETY</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="h-9 rounded-lg bg-black px-4 text-xs font-bold text-white shadow-xs hover:bg-neutral-800 cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="h-9 rounded-lg border border-neutral-300 px-3.5 text-xs font-bold text-neutral-800 hover:bg-neutral-50 cursor-pointer"
              >
                Done
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="h-9 rounded-lg border border-neutral-300 px-3.5 text-xs font-bold text-neutral-800 hover:bg-neutral-50 cursor-pointer"
              >
                Export
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="h-9 rounded-lg border border-neutral-300 px-3.5 text-xs font-bold text-neutral-800 hover:bg-neutral-50 cursor-pointer"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Grid Viewport */}
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2 min-h-0 items-stretch pb-1">
        {/* Left Column */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* Projects Portfolio */}
          <div className="flex flex-1 flex-col rounded-[20px] border border-neutral-700 bg-white p-5 shadow-[0_5px_15px_rgba(0,0,0,0.06)] min-h-0">
            <div className="flex shrink-0 items-center justify-between pb-3 border-b border-neutral-100">
              <h2 className="text-sm font-bold text-neutral-900">Projects Portfolio</h2>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject(null);
                    setProjectModalOpen(true);
                  }}
                  className="flex items-center gap-1 rounded-md bg-black px-2 py-0.5 text-[11px] font-bold text-white shadow-2xs hover:bg-neutral-800 cursor-pointer"
                >
                  <Plus className="h-3 w-3" /> Add
                </button>
              )}
            </div>

            {/* Custom Figma-Styled Scrollbar */}
            <div className="figma-scroll flex-1 overflow-y-auto divide-y divide-neutral-100 pr-3 mt-1">
              {projects.map((project) => {
                const hasAssets = Boolean(project.links || project.attachment);

                return (
                  <div key={project.id} className="py-3 first:pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-900">{project.title}</span>
                      <span className="font-medium text-neutral-400">{project.year}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
                      {project.company}
                    </span>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-xs text-neutral-500 line-clamp-2 pr-2">{project.desc}</p>
                      
                      {isEditing ? (
                        <div className="flex items-center gap-2 shrink-0 pl-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject(project);
                              setProjectModalOpen(true);
                            }}
                            className="text-neutral-700 hover:text-black cursor-pointer"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-[#E0533C] hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        hasAssets && (
                          <div
                            className="shrink-0 ml-2"
                            onMouseEnter={(e) => handleMouseEnterPin(e, project)}
                            onMouseLeave={handleMouseLeavePin}
                          >
                            <button
                              type="button"
                              className="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-800 cursor-pointer"
                            >
                              <Paperclip className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills Section */}
          <div className="shrink-0 rounded-[20px] border border-neutral-700 bg-white p-5 shadow-[0_5px_15px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-neutral-900">Skills</h2>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setSkillsModalOpen(true)}
                  className="flex items-center gap-1 rounded-md bg-black px-2 py-0.5 text-[11px] font-bold text-white shadow-2xs hover:bg-neutral-800 cursor-pointer"
                >
                  <Plus className="h-3 w-3" /> Add Skill
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 rounded-lg bg-[#F2F2F2] px-3 py-1.5 text-xs font-semibold text-neutral-800"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-neutral-400 hover:text-[#E0533C] cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Work Experience */}
        <div className="flex flex-1 flex-col rounded-[20px] border border-neutral-700 bg-white p-5 shadow-[0_5px_15px_rgba(0,0,0,0.06)] min-h-0">
          <div className="flex shrink-0 items-center justify-between pb-3 border-b border-neutral-100">
            <h2 className="text-sm font-bold text-neutral-900">Work Experience</h2>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setEditingExperience(null);
                  setExperienceModalOpen(true);
                }}
                className="flex items-center gap-1 rounded-md bg-black px-2 py-0.5 text-[11px] font-bold text-white shadow-2xs hover:bg-neutral-800 cursor-pointer"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            )}
          </div>

          <div className="figma-scroll flex-1 overflow-y-auto divide-y divide-neutral-100 pr-3 mt-1">
            {experience.map((exp) => (
              <div key={exp.id} className="py-3.5 first:pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-900">{exp.role}</span>
                  <span className="font-medium text-neutral-400">{exp.period}</span>
                </div>
                <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
                  {exp.company}
                </span>
                <div className="mt-1 flex items-start justify-between">
                  <p className="text-xs leading-relaxed text-neutral-500 pr-3">{exp.desc}</p>
                  {isEditing && (
                    <div className="flex items-center gap-2 shrink-0 pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingExperience(exp);
                          setExperienceModalOpen(true);
                        }}
                        className="text-neutral-700 hover:text-black cursor-pointer"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="text-[#E0533C] hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FIXED HOVER POPOVER: Rendered as fixed portal layer, never clipped */}
      {hoveredProject && (
        <div
          style={{ top: `${popoverCoords.top}px`, left: `${popoverCoords.left}px` }}
          className="fixed z-50 w-60 rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-2xl transition-all"
          onMouseEnter={() => setHoveredProject(hoveredProject)}
          onMouseLeave={handleMouseLeavePin}
        >
          <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
            ATTACHED RESOURCES
          </span>

          <div className="mt-2 space-y-2">
            {hoveredProject.links && (
              <a
                href={hoveredProject.links}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl bg-neutral-50 p-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span className="truncate pr-1">Project Link</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            )}

            {hoveredProject.attachment && (
              <div className="flex items-center gap-2.5 rounded-xl bg-neutral-50 p-2 text-xs">
                <FileText className="h-4 w-4 shrink-0 text-neutral-500" />
                <div className="truncate">
                  <p className="truncate font-semibold text-neutral-800">
                    {hoveredProject.attachment.name}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    {hoveredProject.attachment.size}
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
        onClose={() => {
          setProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
      />

      <AddExperienceModal
        isOpen={experienceModalOpen}
        initialData={editingExperience}
        onClose={() => {
          setExperienceModalOpen(false);
          setEditingExperience(null);
        }}
        onSave={handleSaveExperience}
      />

      <AddSkillsModal
        isOpen={skillsModalOpen}
        existingSkills={skills}
        onClose={() => setSkillsModalOpen(false)}
        onAddSkills={(updatedSkillsList) => setSkills(updatedSkillsList)}
      />
    </div>
  );
}