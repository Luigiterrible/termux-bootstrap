// src/pages/mesothelioma.tsx

import React from "react";
import MesotheliomaForm from "../../components/lead-intake/MesotheliomaForm";

export default function MesotheliomaPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <MesotheliomaForm isPreview={false} />
    </div>
  );
}
