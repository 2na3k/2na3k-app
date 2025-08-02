import React from 'react';
import { User } from 'lucide-react';

const AboutContent: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
        <User size={32} className="text-white" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Classic Mac OS</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Version 1.0</p>
      </div>
    </div>
    
    <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        A nostalgic recreation of the classic Mac OS desktop experience from the 1990s.
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        Built with modern web technologies while maintaining the iconic visual design and user experience of Apple's classic operating system.
      </p>
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>© 2025 Classic Mac OS Desktop</p>
        <p>Built with React & TypeScript</p>
      </div>
    </div>
  </div>
);

export default AboutContent; 