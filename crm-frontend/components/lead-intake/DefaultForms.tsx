// src/components/lead-intake/DefaultForms.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mesotheliomaFormFields, FieldType } from "./mesotheliomaFormFields";
import MesotheliomaForm from "./MesotheliomaForm";
import { Eye } from "lucide-react";

export type DefaultForm = {
  id: string;
  name: string;
  description: string;
  fields: FieldType[];
};

type DefaultFormsProps = {
  onActivateForm: (form: DefaultForm) => void;
  onCustomizeForm: (fields: FieldType[]) => void;
};

const defaultForms: DefaultForm[] = [
  {
    id: "mesothelioma",
    name: "Mesothelioma Intake Form",
    description: "Asbestos exposure, diagnosis, and military/work history form",
    fields: mesotheliomaFormFields,
  },
];

export default function DefaultForms({ onActivateForm, onCustomizeForm }: DefaultFormsProps) {
  const [previewForm, setPreviewForm] = useState<DefaultForm | null>(null);
  const navigate = useNavigate();

  const handleUseThisForm = () => {
    if (!previewForm) return;
    onActivateForm(previewForm);

    // Abrir en nueva pestaña externa
    if (previewForm.id === "mesothelioma") {
      window.open("/mesothelioma", "_blank", "noopener,noreferrer");
    }

    // Volver a la lista de Default Forms
    setPreviewForm(null);
    navigate("/super-admin/forms/default");
  };

  const handleEditAndUseForm = () => {
    if (!previewForm) return;
    onCustomizeForm(previewForm.fields);
    onActivateForm(previewForm);
    navigate(`/super-admin/forms/customize/${previewForm.id}`);
    setPreviewForm(null);
  };

  const handleCancel = () => {
    setPreviewForm(null);
  };

  if (previewForm) {
    return (
      <div className="p-6 bg-white rounded shadow max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Eye className="w-6 h-6 text-gray-700" />
          {previewForm.name} Preview
        </h3>

        {/* Preview real con isPreview */}
        <MesotheliomaForm isPreview={true} />

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleCancel}
            className="px-5 py-2 rounded border border-gray-400 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleEditAndUseForm}
            className="px-5 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-700"
          >
            Edit and Use this Form
          </button>
          <button
            onClick={handleUseThisForm}
            className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Use This Template
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Default Forms</h2>

      <ul className="space-y-4">
        {defaultForms.map((form) => (
          <li
            key={form.id}
            className="border rounded p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{form.name}</h3>
              <p className="text-gray-600">{form.description}</p>
            </div>
            <button
              onClick={() => setPreviewForm(form)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Preview
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
