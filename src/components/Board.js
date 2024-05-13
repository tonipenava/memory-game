// Board.js
import React from 'react';
import Card from './Card';
import './Board.css';

const Board = ({ cards, onCardClick }) => (
  <div className="board">
    {cards.map((card, index) => (
      <Card
        key={index}
        id={index}
        image={card.image}
        isFlipped={card.isFlipped}
        onClick={onCardClick}
      />
    ))}
  </div>
);

export default Board;
