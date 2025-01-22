import { useState } from "react";

const PlayerNameInput = ({ onNameSubmit }) => {
  const [name, setName] = useState("");

  return (
    <div>
      <h2 className="text-2xl mb-4">What is your name?</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
      />
      <button
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        onClick={() => onNameSubmit(name)}
        disabled={!name.trim()}
      >
        Let’s Start
      </button>
    </div>
  );
};

export default PlayerNameInput;
