import { useEffect, useState } from 'react';
import { useGameStore } from '../stores/gameStore';

interface IGame {
    maxNumber: number;
}

function GameArea({ maxNumber }: IGame) {
    const [countdown, setCountdown] = useState(3);
    const [gameTime, setGameTime] = useState(23);
    const [answer, setAnswer] = useState(0);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');

    const { stopGame } = useGameStore();

    useEffect(() => {
        if (answer === 0) setAnswer(Math.floor(Math.random() * 30) + 1);

        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        const gameTimeInterval = setInterval(() => {
            setGameTime((prevTime) => prevTime - 1);
        }, 1000);

        if (countdown === 0) {
            clearInterval(countdownInterval);
        }

        if (gameTime === 0) {
            clearInterval(gameTimeInterval);
            if (answer === parseInt(guess)) {
                setMessage('Congratulations! You guessed the correct number!');
            } else {
                setMessage(
                    `Time's up. The correct number was ${answer}. Game over.`
                );
            }

            setGuess(answer.toString());
        }

        return () => {
            clearInterval(countdownInterval);
            clearInterval(gameTimeInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown, gameTime]);

    const handleGuess = () => {
        const parsedGuess = parseInt(guess);

        if (isNaN(parsedGuess)) {
            setMessage('Please enter a valid number.');
        } else if (parsedGuess < 1 || parsedGuess > maxNumber) {
            setMessage(`Please enter a number between 1 and ${maxNumber}.`);
        } else {
            if (parsedGuess === answer) {
                setMessage('Congratulations! You guessed the correct number!');
                setGameTime(0);
            } else if (parsedGuess < answer) {
                setMessage('Too low! Try a higher number.');
                setGuess('');
            } else {
                setMessage('Too high! Try a lower number.');
                setGuess('');
            }
        }
    };

    return (
        <div className='flex flex-col items-center justify-center gap-5 p-10 text-lg'>
            {countdown > 0 ? (
                <div className='text-4xl font-bold'>{countdown}</div>
            ) : (
                <>
                    <h2 className='text-4xl'>
                        Guess the Number (1-{maxNumber})
                    </h2>
                    <div>Time: {gameTime}</div>
                    <input
                        type='text'
                        placeholder='?'
                        value={guess}
                        disabled={gameTime === 0}
                        onChange={(e) => setGuess(e.target.value)}
                        className='w-32 bg-zinc-800 px-2 py-5 text-center text-6xl placeholder-zinc-700 outline-offset-4 focus:outline'
                    />
                    {gameTime > 0 && (
                        <button
                            onClick={handleGuess}
                            disabled={gameTime === 0}
                            className='border-2 px-5 py-2 text-xl hover:bg-zinc-100 hover:text-zinc-950 active:translate-y-2'
                        >
                            Submit
                        </button>
                    )}
                    {gameTime === 0 && (
                        <button
                            onClick={() => stopGame()}
                            className='border-2 px-5 py-2 text-xl hover:bg-zinc-100 hover:text-zinc-950 active:translate-y-2'
                        >
                            Back
                        </button>
                    )}
                    <div>{message}</div>
                </>
            )}
        </div>
    );
}

export default GameArea;
