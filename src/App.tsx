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
      about: { width: 500, height: 400 },
      projects: { width: 550, height: 450 }
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
    
    const currentPosition = appState.windowPositions[windowId];
    setDragState({
      isDragging: true,
      isResizing: false,
      itemId: windowId,
      itemType: 'window',
      resizeDirection: null,
      offset: {
        x: e.clientX - currentPosition.x,
        y: e.clientY - currentPosition.y
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
        // Check if we should start dragging (moved more than 3px for smoother start)
        if (!dragState.isDragging && !dragState.isResizing && dragState.itemType === 'icon') {
          const distance = Math.sqrt(
            Math.pow(e.clientX - dragState.startPos.x, 2) + 
            Math.pow(e.clientY - dragState.startPos.y, 2)
          );
          if (distance > 3) {
            setDragState(prev => ({ ...prev, isDragging: true }));
          }
        }

        // Handle window dragging with improved performance
        if (dragState.isDragging && dragState.itemType === 'window') {
          const desktopRect = desktopRef.current.getBoundingClientRect();
          const newX = Math.max(0, Math.min(
            e.clientX - dragState.offset.x,
            desktopRect.width - appState.windowSizes[dragState.itemId!].width
          ));
          const newY = Math.max(24, Math.min( // Account for menu bar
            e.clientY - dragState.offset.y,
            desktopRect.height - appState.windowSizes[dragState.itemId!].height
          ));

          // Use requestAnimationFrame for smoother updates
          requestAnimationFrame(() => {
            setAppState(prev => ({
              ...prev,
              windowPositions: {
                ...prev.windowPositions,
                [dragState.itemId!]: { x: newX, y: newY }
              }
            }));
          });
        }
        
        // Handle icon dragging with improved performance
        else if (dragState.isDragging && dragState.itemType === 'icon') {
          const desktopRect = desktopRef.current.getBoundingClientRect();
          const newX = Math.max(0, Math.min(
            e.clientX - desktopRect.left - dragState.offset.x,
            desktopRect.width - 80 // Icon width
          ));
          const newY = Math.max(24, Math.min( // Account for menu bar
            e.clientY - desktopRect.top - dragState.offset.y,
            desktopRect.height - 100 // Account for icon height and margin
          ));

          // Use requestAnimationFrame for smoother updates
          requestAnimationFrame(() => {
            setAppState(prev => ({
              ...prev,
              iconPositions: {
                ...prev.iconPositions,
                [dragState.itemId!]: { x: newX, y: newY }
              }
            }));
          });
        }
        
        // Handle window resizing
        else if (dragState.isResizing && dragState.itemType === 'window' && dragState.startSize) {
          const desktopRect = desktopRef.current.getBoundingClientRect();
          
          const originalPos = appState.windowPositions[dragState.itemId!];
          const originalSize = dragState.startSize;
          
          let newX = originalPos.x;
          let newY = originalPos.y;
          let newWidth = originalSize.width;
          let newHeight = originalSize.height;
          
          const direction = dragState.resizeDirection;
          const minWidth = 320;
          const minHeight = 200;
          const topBarHeight = 24;

          // Use mouse position directly, but clamp it to the desktop boundaries
          const mouseX = Math.max(0, Math.min(e.clientX, desktopRect.width));
          const mouseY = Math.max(topBarHeight, Math.min(e.clientY, desktopRect.height));

          const rightEdge = originalPos.x + originalSize.width;
          const bottomEdge = originalPos.y + originalSize.height;

          if (direction?.includes('e')) {
            newWidth = Math.max(minWidth, mouseX - originalPos.x);
          }
          if (direction?.includes('w')) {
            newX = mouseX;
            newWidth = rightEdge - mouseX;
            if (newWidth < minWidth) {
              newWidth = minWidth;
              newX = rightEdge - minWidth;
            }
          }
          if (direction?.includes('s')) {
            newHeight = Math.max(minHeight, mouseY - originalPos.y);
          }
          if (direction?.includes('n')) {
            newY = mouseY;
            newHeight = bottomEdge - mouseY;
            if (newHeight < minHeight) {
              newHeight = minHeight;
              newY = bottomEdge - minHeight;
            }
          }

          requestAnimationFrame(() => {
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
          });
        }
      }
    };

    const handleMouseUp = () => {
      // If we finished an action on an icon without actually dragging it, treat it as a click.
      if (dragState.itemType === 'icon' && !dragState.isDragging && dragState.itemId) {
        openWindow(dragState.itemId);
      }

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
        onClick={(e) => {
          // Only handle clicks on the desktop background itself, not on windows or icons
          if (e.target === e.currentTarget) {
            // Clear focus when clicking on empty desktop area
            setAppState(prev => ({
              ...prev,
              focusedWindow: null
            }));
          }
        }}
      >
        {/* Menu Bar */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 text-xs z-50">
          <div className="flex items-center space-x-4">
            <span className="font-bold">🐠</span>
            <span className="text-gray-700 dark:text-gray-300">TunaOS</span>
          </div>
          <div className="ml-auto text-gray-600 dark:text-gray-400">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
          onFocus={() => focusWindow('projects')}
          position={appState.windowPositions.projects}
          size={appState.windowSizes.projects}
          onDragStart={(e) => handleWindowDragStart('projects', e)}
          onResizeStart={(e, direction) => handleWindowResizeStart('projects', direction, e)}
        >
          <ProjectsContent />
        </DesktopWindow>


      </div>
    </div>
  );
};

export default ClassicMacDesktop;
