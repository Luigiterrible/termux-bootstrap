import React from "react";

type FormSummary = {
  id: string;
  name: string;
  archivedAt: string;
};

const mockInactiveForms: FormSummary[] = [
  {
    id: "form_10",
    name: "Expired Lead Intake",
    archivedAt: "2024-12-01",
  },
];

const InactiveForms: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Inactive Forms</h2>
      {mockInactiveForms.length === 0 ? (
        <p>No inactive forms available.</p>
      ) : (
        <ul className="space-y-4">
          {mockInactiveForms.map((form) => (
            <li
              key={form.id}
              className="border rounded p-4 hover:bg-gray-50 cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{form.name}</h3>
              <p className="text-sm text-gray-600">Archived on: {form.archivedAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InactiveForms;
