import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultForms from "./DefaultForms";
import { DefaultForm, FieldType } from "./DefaultForms";

const DefaultFormsWrapper: React.FC = () => {
  const navigate = useNavigate();

  const onActivateForm = (form: DefaultForm) => {
    if (form.id === "mesothelioma") {
      navigate("/super-admin/forms/mesothelioma");
    } else {
      alert(`Activated form: ${form.name}`);
    }
  };

  const onCustomizeForm = (fields: FieldType[]) => {
    alert(`Customize form with ${fields.length} fields`);
  };

  return <DefaultForms onActivateForm={onActivateForm} onCustomizeForm={onCustomizeForm} />;
};

export default DefaultFormsWrapper;
