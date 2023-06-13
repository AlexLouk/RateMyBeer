import React, { useEffect, useState } from 'react';
import './Game.css';


const Game = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    useEffect(() => {
        fetchCurrentQuestion();
    }, []);

    const fetchCurrentQuestion = async () => {
        try {
            const response = await fetch('http://localhost:3001/game/questions');
            const data = await response.json();
            setCurrentQuestion(data[0]);
            setIsAnswerCorrect(null);
            setSelectedAnswer(null);
        } catch (error) {
            console.error('Error fetching current question:', error);
        }
    };

    const checkAnswer = () => {
        if (selectedAnswer !== null) {
            const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
            setIsAnswerCorrect(isCorrect);
        }
    };

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
        setIsAnswerCorrect(null);
    };

    const handleNextQuestion = () => {
        fetchCurrentQuestion();
    };

    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1></h1>
            <p>{currentQuestion.question}</p>
            <h2></h2>
            {isAnswerCorrect !== null && (
                <p className={`answer-feedback ${isAnswerCorrect ? 'correct' : 'incorrect'}`}>
                    {isAnswerCorrect ? 'Correct answer!' : 'Incorrect answer!'}
                </p>
            )}
            <ul>
                {currentQuestion.answers.map((answer, index) => (
                    <li
                        key={index}
                        onClick={() => handleAnswerSelection(answer)}
                        className={`answer-item ${selectedAnswer === answer ? 'selected' : ''}`}
                    >
                        <button>{answer}</button>
                    </li>
                ))}
            </ul>

            <button
                onClick={checkAnswer}
                disabled={selectedAnswer === null}
                className="check-answer-button"
            >
                Check Antwort
            </button>

            <button onClick={handleNextQuestion} className="next-question-button">
                Nächste Frage
            </button>
        </div>
    );
};

export default Game;
