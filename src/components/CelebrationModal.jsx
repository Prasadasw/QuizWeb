import React from 'react'

const CelebrationModal = ({ type }) => (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {type === "success" ? (
          <h2 className="text-2xl text-green-500">Correct! 🎉</h2>
        ) : (
          <h2 className="text-2xl text-red-500">Better luck next time! ❌</h2>
        )}
      </div>
    </div>
  );
  
  export default CelebrationModal;
  