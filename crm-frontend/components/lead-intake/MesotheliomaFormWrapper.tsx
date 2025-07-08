// src/components/lead-intake/MesotheliomaFormWrapper.tsx
import React from "react";
import { LoadScript } from "@react-google-maps/api";
import MesotheliomaForm from "./MesotheliomaForm";

const libraries: ("places")[] = ["places"];

const MesotheliomaFormWrapper: React.FC = () => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
      libraries={libraries}
    >
      <MesotheliomaForm />
    </LoadScript>
  );
};

export default MesotheliomaFormWrapper;
