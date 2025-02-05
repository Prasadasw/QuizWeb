import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import questions from "../data/questions.json";
import bgscreen from "../assets/images/frame6.png";
import boy from "../assets/images/boyquize.png";
import celebration from "../assets/gif/Animation - 1738153476673.gif";
import sad from "../assets/gif/Animation - 1738154083866.gif";
import play from "../assets/gif/play-unscreen.gif";
import firstQuestionAudio from "../assets/audio/firstquestion.mp3";
import secondQuestionAudio from "../assets/audio/secondquestion.mp3";
import thirdQuestionAudio from "../assets/audio/thirdquestion.mp3";
import fourthQuestionAudio from "../assets/audio/fourthquestion.mp3";
import fivthQuestionAudio from "../assets/audio/fivthquestion.mp3";
import sixthQuestionAudio from "../assets/audio/sixthquestion.mp3";
import secondround1st from "../assets/audio/secondround1st.mp3";
import secondround2nd from "../assets/audio/secondround2nd.mp3";
// import secondround3rd from "../assets/audio/secondround3rd.mp3";
import secondround4th from "../assets/audio/secondround4th.mp3";
import secondround5th from "../assets/audio/secondround5th.mp3";
import secondround6th from "../assets/audio/secondround6th.mp3";
import secondround7th from "../assets/audio/secondround7th.mp3";
import thirdquestion1 from "../assets/audio/thirdround1st.mp3";
import thirdquestion2 from "../assets/audio/thirdround2nd.mp3";
// import thirdquestion3 from "../assets/audio/thirdround3rd.mp3";
import thirdquestion4 from "../assets/audio/thirdround4th.mp3";
import thirdquestion5 from "../assets/audio/thirdround5th.mp3";
import thirdquestion6 from "../assets/audio/thirdround6th.mp3";
import thirdquestion7 from "../assets/audio/thirdround7th.mp3";
import help from "../assets/gif/help-unscreen.gif";
import congratulationbg from "../assets/images/pricebg.png";
import candy from "../assets/gif/candy-1--unscreen.gif";
import closeIcon from "../assets/images/cross.png";
import pricepoll from "../assets/images/pricepoll.png";
import pollbg from "../assets/images/pricepollbg.png";
import hoverSound from "../assets/audio/5050.mp3";
import HoverFlip from "../assets/audio/flipquestion.mp3";
import DoubleDip from "../assets/audio/doubledip.mp3";

const Lifeline = ({
  isVisible,
  onFiftyFiftyClick,
  onClose,
  onFlipQuestionClick,
}) => {
  const [playHoverSound, { stop: stopHoverSound }] = useSound(hoverSound);
  const [playHoverFlip, { stop: stopHoverFlip }] = useSound(HoverFlip);
  const [playDoubleDip, { stop: stopDoubleDip }] = useSound(DoubleDip);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState(questions[currentQuestion].options);
  const [lifelinesUsed, setLifelinesUsed] = useState({
    fiftyFifty: false,
    flipQuestion: false,
    blurredOptions: [], // Add this line
  });
  // const audioRef = useRef(new Audio(hoverSound, HoverFlip, DoubleDip));
  // const fiftyFiftyRef = useRef(new Audio(hoverSound));
  // const flipQuestionRef = useRef(new Audio(HoverFlip));
  // const doubleDipRef = useRef(new Audio(DoubleDip));

  // const playSound = (audioRef) => {
  //   audioRef.current.currentTime = 0; // Reset audio to start
  //   audioRef.current.play();
  // };

  if (!isVisible) return null;
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const handleFiftyFifty = () => {
    if (lifelinesUsed.fiftyFifty) return;

    const correctAnswer = questions[currentQuestion].answer;
    const incorrectAnswers = questions[currentQuestion].options.filter(
      (option) => option !== correctAnswer
    );

    const shuffledIncorrect = shuffleArray(incorrectAnswers).slice(0, 2);

    const blurredOptions = questions[currentQuestion].options
      .map((option, index) =>
        shuffledIncorrect.includes(option) ? index : null
      )
      .filter((index) => index !== null);

    setOptions(questions[currentQuestion].options);
    setLifelinesUsed((prev) => ({ ...prev, fiftyFifty: true, blurredOptions }));
    onFiftyFiftyClick();
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          position: "absolute",
          padding: "15px",
          top: "5px",
          right: "5px",
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#4B2284",
        }}
        onClick={onClose}
      >
        ×
      </div>
      <div style={styles.header}>LIFELINES</div>
      <div style={styles.buttonsContainer}>
        <button
          onClick={onFiftyFiftyClick}
          onMouseEnter={playHoverSound}
          onMouseLeave={stopHoverSound}
          disabled={false}
          style={styles.button}
        >
          50:50
        </button>
        <button
          style={styles.button}
          onMouseEnter={playDoubleDip}
          onMouseLeave={stopDoubleDip}
          // onMouseEnter={() => playSound(doubleDipRef)}
        >
          Double Dip
        </button>
      </div>
      <div style={styles.buttonsContainer}>
        <button
          onClick={onFlipQuestionClick}
          disabled={false}
          style={styles.button}
          onMouseEnter={playHoverFlip}
          onMouseLeave={stopHoverFlip}
        >
          Flip the Question
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "absolute",
    bottom: "40px",
    left: "20px",
    backgroundColor: "#ccc",
    padding: "15px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "4px 4px 10px rgba(0,0,0,0.2)",
    width: "500px",
    height: "200px",
  },
  header: {
    backgroundColor: "#FFC000",
    padding: "8px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "uppercase",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  button: {
    backgroundColor: "#4B2284",
    color: "white",
    border: "3px solid white",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    flex: "1",
    margin: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase",
    boxShadow: "inset 2px 2px 5px rgba(255, 255, 255, 0.3)",
    transition: "all 0.3s ease-in-out",
    height: "50px",
  },
};

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
  const [isLifelineVisible, setIsLifelineVisible] = useState(false);
  const [round, setRound] = useState(1); // Track the current round
  const [options, setOptions] = useState([]); // State for storing current options
  const [isGameOver, setIsGameOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lifelinesUsed, setLifelinesUsed] = useState({
    fiftyFifty: false,
    flipQuestion: false,
    blurredOptions: [], // Add this line
  });
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const audioRef = useRef(null);
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const questionAudioMap = {
    1: firstQuestionAudio,
    2: secondQuestionAudio,
    3: thirdQuestionAudio,
    4: fourthQuestionAudio,
    5: fivthQuestionAudio,
    6: sixthQuestionAudio,
    7: secondround1st,
    8: secondround2nd,
    // 9: secondround3rd,
    9: secondround4th,
    10: secondround5th,
    11: secondround6th,
    12: secondround7th,
    13: thirdquestion1,
    14: thirdquestion2,
    15: thirdquestion4,
    16: thirdquestion5,
    17: thirdquestion6,
    18: thirdquestion7,
  };

  const playQuestionAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      const audioFile = questionAudioMap[questions[currentQuestion].id];

      if (audioFile) {
        audioRef.current.src = audioFile;
        audioRef.current
          .play()
          .then(() => {
            setIsAudioPlaying(true);
            setHasReadQuestion(true);
            setPaused(false);
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
          });
      } else {
        console.warn("No audio file found for this question.");
      }
    }
  };

  useEffect(() => {
    // Determine the timer based on the round
    if (round === 1) {
      setTimer(30); // First round: 30 seconds
    } else if (round === 2) {
      setTimer(60); // Second round: 60 seconds
    } else {
      setTimer(null); // Third round: no timer
    }
  }, [round]);

  useEffect(() => {
    if (!hasReadQuestion || paused) return;

    if (timer === 0) {
      setCurrentQuestion((prev) => prev + 1);
      setHasReadQuestion(false);
      return;
    }

    if (timer !== null) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, paused, hasReadQuestion]);

  useEffect(() => {
    // Update the round based on the current question
    if (currentQuestion < 6) {
      setRound(1); // First 6 questions: Round 1
    } else if (currentQuestion < 12) {
      setRound(2); // Next 6 questions: Round 2
    } else {
      setRound(3); // Remaining questions: Round 3
    }
  }, [currentQuestion]);

  const handleFiftyFifty = () => {
    if (lifelinesUsed.fiftyFifty) return;

    const correctAnswer = questions[currentQuestion].answer;
    const incorrectAnswers = questions[currentQuestion].options.filter(
      (option) => option !== correctAnswer
    );

    const shuffledIncorrect = shuffleArray(incorrectAnswers).slice(0, 2);

    const blurredOptions = questions[currentQuestion].options
      .map((option, index) =>
        shuffledIncorrect.includes(option) ? index : null
      )
      .filter((index) => index !== null);

    setOptions(questions[currentQuestion].options);
    setLifelinesUsed((prev) => ({ ...prev, fiftyFifty: true, blurredOptions }));
  };
  const handleFlipQuestion = () => {
    if (lifelinesUsed.flipQuestion) return; // Prevent reuse

    setCurrentQuestion((prev) => prev + 1); // Skip question
    setLifelinesUsed((prev) => ({ ...prev, flipQuestion: true })); // Mark as used
  };

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      setIsGameOver(true);
    } else {
      setOptions(questions[currentQuestion].options);
    }
  }, [currentQuestion]);

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
    setPaused(true);

    const isCorrect = questions[currentQuestion].answer === option;
    setOptionColor({ [option]: isCorrect ? "bg-green-500" : "bg-red-500" });

    setResultGif(isCorrect ? celebration : sad);

    // Increase score if the answer is correct
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Show correct/wrong popup
    setTimeout(() => {
      setResultModal(
        isCorrect
          ? "🎉 Congratulations! Your answer is correct."
          : "❌ OOPS! Your selected answer is wrong."
      );
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div
        className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${congratulationbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="text-4xl font-bold mb-4">
            🎉 Congratulations {playerName}!
          </h1>
          <p className="text-2xl mb-6">
            You scored <strong>{score}</strong> out of{" "}
            <strong>{questions.length}</strong>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#704FE6] hover:bg-white hover:text-[#704FE6]  text-white text-xl font-bold rounded-lg shadow-md"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  const handleNextQuestion = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setResultModal(null);
    setSelectedOption(null);
    setOptionColor({});
    setCurrentQuestion((prev) => prev + 1);
    setPaused(true);
    setIsAudioPlaying(false);

    // Reset timer based on the round
    if (round === 1) {
      setTimer(30);
    } else if (round === 2) {
      setTimer(60);
    }
  };

  const handleQuit = () => {
    setShowQuitPopup(true);
  };

  const confirmQuit = () => {
    setIsGameOver(true);
  };

  const toggleLifeline = () => {
    setIsLifelineVisible((prev) => !prev);
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
            Hi {playerName}, welcome to Aarav's Quiz App!
          </h2>
          <h3 className="text-xl font-semibold bg-blue-400 text-white mt-2">
            {round === 1
              ? "First Round Questions"
              : round === 2
              ? "Second Round Questions"
              : "Third Round Questions"}
          </h3>
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
          {timer !== null && (
            <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center text-2xl font-bold text-red-500">
              {timer}
            </div>
          )}
          <img
            src={play}
            className="w-16 h-16 cursor-pointer"
            onClick={playQuestionAudio}
          ></img>
        </div>

        <div className="flex flex-col lg:flex-row items-start w-full max-w-5xl">
          <div className="w-full lg:w-1/2 flex items-start">
            <div className="flex items-center gap-10">
              <div className="flex flex-shrink-0 items-center justify-center w-12 h-12 bg-yellow-400 text-black font-bold text-xl rounded-md shadow-md">
                {currentQuestion + 1}
              </div>
              <p className="text-[27px] font-bold text-left text-black mt-4">
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
              {current.options.map((option, index) => {
                const isBlurred =
                  lifelinesUsed.fiftyFifty &&
                  lifelinesUsed.blurredOptions.includes(index);
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className={`w-3/4 text-left px-4 py-3 mb-2 text-lg rounded-md border font-bold transition-all flex items-center gap-3 ${
                      optionColor[option] || "bg-gray-300"
                    } ${isBlurred ? "filter blur-sm" : ""}`}
                    disabled={selectedOption !== null || isBlurred}
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </button>
                );
              })}
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
              <img
                src={resultGif}
                alt="Result GIF"
                className="w-40 h-40 mb-4"
              />
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

        {!isLifelineVisible && (
          <div
            onClick={toggleLifeline}
            className="absolute bottom-4 left-4 w-24 h-10 flex items-center justify-center rounded-full text-white cursor-pointer text-2xl"
            style={{ zIndex: 1000 }}
          >
            <img src={help} alt="Help" />
          </div>
        )}

        {isLifelineVisible && (
          <Lifeline
            isVisible={isLifelineVisible}
            onFiftyFiftyClick={handleFiftyFifty}
            onFlipQuestionClick={handleFlipQuestion}
            onClose={toggleLifeline}
          />
        )}

        <div>
          {/* Candy Image */}
          <div className="fixed bottom-24 right-10">
            <img
              src={candy}
              className="w-24 h-24 cursor-pointer"
              alt="Candy"
              onClick={openModal}
            />
          </div>
          <button
            onClick={handleQuit}
            className="fixed bottom-10 right-10 rounded-lg bg-red-500 text-white text-2xl p-3 font-bold shadow-md"
          >
            Quit
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={closeModal}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Icon */}
                <img
                  src={closeIcon}
                  className="w-6 h-6 cursor-pointer absolute top-2 right-2"
                  alt="Close"
                  onClick={closeModal}
                />
                {/* Modal Content */}
                <div>
                  <img src={pricepoll} className="w-[300px] h-[540px]" />
                </div>
              </div>
            </div>
          )}
        </div>

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
