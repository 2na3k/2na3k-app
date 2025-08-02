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
        willChange: 'transform',
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      onMouseDown={onDragStart}
      onClick={onClick}
    >
      <div className="w-16 h-16 mb-2 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-center text-black max-w-20 truncate">
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon;
