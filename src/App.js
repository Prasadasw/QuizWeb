import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import PlayerNameInput from "./components/PlayerNameInput";
import QuizScreen from "./components/QuizScreen";

const App = () => {
  const [playerName, setPlayerName] = useState("");
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <div className="min-h-screen bg-blue-100 text-center flex flex-col items-center justify-center">
      {!playerName ? (
        <WelcomeScreen onStart={() => setPlayerName("input")} />
      ) : !startQuiz ? (
        <PlayerNameInput
          onNameSubmit={(name) => {
            setPlayerName(name);
            setStartQuiz(true);
          }}
        />
      ) : (
        <QuizScreen playerName={playerName} />
      )}
    </div>
  );
};

export default App;
