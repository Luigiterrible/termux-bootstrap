import React from 'react';

type WidgetWrapperProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ title, onClose, children }) => {
  return (
    <div className="widget-container border rounded shadow p-4 relative bg-white">
      {/* Title bar */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={onClose}
          aria-label={`Close ${title} widget`}
          className="
            w-6 h-6 flex items-center justify-center
            border border-gray-400 rounded-sm
            hover:bg-gray-200
            text-gray-600
            focus:outline-none
          "
          type="button"
        >
          ×
        </button>
      </div>

      {/* Widget content */}
      <div>{children}</div>
    </div>
  );
};

export default WidgetWrapper;
