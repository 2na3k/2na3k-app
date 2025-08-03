import React from 'react';
import { DesktopIconProps } from '../types';

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  title, 
  icon, 
  onClick, 
  onDoubleClick,
  position, 
  onDragStart,
  isSelected
}) => {
  const containerClasses = `absolute cursor-pointer flex flex-col items-center p-2 rounded-md ${isSelected ? 'bg-gray-300 bg-opacity-50' : ''}`;
  return (
    <div
      className={containerClasses}
      style={{ 
        willChange: 'transform',
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: 5
      }}
      onMouseDown={onDragStart}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
          <img src={icon} alt={title} className="w-12 h-12 justify-center pointer-events-none object-contain" />
          <span className="text-xs text-center font-bold text-black max-w-20 truncate pointer-events-none">
            {title}
          </span>
    </div>
  );
};

export default DesktopIcon;
