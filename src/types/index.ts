import React from 'react';

export interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  isFocused: boolean;
  onClose: () => void;
  onFocus: () => void;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onDragStart: (_e: React.MouseEvent) => void;
  onResizeStart: (_e: React.MouseEvent, _direction: string) => void;
}

export interface DesktopIconProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  position: { x: number; y: number };
  onDragStart: (_e: React.MouseEvent) => void;
}

export interface AppState {
  isDarkMode: boolean;
  openWindows: Set<string>;
  windowPositions: Record<string, { x: number; y: number }>;
  windowSizes: Record<string, { width: number; height: number }>;
  iconPositions: Record<string, { x: number; y: number }>;
  focusedWindow: string | null;
}

export interface DragState {
  isDragging: boolean;
  isResizing: boolean;
  itemId: string | null;
  itemType: 'window' | 'icon' | null;
  resizeDirection: string | null;
  offset: { x: number; y: number };
  startPos: { x: number; y: number };
  startSize: { width: number; height: number } | null;
}

export interface DesktopIcon {
  id: string;
  title: string;
  icon: React.ReactNode;
}
