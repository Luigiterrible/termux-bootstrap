import React from "react";

type FormSummary = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const mockActiveForms: FormSummary[] = [
  {
    id: "form_1",
    name: "Personal Injury Intake",
    createdAt: "2025-06-15",
    updatedAt: "2025-07-01",
  },
  {
    id: "form_2",
    name: "Medical Malpractice Lead Form",
    createdAt: "2025-05-10",
    updatedAt: "2025-06-28",
  },
];

const ActiveForms: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Active Forms</h2>
      {mockActiveForms.length === 0 ? (
        <p>No active forms available.</p>
      ) : (
        <ul className="space-y-4">
          {mockActiveForms.map((form) => (
            <li
              key={form.id}
              className="border rounded p-4 hover:bg-gray-50 cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{form.name}</h3>
              <p className="text-sm text-gray-600">
                Created: {form.createdAt} | Updated: {form.updatedAt}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveForms;
