import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link2, Palette, ArrowRight } from "lucide-react";

const Genrate = () => {
  const [url, setUrl] = useState("");
  const [palette, setPalette] = useState(null);
  const navigate = useNavigate();

  const generatePalette = () => {
    // In real app, call backend API with the URL
    // For now, we mock a generated palette
    const generatedPalette = {
      name: "Website Palette",
      source: url,
      colors: [
        { id: 1, name: "Primary", hex: "#164b82", role: "primary" },
        { id: 2, name: "Secondary", hex: "#4981bc", role: "secondary" },
        { id: 3, name: "Accent", hex: "#FF6F61", role: "accent" },
        { id: 4, name: "Background", hex: "#FFFFFF", role: "background" },
        { id: 5, name: "Text", hex: "#1A1A1A", role: "text" },
      ],
    };
    setPalette(generatedPalette);
  };

  const goToPreview = () => {
    if (palette) {
      navigate("/preview", { state: { generatedPalette: palette } });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-black mb-6">
        Generate Palette from Website
      </h1>

      {/* URL Input */}
      <div className="flex w-full max-w-xl items-center gap-3 mb-6">
        <div className="flex items-center flex-1 border border-gray-300 rounded-lg overflow-hidden">
          <span className="px-3 text-gray-500">
            <Link2 size={18} />
          </span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="w-full px-3 py-2 outline-none text-sm"
          />
        </div>
        <button
          onClick={generatePalette}
          className="px-5 py-2 rounded-lg bg-[#4981bc] text-white font-medium hover:bg-[#164b82] transition"
        >
          Generate
        </button>
      </div>

      {/* Palette Display */}
      {palette && (
        <div className="w-full max-w-2xl bg-gray-50 rounded-xl shadow-lg p-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Palette size={20} /> Generated Palette
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {palette.colors.map((color) => (
              <div key={color.id} className="text-center">
                <div
                  className="h-20 rounded-lg shadow"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="mt-2 text-sm font-medium">{color.name}</p>
                <code className="text-xs text-gray-600">{color.hex}</code>
              </div>
            ))}
          </div>

          {/* Navigate to Preview */}
          <div className="flex justify-end mt-6">
            <button
              onClick={goToPreview}
              className="flex items-center gap-2 px-5 py-2 bg-[#164b82] text-white rounded-lg hover:bg-[#4981bc] transition"
            >
              Go to Preview <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Genrate;
