import { useState, useEffect } from "react";
import "./AttemptQuiz.css";
import Navigation from "../../Navigation/Navigation";

const AttemptQuiz = () => {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set()); // Track answered questions as a Set

  // Handle file change for PDF upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to upload the PDF and start quiz
  const uploadPDF = () => {
    if (!file) {
      alert("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("https://somaiya-backend.onrender.com/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          // Filter out questions without options
          const validQuestions = data.questions.filter(
            (q) => q.options && q.options.length > 0
          );
          setQuestions(validQuestions);
          setQuizStarted(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Timer logic
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearInterval(timer); // Clear interval on component unmount or timeLeft change
  }, [quizStarted, timeLeft]);

  // Convert timeLeft (seconds) to minutes and seconds format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle question selection to update answered questions
  const handleAnswerSelection = (index) => {
    setAnsweredQuestions((prev) => {
      const newAnswered = new Set(prev);
      newAnswered.add(index); // Add the index of the answered question
      return newAnswered;
    });
  };

  // Submit quiz and calculate the score
  const handleSubmitQuiz = () => {
    let userScore = 0;
    const correctAnswers = []; // Array to hold correct answers
  
    questions.forEach((question, index) => {
      const correctAnswer = question.correctAnswer.replace(/\*\*$/, ""); // Remove '**' from the correct answer
      const selectedAnswerElement = document.querySelector(
        `input[name="question-${index}"]:checked`
      );
      const selectedAnswer = selectedAnswerElement
        ? selectedAnswerElement.value
        : null;
  
      // Store the correct answer
      correctAnswers.push(correctAnswer);
  
      // Compare the user's selected answer with the correct answer
      if (selectedAnswer === correctAnswer) {
        userScore++;
      }
    });
  
    // Redirect to results page with score, total questions, and correct answers
    const encodedCorrectAnswers = encodeURIComponent(
      JSON.stringify(correctAnswers)
    );
    window.location.href = `/results?score=${userScore}&total=${questions.length}&answers=${encodedCorrectAnswers}`;
  };

  // Handle time up (for the timer)
  const handleTimeUp = () => {
    alert("Time is up! Submitting your quiz.");
    handleSubmitQuiz();
  };

  // Calculate progress width based on answered questions
  const progressWidth = (answeredQuestions.size / questions.length) * 100;

  return (
    <>
      <Navigation />
      <div className="w-full px-4 text-right mt-4">
        <h2 className="text-3xl font-bold text-red-900">
          {formatTime(timeLeft)}
        </h2>
      </div>

      <div className="w-1/2 mx-auto text-center">
        <input
          type="file"
          className="mt-8"
          onChange={handleFileChange}
          accept=".pdf"
        />
        <button className="bg-red-900 p-2 text-white ml-9" onClick={uploadPDF}>
          Upload PDF
        </button>
      </div>
      <div className="w-1/2 mx-auto">
        <h1 className="text-left text-xl text-black">Quiz</h1>
      </div>
      {/* Progress Bar */}
      {quizStarted && (
        <div
          className="progress-bar-container w-1/2 mx-auto"
          id="progress-bar-container"
        >
          <div
            className="progress-bar"
            id="progress-bar"
            style={{ width: `${progressWidth}%` }}
          >
            {Math.round(progressWidth)}%
          </div>
        </div>
      )}

      {quizStarted && (
        <form id="quiz-form">
          {questions.map((question, index) => (
            <div
              key={index}
              className="quiz-container w-1/2 mx-auto bg-yellow-50 mt-4"
            >
              <div className="question  ">
                <p className="text-red-900 font-bold">
                  {question.question.replace(/\*\*/g, "")}
                </p>
                {question.options.map((option, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={String.fromCharCode(65 + i)}
                      onChange={() => handleAnswerSelection(index)} // Pass the question index
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="submit-btn"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        </form>
      )}
    </>
  );
};

export default AttemptQuiz;
