import React from 'react';
import './Timer.css';

const Timer = ({ timeLeft, isGameOver }) => (
  <div className="timer-container">
    {isGameOver ? 'Game Over! Try Again' : `Time left: ${timeLeft} seconds`}
  </div>
);

export default Timer;
