import React, { useState, useRef, useEffect, useCallback } from 'react';
import folderIcon from './static/icons/folder.png';
// import contactIcon from './static/icons/contact.png';
import DesktopIcon from './components/DesktopIcon';
import DesktopWindow from './components/Window';
import AboutContent from './components/AboutContent';
import ProjectsContent from './components/ProjectsContent';
import ContactContent from './components/ContactContent';
import ImagePreviewContent from './components/ImagePreviewContent';
import onTheCover from './static/images/on-the-cover.jpg';
import { AppState, DragState, DesktopIcon as DesktopIconType } from './types';
import PdfPreviewContent from './components/PdfPreviewContent';
import cvIcon from './static/icons/cv.png';

const ClassicMacDesktop: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    isDarkMode: false,
    openWindows: new Set(),
    windowPositions: {
      about: { x: 100, y: 100 },
      projects: { x: 150, y: 150 },
      contacts: { x: 200, y: 200 },
      "on-the-cover": { x: 250, y: 250 },
      "cv": { x: 300, y: 300 }
    },
    windowSizes: {
      about: { width: 500, height: 400 },
      projects: { width: 550, height: 450 },
      contacts: { width: 500, height: 350 },
      "on-the-cover": { width: 600, height: 500 },
      "cv": { width: 600, height: 700 }
    },
    iconPositions: {
      about: { x: 0, y: 0 },
      projects: { x: 0, y: 0 },
      contacts: { x: 0, y: 0 },
      "on-the-cover": { x: 0, y: 0 },
      "cv": { x: 0, y: 0 }
    },
    focusedWindow: null,
    selectionBox: null,
    selectedIcons: new Set()
  });

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    isResizing: false,
    isSelecting: false,
    itemId: null,
    itemType: null,
    resizeDirection: null,
    offset: { x: 0, y: 0 },
    startPos: { x: 0, y: 0 },
    startSize: null,
    startWindowPos: { x: 0, y: 0 }
  });

  const desktopRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const dragStateRef = useRef(dragState);
  useEffect(() => {
    dragStateRef.current = dragState;
  }, [dragState]);

  useEffect(() => {
    const calculateIconPositions = () => {
      if (desktopRef.current) {
        const desktopWidth = desktopRef.current.clientWidth;
        const iconWidth = 80;
        const paddingRight = 20;
        const newX = desktopWidth - iconWidth - paddingRight;
        
        setAppState(prev => ({
          ...prev,
          iconPositions: {
            about: { x: newX, y: 50 },
            projects: { x: newX, y: 150 },
            contacts: { x: newX, y: 250 },
            "on-the-cover": { x: newX, y: 350 },
            cv: { x: newX, y: 450 }
          }
        }));
      }
    };

    calculateIconPositions();

    window.addEventListener('resize', calculateIconPositions);
    return () => {
      window.removeEventListener('resize', calculateIconPositions);
    };
  }, []);

  // Desktop icons configuration
  // const desktopIcons: DesktopIconType[] = [
  //   {
  //     id: 'about',
  //     title: 'About',
  //     icon: <img src={folderIcon} alt="About" className="w-12 h-12 justify-center pointer-events-none object-contain" />
  //   },
  //   {
  //     id: 'projects',
  //     title: 'Projects',
  //     icon: <img src={folderIcon} alt="Projects" className="w-12 h-12 justify-center pointer-events-none object-contain" />
  //   }
  // ];
  const desktopIcons: DesktopIconType[] = [
    {
      id: 'about',
      title: 'About',
      icon: folderIcon
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: folderIcon
    },
    {
      id: 'contacts',
      title: 'Contacts',
      icon: folderIcon
    },
    {
      id: 'on-the-cover',
      title: 'cover.jpg',
      icon: onTheCover
    },
    {
      id: 'cv',
      title: 'cv.pdf',
      icon: cvIcon
    }
  ];

  // Window management functions
  const openWindow = useCallback((windowId: string) => {
    setAppState(prev => ({
      ...prev,
      openWindows: new Set([...prev.openWindows, windowId]),
      focusedWindow: windowId
    }));
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    setAppState(prev => ({
      ...prev,
      openWindows: new Set([...prev.openWindows].filter(id => id !== windowId))
    }));
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    setAppState(prev => ({
      ...prev,
      focusedWindow: windowId
    }));
  }, []);

  // Drag handling for windows
  const handleWindowDragStart = (windowId: string, e: React.MouseEvent) => {
    // Focus the window when starting to drag
    focusWindow(windowId);
    
    const currentPosition = appState.windowPositions[windowId];
    setDragState({
      isDragging: true,
      isResizing: false,
      isSelecting: false,
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
    e.stopPropagation();
    const isSelected = appState.selectedIcons.has(iconId);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    if (isSelected && appState.selectedIcons.size > 1) {
      // Multi-drag
      const multiDragStartPositions = Array.from(appState.selectedIcons).reduce((acc, id) => {
        acc[id] = appState.iconPositions[id];
        return acc;
      }, {} as Record<string, { x: number; y: number }>);

      setDragState({
        isDragging: true,
        isResizing: false,
        isSelecting: false,
        itemId: iconId,
        itemType: 'icon',
        resizeDirection: null,
        offset: { x: e.clientX, y: e.clientY },
        startPos: { x: e.clientX, y: e.clientY },
        startSize: null,
        multiDragStartPositions
      });
    } else {
      // Single-drag
      if (!isSelected) {
        setAppState(prev => ({ ...prev, selectedIcons: new Set([iconId]) }));
      }
      setDragState({
        isDragging: true,
        isResizing: false,
        isSelecting: false,
        itemId: iconId,
        itemType: 'icon',
        resizeDirection: null,
        offset: {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        },
        startPos: { x: e.clientX, y: e.clientY },
        startSize: null
      });
    }
  };

  // Resize handling for windows
  const handleWindowResizeStart = (windowId: string, direction: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Focus the window when starting to resize
    focusWindow(windowId);
    
    setDragState({
      isDragging: false,
      isResizing: true,
      isSelecting: false,
      itemId: windowId,
      itemType: 'window',
      resizeDirection: direction,
      offset: { x: 0, y: 0 },
      startPos: {
        x: e.clientX,
        y: e.clientY
      },
      startSize: appState.windowSizes[windowId],
      startWindowPos: appState.windowPositions[windowId]
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
    const currentDragState = dragStateRef.current;
    if (!desktopRef.current) return;

    const desktopRect = desktopRef.current.getBoundingClientRect();

    if (currentDragState.isSelecting) {
      const { startPos } = currentDragState;
      const currentX = e.clientX - desktopRect.left;
      const currentY = e.clientY - desktopRect.top;
      const x = Math.min(startPos.x, currentX);
      const y = Math.min(startPos.y, currentY);
      const width = Math.abs(startPos.x - currentX);
      const height = Math.abs(startPos.y - currentY);
      
      const selected = new Set<string>();
      const iconRects = Object.entries(appState.iconPositions).map(([id, pos]) => ({
        id,
        x: pos.x,
        y: pos.y,
        width: 80,  // Approximate width
        height: 100 // Approximate height
      }));

      iconRects.forEach(icon => {
        if (
          icon.x < x + width &&
          icon.x + icon.width > x &&
          icon.y < y + height &&
          icon.y + icon.height > y
        ) {
          selected.add(icon.id);
        }
      });

      requestAnimationFrame(() => {
        setAppState(prev => ({
          ...prev,
          selectionBox: { x, y, width, height },
          selectedIcons: selected
        }));
      });
    } else if (currentDragState.isDragging && currentDragState.itemId && currentDragState.itemType === 'window') {
      const newX = Math.max(0, Math.min(
        e.clientX - currentDragState.offset.x,
        desktopRect.width - appState.windowSizes[currentDragState.itemId!].width
      ));
      const newY = Math.max(24, Math.min(
        e.clientY - currentDragState.offset.y,
        desktopRect.height - appState.windowSizes[currentDragState.itemId!].height
      ));
      requestAnimationFrame(() => {
        setAppState(prev => ({
          ...prev,
          windowPositions: {
            ...prev.windowPositions,
            [currentDragState.itemId!]: { x: newX, y: newY }
          }
        }));
      });
    } else if (currentDragState.isDragging && currentDragState.itemType === 'icon') {
      if (currentDragState.multiDragStartPositions) {
        // Multi-drag update
        const dx = e.clientX - currentDragState.startPos.x;
        const dy = e.clientY - currentDragState.startPos.y;
        const newIconPositions = { ...appState.iconPositions };

        Object.keys(currentDragState.multiDragStartPositions).forEach(id => {
          const startPos = currentDragState.multiDragStartPositions![id];
          newIconPositions[id] = {
            x: Math.max(0, Math.min(startPos.x + dx, desktopRect.width - 80)),
            y: Math.max(24, Math.min(startPos.y + dy, desktopRect.height - 100))
          };
        });
        
        requestAnimationFrame(() => {
          setAppState(prev => ({ ...prev, iconPositions: newIconPositions }));
        });

      } else {
        // Single-drag update
        const newX = Math.max(0, Math.min(
          e.clientX - desktopRect.left - currentDragState.offset.x,
          desktopRect.width - 80
        ));
        const newY = Math.max(24, Math.min(
          e.clientY - desktopRect.top - currentDragState.offset.y,
          desktopRect.height - 100
        ));
        requestAnimationFrame(() => {
          setAppState(prev => ({
            ...prev,
            iconPositions: {
              ...prev.iconPositions,
              [currentDragState.itemId!]: { x: newX, y: newY }
            }
          }));
        });
      }
    } else if (currentDragState.isResizing && currentDragState.itemType === 'window' && currentDragState.startSize && currentDragState.startWindowPos) {
      const originalPos = currentDragState.startWindowPos;
      const originalSize = currentDragState.startSize;
      let newX = originalPos.x;
      let newY = originalPos.y;
      let newWidth = originalSize.width;
      let newHeight = originalSize.height;
      const direction = currentDragState.resizeDirection;
      const minWidth = 320;
      const minHeight = 200;
      const topBarHeight = 24;
      const mouseX = Math.max(0, Math.min(e.clientX, desktopRect.width));
      const mouseY = Math.max(topBarHeight, Math.min(e.clientY, desktopRect.height));
      const rightEdge = originalPos.x + originalSize.width;
      const bottomEdge = originalPos.y + originalSize.height;

      if (direction?.includes('e')) newWidth = Math.max(minWidth, mouseX - originalPos.x);
      if (direction?.includes('w')) {
        newX = mouseX;
        newWidth = rightEdge - mouseX;
        if (newWidth < minWidth) {
          newWidth = minWidth;
          newX = rightEdge - minWidth;
        }
      }
      if (direction?.includes('s')) newHeight = Math.max(minHeight, mouseY - originalPos.y);
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
          windowPositions: { ...prev.windowPositions, [currentDragState.itemId!]: { x: newX, y: newY } },
          windowSizes: { ...prev.windowSizes, [currentDragState.itemId!]: { width: newWidth, height: newHeight } }
        }));
      });
    }
  }, [appState.windowSizes, appState.iconPositions]);

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      isResizing: false,
      isSelecting: false,
      itemId: null,
      itemType: null,
      resizeDirection: null,
      offset: { x: 0, y: 0 },
      startPos: { x: 0, y: 0 },
      startSize: null,
      startWindowPos: { x: 0, y: 0 }
    });

    // Always clear selection box on mouse up
    setAppState(prev => ({ ...prev, selectionBox: null }));
  }, []);

  const handleIconDoubleClick = (iconId: string) => {
    if (appState.openWindows.has(iconId)) {
      focusWindow(iconId);
    } else {
      openWindow(iconId);
    }
  };

  const handleDesktopMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent starting selection when clicking on other elements like icons or windows
    if (e.target !== desktopRef.current) return;

    // Clear selected icons when clicking on the desktop
    setAppState(prev => ({ ...prev, selectedIcons: new Set() }));

    const desktopRect = desktopRef.current!.getBoundingClientRect();
    setDragState({
      isDragging: false,
      isResizing: false,
      isSelecting: true,
      itemId: null,
      itemType: null,
      resizeDirection: null,
      offset: { x: 0, y: 0 },
      startPos: { 
        x: e.clientX - desktopRect.left,
        y: e.clientY - desktopRect.top
      },
      startSize: null,
      startWindowPos: { x: 0, y: 0 }
    });
  };

  useEffect(() => {
    if (dragState.isDragging || dragState.isResizing || dragState.isSelecting) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState.isDragging, dragState.isResizing, dragState.isSelecting, handleMouseMove, handleMouseUp]);

  return (
    <div className={appState.isDarkMode ? 'dark' : ''}>
      <div
        ref={desktopRef}
        onMouseDown={handleDesktopMouseDown}
        className="w-full h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 dark:from-gray-800 dark:via-gray-900 dark:to-black relative overflow-hidden select-none"
        style={{
          backgroundImage: appState.isDarkMode 
            ? 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)'
            : 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
        }}
      >
        {/* Selection Box */}
        {appState.selectionBox && (
          <div
            className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20"
            style={{
              left: appState.selectionBox.x,
              top: appState.selectionBox.y,
              width: appState.selectionBox.width,
              height: appState.selectionBox.height,
              zIndex: 10
            }}
          />
        )}

        {/* Menu Bar */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 text-xs z-50">
          <div className="flex items-center space-x-4">
            <span className="font-bold">🐟</span>
            <span className="text-gray-700 dark:text-gray-300 font-bold">TunaOS</span>
          </div>
          <div className="ml-auto font-bold text-gray-600 dark:text-gray-400">
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
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
              isSelected={appState.selectedIcons.has(icon.id)}
            />
          ))}
        </div>

        {/* Windows */}
        <DesktopWindow
          id="about"
          title="About This Mac"
          isOpen={appState.openWindows.has('about')}
          isFocused={appState.focusedWindow === 'about'}
          isDragging={dragState.isDragging && dragState.itemId === 'about'}
          isResizing={dragState.isResizing && dragState.itemId === 'about'}
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
          isDragging={dragState.isDragging && dragState.itemId === 'projects'}
          isResizing={dragState.isResizing && dragState.itemId === 'projects'}
          onClose={() => closeWindow('projects')}
          onFocus={() => focusWindow('projects')}
          position={appState.windowPositions.projects}
          size={appState.windowSizes.projects}
          onDragStart={(e) => handleWindowDragStart('projects', e)}
          onResizeStart={(e, direction) => handleWindowResizeStart('projects', direction, e)}
        >
          <ProjectsContent />
        </DesktopWindow>

        <DesktopWindow
          id="contacts"
          title="Contacts"
          isOpen={appState.openWindows.has('contacts')}
          isFocused={appState.focusedWindow === 'contacts'}
          isDragging={dragState.isDragging && dragState.itemId === 'contacts'}
          isResizing={dragState.isResizing && dragState.itemId === 'contacts'}
          onClose={() => closeWindow('contacts')}
          onFocus={() => focusWindow('contacts')}
          position={appState.windowPositions.contacts}
          size={appState.windowSizes.contacts}
          onDragStart={(e) => handleWindowDragStart('contacts', e)}
          onResizeStart={(e, direction) => handleWindowResizeStart('contacts', direction, e)}
        >
          <ContactContent />
        </DesktopWindow>

        <DesktopWindow
          id="on-the-cover"
          title="cover.jpg"
          isOpen={appState.openWindows.has('on-the-cover')}
          isFocused={appState.focusedWindow === 'on-the-cover'}
          isDragging={dragState.isDragging && dragState.itemId === 'on-the-cover'}
          isResizing={dragState.isResizing && dragState.itemId === 'on-the-cover'}
          onClose={() => closeWindow('on-the-cover')}
          onFocus={() => focusWindow('on-the-cover')}
          position={appState.windowPositions['on-the-cover']}
          size={appState.windowSizes['on-the-cover']}
          onDragStart={(e) => handleWindowDragStart('on-the-cover', e)}
          onResizeStart={(e, direction) => handleWindowResizeStart('on-the-cover', direction, e)}
        >
          <ImagePreviewContent />
        </DesktopWindow>

        <DesktopWindow
          id="cv"
          title="cv.pdf"
          isOpen={appState.openWindows.has('cv')}
          isFocused={appState.focusedWindow === 'cv'}
          isDragging={dragState.isDragging && dragState.itemId === 'cv'}
          isResizing={dragState.isResizing && dragState.itemId === 'cv'}
          onClose={() => closeWindow('cv')}
          onFocus={() => focusWindow('cv')}
          position={appState.windowPositions.cv}
          size={appState.windowSizes.cv}
          onDragStart={(e) => handleWindowDragStart('cv', e)}
          onResizeStart={(e, direction) => handleWindowResizeStart('cv', direction, e)}
        >
          <PdfPreviewContent />
        </DesktopWindow>


      </div>
    </div>
  );
};

export default ClassicMacDesktop;
