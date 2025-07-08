import React, { useEffect, useState } from "react";

export default function LocationTest() {
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
      console.log("API KEY:", apiKey); // ← Aquí se muestra en consola del navegador

      if (!apiKey) {
        setError("API key no encontrada.");
        return;
      }

      try {
        const query = "1600 Amphitheatre Parkway, Mountain View, CA";

        const response = await fetch(
          `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(
            query
          )}&format=json`
        );

        if (!response.ok) throw new Error("Error al llamar a LocationIQ");

        const data = await response.json();
        setResults(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Prueba de LocationIQ</h1>
      {error && <p className="text-red-600">{error}</p>}
      {results.length > 0 ? (
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {JSON.stringify(results, null, 2)}
        </pre>
      ) : (
        !error && <p>Cargando resultados...</p>
      )}
    </div>
  );
}
