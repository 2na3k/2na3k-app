import React from 'react';
import { X } from 'lucide-react';
import { WindowProps } from '../types';

const DesktopWindow: React.FC<WindowProps> = ({
  title,
  children,
  isOpen,
  isFocused,
  isDragging,
  isResizing,
  onClose,
  onFocus,
  position,
  size,
  onDragStart,
  onResizeStart
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute bg-gray-100 dark:bg-gray-800 border-2 rounded-xl window-shadow ${!(isDragging || isResizing) ? 'transition-all duration-200' : ''} ${
        isFocused 
          ? 'border-gray-700 dark:border-gray-500 shadow-lg' 
          : 'border-gray-400 dark:border-gray-600 filter grayscale'
      }`}
      style={{ 
        width: size.width,
        height: size.height,
        minWidth: 320,
        minHeight: 200,
        zIndex: isFocused ? 100 : 15,
        willChange: 'transform',
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`px-4 py-2 rounded-t-md cursor-move flex items-center transition-colors duration-200 ${
          isFocused
            ? 'bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 text-white'
            : 'bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600 text-gray-800 dark:text-gray-300'
        }`}
        onMouseDown={(e) => {
          e.stopPropagation();
          onDragStart(e);
        }}
      >
        <div className="flex space-x-2">
          <button
            onClick={onClose}
            className="w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={8} className="text-white" />
          </button>
          <button
            className="w-4 h-4 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-colors"
          />
          <button
            className="w-4 h-4 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
          />
        </div>
        <h3 className="flex-grow text-center text-sm font-medium">{title}</h3>
        <div className="w-20" /> {/* Spacer to balance the close button */}
      </div>
      
      {/* Window Content */}
      <div 
        className="p-4 overflow-y-auto" 
        style={{ height: `calc(100% - 40px)` }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>

      {/* Resize Handles */}
      <div
        className="absolute -top-1 -left-1 w-4 h-4 cursor-nw-resize z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'nw');
        }}
      />
      <div
        className="absolute -top-1 -right-1 w-4 h-4 cursor-ne-resize z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'ne');
        }}
      />
      <div
        className="absolute -bottom-1 -left-1 w-4 h-4 cursor-sw-resize z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'sw');
        }}
      />
      <div
        className="absolute -bottom-1 -right-1 w-4 h-4 cursor-se-resize z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'se');
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-1 w-4 h-full cursor-w-resize z-20"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'w');
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -right-1 w-4 h-full cursor-e-resize z-20"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'e');
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-1 w-full h-2 cursor-n-resize z-20"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'n');
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-4 cursor-s-resize z-20"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 's');
        }}
      />
    </div>
  );
};

export default DesktopWindow;
