import React from 'react';
import { User } from 'lucide-react';

const AboutContent: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
        <User size={32} className="text-white" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Chi Thanh Le (as @2na3k)</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Version beta 1.0.1</p>
      </div>
    </div>
    
    <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        An OS built by thanhlc6 (aka @2na3k) as an engineer, AI advocator and one-liner developer.
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        Built with modern web technologies while maintaining the iconic visual design and user experience of Apple's classic operating system.
      </p>
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>© 2025 Classic TunaOS Desktop</p>
        <p>Built with React & TypeScript & Cursor/Cline</p>
      </div>
    </div>
  </div>
);

export default AboutContent; 