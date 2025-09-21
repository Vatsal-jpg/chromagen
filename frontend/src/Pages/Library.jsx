import React, { useState } from 'react';
import { Copy, Heart, Download, Search, Filter, Palette, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedPalette, setCopiedPalette] = useState(null);

  // 100 Fresh and Elegant Color Palettes
  const colorPalettes = [
    // Warm & Cozy
    { id: 1, name: "Sunset Dreams", category: "Warm", colors: ["#FF6B6B", "#FFE66D", "#FF8E53", "#C7CEEA", "#B4A7D6"] },
    { id: 2, name: "Autumn Whispers", category: "Warm", colors: ["#D2691E", "#CD853F", "#F4A460", "#DEB887", "#FFEFD5"] },
    { id: 3, name: "Cozy Fireplace", category: "Warm", colors: ["#8B4513", "#A0522D", "#CD853F", "#F4A460", "#FFEFD5"] },
    { id: 4, name: "Golden Hour", category: "Warm", colors: ["#FFD700", "#FFA500", "#FF8C00", "#FF7F50", "#FFDAB9"] },
    { id: 5, name: "Spiced Chai", category: "Warm", colors: ["#8B4513", "#CD853F", "#DEB887", "#F5DEB3", "#FFFAF0"] },
    
    // Cool & Fresh
    { id: 6, name: "Ocean Breeze", category: "Cool", colors: ["#0077BE", "#00A8CC", "#7FDBFF", "#B3E5FC", "#E1F5FE"] },
    { id: 7, name: "Nordic Frost", category: "Cool", colors: ["#4A90E2", "#7BB3F0", "#A8D8F0", "#D6EAF8", "#EBF5FB"] },
    { id: 8, name: "Mint Condition", category: "Cool", colors: ["#00B894", "#00CEC9", "#81ECEC", "#A8E6CF", "#DCEDC1"] },
    { id: 9, name: "Arctic Aurora", category: "Cool", colors: ["#2C3E50", "#3498DB", "#5DADE2", "#85C1E9", "#D5DBDB"] },
    { id: 10, name: "Teal Serenity", category: "Cool", colors: ["#006A6B", "#008B8B", "#20B2AA", "#48CAE4", "#90E0EF"] },
    
    // Vibrant & Bold
    { id: 11, name: "Electric Dreams", category: "Vibrant", colors: ["#FF0080", "#00FFFF", "#FFFF00", "#FF4500", "#9400D3"] },
    { id: 12, name: "Neon Nights", category: "Vibrant", colors: ["#FF1493", "#00CED1", "#ADFF2F", "#FF69B4", "#7FFF00"] },
    { id: 13, name: "Cyber Punk", category: "Vibrant", colors: ["#FF0040", "#00FF41", "#0040FF", "#FF4000", "#4000FF"] },
    { id: 14, name: "Pop Art", category: "Vibrant", colors: ["#FF6347", "#FFD700", "#00CED1", "#FF1493", "#32CD32"] },
    { id: 15, name: "Rainbow Burst", category: "Vibrant", colors: ["#FF69B4", "#00BFFF", "#ADFF2F", "#FFD700", "#FF6347"] },
    
    // Pastel & Soft
    { id: 16, name: "Cotton Candy", category: "Pastel", colors: ["#FFB3E6", "#FFCCF9", "#E6E6FA", "#F0F8FF", "#FFF8DC"] },
    { id: 17, name: "Baby Powder", category: "Pastel", colors: ["#F8BBD9", "#E4C1F9", "#D0F4DE", "#FCF6BD", "#FFE5B4"] },
    { id: 18, name: "Spring Bloom", category: "Pastel", colors: ["#FFB7C5", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"] },
    { id: 19, name: "Powder Blue", category: "Pastel", colors: ["#B0E0E6", "#F0F8FF", "#E6F3FF", "#CCE7FF", "#B3DAFF"] },
    { id: 20, name: "Lavender Fields", category: "Pastel", colors: ["#E6E6FA", "#DDA0DD", "#D8BFD8", "#F8F8FF", "#F0F0F0"] },
    
    // Earthy & Natural
    { id: 21, name: "Forest Path", category: "Natural", colors: ["#228B22", "#2E8B57", "#9ACD32", "#ADFF2F", "#F0FFF0"] },
    { id: 22, name: "Desert Sand", category: "Natural", colors: ["#F4A460", "#DEB887", "#D2B48C", "#F5DEB3", "#FFFAF0"] },
    { id: 23, name: "Mountain Mist", category: "Natural", colors: ["#708090", "#778899", "#B0C4DE", "#D3D3D3", "#F8F8FF"] },
    { id: 24, name: "Jungle Canopy", category: "Natural", colors: ["#006400", "#228B22", "#32CD32", "#7CFC00", "#F0FFF0"] },
    { id: 25, name: "Clay Earth", category: "Natural", colors: ["#A0522D", "#CD853F", "#DEB887", "#F4A460", "#FFEFD5"] },
    
    // Monochrome & Minimal
    { id: 26, name: "Charcoal Elegance", category: "Monochrome", colors: ["#36454F", "#708090", "#A9A9A9", "#D3D3D3", "#F5F5F5"] },
    { id: 27, name: "Snow White", category: "Monochrome", colors: ["#FFFFFF", "#F8F8FF", "#F5F5F5", "#DCDCDC", "#D3D3D3"] },
    { id: 28, name: "Midnight Black", category: "Monochrome", colors: ["#000000", "#2F4F4F", "#696969", "#A9A9A9", "#D3D3D3"] },
    { id: 29, name: "Silver Lining", category: "Monochrome", colors: ["#C0C0C0", "#D3D3D3", "#DCDCDC", "#F5F5F5", "#FFFFFF"] },
    { id: 30, name: "Graphite Storm", category: "Monochrome", colors: ["#2F4F4F", "#708090", "#778899", "#B0C4DE", "#F0F8FF"] },
    
    // Retro & Vintage
    { id: 31, name: "Vintage Rose", category: "Vintage", colors: ["#D2691E", "#CD853F", "#F4A460", "#FFDAB9", "#FFF8DC"] },
    { id: 32, name: "70s Sunset", category: "Vintage", colors: ["#FF6347", "#FF8C00", "#FFD700", "#F0E68C", "#FFEFD5"] },
    { id: 33, name: "Retro Wave", category: "Vintage", colors: ["#FF1493", "#00CED1", "#9370DB", "#FFD700", "#FF6347"] },
    { id: 34, name: "Sepia Dreams", category: "Vintage", colors: ["#8B7355", "#A0522D", "#CD853F", "#DEB887", "#F5DEB3"] },
    { id: 35, name: "Art Deco", category: "Vintage", colors: ["#B8860B", "#DAA520", "#FFD700", "#F0E68C", "#FFFACD"] },
    
    // Modern & Tech
    { id: 36, name: "Digital Blue", category: "Modern", colors: ["#0066CC", "#3399FF", "#66B2FF", "#99CCFF", "#CCE5FF"] },
    { id: 37, name: "Silicon Valley", category: "Modern", colors: ["#4A90E2", "#7BB3F0", "#A8D8F0", "#D6EAF8", "#EBF5FB"] },
    { id: 38, name: "Chrome Finish", category: "Modern", colors: ["#708090", "#87CEEB", "#B0E0E6", "#E0F6FF", "#F0F8FF"] },
    { id: 39, name: "Holographic", category: "Modern", colors: ["#FF69B4", "#00BFFF", "#ADFF2F", "#FFD700", "#FF6347"] },
    { id: 40, name: "Matrix Green", category: "Modern", colors: ["#008000", "#00FF00", "#7FFF00", "#ADFF2F", "#F0FFF0"] },
    
    // Feminine & Elegant
    { id: 41, name: "Rose Quartz", category: "Feminine", colors: ["#F7CAC9", "#FFAAA5", "#FF8A80", "#F48FB1", "#FCE4EC"] },
    { id: 42, name: "Blush Pink", category: "Feminine", colors: ["#FFC0CB", "#FFB6C1", "#FFCCCB", "#FFE4E1", "#FFF0F5"] },
    { id: 43, name: "Princess Dreams", category: "Feminine", colors: ["#DDA0DD", "#DA70D6", "#FF69B4", "#FFB6C1", "#FFCCCB"] },
    { id: 44, name: "Coral Reef", category: "Feminine", colors: ["#FF7F50", "#FFA07A", "#FFB07A", "#FFCCCB", "#FFE4E1"] },
    { id: 45, name: "Peach Blossom", category: "Feminine", colors: ["#FFDBAC", "#FFCAB0", "#FFB347", "#FFA07A", "#FF7F50"] },
    
    // Masculine & Strong
    { id: 46, name: "Steel Gray", category: "Masculine", colors: ["#4F4F4F", "#696969", "#808080", "#A9A9A9", "#C0C0C0"] },
    { id: 47, name: "Navy Command", category: "Masculine", colors: ["#000080", "#191970", "#4169E1", "#6495ED", "#87CEEB"] },
    { id: 48, name: "Forest Hunter", category: "Masculine", colors: ["#013220", "#228B22", "#32CD32", "#7CFC00", "#9ACD32"] },
    { id: 49, name: "Burnt Orange", category: "Masculine", colors: ["#A0522D", "#D2691E", "#FF8C00", "#FFA500", "#FFD700"] },
    { id: 50, name: "Midnight Oil", category: "Masculine", colors: ["#191970", "#000080", "#0000CD", "#4169E1", "#6495ED"] },
    
    // Tropical & Exotic
    { id: 51, name: "Tropical Paradise", category: "Tropical", colors: ["#00CED1", "#FF7F50", "#FFD700", "#ADFF2F", "#FF69B4"] },
    { id: 52, name: "Mango Tango", category: "Tropical", colors: ["#FF8C00", "#FFA500", "#FFD700", "#F0E68C", "#FFFACD"] },
    { id: 53, name: "Caribbean Blue", category: "Tropical", colors: ["#00CED1", "#40E0D0", "#48D1CC", "#7FFFD4", "#F0FFFF"] },
    { id: 54, name: "Coconut Palm", category: "Tropical", colors: ["#8FBC8F", "#98FB98", "#90EE90", "#F0FFF0", "#FFFAFA"] },
    { id: 55, name: "Sunset Beach", category: "Tropical", colors: ["#FF4500", "#FF6347", "#FFA500", "#FFD700", "#FFFACD"] },
    
    // Professional & Corporate
    { id: 56, name: "Executive Suite", category: "Corporate", colors: ["#2F4F4F", "#708090", "#B0C4DE", "#E6E6FA", "#F8F8FF"] },
    { id: 57, name: "Business Blue", category: "Corporate", colors: ["#191970", "#4169E1", "#6495ED", "#87CEEB", "#B0E0E6"] },
    { id: 58, name: "Wall Street", category: "Corporate", colors: ["#2F4F4F", "#696969", "#A9A9A9", "#D3D3D3", "#F5F5F5"] },
    { id: 59, name: "Conference Room", category: "Corporate", colors: ["#483D8B", "#6A5ACD", "#9370DB", "#DDA0DD", "#E6E6FA"] },
    { id: 60, name: "Corporate Green", category: "Corporate", colors: ["#006400", "#228B22", "#32CD32", "#90EE90", "#F0FFF0"] },
    
    // Creative & Artistic
    { id: 61, name: "Artist Palette", category: "Creative", colors: ["#FF1493", "#00CED1", "#FFD700", "#32CD32", "#9370DB"] },
    { id: 62, name: "Watercolor Wash", category: "Creative", colors: ["#F0E68C", "#DDA0DD", "#98FB98", "#87CEEB", "#F5DEB3"] },
    { id: 63, name: "Paint Splatter", category: "Creative", colors: ["#FF6347", "#40E0D0", "#9ACD32", "#DA70D6", "#FFD700"] },
    { id: 64, name: "Canvas Dreams", category: "Creative", colors: ["#F5F5DC", "#FAEBD7", "#FFE4C4", "#FFEFD5", "#FFF8DC"] },
    { id: 65, name: "Bohemian Rhapsody", category: "Creative", colors: ["#8B4513", "#D2691E", "#DAA520", "#F4A460", "#FFDAB9"] },
    
    // Seasonal Themes
    { id: 66, name: "Spring Fresh", category: "Seasonal", colors: ["#32CD32", "#7FFF00", "#ADFF2F", "#F0FFF0", "#FFFAFA"] },
    { id: 67, name: "Summer Vibes", category: "Seasonal", colors: ["#FFD700", "#FFA500", "#FF6347", "#FF1493", "#00BFFF"] },
    { id: 68, name: "Autumn Leaves", category: "Seasonal", colors: ["#8B4513", "#D2691E", "#FF8C00", "#FFD700", "#FFFACD"] },
    { id: 69, name: "Winter Wonderland", category: "Seasonal", colors: ["#4682B4", "#87CEEB", "#B0E0E6", "#E0F6FF", "#F0F8FF"] },
    { id: 70, name: "Holiday Spirit", category: "Seasonal", colors: ["#DC143C", "#228B22", "#FFD700", "#FFFAFA", "#F0F0F0"] },
    
    // Food & Drink Inspired
    { id: 71, name: "Chocolate Mousse", category: "Food", colors: ["#8B4513", "#A0522D", "#D2B48C", "#F4A460", "#FFEFD5"] },
    { id: 72, name: "Strawberry Cream", category: "Food", colors: ["#DC143C", "#FF69B4", "#FFB6C1", "#FFCCCB", "#FFF0F5"] },
    { id: 73, name: "Lemon Zest", category: "Food", colors: ["#FFD700", "#FFFF00", "#FFFACD", "#FFFFF0", "#FFFAFA"] },
    { id: 74, name: "Mint Chocolate", category: "Food", colors: ["#98FB98", "#00FA9A", "#8FBC8F", "#F0FFF0", "#8B4513"] },
    { id: 75, name: "Caramel Latte", category: "Food", colors: ["#D2B48C", "#DEB887", "#F4A460", "#FFDAB9", "#FFF8DC"] },
    
    // Gemstone Inspired
    { id: 76, name: "Emerald Elegance", category: "Gemstone", colors: ["#50C878", "#00A86B", "#228B22", "#90EE90", "#F0FFF0"] },
    { id: 77, name: "Sapphire Sky", category: "Gemstone", colors: ["#0F52BA", "#4169E1", "#6495ED", "#87CEEB", "#F0F8FF"] },
    { id: 78, name: "Ruby Red", category: "Gemstone", colors: ["#E0115F", "#DC143C", "#FF1493", "#FFB6C1", "#FFF0F5"] },
    { id: 79, name: "Amethyst Dream", category: "Gemstone", colors: ["#9966CC", "#9370DB", "#DDA0DD", "#E6E6FA", "#F8F8FF"] },
    { id: 80, name: "Diamond Shine", category: "Gemstone", colors: ["#F8F8FF", "#E6E6FA", "#D3D3D3", "#C0C0C0", "#B8860B"] },
    
    // Space & Cosmic
    { id: 81, name: "Galaxy Far Away", category: "Cosmic", colors: ["#191970", "#4B0082", "#9400D3", "#8A2BE2", "#DDA0DD"] },
    { id: 82, name: "Nebula Dust", category: "Cosmic", colors: ["#8A2BE2", "#9932CC", "#BA55D3", "#DA70D6", "#DDA0DD"] },
    { id: 83, name: "Solar Flare", category: "Cosmic", colors: ["#FF4500", "#FF6347", "#FFA500", "#FFD700", "#FFFACD"] },
    { id: 84, name: "Lunar Surface", category: "Cosmic", colors: ["#2F4F4F", "#696969", "#A9A9A9", "#D3D3D3", "#F5F5F5"] },
    { id: 85, name: "Cosmic Rays", category: "Cosmic", colors: ["#00BFFF", "#1E90FF", "#87CEEB", "#B0E0E6", "#F0F8FF"] },
    
    // Abstract Concepts
    { id: 86, name: "Zen Garden", category: "Abstract", colors: ["#8FBC8F", "#98FB98", "#F0FFF0", "#FFFAFA", "#F5F5F5"] },
    { id: 87, name: "Urban Jungle", category: "Abstract", colors: ["#2F4F4F", "#228B22", "#808080", "#A9A9A9", "#90EE90"] },
    { id: 88, name: "Digital Frontier", category: "Abstract", colors: ["#00FFFF", "#0080FF", "#8000FF", "#FF0080", "#FF8000"] },
    { id: 89, name: "Peaceful Mind", category: "Abstract", colors: ["#E6E6FA", "#F0F8FF", "#F8F8FF", "#FFFAFA", "#F5F5F5"] },
    { id: 90, name: "Energy Flow", category: "Abstract", colors: ["#FF69B4", "#00BFFF", "#ADFF2F", "#FFD700", "#FF6347"] },
    
    // Final 10 - Mixed Themes
    { id: 91, name: "Midnight Garden", category: "Creative", colors: ["#191970", "#228B22", "#9370DB", "#87CEEB", "#F0FFF0"] },
    { id: 92, name: "Golden Ratio", category: "Modern", colors: ["#FFD700", "#FFA500", "#FF8C00", "#D2691E", "#8B4513"] },
    { id: 93, name: "Ice Cream Social", category: "Pastel", colors: ["#FFB3E6", "#B3E5FC", "#C8E6C9", "#FFCCBC", "#F8BBD9"] },
    { id: 94, name: "Thunder Storm", category: "Natural", colors: ["#2F4F4F", "#4682B4", "#708090", "#B0C4DE", "#F0F8FF"] },
    { id: 95, name: "Vintage Camera", category: "Vintage", colors: ["#8B4513", "#A0522D", "#D2B48C", "#F5DEB3", "#FFFAF0"] },
    { id: 96, name: "Neon Tokyo", category: "Vibrant", colors: ["#FF0080", "#00FFFF", "#ADFF2F", "#FF1493", "#FFD700"] },
    { id: 97, name: "Morning Dew", category: "Natural", colors: ["#98FB98", "#90EE90", "#F0FFF0", "#FFFAFA", "#E0FFFF"] },
    { id: 98, name: "Royal Purple", category: "Gemstone", colors: ["#6A0DAD", "#8A2BE2", "#9370DB", "#DDA0DD", "#E6E6FA"] },
    { id: 99, name: "Sunset Boulevard", category: "Warm", colors: ["#FF6347", "#FF8C00", "#FFD700", "#F0E68C", "#FFFACD"] },
    { id: 100, name: "Digital Dawn", category: "Modern", colors: ["#FF69B4", "#00BFFF", "#32CD32", "#FFD700", "#9370DB"] }
  ];

  const categories = ['All', 'Warm', 'Cool', 'Vibrant', 'Pastel', 'Natural', 'Monochrome', 'Vintage', 'Modern', 'Feminine', 'Masculine', 'Tropical', 'Corporate', 'Creative', 'Seasonal', 'Food', 'Gemstone', 'Cosmic', 'Abstract'];

  const filteredPalettes = colorPalettes.filter(palette => {
    const matchesSearch = palette.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || palette.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (colors, paletteName) => {
    const colorString = colors.join(', ');
    navigator.clipboard.writeText(colorString);
    setCopiedPalette(paletteName);
    setTimeout(() => setCopiedPalette(null), 2000);
  };

  const handlePaletteClick = (palette) => {
    const transformedColors = palette.colors.map((hex, index) => {
      const roles = ['primary', 'secondary', 'accent', 'background', 'text'];
      return {
        id: index + 1,
        name: `Color ${index + 1}`,
        hex: hex,
        role: roles[index] || 'extra'
      };
    });

    const paletteForPreview = {
      name: palette.name,
      colors: transformedColors
    };

    // 2. Navigate to the preview page with the new data structure
    navigate('/preview', { state: { generatedPalette: paletteForPreview } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Palette className="w-10 h-10" style={{ color: '#164b82' }} />
              <span className="text-3xl font-bold" style={{ color: '#164b82' }}>ChromaGen</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Palette Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover 100 handcrafted color palettes with unique names and perfect harmony
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search palettes..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ focusRingColor: '#164b82' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                style={{ focusRingColor: '#164b82' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Palette Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredPalettes.length} of {colorPalettes.length} palettes
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>Click any palette to copy colors</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPalettes.map((palette) => (
            <div
              key={palette.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              onClick={() => handlePaletteClick(palette)}
            >
              {/* Color Strip */}
              <div className="flex h-32">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 transition-all duration-300 group-hover:scale-105"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              
              {/* Palette Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {palette.name}
                    </h3>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      {palette.category}
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                    </button>
                  </div> */}
                </div>
                
                {/* Color Values */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {palette.colors.map((color, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded font-mono"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Copy Indicator */}
                {copiedPalette === palette.name && (
                  <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
                    <Copy className="w-4 h-4" />
                    <span>Colors copied to clipboard!</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPalettes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No palettes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library