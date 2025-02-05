import React, { useEffect, useRef } from 'react';
import bgimg from '../assets/images/Frame4.png';
import bgsound from '../assets/audio/welcomesound.mp3';
import arrow from '../assets/images/chevron-circle-right.png';

const WelcomeScreen = ({ onStart }) => {
  // Create an audio instance. No loop here so it plays once.
  const audioRef = useRef(new Audio(bgsound));

  useEffect(() => {
    // Attempt to play the sound when the component mounts (i.e. on refresh)
    audioRef.current.play().catch((error) => {
      console.error("Auto-play failed (likely due to browser autoplay policies):", error);
    });
  }, []); // The empty dependency array ensures this runs only once on mount.

  const handleClick = () => {
    // Optionally, stop or reset the audio before proceeding to the next screen.
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset playback to the beginning.
    }
    onStart();
  };

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <button
        className="mt-64 px-6 py-3 text-white text-lg font-semibold flex items-center gap-3 rounded-full relative"
        style={{
          backgroundColor: '#704FE6',
          border: '3px solid #382873',
          boxShadow: '0px 8px 0px #382873',
          transform: 'translateY(4px)',
        }}
        onClick={handleClick}
      >
        Get Started
        <img src={arrow} className="text-white" alt="arrow icon" />
      </button>
    </div>
  );
};

export default WelcomeScreen;
