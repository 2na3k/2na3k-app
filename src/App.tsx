import React, { useState, useRef, useEffect } from 'react';
import { User, FolderOpen } from 'lucide-react';
import DesktopIcon from './components/DesktopIcon';
import DesktopWindow from './components/Window';
import AboutContent from './components/AboutContent';
import ProjectsContent from './components/ProjectsContent';
import { AppState, DragState, DesktopIcon as DesktopIconType } from './types';

const ClassicMacDesktop: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    isDarkMode: false,
    openWindows: new Set(),
    windowPositions: {
      about: { x: 100, y: 100 },
      projects: { x: 150, y: 150 }
    },
    windowSizes: {
      about: { width: 400, height: 300 },
      projects: { width: 450, height: 350 }
    },
    iconPositions: {
      about: { x: 50, y: 50 },
      projects: { x: 50, y: 150 }
    },
    focusedWindow: null
  });

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    isResizing: false,
    itemId: null,
    itemType: null,
    resizeDirection: null,
    offset: { x: 0, y: 0 },
    startPos: { x: 0, y: 0 },
    startSize: null
  });

  const desktopRef = useRef<HTMLDivElement>(null);

  // Desktop icons configuration
  const desktopIcons: DesktopIconType[] = [
    {
      id: 'about',
      title: 'About',
      icon: <User size={24} />
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: <FolderOpen size={24} />
    }
  ];

  // Window management functions
  const openWindow = (windowId: string) => {
    setAppState(prev => ({
      ...prev,
      openWindows: new Set([...prev.openWindows, windowId]),
      focusedWindow: windowId
    }));
  };

  const closeWindow = (windowId: string) => {
    setAppState(prev => ({
      ...prev,
      openWindows: new Set([...prev.openWindows].filter(id => id !== windowId))
    }));
  };

  const minimizeWindow = (windowId: string) => {
    closeWindow(windowId);
  };

  const toggleTheme = () => {
    setAppState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const focusWindow = (windowId: string) => {
    setAppState(prev => ({
      ...prev,
      focusedWindow: windowId
    }));
  };

  // Drag handling for windows
  const handleWindowDragStart = (windowId: string, e: React.MouseEvent) => {
    // Focus the window when starting to drag
    focusWindow(windowId);
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragState({
      isDragging: true,
      isResizing: false,
      itemId: windowId,
      itemType: 'window',
      resizeDirection: null,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      },
      startPos: {
        x: e.clientX,
        y: e.clientY
      },
      startSize: null
    });
  };

  // Drag handling for icons
  const handleIconDragStart = (iconId: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragState({
      isDragging: false, // Will be set to true when mouse moves enough
      isResizing: false,
      itemId: iconId,
      itemType: 'icon',
      resizeDirection: null,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      },
      startPos: {
        x: e.clientX,
        y: e.clientY
      },
      startSize: null
    });
  };

  // Resize handling for windows
  const handleWindowResizeStart = (windowId: string, direction: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Focus the window when starting to resize
    focusWindow(windowId);
    
    console.log('Resize started:', windowId, direction); // Debug log
    setDragState({
      isDragging: false,
      isResizing: true,
      itemId: windowId,
      itemType: 'window',
      resizeDirection: direction,
      offset: { x: 0, y: 0 },
      startPos: {
        x: e.clientX,
        y: e.clientY
      },
      startSize: appState.windowSizes[windowId]
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragState.itemId && desktopRef.current) {
        // Check if we should start dragging (moved more than 5px)
        if (!dragState.isDragging && !dragState.isResizing && dragState.itemType === 'icon') {
          const distance = Math.sqrt(
            Math.pow(e.clientX - dragState.startPos.x, 2) + 
            Math.pow(e.clientY - dragState.startPos.y, 2)
          );
          if (distance > 5) {
            setDragState(prev => ({ ...prev, isDragging: true }));
          }
        }

        // Handle window dragging
        if (dragState.isDragging && dragState.itemType === 'window') {
          const desktopRect = desktopRef.current.getBoundingClientRect();
          const newX = Math.max(0, Math.min(
            e.clientX - desktopRect.left - dragState.offset.x,
            desktopRect.width - 320
          ));
          const newY = Math.max(24, Math.min( // Account for menu bar
            e.clientY - desktopRect.top - dragState.offset.y,
            desktopRect.height - 232 // Account for taskbar
          ));

          setAppState(prev => ({
            ...prev,
            windowPositions: {
              ...prev.windowPositions,
              [dragState.itemId!]: { x: newX, y: newY }
            }
          }));
        }
        
        // Handle icon dragging
        else if (dragState.isDragging && dragState.itemType === 'icon') {
          const desktopRect = desktopRef.current.getBoundingClientRect();
          const newX = Math.max(0, Math.min(
            e.clientX - desktopRect.left - dragState.offset.x,
            desktopRect.width - 80 // Icon width
          ));
          const newY = Math.max(24, Math.min( // Account for menu bar
            e.clientY - desktopRect.top - dragState.offset.y,
            desktopRect.height - 120 // Account for taskbar and icon height
          ));

          setAppState(prev => ({
            ...prev,
            iconPositions: {
              ...prev.iconPositions,
              [dragState.itemId!]: { x: newX, y: newY }
            }
          }));
        }
        
        // Handle window resizing
        else if (dragState.isResizing && dragState.itemType === 'window' && dragState.startSize) {
          console.log('Resizing window:', dragState.itemId, dragState.resizeDirection); // Debug log
          const desktopRect = desktopRef.current.getBoundingClientRect();
          const deltaX = e.clientX - dragState.startPos.x;
          const deltaY = e.clientY - dragState.startPos.y;
          
          let newWidth = dragState.startSize.width;
          let newHeight = dragState.startSize.height;
          let newX = appState.windowPositions[dragState.itemId!].x;
          let newY = appState.windowPositions[dragState.itemId!].y;
          
          const direction = dragState.resizeDirection;
          const currentPos = appState.windowPositions[dragState.itemId!];
          
          // Handle horizontal resizing
          if (direction?.includes('e')) {
            newWidth = Math.max(320, Math.min(
              dragState.startSize.width + deltaX,
              desktopRect.width - currentPos.x - 20 // Leave some margin
            ));
          }
          if (direction?.includes('w')) {
            const maxDeltaX = currentPos.x - 20; // Leave some margin from left edge
            const actualDeltaX = Math.min(deltaX, maxDeltaX);
            newWidth = Math.max(320, dragState.startSize.width - actualDeltaX);
            newX = currentPos.x + actualDeltaX;
          }
          
          // Handle vertical resizing
          if (direction?.includes('s')) {
            newHeight = Math.max(200, Math.min(
              dragState.startSize.height + deltaY,
              desktopRect.height - currentPos.y - 40 // Account for taskbar and margin
            ));
          }
          if (direction?.includes('n')) {
            const maxDeltaY = currentPos.y - 40; // Account for menu bar and margin
            const actualDeltaY = Math.min(deltaY, maxDeltaY);
            newHeight = Math.max(200, dragState.startSize.height - actualDeltaY);
            newY = currentPos.y + actualDeltaY;
          }
          
          setAppState(prev => ({
            ...prev,
            windowPositions: {
              ...prev.windowPositions,
              [dragState.itemId!]: { x: newX, y: newY }
            },
            windowSizes: {
              ...prev.windowSizes,
              [dragState.itemId!]: { width: newWidth, height: newHeight }
            }
          }));
        }
      }
    };

    const handleMouseUp = () => {
      setDragState({ 
        isDragging: false,
        isResizing: false,
        itemId: null, 
        itemType: null,
        resizeDirection: null,
        offset: { x: 0, y: 0 },
        startPos: { x: 0, y: 0 },
        startSize: null
      });
    };

    if (dragState.itemId) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, appState.windowPositions]);

  return (
    <div className={appState.isDarkMode ? 'dark' : ''}>
      <div
        ref={desktopRef}
        className="w-full h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 dark:from-gray-800 dark:via-gray-900 dark:to-black relative overflow-hidden select-none"
        style={{
          backgroundImage: appState.isDarkMode 
            ? 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)'
            : 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
        }}
      >
        {/* Menu Bar */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 text-xs z-50">
          <div className="flex items-center space-x-4">
            <span className="font-bold">🍎</span>
            <span className="text-gray-700 dark:text-gray-300">Classic Mac OS</span>
          </div>
          <div className="ml-auto">
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-2 py-1 rounded transition-colors"
              aria-label={`Switch to ${appState.isDarkMode ? 'light' : 'dark'} mode`}
            >
              {appState.isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Desktop Icons */}
        <div className="pt-6">
          {desktopIcons.map(icon => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              title={icon.title}
              icon={icon.icon}
              onClick={() => openWindow(icon.id)}
              position={appState.iconPositions[icon.id]}
              onDragStart={(e) => handleIconDragStart(icon.id, e)}
            />
          ))}
        </div>

        {/* Windows */}
        <DesktopWindow
          id="about"
          title="About This Mac"
          isOpen={appState.openWindows.has('about')}
          isFocused={appState.focusedWindow === 'about'}
          onClose={() => closeWindow('about')}
          onMinimize={() => minimizeWindow('about')}
          onFocus={() => focusWindow('about')}
          position={appState.windowPositions.about}
          size={appState.windowSizes.about}
          onDragStart={(e) => handleWindowDragStart('about', e)}
          onResizeStart={(e, direction) => handleWindowResizeStart('about', direction, e)}
        >
          <AboutContent />
        </DesktopWindow>

        <DesktopWindow
          id="projects"
          title="Projects"
          isOpen={appState.openWindows.has('projects')}
          isFocused={appState.focusedWindow === 'projects'}
          onClose={() => closeWindow('projects')}
          onMinimize={() => minimizeWindow('projects')}
          onFocus={() => focusWindow('projects')}
          position={appState.windowPositions.projects}
          size={appState.windowSizes.projects}
          onDragStart={(e) => handleWindowDragStart('projects', e)}
          onResizeStart={(e, direction) => handleWindowResizeStart('projects', direction, e)}
        >
          <ProjectsContent />
        </DesktopWindow>

        {/* Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 flex items-center px-4 z-50">
          <div className="flex items-center space-x-2">
            {Array.from(appState.openWindows).map(windowId => (
              <button
                key={windowId}
                onClick={() => focusWindow(windowId)}
                className={`text-xs px-3 py-1 rounded border transition-colors capitalize ${
                  appState.focusedWindow === windowId
                    ? 'bg-blue-500 text-white border-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-500 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              >
                {windowId}
              </button>
            ))}
          </div>
          <div className="ml-auto text-xs text-gray-600 dark:text-gray-400">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicMacDesktop; 