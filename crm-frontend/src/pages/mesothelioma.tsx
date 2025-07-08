// src/pages/mesothelioma.tsx

import React, { useState } from "react";
import { LoadScript, LoadScriptProps } from "@react-google-maps/api";
import MesotheliomaForm from "../../components/lead-intake/MesotheliomaForm";

const MesotheliomaPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
      onLoad={() => setIsLoaded(true)}
    >
      {isLoaded ? (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
          <MesotheliomaForm isPreview={false} />
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500 text-lg">Loading form...</div>
      )}
    </LoadScript>
  );
};

export default MesotheliomaPage;
