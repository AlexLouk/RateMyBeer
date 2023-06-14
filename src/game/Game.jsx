import React, { useEffect, useState } from 'react';
import './Game.css';

const Game = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswers, setNewAnswers] = useState([]);
    const [newCorrectAnswer, setNewCorrectAnswer] = useState('');

    useEffect(() => {
        fetchCurrentQuestion();
    }, []);

    const fetchCurrentQuestion = async () => {
        try {
            const response = await fetch('http://localhost:3001/game/questions');
            if (response.ok) {
                const data = await response.json();
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomQuestion = data[randomIndex];
                setCurrentQuestion(randomQuestion);
                setIsAnswerCorrect(null);
                setSelectedAnswer(null);
            } else {
                console.error('Error fetching current question:', response.status);
                // Hier kannst du eine geeignete Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
            }
        } catch (error) {
            console.error('Error fetching current question:', error);
            // Hier kannst du eine geeignete Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
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

    const handleAddQuestion = async () => {
        try {
            const response = await fetch('http://localhost:3001/game/addQuestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: newQuestion,
                    answers: JSON.stringify(newAnswers), // JSON serialisieren
                    correctAnswer: newCorrectAnswer,
                }),
            });
            const data = await response.json();
            console.log(data);
            setNewQuestion('');
            setNewAnswers([]);
            setNewCorrectAnswer('');
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-container">
            <p className="question">{currentQuestion.question}</p>
            {isAnswerCorrect !== null && (
                <p className={`answer-feedback ${isAnswerCorrect ? 'correct' : 'incorrect'}`}>
                    {isAnswerCorrect ? 'Correct answer!' : 'Incorrect answer!'}
                </p>
            )}
            <ul className="answer-list">
                {currentQuestion.answers.map((answer, index) => (
                    <li
                        key={index}
                        onClick={() => handleAnswerSelection(answer)}
                        className={`answer-item ${selectedAnswer === answer ? 'selected' : ''}`}
                    >
                        <button className="answer-button">{answer}</button>
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

            <h2 className="add-question-heading">Add Question</h2>
            <label>
                Question:
                <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                />
            </label>
            <label>
                Answers (comma-separated):
                <input
                    type="text"
                    value={newAnswers.join(',')}
                    onChange={(e) => setNewAnswers(e.target.value.split(','))}
                />
            </label>
            <label>
                Correct Answer:
                <input
                    type="text"
                    value={newCorrectAnswer}
                    onChange={(e) => setNewCorrectAnswer(e.target.value)}
                />
            </label>
            <button onClick={handleAddQuestion} className="add-question-button">
                Add Question
            </button>
        </div>
    );
};

export default Game;
