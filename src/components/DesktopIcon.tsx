import React from 'react';
import { DesktopIconProps } from '../types';

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  title, 
  icon, 
  onClick, 
  position, 
  onDragStart 
}) => {
  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group select-none"
      style={{ 
        left: position.x, 
        top: position.y,
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
      onMouseDown={onDragStart}
      onClick={onClick}
    >
      <div className="w-16 h-16 mb-2 flex items-center justify-center bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg icon-shadow border border-gray-400 dark:border-gray-500 group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-600 dark:group-hover:to-blue-700 transition-all duration-200">
        <div className="text-gray-700 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-blue-200">
          {icon}
        </div>
      </div>
      <span className="text-xs text-center text-black max-w-20 truncate">
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon;
