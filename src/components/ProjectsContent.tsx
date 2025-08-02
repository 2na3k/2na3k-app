import React from 'react';
import { FolderOpen } from 'lucide-react';

const ProjectsContent: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-16 h-16 bg-gradient-to-b from-green-400 to-green-600 rounded-lg flex items-center justify-center">
        <FolderOpen size={32} className="text-white" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">My Projects</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Development Portfolio</p>
      </div>
    </div>
    
    <div className="space-y-3">
      <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Classic Desktop App</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          A web-based recreation of the classic Mac OS desktop experience with draggable windows and authentic 90s styling.
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">React</span>
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">TypeScript</span>
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Tailwind</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Retro UI Components</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Collection of reusable UI components inspired by classic operating system interfaces.
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Components</span>
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Design System</span>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectsContent; 