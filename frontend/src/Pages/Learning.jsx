import React, { useState } from 'react';
import { Play, BookOpen, Eye, Palette, Monitor, Smartphone, ExternalLink, ChevronRight, Star, Clock, Users, CheckCircle, ArrowRight, Youtube, FileText, Lightbulb, Target, Zap, ChevronDown, ChevronUp } from 'lucide-react';

const Learning = () => {
  const [expandedGuide, setExpandedGuide] = useState(null);

  // YouTube learning resources with actual thumbnail URLs
  const learningResources = [
    {
      id: 1,
      title: "Color Theory Fundamentals",
      description: "Master the basics of color relationships, harmonies, and psychological effects",
      videoCount: "15 videos",
      duration: "2.5 hours",
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
      videoCount: "12 videos",
      duration: "1.8 hours",
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
      videoCount: "18 videos",
      duration: "3.2 hours",
      difficulty: "Advanced",
      youtubeUrl: "https://www.youtube.com/watch?v=9FgnTt6S8tc",
      thumbnailUrl: "https://i.ytimg.com/vi/9FgnTt6S8tc/maxresdefault.jpg",
      channel: "Figma",
      topics: ["Design Tokens", "Color Variables", "Dark Mode", "Brand Systems"]
    },
    {
      id: 4,
      title: "Psychology of Color in UX",
      description: "Understanding how colors influence user behavior and emotions",
      videoCount: "10 videos",
      duration: "2.1 hours",
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
      videoCount: "14 videos",
      duration: "2.8 hours",
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
      videoCount: "8 videos",
      duration: "1.5 hours",
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
      videoCount: "11 videos",
      duration: "2.4 hours",
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
      videoCount: "9 videos",
      duration: "1.9 hours",
      difficulty: "Beginner",
      youtubeUrl: "https://www.youtube.com/watch?v=9S8LGdpNh4Q",
      thumbnailUrl: "https://i.ytimg.com/vi/9S8LGdpNh4Q/maxresdefault.jpg",
      channel: "Adobe Creative Cloud",
      topics: ["Adobe Color", "Figma Plugins", "Color Generators", "Workflow Automation"]
    }
  ];

  // Documentation guides with inline content
  const documentationGuides = [
    {
      id: 1,
      title: "Color Theory Fundamentals",
      description: "Understanding the core principles of color relationships and harmony",
      content: `## The Color Wheel

The color wheel is your fundamental tool for understanding color relationships. It consists of:

### Primary Colors
- *Red*: Energy, passion, urgency
- *Blue*: Trust, stability, professionalism
- *Yellow*: Optimism, creativity, warmth

### Secondary Colors
Created by mixing two primary colors:
- *Orange* (Red + Yellow): Enthusiasm, creativity
- *Green* (Blue + Yellow): Nature, growth, harmony
- *Purple* (Red + Blue): Luxury, sophistication

### Tertiary Colors
Created by mixing a primary and secondary color, resulting in colors like red-orange, blue-green, etc.

## Color Harmony Rules

### 1. Complementary Colors
Colors directly opposite on the wheel create high contrast and vibrant looks.
*Example*: Blue and Orange, Red and Green

### 2. Analogous Colors
Colors next to each other on the wheel create harmonious, soothing designs.
*Example*: Blue, Blue-Green, Green

### 3. Triadic Colors
Three colors evenly spaced on the wheel create vibrant yet balanced palettes.
*Example*: Red, Yellow, Blue

## Practical Application Tips
1. *Start with one dominant color* (60% of your design)
2. *Add a secondary color* (30% of your design)
3. *Use an accent color* (10% of your design)
4. *Consider your target audience* and cultural associations
5. *Test your palette* in different lighting conditions`,
      level: "Beginner"
    },
    {
      id: 2,
      title: "WCAG Accessibility Guidelines",
      description: "Ensuring your color choices meet accessibility standards for all users",
      content: `## WCAG Contrast Requirements

### AA Level (Minimum)
- *Normal text*: 4.5:1 contrast ratio
- *Large text*: 3:1 contrast ratio (18pt+ regular or 14pt+ bold)
- *UI components*: 3:1 contrast ratio for interactive elements

### AAA Level (Enhanced)
- *Normal text*: 7:1 contrast ratio
- *Large text*: 4.5:1 contrast ratio
- *UI components*: 4.5:1 contrast ratio

## Color Blindness Considerations

### Types of Color Blindness
1. *Protanopia*: Difficulty seeing red light (1% of males)
2. *Deuteranopia*: Difficulty seeing green light (1% of males)
3. *Tritanopia*: Difficulty seeing blue light (less than 1% of population)
4. *Protanomaly/Deuteranomaly*: Reduced sensitivity (4-5% of males)

### Design Guidelines
- *Never rely on color alone* to convey information
- *Use patterns, shapes, or icons* alongside color
- *Provide multiple visual cues* for important actions
- *Test with color blindness simulators*

## Testing Tools
- *WebAIM Contrast Checker*
- *Stark (Figma/Sketch plugin)*
- *Colorblinding.com* for simulations`,
      level: "Intermediate"
    }
  ];

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
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Learning Roadmap Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🗺 Learning Roadmap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow this structured path to master color design from fundamentals to advanced techniques
            </p>
          </div>

          <div className="space-y-8">
            {/* Beginner Level */}
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm mr-4" 
                     style={{ background: '#164b82' }}>1</div>
                <h3 className="text-2xl font-bold text-gray-900">Beginner Level</h3>
                <div className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold border border-green-200">
                  Start Here
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-12">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Color Theory Basics</h4>
                  <p className="text-gray-600 text-sm mb-3">Learn the color wheel, primary/secondary colors, and basic harmonies</p>
                  <div className="text-xs text-gray-500">Duration: 2-3 hours</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Color Properties</h4>
                  <p className="text-gray-600 text-sm mb-3">Understand hue, saturation, lightness, and temperature</p>
                  <div className="text-xs text-gray-500">Duration: 1-2 hours</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Basic Tools</h4>
                  <p className="text-gray-600 text-sm mb-3">Get familiar with color pickers and basic design tools</p>
                  <div className="text-xs text-gray-500">Duration: 1 hour</div>
                </div>
              </div>
            </div>

            {/* Connecting Line */}
            <div className="flex justify-center">
              <div className="w-px h-8 bg-gray-300"></div>
            </div>

            {/* Intermediate Level */}
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm mr-4" 
                     style={{ background: '#164b82' }}>2</div>
                <h3 className="text-2xl font-bold text-gray-900">Intermediate Level</h3>
                <div className="ml-4 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold border border-yellow-200">
                  Build Skills
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-12">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <Monitor className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">UI Color Systems</h4>
                  <p className="text-gray-600 text-sm mb-3">Create consistent color palettes for digital interfaces</p>
                  <div className="text-xs text-gray-500">Duration: 3-4 hours</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Accessibility</h4>
                  <p className="text-gray-600 text-sm mb-3">Ensure your colors work for users with visual impairments</p>
                  <div className="text-xs text-gray-500">Duration: 2-3 hours</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Color Psychology</h4>
                  <p className="text-gray-600 text-sm mb-3">Learn how colors affect emotions and user behavior</p>
                  <div className="text-xs text-gray-500">Duration: 2-3 hours</div>
                </div>
              </div>
            </div>

            {/* Connecting Line */}
            <div className="flex justify-center">
              <div className="w-px h-8 bg-gray-300"></div>
            </div>

            {/* Advanced Level */}
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm mr-4" 
                     style={{ background: '#164b82' }}>3</div>
                <h3 className="text-2xl font-bold text-gray-900">Advanced Level</h3>
                <div className="ml-4 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold border border-orange-200">
                  Master Level
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-12">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Brand Color Strategy</h4>
                  <p className="text-gray-600 text-sm mb-3">Develop comprehensive brand color identities</p>
                  <div className="text-xs text-gray-500">Duration: 4-5 hours</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Advanced Techniques</h4>
                  <p className="text-gray-600 text-sm mb-3">Color grading, complex harmonies, and creative applications</p>
                  <div className="text-xs text-gray-500">Duration: 3-4 hours</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <ExternalLink className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Professional Workflows</h4>
                  <p className="text-gray-600 text-sm mb-3">Master design systems and cross-platform consistency</p>
                  <div className="text-xs text-gray-500">Duration: 3-4 hours</div>
                </div>
              </div>
            </div>

            {/* Completion Badge */}
            <div className="flex justify-center pt-8">
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
        {/* Learning Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📺 Learning Section
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Curated YouTube content from industry experts to accelerate your color design skills
            </p>
          </div>

          {/* Video Grid - 4 cards per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {learningResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* YouTube Thumbnail */}
                <div className="relative">
                  <img
                    src={resource.thumbnailUrl}
                    alt={resource.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/480x270/164b82/white?text=${encodeURIComponent(resource.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
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

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <Play size={24} className="text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">{resource.channel}</p>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {resource.topics.slice(0, 2).map((topic, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200"
                        >
                          {topic}
                        </span>
                      ))}
                      {resource.topics.length > 2 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{resource.topics.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <a
                    href={resource.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    style={{ background: '#164b82' }}
                    onMouseEnter={(e) => (e.target.style.background = '#4981bc')}
                    onMouseLeave={(e) => (e.target.style.background = '#164b82')}
                  >
                    <Youtube size={18} />
                    Watch Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📚 In-Depth Documentation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides covering fundamental color theory concepts and practical applications
            </p>
          </div>

          <div className="space-y-6">
            {documentationGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 text-white rounded-2xl flex items-center justify-center flex-shrink-0" 
                         style={{ background: 'linear-gradient(to bottom right, #164b82, #4981bc)' }}>
                      <FileText size={32} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {guide.title}
                          </h3>
                          <p className="text-gray-600 text-lg">{guide.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(guide.level)}`}>
                          {guide.level}
                        </span>
                      </div>
                      <button
                        onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                        className="text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                        style={{ background: '#164b82' }}
                        onMouseEnter={(e) => (e.target.style.background = '#4981bc')}
                        onMouseLeave={(e) => (e.target.style.background = '#164b82')}
                      >
                        <BookOpen size={18} />
                        {expandedGuide === guide.id ? 'Hide Content' : 'Read Guide'}
                        {expandedGuide === guide.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedGuide === guide.id && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                        {guide.content}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;