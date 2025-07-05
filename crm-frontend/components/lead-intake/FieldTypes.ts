// src/components/lead-intake/FieldTypes.ts

export type FieldType = {
  id: string;
  label: string;
  type:
    | "text"
    | "number"
    | "date"
    | "dropdown"
    | "checkbox"
    | "email"
    | "phone"
    | "textarea";
  required: boolean;
  options?: string[]; // only for dropdown type
};

export const defaultFields: FieldType[] = [
  {
    id: "1",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    id: "2",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    id: "3",
    label: "Date of Birth",
    type: "date",
    required: false,
  },
];
