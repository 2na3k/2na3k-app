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
    <span
      className="absolute cursor-pointer"
      style={{ 
        willChange: 'transform',
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      onMouseDown={onDragStart}
      onClick={onClick}
    >
      <div className="p-2">
        <div 
          className="flex flex-col items-center group"
        >
          <div className="w-16 h-16 mb-2 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-xs text-center font-bold text-black max-w-20 truncate">
            {title}
          </span>
        </div>
      </div>
    </span>
  );
};

export default DesktopIcon;
