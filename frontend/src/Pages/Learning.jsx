import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  BookOpen,
  Eye,
  Palette,
  Monitor,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Star,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Youtube,
  FileText,
  Lightbulb,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

const Learning = () => {
  // --- existing resources (videos) ---
  const learningResources = [
    {
      id: 1,
      title: "Color Theory Fundamentals",
      description: "Master the basics of color relationships, harmonies, and psychological effects",
      
      difficulty: "Beginner",
      youtubeUrl: "https://www.youtube.com/watch?v=_2LLXnUdUIc",
      thumbnailUrl: "https://i.ytimg.com/vi/_2LLXnUdUIc/maxresdefault.jpg",
      channel: "The Futur",
      topics: ["Color Wheel", "Primary/Secondary Colors", "Color Temperature", "Saturation & Brightness"]
    },
    {
      id: 2,
      title: "Typography & Color Pairing",
      description: "Learn how colors interact with typography for optimal readability",
    
      difficulty: "Intermediate",
      youtubeUrl: "https://www.youtube.com/watch?v=QrNi9FmdlxY",
      thumbnailUrl: "https://i.ytimg.com/vi/QrNi9FmdlxY/maxresdefault.jpg",
      channel: "Design Course",
      topics: ["Font-Color Contrast", "Hierarchy", "Readability", "Accessibility"]
    },
    {
      id: 3,
      title: "UI Color Systems",
      description: "Building scalable color systems for digital products",
     
      difficulty: "Advanced",
      youtubeUrl: "https://youtu.be/yYwEnLYT55c?si=TZIpuIOczZniVPtB",
      thumbnailUrl: "https://i.ytimg.com/vi/9FgnTt6S8tc/maxresdefault.jpg",
      channel: "Figma",
      topics: ["Design Tokens", "Color Variables", "Dark Mode", "Brand Systems"]
    },
    {
      id: 4,
      title: "Psychology of Color in UX",
      description: "Understanding how colors influence user behavior and emotions",
    
      difficulty: "Intermediate",
      youtubeUrl: "https://www.youtube.com/watch?v=x0smq5ljlSY",
      thumbnailUrl: "https://i.ytimg.com/vi/x0smq5ljlSY/maxresdefault.jpg",
      channel: "AJ&Smart",
      topics: ["Color Emotions", "Cultural Meanings", "Conversion Optimization", "A/B Testing"]
    },
    {
      id: 5,
      title: "Accessibility & WCAG Guidelines",
      description: "Ensuring your color choices work for everyone",
 
      difficulty: "Intermediate",
      youtubeUrl: "https://www.youtube.com/watch?v=sEDnmNtEaqQ",
      thumbnailUrl: "https://i.ytimg.com/vi/sEDnmNtEaqQ/maxresdefault.jpg",
      channel: "Google Chrome Developers",
      topics: ["Contrast Ratios", "Color Blindness", "WCAG AA/AAA", "Testing Tools"]
    },
    {
      id: 6,
      title: "Mobile Color Design",
      description: "Color considerations specific to mobile interfaces",
   
      difficulty: "Intermediate",
      youtubeUrl: "https://www.youtube.com/watch?v=WDn-G5Hmoag",
      thumbnailUrl: "https://i.ytimg.com/vi/WDn-G5Hmoag/maxresdefault.jpg",
      channel: "Google Design",
      topics: ["Screen Brightness", "Touch Targets", "iOS Guidelines", "Material Design"]
    },
    {
      id: 7,
      title: "Brand Color Strategy",
      description: "Creating memorable and effective brand color identities",

      difficulty: "Advanced",
      youtubeUrl: "https://www.youtube.com/watch?v=KMS3VwGh3HY",
      thumbnailUrl: "https://i.ytimg.com/vi/KMS3VwGh3HY/maxresdefault.jpg",
      channel: "Satori Graphics",
      topics: ["Brand Personality", "Color Associations", "Market Research", "Logo Colors"]
    },
    {
      id: 8,
      title: "Color Tools & Workflows",
      description: "Master professional tools and efficient color workflows",

      difficulty: "Beginner",
      youtubeUrl: "https://www.youtube.com/watch?v=9S8LGdpNh4Q",
      thumbnailUrl: "https://i.ytimg.com/vi/9S8LGdpNh4Q/maxresdefault.jpg",
      channel: "Adobe Creative Cloud",
      topics: ["Adobe Color", "Figma Plugins", "Color Generators", "Workflow Automation"]
    }
  ];

  // --- rotating facts ---
  const facts = [
    "Red increases heart rate and can raise energy levels.",
    "Blue is often used to convey trustworthiness and calmness.",
    "Yellow grabs attention and is often used for warnings or highlights.",
    "Color contrast is crucial for accessibility — always check ratios.",
    "Monochrome palettes use tints/shades of one hue for harmony.",
    "Warm colors (reds/oranges) tend to feel closer; cool colors recede.",
    "Complementary colors sit opposite on the color wheel and pop together.",
    "Saturation controls perceived intensity — less saturation is more muted.",
    "Color symbolism varies strongly across cultures — always research.",
    "Design tokens store color values for consistent theming across apps."
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentFactIndex((i) => (i + 1) % facts.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(id);
  }, []);

  // --- documentation (10 docs) ---
  const initialDocs = [
    {
      id: 1,
      title: "Color Wheel & Relationships",
      summary: "Core relationships: primary, secondary, tertiary colors and how to use them.",
      content: `The color wheel shows relationships between hues. Use complementary or analogous schemes depending on contrast needs. Practical tip: start with one dominant color and use accents sparingly.`
    },
    {
      id: 2,
      title: "Color Harmony Rules",
      summary: "Complementary, analogous, triadic — pick one rule for balance.",
      content: `Complementary colors maximize contrast. Analogous palettes are soothing. Triadic palettes create energetic but balanced combinations. Use the 60/30/10 rule for distribution.`
    },
    {
      id: 3,
      title: "Color Psychology",
      summary: "How colors influence emotions and user behaviour.",
      content: `Red = energy/urgency; Blue = trust; Green = growth. Use psychology to guide CTA colors and mood-setting elements. Always A/B test for conversions.`
    },
    {
      id: 4,
      title: "Color Accessibility (WCAG)",
      summary: "Contrast ratios and color blindness considerations.",
      content: `Aim for 4.5:1 contrast for normal text (AA). Use patterns/icons together with color to avoid relying on color alone. Test with simulators for protanopia/deuteranopia.`
    },
    {
      id: 5,
      title: "Design Tokens & Systems",
      summary: "Store colors as tokens for scalable systems.",
      content: `Use tokens like --color-primary-500 so your theme is consistent across platforms. Tokens can map to light/dark mode variants.`
    },
    {
      id: 6,
      title: "Creating Palettes from Images",
      summary: "Extracting palettes from inspiration photos.",
      content: `Pick a dominant color, a secondary, and one or two accents. Consider natural saturation adjustments and ensure accessibility for UI usage.`
    },
    {
      id: 7,
      title: "Color for Branding",
      summary: "Choosing brand colors that reflect personality.",
      content: `Brand colors should align with brand values. Use market research to avoid clashing with competitors and test how your palette looks in monochrome.`
    },
    {
      id: 8,
      title: "Color in Mobile Design",
      summary: "Screen brightness and touch targets considerations.",
      content: `Mobile screens vary widely; use slightly higher contrast for readability on outdoor conditions and ensure tappable contrast for icons and buttons.`
    },
    {
      id: 9,
      title: "Color Grading & Advanced Techniques",
      summary: "Color grading for compositing and visuals.",
      content: `Use subtle curves and selective saturation to guide attention. For photos, grade shadows/midtones/highlights independently to achieve cinematic looks.`
    },
    {
      id: 10,
      title: "Cultural Color Considerations",
      summary: "How colors mean different things around the world.",
      content: `Always research cultural meaning; e.g., white is mourning in some cultures while red signifies luck in others. Localize color choices when needed.`
    }
  ];

  const [expandedDocs, setExpandedDocs] = useState({}); // {id: true/false}

  const toggleDoc = (id) => {
    setExpandedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Expert':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">🗺 Learning Roadmap</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Structured path and curated content to master color design
          </p>
        </div>

        {/* Fact of the Minute */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Fact of the Minute</div>
              <div className="mt-2 text-xl md:text-2xl font-semibold text-gray-900">
                {facts[currentFactIndex]}
              </div>
            </div>

            <div className="text-sm text-gray-500">Next fact in 5s</div>
          </div>
        </div>

        {/* Video cards positioned under the fact */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {learningResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={resource.thumbnailUrl}
                  alt={resource.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/480x270/164b82/ffffff?text=${encodeURIComponent(resource.title)}`;
                  }}
                />
                {/* clickable overlay to open YouTube in new tab */}
                <button
                  onClick={() => window.open(resource.youtubeUrl, '_blank', 'noopener')}
                  aria-label={`Open ${resource.title} on YouTube`}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg opacity-90 hover:opacity-100 transition-opacity">
                    <Play size={20} className="text-white ml-1" />
                  </div>
                </button>

                {/* badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>

                {/* bottom info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between text-white text-sm">
                    <span className="flex items-center gap-1 bg-black bg-opacity-50 px-2 py-1 rounded">
                      <Play size={14} />
                      {resource.videoCount}
                    </span>
                    <span className="flex items-center gap-1 bg-black bg-opacity-50 px-2 py-1 rounded">
                      <Clock size={14} />
                      {resource.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={resource.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl font-semibold transition-all duration-300"
                    style={{ background: '#164b82', color: 'white' }}
                  >
                    <Youtube size={16} />
                    Watch Now
                  </a>

                  <div className="text-xs text-gray-500">{resource.channel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Documentation listing (10 docs) */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">📚 In-Depth Documentation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Important topics across color theory, palettes, and psychology</p>
          </div>

          <div className="space-y-6">
            {initialDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: 'linear-gradient(135deg, #164b82, #4981bc)' }}>
                    <FileText size={28} className="text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{doc.title}</h3>
                        <p className="text-gray-600">{doc.summary}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!expandedDocs[doc.id] ? (
                          <button
                            onClick={() => toggleDoc(doc.id)}
                            className="text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 shadow"
                            style={{ background: '#164b82' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#4981bc')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#164b82')}
                          >
                            <BookOpen size={16} />
                            View
                          </button>
                        ) : (
                          <button
                            onClick={() => toggleDoc(doc.id)}
                            className="text-gray-700 px-3 py-2 rounded-xl font-semibold flex items-center gap-2 border"
                          >
                            <X size={16} />
                            Close
                          </button>
                        )}
                      </div>
                    </div>

                    {
                      expandedDocs[doc.id] && (
                        <div className="mt-4 pt-4 border-t border-gray-100 prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                          {doc.content}
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Badge */}
        <div className="flex justify-center pb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 fill-current" />
              <div>
                <div className="font-bold text-lg">Color Design Expert</div>
                <div className="text-sm opacity-90">Complete all levels to earn this certification</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Learning;
