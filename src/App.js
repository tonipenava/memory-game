import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Timer from './components/Timer';
import './App.css';
import Title from './components/Title';
import correctFlipSound from './assets/correctFlipSound.wav';

const App = () => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [matches, setMatches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lostAlertShown, setLostAlertShown] = useState(false);
  const [timer, setTimer] = useState(null);
  const [gameOverAlertShown, setGameOverAlertShown] = useState(false);
  const [showYouWin, setShowYouWin] = useState(false);
  const [showYouLose, setShowYouLose] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [playCorrectFlipSound, setPlayCorrectFlipSound] = useState(false); // State for playing sound
  const [playButtonClicked, setPlayButtonClicked] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1528821128474-27f963b062bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1670963024606-2e3dacaaefd4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1615484476889-2830f980a5e3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1543280276-66bc9f439b89?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const createCards = () => {
    const shuffledImages = images.sort(() => 0.5 - Math.random()).slice(0, 10);
    const duplicatedImages = [...shuffledImages, ...shuffledImages];
    const shuffledCards = duplicatedImages.sort(() => 0.5 - Math.random());

    const newCards = shuffledCards.map((image, index) => ({
      image,
      isFlipped: false,
    }));
    setCards(newCards);
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 1) {
          clearInterval(timer);
          setIsGameOver(true);
          if (!lostAlertShown) {
            setLostAlertShown(true);
            setGameOverAlertShown(true);
            setShowYouLose(true);
          }
          return prevTimeLeft;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
    setTimer(timer);
  };

  const playSound = () => {
    const audio = new Audio(correctFlipSound);
    audio.play();
  };

  const flipCard = (id) => {
    if (
      !gameStarted ||
      isGameOver ||
      cards[id].isFlipped ||
      firstCard === id ||
      secondCard === id ||
      (firstCard !== null && secondCard !== null)
    ) {
      return;
    }

    const newCards = cards.map((card, index) => ({
      ...card,
      isFlipped: index === id ? !card.isFlipped : card.isFlipped,
    }));
    setCards(newCards);

    if (firstCard === null) {
      setFirstCard(id);
    } else if (secondCard === null) {
      setSecondCard(id);
    }
    setPlayCorrectFlipSound(false); // Reset the state
  };

  const checkMatch = useCallback(() => {
    if (cards[firstCard].image === cards[secondCard].image) {
      setMatches(matches + 1);
      setFirstCard(null);
      setSecondCard(null);
      setPlayCorrectFlipSound(true);
    } else {
      setTimeout(() => {
        const newCards = cards.map((card, index) => {
          if (index === firstCard || index === secondCard) {
            return {
              ...card,
              isFlipped: false,
            };
          } else {
            return card;
          }
        });
        setCards(newCards);
        setFirstCard(null);
        setSecondCard(null);
      }, 1000);
    }
  }, [cards, firstCard, secondCard, matches]);

  useEffect(() => {
    createCards();
  }, []);

  useEffect(() => {
    if (playCorrectFlipSound) {
      playSound(); // Play sound effect
    }
  }, [playCorrectFlipSound]);

  useEffect(() => {
    if (matches === 10) {
      setIsGameOver(true);
      setShowYouWin(true);
    }
  }, [matches]);

  useEffect(() => {
    if (firstCard !== null && secondCard !== null) {
      setFlipCount((prevCount) => prevCount + 1);
      checkMatch();
    }
  }, [firstCard, secondCard, checkMatch, matches]);

  const resetGame = () => {
    setIsGameOver(false);
    setMatches(0);
    setTimeLeft(120);
    setFirstCard(null);
    setSecondCard(null);
    setLostAlertShown(false);
    setShowYouWin(false);
    setShowYouLose(false);
    createCards();
    setFlipCount(0);
  };

  const handlePlayButtonClick = () => {
    startTimer();
    setGameStarted(true);
    setFlipCount(0);
    setPlayButtonClicked(true);
  };

  return (
    <div className="App">
      <Title />
      <section className="game-container">
        {showYouWin && <div className="you-win">You Win!👌</div>}
        {showYouLose && <div className="you-lose">You Lose! 🥹</div>}
        {!showYouWin && !showYouLose && (
          <>
            <Board cards={cards} onCardClick={flipCard} />

            <div className="button-container"></div>
          </>
        )}
        <div className="game-nav">
          <div>Flips: {flipCount}</div> {/* Display flip count */}
          <Timer timeLeft={timeLeft} isGameOver={isGameOver} />
          <button onClick={handlePlayButtonClick} disabled={playButtonClicked}>
            Play
          </button>
          <button onClick={resetGame}>Restart</button>
        </div>
      </section>
    </div>
  );
};

export default App;
