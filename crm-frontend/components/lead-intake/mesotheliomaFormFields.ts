// src/components/lead-intake/mesotheliomaFormFields.ts

export type FieldType = {
  id: string;
  label: string;
  type: string;
  required: boolean;
  block: string;
};

export const mesotheliomaFormFields: FieldType[] = [
  // Personal Information
  { id: "fullName", label: "Full Name", type: "text", required: true, block: "Personal Information" },
  { id: "dob", label: "Date of Birth", type: "date", required: true, block: "Personal Information" },
  { id: "phone", label: "Phone Number", type: "phone", required: true, block: "Personal Information" },
  { id: "email", label: "Email Address", type: "email", required: true, block: "Personal Information" },
  { id: "address", label: "Address", type: "text", required: true, block: "Personal Information" },

  // Claimant Details
  { id: "claimantIsVictim", label: "Are you the victim?", type: "checkbox", required: true, block: "Claimant Details" },
  { id: "relationToVictim", label: "Relationship to Victim", type: "text", required: false, block: "Claimant Details" },
  { id: "victimDeceased", label: "Is the Victim Deceased?", type: "checkbox", required: false, block: "Claimant Details" },
  { id: "deathDate", label: "Date of Death", type: "date", required: false, block: "Claimant Details" },
  { id: "isPOA", label: "Do you have a Power of Attorney (POA)?", type: "checkbox", required: false, block: "Claimant Details" },

  // Diagnosis
  { id: "diagnosisType", label: "Type of Mesothelioma", type: "text", required: true, block: "Diagnosis" },
  { id: "diagnosisDate", label: "Diagnosis Date", type: "date", required: true, block: "Diagnosis" },
  { id: "biopsyPerformed", label: "Biopsy Performed", type: "checkbox", required: true, block: "Diagnosis" },
  { id: "biopsyLocation", label: "Part of body biopsy was performed", type: "text", required: false, block: "Diagnosis" },
  { id: "cytologyTesting", label: "If no biopsy: Fluid/cytology testing performed?", type: "checkbox", required: false, block: "Diagnosis" },

  // Treatment Facility
  { id: "hospital", label: "Hospital Where Diagnosed", type: "text", required: true, block: "Treatment Facility" },
  { id: "facilityCityState", label: "Facility Address", type: "text", required: true, block: "Treatment Facility" },
  { id: "treatmentDates", label: "Treatment Dates", type: "text", required: false, block: "Treatment Facility" },

  // Doctor
  { id: "doctorName", label: "Diagnosing Doctor", type: "text", required: false, block: "Doctor" },
  { id: "doctorContact", label: "Doctor Contact Information", type: "text", required: false, block: "Doctor" },
  { id: "doctorAddress", label: "Doctor Address", type: "text", required: false, block: "Doctor" },
  { id: "doctorSpecialty", label: "Doctor Specialty (e.g., Oncologist)", type: "text", required: false, block: "Doctor" },

  // Work History
  { id: "workExposure", label: "Exposure to Asbestos at Work", type: "checkbox", required: true, block: "Work History" },
  { id: "primaryOccupation", label: "Primary Occupation When Exposed", type: "text", required: true, block: "Work History" },
  { id: "employers", label: "Employer(s) when exposed", type: "textarea", required: false, block: "Work History" },
  { id: "employerAddress", label: "Employer Address(es)", type: "text", required: false, block: "Work History" },
  { id: "exposureYears", label: "Years of Exposure", type: "text", required: false, block: "Work History" },
  { id: "statesOfExposure", label: "States of Exposure", type: "text", required: false, block: "Work History" },
  { id: "industrialFacilityPre1982", label: "Worked at industrial facility before 1982?", type: "checkbox", required: false, block: "Work History" },

  // Military
  { id: "militaryService", label: "Did you serve in the U.S. Military?", type: "checkbox", required: false, block: "Military" },
  { id: "militaryBranch", label: "Branch of Service", type: "text", required: false, block: "Military" },
  { id: "militaryYears", label: "Years Served", type: "text", required: false, block: "Military" },
  { id: "servedBefore1982", label: "Served in US Navy or Armed Forces before 1982?", type: "checkbox", required: false, block: "Military" },

  // Legal
  { id: "hasLawyer", label: "Do you currently have a lawyer?", type: "checkbox", required: false, block: "Legal" },
  { id: "filedClaim", label: "Have you previously filed a claim?", type: "checkbox", required: false, block: "Legal" },
  { id: "spokenToFirm", label: "Have you signed paperwork or spoken to a law firm?", type: "checkbox", required: false, block: "Legal" },

  // Documents
  { id: "diagnosisDocuments", label: "Upload proof of diagnosis", type: "file", required: false, block: "Documents" },

  // Intake
  { id: "teamName", label: "Team / Publisher Name", type: "text", required: false, block: "Intake" },
  { id: "agentName", label: "Agent Name", type: "text", required: false, block: "Intake" }
];
