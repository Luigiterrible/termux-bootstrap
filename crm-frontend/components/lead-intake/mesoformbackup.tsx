// src/components/lead-intake/MesotheliomaForm.tsx
import React, { useState } from "react";
import { mesotheliomaFormFields, FieldType } from "./mesotheliomaFormFields";
import AddressAutocompleteInput from "../lead-intake/AddressAutocompleteInput"; // Ajusta ruta si es necesario

type MesotheliomaFormProps = {
  isPreview?: boolean;
};

const MesotheliomaForm: React.FC<MesotheliomaFormProps> = ({ isPreview = false }) => {
  // Estado para campos dinámicos / condicionales no en mesotheliomaFormFields
  const [claimFor, setClaimFor] = useState<"myself" | "lovedOne">("myself");
  const [relationshipToVictim, setRelationshipToVictim] = useState("");
  const [victimName, setVictimName] = useState("");
  const [victimDeceased, setVictimDeceased] = useState(false);
  const [victimDeathDate, setVictimDeathDate] = useState("");
  const [victimAddress, setVictimAddress] = useState("");
  const [victimCity, setVictimCity] = useState("");
  const [victimState, setVictimState] = useState("");
  const [victimZip, setVictimZip] = useState("");
  const [victimPhone, setVictimPhone] = useState("");
  const [poa, setPoa] = useState(false);
  const [preferredContact, setPreferredContact] = useState<"phone" | "email">("phone");

  // Estado para campos del array mesotheliomaFormFields
  const initialData: Record<string, any> = {};
  mesotheliomaFormFields.forEach((field) => {
    initialData[field.id] = field.type === "checkbox" ? false : "";
  });

  // Para dirección separada en Personal Info
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [formData, setFormData] = useState(initialData);

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Validación simplificada (puedes extenderla)
  const validateForm = () => {
    // Validar Personal Information (campos separados)
    if (!formData.fullName) {
      alert("Please fill in Full Name.");
      return false;
    }
    if (!formData.phone) {
      alert("Please fill in Phone Number.");
      return false;
    }
    if (!address) {
      alert("Please fill in Address.");
      return false;
    }
    if (!city) {
      alert("Please fill in City.");
      return false;
    }
    if (!state) {
      alert("Please fill in State.");
      return false;
    }
    if (!zip) {
      alert("Please fill in Zip Code.");
      return false;
    }
    if (!formData.email) {
      alert("Please fill in Email Address.");
      return false;
    }
    // Validar preferredContact
    if (!preferredContact) {
      alert("Please select preferred method of contact.");
      return false;
    }

    // Claimant Details validations condicionales
    if (claimFor === "lovedOne") {
      if (!relationshipToVictim) {
        alert("Please fill in Relationship to Affected Person.");
        return false;
      }
      if (!victimName) {
        alert("Please fill in Affected Person's Name.");
        return false;
      }
      if (victimDeceased) {
        if (!victimDeathDate) {
          alert("Please fill in Date of Death.");
          return false;
        }
      } else {
        if (!victimAddress) {
          alert("Please fill in Affected Person's Address.");
          return false;
        }
        if (!victimPhone) {
          alert("Please fill in Affected Person's Phone Number.");
          return false;
        }
      }
    }

    // Validar campos en mesotheliomaFormFields
    for (const field of mesotheliomaFormFields) {
      // Saltar Personal Information y Claimant Details ya validados aparte
      if (
        field.block === "Personal Information" ||
        field.block === "Claimant Details"
      )
        continue;

      const value = formData[field.id];
      if (field.required && (value === "" || value === undefined)) {
        alert(`Please fill in the required field: ${field.label}`);
        return false;
      }
      if (
        field.type === "email" &&
        value &&
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      ) {
        alert("Please enter a valid email address.");
        return false;
      }
      if (
        field.type === "phone" &&
        value &&
        !/^\d{10}$/.test(value.replace(/\D/g, ""))
      ) {
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
      const dataToSubmit = {
        ...formData,
        address,
        city,
        state,
        zip,
        claimFor,
        relationshipToVictim,
        victimName,
        victimDeceased,
        victimDeathDate,
        victimAddress,
        victimCity,
        victimState,
        victimZip,
        victimPhone,
        poa,
        preferredContact,
      };
      console.log("Form submitted:", dataToSubmit);
      alert("Form submitted! Check console.");
    }
  };

  const handleClear = () => {
    if (isPreview) return;
    setFormData(initialData);
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setClaimFor("myself");
    setRelationshipToVictim("");
    setVictimName("");
    setVictimDeceased(false);
    setVictimDeathDate("");
    setVictimAddress("");
    setVictimCity("");
    setVictimState("");
    setVictimZip("");
    setVictimPhone("");
    setPoa(false);
    setPreferredContact("phone");
  };

  // Para agrupar los campos restantes (sin Personal Information ni Claimant Details)
  const groupedFields = mesotheliomaFormFields.reduce<Record<string, FieldType[]>>(
    (acc, field) => {
      if (
        field.block !== "Personal Information" &&
        field.block !== "Claimant Details"
      ) {
        if (!acc[field.block]) acc[field.block] = [];
        acc[field.block].push(field);
      }
      return acc;
    },
    {}
  );

  return (
    <div className="bg-gray-50 py-6 px-4 overflow-y-auto">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Mesothelioma Intake Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-10 max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg"
      >
        {/* Personal Information Section */}
        <fieldset className="border border-gray-300 p-6 rounded-lg">
          <legend className="text-xl font-semibold text-gray-700 mb-4 px-2">
            Personal Information
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <label className="block text-gray-800 font-medium">
              Full Name <span className="text-red-600">*</span>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                disabled={isPreview}
                required
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </label>

            {/* Phone Number */}
            <label className="block text-gray-800 font-medium">
              Phone Number <span className="text-red-600">*</span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={isPreview}
                required
                placeholder="(555) 123-4567"
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </label>

            {/* Address */}
            <label className="block text-gray-800 font-medium">
              Address <span className="text-red-600">*</span>
              <AddressAutocompleteInput
                value={address}
                onChange={setAddress}
                disabled={isPreview}
                placeholder="Address"
              />
            </label>

            {/* City */}
            <label className="block text-gray-800 font-medium">
              City <span className="text-red-600">*</span>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={isPreview}
                required
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </label>

            {/* State */}
            <label className="block text-gray-800 font-medium">
              State <span className="text-red-600">*</span>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={isPreview}
                required
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </label>

            {/* Zip */}
            <label className="block text-gray-800 font-medium">
              Zip Code <span className="text-red-600">*</span>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                disabled={isPreview}
                required
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </label>

            {/* Email */}
            <label className="block text-gray-800 font-medium">
              Email Address <span className="text-red-600">*</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={isPreview}
                required
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </label>

            {/* Preferred method of contact */}
            <label className="block text-gray-800 font-medium">
              Preferred Method of Contact <span className="text-red-600">*</span>
              <select
                value={preferredContact}
                onChange={(e) =>
                  setPreferredContact(e.target.value as "phone" | "email")
                }
                disabled={isPreview}
                required
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </label>
          </div>
        </fieldset>

        {/* Claimant Details Section */}
        <fieldset className="border border-gray-300 p-6 rounded-lg">
          <legend className="text-xl font-semibold text-gray-700 mb-4 px-2">
            Claimant Details
          </legend>

          <div className="mb-4">
            <label className="block font-medium text-gray-800 mb-1">
              Is this claim for yourself or a loved one?
            </label>
            <select
              value={claimFor}
              onChange={(e) =>
                setClaimFor(e.target.value as "myself" | "lovedOne")
              }
              disabled={isPreview}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="myself">Myself</option>
              <option value="lovedOne">Loved One</option>
            </select>
          </div>

          {claimFor === "lovedOne" && (
            <>
              <label className="block text-gray-800 font-medium mb-2">
                Relationship to affected person <span className="text-red-600">*</span>
                <input
                  type="text"
                  value={relationshipToVictim}
                  onChange={(e) => setRelationshipToVictim(e.target.value)}
                  disabled={isPreview}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 bg-white"
                />
              </label>

              <label className="block text-gray-800 font-medium mb-2">
                Affected Person's Name <span className="text-red-600">*</span>
                <input
                  type="text"
                  value={victimName}
                  onChange={(e) => setVictimName(e.target.value)}
                  disabled={isPreview}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 bg-white"
                />
              </label>

              <div className="flex items-center mb-4">
                <input
                  id="victimDeceased"
                  type="checkbox"
                  checked={victimDeceased}
                  onChange={(e) => setVictimDeceased(e.target.checked)}
                  disabled={isPreview}
                  className="mr-2"
                />
                <label htmlFor="victimDeceased" className="text-gray-800 font-medium">
                  Is the affected person deceased?
                </label>
              </div>

              {victimDeceased ? (
                <label className="block text-gray-800 font-medium mb-2">
                  Date of Death <span className="text-red-600">*</span>
                  <input
                    type="date"
                    value={victimDeathDate}
                    onChange={(e) => setVictimDeathDate(e.target.value)}
                    disabled={isPreview}
                    required
                    className="w-full border border-gray-300 rounded-md p-2 bg-white"
                  />
                </label>
              ) : (
                <>
                  <label className="block text-gray-800 font-medium mb-2">
                    Address <span className="text-red-600">*</span>
                    <AddressAutocompleteInput
                      value={victimAddress}
                      onChange={setVictimAddress}
                      disabled={isPreview}
                      placeholder="Address"
                    />
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                    <label className="block text-gray-800 font-medium">
                      City <span className="text-red-600">*</span>
                      <input
                        type="text"
                        value={victimCity}
                        onChange={(e) => setVictimCity(e.target.value)}
                        disabled={isPreview}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 bg-white"
                      />
                    </label>
                    <label className="block text-gray-800 font-medium">
                      State <span className="text-red-600">*</span>
                      <input
                        type="text"
                        value={victimState}
                        onChange={(e) => setVictimState(e.target.value)}
                        disabled={isPreview}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 bg-white"
                      />
                    </label>
                    <label className="block text-gray-800 font-medium">
                      Zip Code <span className="text-red-600">*</span>
                      <input
                        type="text"
                        value={victimZip}
                        onChange={(e) => setVictimZip(e.target.value)}
                        disabled={isPreview}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 bg-white"
                      />
                    </label>
                  </div>
                  <label className="block text-gray-800 font-medium mb-2">
                    Phone Number <span className="text-red-600">*</span>
                    <input
                      type="tel"
                      value={victimPhone}
                      onChange={(e) => setVictimPhone(e.target.value)}
                      disabled={isPreview}
                      required
                      placeholder="(555) 123-4567"
                      className="w-full border border-gray-300 rounded-md p-2 bg-white"
                    />
                  </label>
                </>
              )}

              {/* Power of Attorney visible siempre */}
              <div className="flex items-center mt-4">
                <input
                  id="poa"
                  type="checkbox"
                  checked={poa}
                  onChange={(e) => setPoa(e.target.checked)}
                  disabled={isPreview}
                  className="mr-2"
                />
                <label htmlFor="poa" className="text-gray-800 font-medium">
                  Power of Attorney (POA)
                </label>
              </div>
            </>
          )}

        </fieldset>

        {/* Renderizar el resto de bloques agrupados (Diagnosis, Treatment Facility, Doctor, etc.) */}
        {Object.entries(groupedFields).map(([block, fields]) => (
          <fieldset key={block} className="border border-gray-300 p-6 rounded-lg">
            <legend className="text-xl font-semibold text-gray-700 mb-4 px-2">
              {block}
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => {
                const val = formData[field.id];
                const commonProps = {
                  className: "w-full border border-gray-300 rounded-md p-2 bg-white",
                  disabled: isPreview,
                  readOnly: isPreview && field.type !== "checkbox",
                };

                if (field.id.toLowerCase().includes("address")) {
                  return (
                    <label key={field.id} className="block text-gray-800 font-medium">
                      <div className="mb-1">
                        {field.label} {field.required && <span className="text-red-600">*</span>}
                      </div>
                      <AddressAutocompleteInput
                        value={val}
                        onChange={(value) => handleChange(field.id, value)}
                        disabled={isPreview}
                        placeholder={field.label}
                      />
                    </label>
                  );
                }

                switch (field.type) {
                  case "checkbox":
                    return (
                      <label key={field.id} className="flex items-center text-gray-800 font-medium">
                        <input
                          type="checkbox"
                          checked={val}
                          onChange={(e) => handleChange(field.id, e.target.checked)}
                          disabled={isPreview}
                          className="mr-2"
                        />
                        {field.label}
                      </label>
                    );
                  case "textarea":
                    return (
                      <label key={field.id} className="block text-gray-800 font-medium">
                        <div className="mb-1">
                          {field.label} {field.required && <span className="text-red-600">*</span>}
                        </div>
                        <textarea
                          value={val}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          required={field.required}
                          {...commonProps}
                          className={`${commonProps.className} resize-none bg-${isPreview ? "gray-100" : "white"}`}
                          rows={3}
                        />
                      </label>
                    );
                  case "phone":
                    return (
                      <label key={field.id} className="block text-gray-800 font-medium">
                        <div className="mb-1">
                          {field.label} {field.required && <span className="text-red-600">*</span>}
                        </div>
                        <input
                          type="tel"
                          value={val}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          required={field.required}
                          placeholder="(555) 123-4567"
                          {...commonProps}
                        />
                      </label>
                    );
                  default:
                    return (
                      <label key={field.id} className="block text-gray-800 font-medium">
                        <div className="mb-1">
                          {field.label} {field.required && <span className="text-red-600">*</span>}
                        </div>
                        <input
                          type={field.type}
                          value={val}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          required={field.required}
                          {...commonProps}
                        />
                      </label>
                    );
                }
              })}
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
