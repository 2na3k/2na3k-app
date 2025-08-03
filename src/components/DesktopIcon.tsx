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
      className="absolute cursor-pointer flex flex-col items-center"
      style={{ 
        willChange: 'transform',
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: 10
      }}
      onMouseDown={onDragStart}
      onClick={onClick}
    >
          <img src={icon} alt="About" className="w-12 h-12 justify-center pointer-events-none object-contain" />
          <span className="text-xs text-center font-bold text-black max-w-20 truncate pointer-events-none">
            {title}
          </span>
    </div>
  );
};

export default DesktopIcon;
