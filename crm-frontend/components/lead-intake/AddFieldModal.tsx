import React, { useState, useEffect } from "react";

export type FieldType = {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "dropdown" | "checkbox" | "email" | "phone" | "textarea";
  required: boolean;
  tooltip?: string;
  aiVerified?: boolean;
  options?: string[];
};

type AddFieldModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddField: (field: FieldType) => void;
};

const defaultField: Omit<FieldType, "id"> = {
  label: "",
  type: "text",
  required: false,
  tooltip: "",
  aiVerified: false,
  options: [],
};

const AddFieldModal: React.FC<AddFieldModalProps> = ({ isOpen, onClose, onAddField }) => {
  const [field, setField] = useState<Omit<FieldType, "id">>(defaultField);

  useEffect(() => {
    if (isOpen) setField(defaultField); // reset when modal opens
  }, [isOpen]);

  const updateField = (key: keyof Omit<FieldType, "id">, value: any) => {
    setField((f) => ({ ...f, [key]: value }));
  };

  const handleAdd = () => {
    if (!field.label.trim()) {
      alert("Field label is required");
      return;
    }

    const newField: FieldType = {
      ...field,
      id: `field_${Date.now()}`,
      options: field.type === "dropdown" ? field.options : undefined,
    };

    onAddField(newField);
    onClose();
  };

  return !isOpen ? null : (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          Add New Field
        </h2>

        <label className="block mb-2">
          <span className="font-semibold">Label</span>
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField("label", e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            placeholder="Field Label"
          />
        </label>

        <label className="block mb-2">
          <span className="font-semibold">Type</span>
          <select
            value={field.type}
            onChange={(e) => updateField("type", e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="dropdown">Dropdown</option>
            <option value="checkbox">Checkbox</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="textarea">Textarea</option>
          </select>
        </label>

        {field.type === "dropdown" && (
          <label className="block mb-2">
            <span className="font-semibold">Options (comma separated)</span>
            <input
              type="text"
              value={field.options?.join(", ") || ""}
              onChange={(e) =>
                updateField(
                  "options",
                  e.target.value.split(",").map((opt) => opt.trim())
                )
              }
              className="mt-1 block w-full border rounded p-2"
              placeholder="Option1, Option2, Option3"
            />
          </label>
        )}

        <label className="inline-flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => updateField("required", e.target.checked)}
            className="form-checkbox"
          />
          <span>Required</span>
        </label>

        <label className="block mb-2">
          <span className="font-semibold">Tooltip (Help Text)</span>
          <input
            type="text"
            value={field.tooltip || ""}
            onChange={(e) => updateField("tooltip", e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            placeholder="Optional tooltip or help text"
          />
        </label>

        <label className="inline-flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={field.aiVerified}
            onChange={(e) => updateField("aiVerified", e.target.checked)}
            className="form-checkbox"
          />
          <span>AI Verified</span>
        </label>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModal;
