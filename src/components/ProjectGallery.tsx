import React from 'react';
import { motion } from 'motion/react';
import { Folder, Plus, Trash2, Clock, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { Message } from '../services/daedalusService';
import { Artifact } from './ArtifactCanvas';

export interface Project {
  id: string;
  name: string;
  messages: Message[];
  artifacts: Record<string, Artifact>;
  lastModified: Date;
}

interface ProjectGalleryProps {
  projects: Project[];
  currentProjectId: string | null;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  currentProjectId,
  onSelectProject,
  onNewProject,
  onDeleteProject
}) => {
  return (
    <div className="h-full flex flex-col p-4 md:p-8 space-y-8 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Neural Archive</h2>
          <p className="text-daedalus-muted text-sm">Access and manage your synthesized projects.</p>
        </div>
        <button 
          onClick={onNewProject}
          className="btn-primary flex items-center gap-2 py-2 px-4 text-sm"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-daedalus-muted space-y-4 border-2 border-dashed border-white/5 rounded-2xl">
            <Folder className="w-12 h-12 opacity-20" />
            <p className="text-sm">No archived projects found.</p>
            <button onClick={onNewProject} className="text-daedalus-accent hover:underline text-xs">Initialize your first project</button>
          </div>
        ) : (
          projects.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime()).map((project) => (
            <motion.div
              key={project.id}
              layoutId={project.id}
              onClick={() => onSelectProject(project.id)}
              className={cn(
                "glass-panel p-6 cursor-pointer group hover:border-daedalus-accent/30 transition-all relative overflow-hidden",
                currentProjectId === project.id ? "border-daedalus-accent/50 bg-daedalus-accent/5" : ""
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                  currentProjectId === project.id ? "bg-daedalus-accent text-daedalus-bg" : "bg-white/5 text-daedalus-muted group-hover:text-daedalus-ink"
                )}>
                  <Folder className="w-5 h-5" />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProject(project.id);
                  }}
                  className="p-2 text-daedalus-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-bold text-lg mb-1 truncate">{project.name}</h3>
              
              <div className="flex items-center gap-4 text-[10px] font-mono text-daedalus-muted uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(project.lastModified).toLocaleDateString()}
                </span>
                <span>{Object.keys(project.artifacts).length} Artifacts</span>
              </div>

              <div className="mt-6 flex items-center text-xs font-medium text-daedalus-accent opacity-0 group-hover:opacity-100 transition-all">
                Load Project <ChevronRight className="w-3 h-3 ml-1" />
              </div>

              {currentProjectId === project.id && (
                <div className="absolute top-0 right-0 p-2">
                  <div className="w-2 h-2 bg-daedalus-accent rounded-full animate-pulse" />
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
