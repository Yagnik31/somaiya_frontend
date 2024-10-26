import React, { useState, useEffect } from 'react';

const Timer = ({ timeLeft, onTimeUp }) => {
    const [time, setTime] = useState(timeLeft);

    useEffect(() => {
        if (time <= 0) {
            onTimeUp();
            return;
        }

        const timerInterval = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [time, onTimeUp]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="timer">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
    );
};

export default Timer;
