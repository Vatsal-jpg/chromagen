import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const circleRefs = useRef([]);
  circleRefs.current = [];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const addToRefs = (el) => {
    if (el && !circleRefs.current.includes(el)) {
      circleRefs.current.push(el);
    }
  };

  const [creativeBrief, setCreativeBrief] = useState('');
  const [inspirationImage, setInspirationImage] = useState(null);

  useEffect(() => {
    const animations = [
      { x: 200, y: -100, duration: 6 },
      { x: -150, y: 150, duration: 8 },
      { x: 100, y: 200, duration: 10 },
      { x: -200, y: -150, duration: 7 },
      { x: 180, y: 120, duration: 9 },
      { x: -120, y: -180, duration: 8 },
      { x: 150, y: -150, duration: 6.5 },
      { x: -100, y: 200, duration: 7.5 },
      { x: 200, y: 100, duration: 9.5 },
    ];

    circleRefs.current.forEach((circle, index) => {
      const anim = animations[index % animations.length];
      gsap.to(circle, {
        x: anim.x,
        y: anim.y,
        repeat: -1,
        yoyo: true,
        duration: anim.duration,
        ease: 'power1.inOut',
      });
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setInspirationImage(URL.createObjectURL(file));
  };

  const handleGeneratePalette = async () => {
    setIsLoading(true); 
    const formData = new FormData();
    formData.append('prompt', creativeBrief);
    if (inspirationImage) {
      const blob = await fetch(inspirationImage).then(r => r.blob());
      formData.append('image', blob, 'inspiration.jpg');
    }

    fetch('http://127.0.0.1:5001/api/generate-palette', { 
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log('Palette generated:', data);
        setIsLoading(false); 
        navigate('/preview', { state: { generatedPalette: data } });
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false); 
      });
  };

  const colors = ['red', 'green', 'yellow', 'orange', 'blue', 'purple', 'pink', 'cyan', 'lime'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col items-center justify-start px-4 pt-12">
      
      {/* Animated Color Circles */}
      <div className="relative w-full h-64 flex items-center justify-center mb-6">
        {colors.map((color, idx) => (
          <div
            key={idx}
            ref={addToRefs}
            className="absolute rounded-full"
            style={{
              width: `${50 - idx * 3}px`,
              height: `${50 - idx * 3}px`,
              backgroundColor: color,
              opacity: 0.6,
            }}
          />
        ))}

        {/* Website Name & Description */}
        <div className=" text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 drop-shadow-lg">
            ChromaGen
          </h1>
          <p className="text-lg md:text-xl text-black opacity-90 max-w-2xl mx-auto drop-shadow-md">
            Explore, generate, and perfect color palettes for your design projects.
            Drop an inspiration image or describe your creative brief or your mood to get started.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        {/* Creative Brief */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-4 text-black">
            What's on your mind?
          </h2>
          <textarea
            value={creativeBrief}
            onChange={(e) => setCreativeBrief(e.target.value)}
            placeholder="Describe your project… e.g., 'Modern tech startup dashboard with professional, trustworthy vibes'"
            className="w-full border border-gray-200 rounded-xl p-4 text-black focus:outline-none focus:ring-2 focus:ring-[#164b82]"
            rows={6}
          />
        </div>

        {/* Inspiration Image */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Inspiration Image
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center">
            {inspirationImage && (
              <img src={inspirationImage} alt="Inspiration" className="max-h-48 mb-4 rounded-lg object-cover" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="text-[#4981bc] font-semibold cursor-pointer">
              {inspirationImage ? 'Change Image' : 'Choose File'}
            </label>
          </div>
        </div>
      </div>

      {/* Generate Palette Button */}
      <button
        onClick={handleGeneratePalette}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-[#164b82] to-[#4981bc] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isLoading ? 'Generating...' : 'Generate Palette'}
      </button>
    </div>
  );
};

export default Home;
