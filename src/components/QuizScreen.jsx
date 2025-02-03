import React, { useState, useEffect, useRef } from "react";
import questions from "../data/questions.json";
import bgscreen from "../assets/images/frame6.png";
import boy from "../assets/images/boyquize.png";
import celebration from "../assets/gif/Animation - 1738153476673.gif";
import sad from "../assets/gif/Animation - 1738154083866.gif";
import secondQuestionAudio from "../assets/audio/secondquestion.mp3";
import play from '../assets/gif/play-unscreen.gif'

const QuizScreen = ({ playerName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showQuitPopup, setShowQuitPopup] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showModal, setShowModal] = useState(false);
  const [optionColor, setOptionColor] = useState({});
  const [paused, setPaused] = useState(false);
  const [resultModal, setResultModal] = useState(null);
  const [hasReadQuestion, setHasReadQuestion] = useState(false);
  const [resultGif, setResultGif] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Audio handling
  const audioRef = useRef(null);

  // Map question indices to audio files
  const questionAudioMap = {
    1: secondQuestionAudio, // Audio for the second question
    // Add more mappings as needed
  };

  const playQuestionAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Stop any currently playing audio
      audioRef.current.currentTime = 0; // Reset audio to start

      // Get the audio file for the current question
      const audioFile = questionAudioMap[currentQuestion];
      if (audioFile) {
        audioRef.current.src = audioFile; // Set new audio source
        audioRef.current.play(); // Play the audio
      } else {
        console.warn("No audio file found for this question.");
      }
    }
  };
  useEffect(() => {
    if (!hasReadQuestion || paused) return; // Timer won't start until user reads the question

    if (timer === 0) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(30);
      setHasReadQuestion(false); // Reset for the next question
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, paused, hasReadQuestion]);

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
    setPaused(true);

    const isCorrect = questions[currentQuestion].answer === option;
    setOptionColor({ [option]: isCorrect ? "bg-green-500" : "bg-red-500" });

    // Set the appropriate GIF
    setResultGif(isCorrect ? celebration : sad);

    setTimeout(() => {
      setResultModal(
        isCorrect
          ? "🎉 Congratulations! Your answer is correct."
          : "❌ OOPS! Your selected answer is wrong."
      );
    }, 1000);
  };

  // const useFiftyFifty = () => {
  //   if (!lifelines.fifty) return;
  //   setLifelines({ ...lifelines, fifty: false });
  // };

  // const useAskAudience = () => {
  //   if (!lifelines.audience) return;
  //   setLifelines({ ...lifelines, audience: false });
  //   alert("Audience suggests: " + questions[currentQuestion].answer);
  // };

  // const usePhoneAFriend = () => {
  //   if (!lifelines.phone) return;
  //   setLifelines({ ...lifelines, phone: false });
  //   alert("Your friend thinks the answer is: " + questions[currentQuestion].answer);
  // };

  // const useSwitchQuestion = () => {
  //   if (!lifelines.switch) return;
  //   setLifelines({ ...lifelines, switch: false });
  //   setCurrentQuestion((prev) => prev + 1);
  // };

  
  const handleNextQuestion = () => {
    setResultModal(null);
    setSelectedOption(null);
    setOptionColor({});
    setCurrentQuestion((prev) => prev + 1);
    setTimer(30);
    setPaused(false);
  };

  const handleQuit = () => {
    setShowQuitPopup(true);
  };

  const confirmQuit = () => {
    window.location.reload();
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-center">
          Congratulations {playerName}! You scored {score}/{questions.length}.
        </h1>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <>
     <audio ref={audioRef}></audio>
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgscreen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-600">
          Hi {playerName}, welcome to Aarav Quiz App!
        </h2>
      </div>

    <h1
        className="text-5xl font-extrabold text-center "
        style={{
          color: "#382873",
          fontFamily: "Quicksand, sans-serif",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          WebkitTextStroke: "1px #6A3AC6",
          backgroundImage: "linear-gradient(145deg, #ffffff, #C0A7EE)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          filter: "drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.25))",
        }}
      >
        Quiz Time
      </h1>

      <div className="flex items-center justify-center gap-8 mt-4">
      <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center text-2xl font-bold text-red-500">
        {timer}
      </div>
      <img src={play} className="w-16 h-16 cursor-pointer" onClick={playQuestionAudio}></img>
      </div>

      <div className="flex flex-col lg:flex-row items-start w-full max-w-5xl">
        <div className="w-full lg:w-1/2 flex items-start">
          <div className="flex items-center gap-10">
            <div className="w-16 h-14 flex items-center justify-center bg-yellow-400 text-black font-bold text-xl rounded-md shadow-md">
              {currentQuestion + 1}
            </div>
            <p
              className="text-3xl font-bold text-black mt-4"
              onMouseEnter={() => setHasReadQuestion(true)} // Start timer when user hovers
              onClick={() => setHasReadQuestion(true)} // Start timer when user clicks
            >
              {current.question}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center mb-10">
          <img
            src={boy}
            alt="Quiz Boy"
            className="h-48 w-48 object-contain mb-4"
          />

          <div className="w-full flex flex-col items-center">
            {current.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`w-3/4 text-left px-4 py-3 mb-2 text-lg rounded-md border font-bold transition-all flex items-center gap-3 ${
                  optionColor[option] || "bg-gray-300"
                }`}
                disabled={selectedOption !== null}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {resultModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white p-6 rounded-lg shadow-2xl text-center flex flex-col items-center border-4 border-purple-700"
            style={{
              boxShadow:
                "0 0 20px rgba(128, 0, 128, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img src={resultGif} alt="Result GIF" className="w-40 h-40 mb-4" />
            <p className="text-2xl font-bold text-purple-700 mb-4">
              {resultModal}
            </p>
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-purple-600 text-white text-xl font-bold rounded-lg shadow-md hover:bg-purple-800 transition-all"
            >
              Next Question
            </button>
          </div>
        </div>
      )}
      <button
        onClick={handleQuit}
        className="fixed bottom-10 right-10 rounded-lg bg-red-500 text-white text-2xl p-3 font-bold shadow-md"
      >
        Quit
      </button>

      {showQuitPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-purple-700 text-center">
            <p className="text-2xl font-bold text-purple-700 mb-4">
              Are you sure you want to quit?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmQuit}
                className="px-6 py-2 bg-purple-700 text-white text-xl font-bold rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setShowQuitPopup(false)}
                className="px-6 py-2 bg-red-600 text-white text-xl font-bold rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
</div>

    </>
  );
};

export default QuizScreen;

