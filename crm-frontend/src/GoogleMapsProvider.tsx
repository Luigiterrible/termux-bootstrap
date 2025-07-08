// src/GoogleMapsProvider.tsx
import React from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries: ("places")[] = ["places"]; // Solo incluimos 'places' que es compatible

type Props = {
  children: React.ReactNode;
};

const GoogleMapsProvider: React.FC<Props> = ({ children }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Google Maps API key not found</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
