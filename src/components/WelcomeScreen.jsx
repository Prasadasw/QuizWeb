import React from 'react';
import bgimg from '../assets/images/Frame4.png';
import { FaArrowRight } from 'react-icons/fa'; // Import arrow icon
import arrow from '../assets/images/chevron-circle-right.png'

const WelcomeScreen = ({ onStart }) => (
  <div
    className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
    style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >

    {/* Button Positioned Below the Banner */}
    <button
      className="mt-64 px-6 py-3 text-white text-lg font-semibold flex items-center gap-3 rounded-full relative"
      style={{
        backgroundColor: '#704FE6', // Button color
        border: '3px solid #382873', // Stroke
        boxShadow: '0px 8px 0px #382873', // Shadow below stroke
        transform: 'translateY(4px)', // Creates a "pressed" effect
      }}
      onClick={onStart}
    >
      Get Started
      <img src={arrow} className="text-white" /> {/* Arrow inside button */}
    </button>
  </div>
);

export default WelcomeScreen;
