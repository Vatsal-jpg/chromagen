import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import palettesImg from "../assets/palettes.png";


const Loading = () => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const paletteRef = useRef([]);
  const scrollRef = useRef(null);

  // Random color generator
  const getRandomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

  useGSAP(() => {
  const scrollEl = scrollRef.current;
  
  // Set height properly (two stacked images)
  const scrollHeight = scrollEl.scrollHeight / 2; // height of one image

  gsap.to(scrollEl, {
    y: `-${scrollHeight}px`, // move by one image height
    duration: 15,
    ease: "linear",
    repeat: -1,
  });

  // Shine effect on button
  gsap.to(buttonRef.current, {
    backgroundPosition: "200% center",
    duration: 2,
    repeat: -1,
    ease: "linear",
  });
});


  useEffect(() => {
    const interval = setInterval(() => {
      paletteRef.current.forEach(
        (div) => (div.style.backgroundColor = getRandomColor())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen bg-white p-6 gap-12">
      {/* Left Section */}
      <div className="flex flex-col items-start text-left max-w-lg">
        <h1 className="text-5xl font-bold mb-4">The super fast color palettes generator!</h1>
        <p className="text-gray-600 mb-6">
          Create fine palettes inspired by thousands of beautiful color schemes.
        </p>
        <button
          ref={buttonRef}
          onClick={() => navigate("/home")}
          className="px-6 py-3 rounded-lg text-white font-semibold shadow-md relative overflow-hidden"
          style={{
            background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)",
            backgroundColor: "black",
            backgroundSize: "200% auto",
          }}
        >
          Enter ChromaGen
        </button>
      </div>

{/* Right Section */}
<div className="relative flex-1 flex items-center justify-end">
  {/* === Monitor === */}
  <div className="relative h-[80vh] w-[50vw] bg-black rounded-lg overflow-hidden border-8 border-gray-800 shadow-2xl flex flex-col items-center">
    {/* Scrolling content */}
    <div ref={scrollRef} className="absolute inset-0 flex flex-col">
      <img src={palettesImg} alt="Palettes" className="w-full" />
      <img src={palettesImg} alt="Palettes" className="w-full" />
    </div>

    {/* Stand */}
    <div className="absolute -bottom-16 flex flex-col items-center">
      <div className="w-20 h-4 bg-gray-700 rounded"></div>
      <div className="w-40 h-3 bg-gray-600 rounded-b-lg mt-1"></div>
    </div>
  </div>

{/* === Laptop (in front of monitor) === */}
<div className="absolute bottom-0 right-[15%] flex flex-col items-center">
  {/* Laptop */}
  <div className="relative w-[420px] h-[240px] bg-black rounded-md border-4 border-gray-700 shadow-xl overflow-hidden flex">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        ref={(el) => (paletteRef.current[i] = el)}
        className="flex-1 transition-colors duration-700"
        style={{ backgroundColor: getRandomColor() }}
      />
    ))}
  </div>

  {/* Base / Stand */}
  <div className="w-[460px] h-8 bg-gray-700 rounded-b-lg shadow-inner mt-1"></div>
</div>

</div>


    </div>
  );
};

export default Loading;
