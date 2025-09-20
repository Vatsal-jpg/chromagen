import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, 
  Eye, 
  Download, 
  Smartphone, 
  Monitor, 
  Copy, 
  Check,
  RefreshCw,
  Sliders,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Sample palette data - in real app this would come from props or API
const defaultPalette = {
  name: "Eco Premium",
  colors: [
    { id: 1, name: "Primary", hex: "#2D5A2D", role: "primary" },
    { id: 2, name: "Secondary", hex: "#8FBC8F", role: "secondary" },
    { id: 3, name: "Accent", hex: "#FFD700", role: "accent" },
    { id: 4, name: "Background", hex: "#FAFAFA", role: "background" },
    { id: 5, name: "Text", hex: "#1A1A1A", role: "text" }
  ]
};

// WCAG contrast ratio calculation
const getLuminance = (hex) => {
  const rgb = hexToRgb(hex);
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const getContrastRatio = (hex1, hex2) => {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r, g, b) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

// Color blindness simulation matrices
const colorBlindnessFilters = {
  normal: { name: "Normal Vision", matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
  protanopia: { name: "Protanopia", matrix: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758] },
  deuteranopia: { name: "Deuteranopia", matrix: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7] },
  tritanopia: { name: "Tritanopia", matrix: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525] }
};

const applyColorBlindnessFilter = (hex, filter) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  const matrix = filter.matrix;
  
  const newR = Math.round((matrix[0] * r + matrix[1] * g + matrix[2] * b) * 255);
  const newG = Math.round((matrix[3] * r + matrix[4] * g + matrix[5] * b) * 255);
  const newB = Math.round((matrix[6] * r + matrix[7] * g + matrix[8] * b) * 255);
  
  return rgbToHex(
    Math.max(0, Math.min(255, newR)),
    Math.max(0, Math.min(255, newG)),
    Math.max(0, Math.min(255, newB))
  );
};

const Preview = ({ initialPalette = defaultPalette }) => {
  const navigate = useNavigate();
  const [palette, setPalette] = useState(initialPalette);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorBlindnessFilter, setColorBlindnessFilter] = useState('normal');
  const [activeView, setActiveView] = useState('palette'); // palette, web, mobile
  const [copiedColor, setCopiedColor] = useState(null);
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Apply color blindness filter to palette
  const filteredPalette = useMemo(() => {
    const filter = colorBlindnessFilters[colorBlindnessFilter];
    return {
      ...palette,
      colors: palette.colors.map(color => ({
        ...color,
        displayHex: applyColorBlindnessFilter(color.hex, filter)
      }))
    };
  }, [palette, colorBlindnessFilter]);

  // Calculate WCAG compliance
  const wcagCompliance = useMemo(() => {
    const background = palette.colors.find(c => c.role === 'background')?.hex || '#FFFFFF';
    const text = palette.colors.find(c => c.role === 'text')?.hex || '#000000';
    
    return palette.colors.map(color => {
      const bgContrast = getContrastRatio(color.hex, background);
      const textContrast = getContrastRatio(color.hex, text);
      
      return {
        id: color.id,
        name: color.name,
        bgContrast: bgContrast.toFixed(2),
        textContrast: textContrast.toFixed(2),
        aaCompliant: bgContrast >= 4.5 || textContrast >= 4.5,
        aaaCompliant: bgContrast >= 7 || textContrast >= 7
      };
    });
  }, [palette]);

  const copyToClipboard = async (text, colorId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(colorId);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Optionally show an error message to the user
    }
  };

  const updateColor = (colorId, newHex) => {
    setPalette(prev => ({
      ...prev,
      colors: prev.colors.map(color => 
        color.id === colorId ? { ...color, hex: newHex } : color
      )
    }));
  };

  const exportPalette = (format) => {
    let content = '';
    const timestamp = new Date().toISOString().slice(0, 10);
    
    switch (format) {
      case 'css':
        content = `:root {\n${palette.colors.map(color => 
          `  --color-${color.role}: ${color.hex};`
        ).join('\n')}\n}`;
        break;
      case 'json':
        content = JSON.stringify(palette, null, 2);
        break;
      case 'scss':
        content = palette.colors.map(color => 
          `${color.role}: ${color.hex};`
        ).join('\n');
        break;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${palette.name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {palette.name} Palette
              </h1>
              <p className="text-gray-600">
                Generated palette with accessibility compliance and usage examples
              </p>
            </div>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-2">
              {/* Color Blindness Filter */}
              <select
                value={colorBlindnessFilter}
                onChange={(e) => setColorBlindnessFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
              >
                {Object.entries(colorBlindnessFilters).map(([key, filter]) => (
                  <option key={key} value={key}>{filter.name}</option>
                ))}
              </select>
              
              {/* View Toggle */}
              <div className="flex bg-gray-200 rounded-lg p-1">
                {[
                  { key: 'palette', icon: Palette, label: 'Palette' },
                  { key: 'web', icon: Monitor, label: 'Web' },
                  { key: 'mobile', icon: Smartphone, label: 'Mobile' }
                ].map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveView(key)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      activeView === key
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
              
              {/* Customize Button */}
              <button
                onClick={() => setShowCustomizer(!showCustomizer)}
                className="flex items-center gap-2 px-4 py-2 bg-[#164b82] text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Sliders size={16} />
                Customize
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeView === 'palette' && (
              <PaletteView 
                palette={filteredPalette} 
                wcagCompliance={wcagCompliance}
                onCopyColor={copyToClipboard}
                copiedColor={copiedColor}
              />
            )}
            
            {activeView === 'web' && (
              <WebPreview palette={filteredPalette} />
            )}
            
            {activeView === 'mobile' && (
              <MobilePreview palette={filteredPalette} />
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* WCAG Compliance */}
            <WcagCompliance compliance={wcagCompliance} />
            
            {/* Export Options */}
            <ExportOptions onExport={exportPalette} />
            
            {/* Color Customizer */}
            {showCustomizer && (
              <ColorCustomizer 
                palette={palette}
                onUpdateColor={updateColor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Palette View Component
const PaletteView = ({ palette, wcagCompliance, onCopyColor, copiedColor }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {palette.colors.map((color, index) => {
      const compliance = wcagCompliance.find(c => c.id === color.id);
      return (
        <div
          key={color.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Color Block */}
          <div
            className="h-48 relative cursor-pointer group"
            style={{ backgroundColor: color.displayHex }}
            onClick={() => onCopyColor(color.hex, color.id)}
          >
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white bg-opacity-90 rounded-lg px-3 py-2">
                {copiedColor === color.id ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check size={16} />
                    <span className="text-sm font-medium">Copied!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Copy size={16} />
                    <span className="text-sm font-medium">Click to copy</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Color Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{color.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{color.role}</p>
              </div>
              <div className="flex gap-1">
                {compliance?.aaaCompliant && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    AAA
                  </span>
                )}
                {compliance?.aaCompliant && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                    AA
                  </span>
                )}
                {!compliance?.aaCompliant && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                    Fail
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600">HEX</span>
                <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {color.hex.toUpperCase()}
                </code>
              </div>
              
              {compliance && (
                <div className="pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Contrast Ratios</div>
                  <div className="flex justify-between text-xs">
                    <span>vs Background: {compliance.bgContrast}:1</span>
                    <span>vs Text: {compliance.textContrast}:1</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

// Web Preview Component
const WebPreview = ({ palette }) => {
  const colors = palette.colors.reduce((acc, color) => {
    acc[color.role] = color.displayHex;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Web Application Preview</h2>
      
      {/* Mock Website */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <header 
          className="px-6 py-4 flex items-center justify-between"
          style={{ backgroundColor: colors.primary }}
        >
          <div 
            className="text-xl font-bold"
            style={{ color: colors.background }}
          >
            YourBrand
          </div>
          <nav className="flex gap-6">
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <a 
                key={item}
                href="#"
                className="hover:opacity-80 transition-opacity"
                style={{ color: colors.background }}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>
        
        {/* Hero Section */}
        <section 
          className="px-6 py-12"
          style={{ backgroundColor: colors.background }}
        >
          <div className="max-w-2xl">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Welcome to Our Platform
            </h1>
            <p 
              className="text-lg mb-6 opacity-80"
              style={{ color: colors.text }}
            >
              Experience the perfect blend of functionality and design with our carefully crafted color palette.
            </p>
            <button 
              className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: colors.accent, 
                color: colors.text 
              }}
            >
              Get Started
            </button>
          </div>
        </section>
        
        {/* Cards Section */}
        <section 
          className="px-6 py-8"
          style={{ backgroundColor: colors.secondary, opacity: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="p-6 rounded-lg"
                style={{ backgroundColor: colors.background }}
              >
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: colors.text }}
                >
                  Feature {i}
                </h3>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: colors.text }}
                >
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Mobile Preview Component
const MobilePreview = ({ palette }) => {
  const colors = palette.colors.reduce((acc, color) => {
    acc[color.role] = color.displayHex;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Mobile Application Preview</h2>
      
      {/* Phone Frame */}
      <div className="max-w-sm mx-auto">
        <div className="bg-gray-800 rounded-3xl p-2">
          <div className="bg-black rounded-2xl overflow-hidden">
            {/* Status Bar */}
            <div className="h-6 bg-black flex items-center justify-between px-4 text-white text-xs">
              <span>9:41</span>
              <span>100%</span>
            </div>
            
            {/* App Content */}
            <div style={{ backgroundColor: colors.background }}>
              {/* Header */}
              <div 
                className="px-4 py-4 flex items-center justify-between"
                style={{ backgroundColor: colors.primary }}
              >
                <h1 
                  className="text-lg font-bold"
                  style={{ color: colors.background }}
                >
                  Your App
                </h1>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  <span 
                    className="text-sm font-bold"
                    style={{ color: colors.text }}
                  >
                    U
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 h-96">
                <div 
                  className="p-4 rounded-xl mb-4"
                  style={{ backgroundColor: colors.secondary, opacity: 0.2 }}
                >
                  <h2 
                    className="font-semibold mb-2"
                    style={{ color: colors.text }}
                  >
                    Welcome Back!
                  </h2>
                  <p 
                    className="text-sm opacity-70"
                    style={{ color: colors.text }}
                  >
                    Check out what's new today
                  </p>
                </div>
                
                {/* List Items */}
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg mb-2"
                    style={{ backgroundColor: i === 2 ? colors.accent + '20' : 'transparent' }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      <span 
                        className="font-semibold"
                        style={{ color: colors.text }}
                      >
                        {i}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="font-medium text-sm"
                        style={{ color: colors.text }}
                      >
                        Item {i}
                      </h3>
                      <p 
                        className="text-xs opacity-60"
                        style={{ color: colors.text }}
                      >
                        Description text here
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bottom Tab Bar */}
              <div 
                className="flex justify-around py-3 border-t"
                style={{ 
                  backgroundColor: colors.background,
                  borderTopColor: colors.secondary + '30'
                }}
              >
                {['Home', 'Search', 'Profile'].map((tab, i) => (
                  <div 
                    key={tab}
                    className="flex flex-col items-center"
                  >
                    <div 
                      className="w-6 h-6 rounded mb-1"
                      style={{ 
                        backgroundColor: i === 0 ? colors.accent : colors.text + '40'
                      }}
                    ></div>
                    <span 
                      className="text-xs"
                      style={{ 
                        color: i === 0 ? colors.accent : colors.text + '60'
                      }}
                    >
                      {tab}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// WCAG Compliance Component
const WcagCompliance = ({ compliance }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
      <CheckCircle className="text-green-500" size={20} />
      WCAG Compliance
    </h3>
    
    <div className="space-y-3">
      {compliance.map((item) => (
        <div key={item.id} className="border-b border-gray-100 pb-3 last:border-b-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">{item.name}</span>
            <div className="flex gap-1">
              {item.aaaCompliant && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                  AAA
                </span>
              )}
              {item.aaCompliant && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                  AA
                </span>
              )}
              {!item.aaCompliant && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium">
                  Fail
                </span>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            <div>Background: {item.bgContrast}:1</div>
            <div>Text: {item.textContrast}:1</div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
      <div className="text-xs text-blue-700">
        <strong>WCAG Standards:</strong>
        <div>AA: ≥4.5:1 contrast ratio</div>
        <div>AAA: ≥7:1 contrast ratio</div>
      </div>
    </div>
  </div>
);

// Export Options Component
const ExportOptions = ({ onExport }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
      <Download size={20} />
      Export Palette
    </h3>
    
    <div className="space-y-2">
      {[
        { format: 'css', label: 'CSS Variables', desc: 'Ready for web development' },
        { format: 'json', label: 'JSON', desc: 'For applications and tools' },
        { format: 'scss', label: 'SCSS Variables', desc: 'For Sass projects' }
      ].map(({ format, label, desc }) => (
        <button
          key={format}
          onClick={() => onExport(format)}
          className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
        >
          <div className="font-medium text-gray-900">{label}</div>
          <div className="text-sm text-gray-500">{desc}</div>
        </button>
      ))}
    </div>
  </div>
);

// Color Customizer Component
const ColorCustomizer = ({ palette, onUpdateColor }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
      <Sliders size={20} />
      Customize Colors
    </h3>
    
    <div className="space-y-4">
      {palette.colors.map((color) => (
        <div key={color.id}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {color.name}
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={color.hex}
              onChange={(e) => onUpdateColor(color.id, e.target.value)}
              className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={color.hex.toUpperCase()}
              onChange={(e) => {
                if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                  onUpdateColor(color.id, e.target.value);
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded font-mono text-sm"
              placeholder="#000000"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Preview;