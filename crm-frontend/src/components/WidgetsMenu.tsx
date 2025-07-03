import React from 'react';
import { WidgetConfig } from '../config/widgetsConfig';

type WidgetsMenuProps = {
  widgets: WidgetConfig[];
  visibleMap: Record<string, boolean>;
  toggleWidget: (id: string) => void;
};

const WidgetsMenu: React.FC<WidgetsMenuProps> = ({ widgets, visibleMap, toggleWidget }) => {
  return (
    <aside className="widgets-menu p-4 border-r w-64 bg-gray-50 h-screen overflow-auto">
      <h2 className="text-xl font-bold mb-4">Widgets</h2>
      <ul>
        {widgets.map(({ id, title }) => (
          <li key={id} className="mb-2">
            <label className="flex items-center cursor-pointer space-x-2">
              <input
                type="checkbox"
                checked={visibleMap[id] || false}
                onChange={() => toggleWidget(id)}
                className="form-checkbox"
              />
              <span>{title}</span>
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default WidgetsMenu;
