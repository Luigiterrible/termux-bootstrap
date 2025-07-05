// src/pages/super-admin/Dashboard.tsx

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { WidthProvider, Responsive, Layouts, Layout } from 'react-grid-layout';
import { widgetsByRole, WidgetConfig, Role } from '../../config/widgetsConfig';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardProps = {
  userRole: Role;
};

function sanitizeLayoutItem(item: Layout): Layout {
  return {
    i: item.i,
    x: typeof item.x === 'number' ? item.x : 0,
    y: typeof item.y === 'number' ? item.y : Infinity, // Use Infinity so ReactGridLayout places it at bottom
    w: typeof item.w === 'number' ? item.w : 4,
    h: typeof item.h === 'number' ? item.h : 2,
    static: item.static || false,
  };
}

export default function Dashboard({ userRole }: DashboardProps) {
  const availableWidgets = useMemo(() => widgetsByRole[userRole] || [], [userRole]);
  const [layouts, setLayouts] = useState<Layouts>({});
  const [activeWidgets, setActiveWidgets] = useState<Record<string, boolean>>({});
  const [showWidgetsPanel, setShowWidgetsPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedWidgets = localStorage.getItem(`dashboardWidgets_${userRole}`);
      const savedLayouts = localStorage.getItem(`dashboardLayouts_${userRole}`);

      const defaultVisibility: Record<string, boolean> = {};
      availableWidgets.forEach((w) => (defaultVisibility[w.id] = true));

      const parsedWidgets = savedWidgets ? JSON.parse(savedWidgets) : defaultVisibility;

      // Filter active widgets according to available widgets and saved state
      const filteredWidgets: Record<string, boolean> = {};
      availableWidgets.forEach(({ id }) => {
        filteredWidgets[id] = parsedWidgets[id] !== undefined ? parsedWidgets[id] : true;
      });
      setActiveWidgets(filteredWidgets);

      const parsedLayouts: Layouts = savedLayouts ? JSON.parse(savedLayouts) : {};
      const filteredLayouts: Layouts = {};

      Object.entries(parsedLayouts).forEach(([breakpoint, layoutArr]) => {
        filteredLayouts[breakpoint] = layoutArr
          .filter((l) => filteredWidgets[l.i])
          .map(sanitizeLayoutItem);
      });

      setLayouts(filteredLayouts);
    } catch (error) {
      console.error('Failed to load saved dashboard data:', error);
      const defaultVisibility: Record<string, boolean> = {};
      availableWidgets.forEach((w) => (defaultVisibility[w.id] = true));
      setActiveWidgets(defaultVisibility);
      setLayouts({});
    }
  }, [userRole, availableWidgets]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem(`dashboardWidgets_${userRole}`, JSON.stringify(activeWidgets));
  }, [activeWidgets, userRole]);

  const onLayoutChange = (_: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);
    localStorage.setItem(`dashboardLayouts_${userRole}`, JSON.stringify(allLayouts));
  };

  const toggleWidget = useCallback(
    (id: string) => {
      setActiveWidgets((prev) => {
        const newActive = { ...prev, [id]: !prev[id] };
        if (!newActive[id]) {
          setLayouts((oldLayouts) => {
            const newLayouts: Layouts = {};
            Object.entries(oldLayouts).forEach(([bp, layoutArr]) => {
              newLayouts[bp] = layoutArr.filter((l) => l.i !== id);
            });
            localStorage.setItem(`dashboardLayouts_${userRole}`, JSON.stringify(newLayouts));
            return newLayouts;
          });
        }
        return newActive;
      });
    },
    [userRole]
  );

  const handleClose = useCallback(
    (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Prevent drag interference
      toggleWidget(id);
    },
    [toggleWidget]
  );

  const resetDashboard = () => {
    localStorage.removeItem(`dashboardWidgets_${userRole}`);
    localStorage.removeItem(`dashboardLayouts_${userRole}`);
    const defaultVisibility: Record<string, boolean> = {};
    availableWidgets.forEach((w) => (defaultVisibility[w.id] = true));
    setActiveWidgets(defaultVisibility);
    setLayouts({});
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setShowWidgetsPanel(false);
      }
    };
    if (showWidgetsPanel) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWidgetsPanel]);

  return (
    <div className="p-4 bg-white min-h-screen relative font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={resetDashboard}
            className="bg-blue-200 text-blue-800 px-3 py-1.5 rounded border border-blue-400 hover:bg-blue-300 focus:outline-none text-sm"
            aria-label="Reset dashboard layout and widgets"
          >
            Reset Layout
          </button>
          <button
            onClick={() => setShowWidgetsPanel((v) => !v)}
            className="bg-blue-200 text-blue-800 px-3 py-1.5 rounded border border-blue-400 flex items-center space-x-2 hover:bg-blue-300 focus:outline-none text-sm"
            aria-expanded={showWidgetsPanel}
            aria-controls="widgets-panel"
            aria-label="Toggle widgets selection panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
              <path d="M19.4 15a1.65 1.65 0 01.33 1.82l-1.28 2.22a1.65 1.65 0 01-2.13.7l-2.49-1a1.65 1.65 0 00-1.52 0l-2.49 1a1.65 1.65 0 01-2.13-.7l-1.28-2.22a1.65 1.65 0 01.33-1.82l2.06-1.78a1.65 1.65 0 000-2.7L5.18 9.4a1.65 1.65 0 01-.33-1.82l1.28-2.22a1.65 1.65 0 012.13-.7l2.49 1a1.65 1.65 0 001.52 0l2.49-1a1.65 1.65 0 012.13.7l1.28 2.22a1.65 1.65 0 01-.33 1.82l-2.06 1.78a1.65 1.65 0 000 2.7l2.06 1.78z" />
            </svg>
            <span>Widgets</span>
          </button>
        </div>
      </div>

      {showWidgetsPanel && (
        <div
          ref={panelRef}
          id="widgets-panel"
          className="absolute top-16 right-6 bg-white border border-gray-300 rounded shadow-lg p-4 w-64 z-50"
        >
          <h2 className="font-semibold mb-3">Select Widgets</h2>
          <form>
            {availableWidgets.map(({ id, title }) => (
              <label key={id} className="flex items-center space-x-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!activeWidgets[id]}
                  onChange={() => toggleWidget(id)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span>{title}</span>
              </label>
            ))}
          </form>
        </div>
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 10, sm: 6 }}
        rowHeight={120}
        margin={[16, 16]}
        draggableHandle=".drag-handle"
        isDraggable={!isMobile}
        isResizable={!isMobile}
      >
        {availableWidgets.map(({ id, title, component: Component }, index) =>
          activeWidgets[id] ? (
            <div
              key={id}
              data-grid={
                layouts.lg?.find((l) => l.i === id) || {
                  x: (index * 2) % 12,
                  y: Infinity,
                  w: 4,
                  h: 2,
                  i: id,
                }
              }
            >
              <div className="bg-white border border-black rounded-md shadow relative h-full flex flex-col">
                <div className="bg-indigo-100 text-indigo-800 font-semibold py-2 px-3 border-b border-black rounded-t-md flex items-center">
                  {/* Drag handle covers title area except close button */}
                  <div className="drag-handle flex-grow cursor-move select-none">{title}</div>
                  <button
                    onClick={(e) => handleClose(id, e)}
                    className="w-6 h-6 ml-2 flex items-center justify-center border border-gray-400 rounded-sm hover:bg-gray-200 text-gray-600 focus:outline-none"
                    aria-label={`Close ${title} widget`}
                  >
                    ×
                  </button>
                </div>
                <div className="p-4 flex-grow overflow-auto">
                  <Component />
                </div>
              </div>
            </div>
          ) : null
        )}
      </ResponsiveGridLayout>
    </div>
  );
}
