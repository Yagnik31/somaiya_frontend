import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Results.css"; // Create a CSS file for styling if needed
import Navigation from "../../../Navigation/Navigation";

const Results = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const score = urlParams.get("score");
  const total = urlParams.get("total");
  const encodedAnswers = urlParams.get("answers");

  // Decode and parse the answers
  const correctAnswers = JSON.parse(decodeURIComponent(encodedAnswers)) || [];

  // State to manage visibility of the answer key
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  useEffect(() => {
    // Show the answer key for 30 seconds
    setShowAnswerKey(true);

    const timer = setTimeout(() => {
      setShowAnswerKey(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navigation />
      <div className="result-container_main w-full h-screen flex items-center justify-center">
        <div className="result-container border-2 bg-white text-center">
          <h1 className="text-2xl">Quiz Completed</h1>
          <div className="score text-black mt-2 font-bold">
            Your Score:{" "}
            <span id="score">
              {score} / {total}
            </span>
          </div>
          {showAnswerKey && (
            <div className="answer-key text-left" id="answer-key" >
              <h2>Answer Key:</h2>
              <ul id="answers-list">
                {Array.isArray(correctAnswers) &&
                  correctAnswers.map((answer, index) => (
                    <li key={index}>
                      Question {index + 1}:{" "}
                      {answer !== null ? answer : "No answer selected"}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Results;
