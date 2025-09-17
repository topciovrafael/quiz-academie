import { useState, useEffect } from "react";
import "./App.css";
import questionsEng from "./questions-eng.json";
import questionsRo from "./questions-ro.json";
import questionsIst from "./questions-ist.json";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getQuestionsData = () => {
    switch (selectedLanguage) {
      case "eng":
        return questionsEng;
      case "ro":
        return questionsRo;
      case "ist":
        return questionsIst;
      default:
        return questionsEng;
    }
  };

  useEffect(() => {
    if (selectedLanguage) {
      setShuffledQuestions(shuffleArray(getQuestionsData()));
    }
  }, [selectedLanguage]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setShuffledQuestions(shuffleArray(getQuestionsData()));
  };

  const startQuiz = (language) => {
    setSelectedLanguage(language);
  };

  const goBackToLanguageSelection = () => {
    setSelectedLanguage(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setShuffledQuestions([]);
  };

  if (!selectedLanguage) {
    return (
      <div className="quiz-container">
        <div className="language-selection">
          <h1>Quiz Academie</h1>
          <h2>Alege materia</h2>
          <div className="language-options">
            <button className="language-btn" onClick={() => startQuiz("eng")}>
              ENG
            </button>
            <button className="language-btn" onClick={() => startQuiz("ist")}>
              IST
            </button>
            <button className="language-btn" onClick={() => startQuiz("ro")}>
              RO
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <div className="quiz-completed">
          <h1>
            {selectedLanguage === "eng"
              ? "Quiz Completed!"
              : selectedLanguage === "ist"
              ? "Quiz Completato!"
              : "Test Finalizat!"}
          </h1>
          <p>
            {selectedLanguage === "eng"
              ? "Scorul tău"
              : selectedLanguage === "ist"
              ? "Scorul tău"
              : "Scorul tău"}
            : {score}{" "}
            {selectedLanguage === "eng"
              ? "din"
              : selectedLanguage === "din"
              ? "din"
              : "din"}{" "}
            {shuffledQuestions.length}
          </p>
          <p>
            {selectedLanguage === "eng"
              ? "Procent"
              : selectedLanguage === "ist"
              ? "Procent"
              : "Procent"}
            : {Math.round((score / shuffledQuestions.length) * 100)}%
          </p>
          <div className="quiz-actions">
            <button onClick={restartQuiz} className="restart-btn">
              {selectedLanguage === "eng"
                ? "Repetă Testul"
                : selectedLanguage === "ist"
                ? "Repetă Testul"
                : "Repetă Testul"}
            </button>
            <button
              onClick={goBackToLanguageSelection}
              className="language-btn"
            >
              {selectedLanguage === "eng"
                ? "Schimbă Testul"
                : selectedLanguage === "ist"
                ? "Schimbă Testul"
                : "Schimbă Testul"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="header-with-language">
          <h1>Quiz Academie</h1>
          <button
            onClick={goBackToLanguageSelection}
            className="language-change-btn"
          >
            {selectedLanguage === "eng"
              ? "Iesire"
              : selectedLanguage === "ist"
              ? "Iesire"
              : "Iesire"}
          </button>
        </div>
        <div className="quiz-progress">
          {selectedLanguage === "eng"
            ? "Întrebarea"
            : selectedLanguage === "ist"
            ? "Întrebarea"
            : "Întrebarea"}{" "}
          {currentQuestionIndex + 1}{" "}
          {selectedLanguage === "eng"
            ? "din"
            : selectedLanguage === "ist"
            ? "din"
            : "din"}{" "}
          {shuffledQuestions.length}
        </div>
        <div className="score">
          {selectedLanguage === "eng"
            ? "Scor"
            : selectedLanguage === "ist"
            ? "Scor"
            : "Scor"}
          : {score}
        </div>
      </div>

      <div className="quiz-content">
        <h2 className="question">{currentQuestion?.question}</h2>

        <div className="options">
          {currentQuestion?.options?.map((option, index) => (
            <button
              key={index}
              className={`option ${
                selectedAnswer === index ? "selected" : ""
              } ${
                showResult
                  ? index === currentQuestion.correctAnswerIndex
                    ? "correct"
                    : selectedAnswer === index
                    ? "incorrect"
                    : ""
                  : ""
              }`}
              onClick={() => handleAnswerClick(index)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && !showResult && (
          <button className="next-btn" onClick={handleNextQuestion}>
            {currentQuestionIndex === shuffledQuestions.length - 1
              ? selectedLanguage === "eng"
                ? "Termină Testul"
                : selectedLanguage === "ist"
                ? "Termină Testul"
                : "Termină Testul"
              : selectedLanguage === "eng"
              ? "Următoarea Întrebare"
              : selectedLanguage === "ist"
              ? "Următoarea Întrebare"
              : "Următoarea Întrebare"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
