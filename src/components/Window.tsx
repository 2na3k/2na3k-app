import React from 'react';
import { X, Minus } from 'lucide-react';
import { WindowProps } from '../types';

const DesktopWindow: React.FC<WindowProps> = ({
  title,
  children,
  isOpen,
  isFocused,
  onClose,
  onMinimize,
  onFocus,
  position,
  size,
  onDragStart,
  onResizeStart
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute bg-gray-100 dark:bg-gray-800 border-2 rounded-lg window-shadow transition-all duration-200 ${
        isFocused 
          ? 'border-blue-500 dark:border-blue-400 shadow-lg' 
          : 'border-gray-400 dark:border-gray-600'
      }`}
      style={{ 
        left: position.x, 
        top: position.y,
        width: size.width,
        height: size.height,
        minWidth: 320,
        minHeight: 200,
        zIndex: isFocused ? 100 : 10
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white px-4 py-2 rounded-t-md cursor-move flex justify-between items-center"
        onMouseDown={(e) => {
          e.stopPropagation();
          onDragStart(e);
        }}
      >
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={onMinimize}
            className="w-4 h-4 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors"
          >
            <Minus size={8} className="text-yellow-800" />
          </button>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={8} className="text-white" />
          </button>
        </div>
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
        className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize hover:bg-blue-200 dark:hover:bg-blue-700 opacity-30 hover:opacity-100 transition-opacity z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'se');
        }}
        style={{
          background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.3) 50%)'
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize hover:bg-blue-200 dark:hover:bg-blue-700 opacity-30 hover:opacity-100 transition-opacity z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'sw');
        }}
        style={{
          background: 'linear-gradient(225deg, transparent 50%, rgba(0,0,0,0.3) 50%)'
        }}
      />
      <div
        className="absolute top-8 right-0 w-6 h-6 cursor-ne-resize hover:bg-blue-200 dark:hover:bg-blue-700 opacity-30 hover:opacity-100 transition-opacity z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'ne');
        }}
        style={{
          background: 'linear-gradient(45deg, transparent 50%, rgba(0,0,0,0.3) 50%)'
        }}
      />
      <div
        className="absolute top-8 left-0 w-6 h-6 cursor-nw-resize hover:bg-blue-200 dark:hover:bg-blue-700 opacity-30 hover:opacity-100 transition-opacity z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'nw');
        }}
        style={{
          background: 'linear-gradient(315deg, transparent 50%, rgba(0,0,0,0.3) 50%)'
        }}
      />
      
      {/* Edge resize handles */}
      <div
        className="absolute bottom-0 left-4 right-4 h-3 cursor-s-resize hover:bg-blue-200 dark:hover:bg-blue-700 opacity-20 hover:opacity-100 transition-opacity z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 's');
        }}
      />
      <div
        className="absolute top-8 left-4 right-4 h-3 cursor-n-resize hover:bg-blue-200 dark:hover:bg-blue-700 opacity-20 hover:opacity-100 transition-opacity z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'n');
        }}
      />
      <div
        className="absolute left-0 top-8 bottom-0 w-3 cursor-w-resize hover:bg-blue-200 dark:hover:bg-blue-700 opacity-20 hover:opacity-100 transition-opacity z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'w');
        }}
      />
      <div
        className="absolute right-0 top-8 bottom-0 w-3 cursor-e-resize hover:bg-blue-200 dark:hover:bg-blue-700 opacity-20 hover:opacity-100 transition-opacity z-10"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e, 'e');
        }}
      />
    </div>
  );
};

export default DesktopWindow; 