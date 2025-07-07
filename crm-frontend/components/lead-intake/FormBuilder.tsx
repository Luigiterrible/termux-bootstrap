// crm-frontend/components/lead-intake/FormBuilder.tsx

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

export type FieldType = {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "dropdown" | "checkbox" | "email" | "phone" | "textarea";
  required: boolean;
  options?: string[];
};

type FormBuilderProps = {
  fields?: FieldType[];
  onChange?: (fields: FieldType[]) => void;
};

const FormBuilder: React.FC<FormBuilderProps> = ({ fields: initialFields = [], onChange }) => {
  const [fields, setFields] = useState<FieldType[]>(initialFields);

  const updateField = (index: number, key: keyof FieldType, value: any) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setFields(updatedFields);
    onChange?.(updatedFields);
  };

  const addField = () => {
    const newField: FieldType = {
      id: `field_${fields.length + 1}`,
      label: "New Field",
      type: "text",
      required: false,
    };
    const updated = [...fields, newField];
    setFields(updated);
    onChange?.(updated);
  };

  const removeField = (index: number) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
    onChange?.(updated);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = [...fields];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setFields(reordered);
    onChange?.(reordered);
  };

  return (
    <div className="p-4 space-y-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Form Builder</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      className="flex items-center space-x-3 border p-3 rounded bg-gray-50"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(index, "label", e.target.value)}
                        placeholder="Field Label"
                        className="flex-grow border rounded p-1"
                      />

                      <select
                        value={field.type}
                        onChange={(e) => updateField(index, "type", e.target.value as FieldType["type"])}
                        className="border rounded p-1"
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

                      <label className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateField(index, "required", e.target.checked)}
                        />
                        <span>Required</span>
                      </label>

                      {field.type === "dropdown" && (
                        <input
                          type="text"
                          value={field.options?.join(", ") || ""}
                          onChange={(e) =>
                            updateField(index, "options", e.target.value.split(",").map((o) => o.trim()))
                          }
                          placeholder="Options (comma separated)"
                          className="flex-grow border rounded p-1"
                        />
                      )}

                      <button
                        onClick={() => removeField(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        aria-label="Remove field"
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={addField}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Add Field
      </button>
    </div>
  );
};

export default FormBuilder;
