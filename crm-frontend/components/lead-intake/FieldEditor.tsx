// src/components/lead-intake/FieldEditor.tsx
import React from "react";
import { FieldType } from "./FieldTypes";

type FieldEditorProps = {
  field: FieldType;
  onUpdate: (field: FieldType) => void;
  onRemove: () => void;
};

export const FieldEditor: React.FC<FieldEditorProps> = ({ field, onUpdate, onRemove }) => {
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...field, label: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as FieldType["type"];
    onUpdate({ ...field, type: newType });
  };

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...field, required: e.target.checked });
  };

  // For dropdown options editing (optional)
  const handleOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const options = e.target.value.split("\n").map((opt) => opt.trim()).filter(Boolean);
    onUpdate({ ...field, options });
  };

  return (
    <div className="border p-3 rounded mb-3 bg-white">
      <input
        type="text"
        value={field.label}
        onChange={handleLabelChange}
        placeholder="Field Label"
        className="border p-1 rounded w-full mb-2"
      />

      <select
        value={field.type}
        onChange={handleTypeChange}
        className="border p-1 rounded w-full mb-2"
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="dropdown">Dropdown</option>
        <option value="checkbox">Checkbox</option>
      </select>

      {field.type === "dropdown" && (
        <textarea
          value={field.options?.join("\n") || ""}
          onChange={handleOptionsChange}
          placeholder="Enter dropdown options, one per line"
          className="border p-1 rounded w-full mb-2"
          rows={3}
        />
      )}

      <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={field.required}
          onChange={handleRequiredChange}
          className="mr-2"
        />
        Required
      </label>

      <button
        onClick={onRemove}
        className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        type="button"
      >
        Remove
      </button>
    </div>
  );
};
