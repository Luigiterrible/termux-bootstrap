// src/pages/super-admin/lead-intake/CreateLead.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormBuilder, { FormField } from "../../../components/lead-intake/FormBuilder";

const CreateLead: React.FC = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState<FormField[]>([
    // You can initialize with some default fields or empty array
  ]);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Receive form structure changes from FormBuilder
  const handleFormFieldsChange = (fields: FormField[]) => {
    setFormFields(fields);
  };

  // Handle input changes on the lead creation form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;
    let value: any;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simple form validation for required fields
  const validateForm = () => {
    for (const field of formFields) {
      if (field.required && !formData[field.id]) {
        alert(`Please fill in the required field: ${field.label}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // TODO: Send formData to backend API to save the lead
    console.log("Submitting lead data:", formData);

    alert("Lead created successfully!");
    navigate("/super-admin/lead-tracking/view");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New Lead</h1>

      {/* Form Builder UI - Optional toggle or separate admin page */}
      <FormBuilder initialFields={formFields} onChange={handleFormFieldsChange} />

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {formFields.length === 0 && (
          <p className="text-gray-500">No fields defined. Use the form builder above to add fields.</p>
        )}

        {formFields.map((field) => {
          const value = formData[field.id] || "";

          switch (field.type) {
            case "text":
            case "number":
            case "date":
              return (
                <div key={field.id} className="flex flex-col">
                  <label htmlFor={field.id} className="font-semibold mb-1">
                    {field.label} {field.required && <span className="text-red-600">*</span>}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={value}
                    onChange={handleInputChange}
                    required={field.required}
                    className="border p-2 rounded"
                  />
                </div>
              );

            case "dropdown":
              return (
                <div key={field.id} className="flex flex-col">
                  <label htmlFor={field.id} className="font-semibold mb-1">
                    {field.label} {field.required && <span className="text-red-600">*</span>}
                  </label>
                  <select
                    id={field.id}
                    name={field.id}
                    value={value}
                    onChange={handleInputChange}
                    required={field.required}
                    className="border p-2 rounded"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );

            case "checkbox":
              return (
                <div key={field.id} className="flex items-center space-x-2">
                  <input
                    id={field.id}
                    name={field.id}
                    type="checkbox"
                    checked={!!value}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={field.id} className="font-semibold">
                    {field.label} {field.required && <span className="text-red-600">*</span>}
                  </label>
                </div>
              );

            default:
              return null;
          }
        })}

        {formFields.length > 0 && (
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded"
          >
            Submit Lead
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateLead;
