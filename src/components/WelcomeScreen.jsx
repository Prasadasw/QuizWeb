import React from 'react'

const WelcomeScreen = ({ onStart }) => (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-purple-600">Welcome To Aarav Math Quiz Game</h1>
      <button
        className="mt-8 px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
        onClick={onStart}
      >
        Get Started
      </button>
    </div>
  );
  
  export default WelcomeScreen;
  