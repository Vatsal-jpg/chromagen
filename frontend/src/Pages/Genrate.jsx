import React, { useState } from "react";
import { Link2, Palette, ArrowRight, XCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Genrate = () => {
  const [url, setUrl] = useState("");
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Replace with your actual API key
  const API_KEY = "brand__LvEALaDha5vNFizgi9LjZG";

  const generatePalette = async () => {
    setLoading(true);
    setError(null);
    setPalette(null);
    
    // Simple URL validation
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        setError('Please enter a valid URL including "http://" or "https://".');
        setLoading(false);
        return;
    }

    try {
      // Updated API endpoint and headers based on the new curl command
      const apiEndpoint = `https://api.brand.dev/v1/brand/retrieve?domain=${encodeURIComponent(url)}`;
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      const data = await response.json();
      
      if (data.status !== 'ok' || !data.brand || !data.brand.colors) {
        throw new Error(data.message || 'No colors found for this website.');
      }

      const generatedPalette = {
        name: data.brand.title || "Generated Palette",
        source: data.brand.domain || url,
        colors: data.brand.colors.map((color, index) => ({
          id: index,
          name: color.name || `Color ${index + 1}`,
          hex: color.hex,
        })),
      };
      setPalette(generatedPalette);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-[#4981bc] text-white font-medium hover:bg-[#164b82] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Generate'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center justify-center gap-2 text-red-500 bg-red-100 p-4 rounded-lg mb-4 w-full max-w-xl">
          <XCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {/* Palette Display */}
      {palette && (
        <div className="w-full max-w-2xl bg-gray-50 rounded-xl shadow-lg p-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Palette size={20} /> Generated Palette
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {palette.colors.map((color) => (
              <div key={color.hex} className="text-center">
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

