// Card.js
import React from 'react';
import './Card.css';
import cardBack from '../assets/memory.png';

const Card = ({ onClick, id, image, isFlipped }) => (
  <div
    className={`card ${isFlipped ? 'flipped' : ''}`}
    onClick={() => onClick(id)}
  >
    <div className="card-back">
      <img src={cardBack} alt="Back of the card" />
    </div>
    <div className="card-front">
      {isFlipped ? <img src={image} alt="card" className="image-card" /> : ''}
    </div>
  </div>
);

export default Card;
