import { useState } from "react";
import backgroundimg from "../assets/images/Frame5.png";

const PlayerNameInput = ({ onNameSubmit }) => {
  const [name, setName] = useState("");

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-3xl mb-4 text-white font-bold ">What is your name?</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="px-14 py-2 border rounded-lg shadow-sm focus:outline-none text-left"
      />
      <div>
        <button
          className="w-36 h-12 mt-4 bg-[#FFD464] text-black font-bold text-xl rounded-md"
          onClick={() => name && onNameSubmit(name)}
          // disabled={!name.trim()}
        >
          Let’s Start
        </button>
      </div>
    </div>
  );
};

export default PlayerNameInput;
