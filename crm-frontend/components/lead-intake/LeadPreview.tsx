// src/components/lead-intake/LeadPreview.tsx
import React from "react";

export interface LeadPreviewProps {
  leadData: Record<string, any>; // Lead form data key-value pairs
}

const LeadPreview: React.FC<LeadPreviewProps> = ({ leadData }) => {
  if (!leadData || Object.keys(leadData).length === 0) {
    return (
      <div className="p-4 border rounded bg-white text-gray-500">
        No lead data to preview yet.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded bg-white shadow-md max-h-[400px] overflow-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Lead Preview</h3>
      <table className="w-full table-auto border-collapse">
        <tbody>
          {Object.entries(leadData).map(([key, value]) => (
            <tr key={key} className="border-b last:border-b-0">
              <td className="py-2 px-4 font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</td>
              <td className="py-2 px-4 text-gray-900 break-words">{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadPreview;
