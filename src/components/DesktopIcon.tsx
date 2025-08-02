import React, { useState } from 'react';
import { DesktopIconProps } from '../types';

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  title, 
  icon, 
  onClick, 
  position, 
  onDragStart 
}) => {
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent text selection during potential drag
    e.preventDefault();
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setHasMoved(false);
    onDragStart(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartPos) {
      const distance = Math.sqrt(
        Math.pow(e.clientX - dragStartPos.x, 2) + Math.pow(e.clientY - dragStartPos.y, 2)
      );
      if (distance > 5) { // 5px threshold for drag detection
        setHasMoved(true);
      }
    }
  };

  const handleClick = () => {
    // Only trigger click if we haven't moved significantly
    if (!hasMoved) {
      onClick();
    }
    setDragStartPos(null);
    setHasMoved(false);
  };

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group select-none"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div className="w-16 h-16 mb-2 flex items-center justify-center bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg icon-shadow border border-gray-400 dark:border-gray-500 group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-600 dark:group-hover:to-blue-700 transition-all duration-200">
        <div className="text-gray-700 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-blue-200">
          {icon}
        </div>
      </div>
      <span className="text-xs text-center text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm border max-w-20 truncate">
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon; 