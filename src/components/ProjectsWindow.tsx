import React, { useState } from 'react';
import folderIcon from '../static/icons/folder.png';

interface Project {
  id: string;
  title: string;
  icon: string;
}

const projects: Project[] = [
  { id: 'project1', title: 'Project 1', icon: folderIcon },
  { id: 'project2', title: 'Project 2', icon: folderIcon },
  { id: 'project3', title: 'Project 3', icon: folderIcon },
];

interface ProjectsWindowProps {
  onIconDoubleClick: (id: string) => void;
}

const ProjectsWindow: React.FC<ProjectsWindowProps> = ({ onIconDoubleClick }) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleIconClick = (id: string) => {
    setSelectedIcon(id);
  };

  return (
    <div className="flex justify-start items-start h-full p-4">
      {projects.map((project) => {
        const isSelected = selectedIcon === project.id;
        const containerClasses = `flex flex-col items-center cursor-pointer p-2 rounded-md mx-4 ${isSelected ? 'bg-gray-300 bg-opacity-50' : ''}`;

        return (
          <div 
            key={project.id} 
            onClick={() => handleIconClick(project.id)}
            onDoubleClick={() => onIconDoubleClick(project.id)} 
            className={containerClasses}
          >
            <img src={project.icon} alt={project.title} className="w-12 h-12 justify-center pointer-events-none object-contain" />
            <span className="text-xs text-center font-bold text-black max-w-20 truncate pointer-events-none">
              {project.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsWindow;
