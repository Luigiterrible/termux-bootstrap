// src/utils/leadValidation.ts
export function validateLeadData(formData: Record<string, any>, fields: any[]) {
  const errors: Record<string, string> = {};

  fields.forEach(({ name, label, required }) => {
    if (required && (!formData[name] || formData[name].toString().trim() === "")) {
      errors[name] = `${label} is required`;
    }
  });

  return errors;
}
