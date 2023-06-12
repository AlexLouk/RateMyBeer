import React, { useState } from 'react';

const Game = () => {
    const [fragen, setFragen] = useState([
        {
            frage: 'Welches Land ist für sein Oktoberfest bekannt?',
            antworten: ['Deutschland', 'Frankreich', 'Italien', 'Spanien'],
            korrekteAntwort: 'Deutschland'
        },
        {
            frage: 'Welche Zutat ist ein Hauptbestandteil von Bier?',
            antworten: ['Hopfen', 'Reis', 'Weintrauben', 'Olivenöl'],
            korrekteAntwort: 'Hopfen'
        },
        // Weitere Fragen hinzufügen...
    ]);
    const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0);
    const [punktzahl, setPunktzahl] = useState(0);
    const [benutzerAntwort, setBenutzerAntwort] = useState('');

    const frageStellen = () => {
        const frage = fragen[aktuelleFrageIndex];
        return (
            <div>
                <h3>{frage.frage}</h3>
                {frage.antworten.map((antwort, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="radio"
                                value={antwort}
                                checked={benutzerAntwort === antwort}
                                onChange={(e) => setBenutzerAntwort(e.target.value)}
                            />
                            {antwort}
                        </label>
                    </div>
                ))}
                <button onClick={antwortPrüfen}>Antwort überprüfen</button>
            </div>
        );
    };

    const antwortPrüfen = () => {
        const frage = fragen[aktuelleFrageIndex];
        if (benutzerAntwort === frage.korrekteAntwort) {
            setPunktzahl((prevPunktzahl) => prevPunktzahl + 1);
        }
        if (aktuelleFrageIndex < fragen.length - 1) {
            setAktuelleFrageIndex((prevIndex) => prevIndex + 1);
            setBenutzerAntwort('');
        }
    };

    return (
        <div>
            {aktuelleFrageIndex < fragen.length ? (
                frageStellen()
            ) : (
                <div>
                    <h3>Quiz beendet! Deine Punktzahl: {punktzahl}/{fragen.length}</h3>
                </div>
            )}
        </div>
    );
};

export default Game;
