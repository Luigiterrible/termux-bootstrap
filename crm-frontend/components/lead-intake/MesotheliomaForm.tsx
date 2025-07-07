import React, { useState } from "react";
import { mesotheliomaFormFields, FieldType } from "./mesotheliomaFormFields";

type MesotheliomaFormProps = {
  isPreview?: boolean;
};

const MesotheliomaForm: React.FC<MesotheliomaFormProps> = ({ isPreview = false }) => {
  const initialData: Record<string, any> = {};
  mesotheliomaFormFields.forEach((field) => {
    initialData[field.id] = field.type === "checkbox" ? false : "";
  });

  const [formData, setFormData] = useState(initialData);

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const groupedFields = mesotheliomaFormFields.reduce<Record<string, FieldType[]>>((acc, field) => {
    if (!acc[field.block]) acc[field.block] = [];
    acc[field.block].push(field);
    return acc;
  }, {});

  const validateForm = () => {
    for (const field of mesotheliomaFormFields) {
      const value = formData[field.id];
      if (field.required && (value === "" || value === undefined)) {
        alert(`Please fill in the required field: ${field.label}`);
        return false;
      }
      if (field.type === "email" && value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        alert("Please enter a valid email address.");
        return false;
      }
      if (field.type === "phone" && value && !/^\d{10}$/.test(value.replace(/\D/g, ""))) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPreview) return;
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Form submitted! Check console.");
    }
  };

  const handleClear = () => {
    if (isPreview) return;
    setFormData(initialData);
  };

  const renderInput = (field: FieldType) => {
    const val = formData[field.id];
    const commonProps = {
      className: "w-full border border-gray-300 rounded-md p-2 bg-white",
      disabled: isPreview,
      readOnly: isPreview && field.type !== "checkbox", // Allow checkbox to be grayed out
    };

    switch (field.type) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={val}
            onChange={(e) => handleChange(field.id, e.target.checked)}
            disabled={isPreview}
            className="w-5 h-5 mt-1"
          />
        );
      case "textarea":
        return (
          <textarea
            value={val}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            {...commonProps}
            className={`${commonProps.className} resize-none bg-${isPreview ? "gray-100" : "white"}`}
            rows={3}
          />
        );
      case "phone":
        return (
          <input
            type="tel"
            value={val}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            placeholder="(555) 123-4567"
            {...commonProps}
          />
        );
      default:
        return (
          <input
            type={field.type}
            value={val}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            {...commonProps}
          />
        );
    }
  };

  return (
    <div className="bg-gray-50 py-6 px-4 overflow-y-auto">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Mesothelioma Intake Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-10 max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg"
      >
        {Object.entries(groupedFields).map(([block, fields]) => (
          <fieldset key={block} className="border border-gray-300 p-6 rounded-lg">
            <legend className="text-xl font-semibold text-gray-700 mb-4 px-2">{block}</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <label key={field.id} className="block text-gray-800 font-medium">
                  <div className="mb-1">
                    {field.label} {field.required && <span className="text-red-600">*</span>}
                  </div>
                  {renderInput(field)}
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        {/* Botones */}
        {!isPreview && (
          <div className="bg-blue-600 p-6 rounded-lg mt-10 flex justify-between items-center">
            <button
              type="button"
              onClick={handleClear}
              className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded hover:bg-blue-100 font-semibold"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded hover:bg-blue-100 font-semibold"
            >
              Submit Form
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MesotheliomaForm;
