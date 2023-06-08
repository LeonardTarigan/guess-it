import { useState } from 'react';
import { GameLevel } from './utils/enums';
import GameArea from './components/GameArea';
import { useGameStore } from './stores/gameStore';

function App() {
    const { hasStarted, startGame } = useGameStore();
    const { Easy, Medium, Hard } = GameLevel;

    const [currentDifficulty, setCurrentDifficulty] = useState<GameLevel>(Easy);

    const maxNumbers = {
        [Easy]: 30,
        [Medium]: 60,
        [Hard]: 100,
    };

    return (
        <>
            {!hasStarted && (
                <main className='flex flex-col items-center justify-center gap-10 p-10'>
                    <h1 className='text-5xl'>Guess the Number</h1>

                    <span className='animate-blink'>
                        Choose Your Difficulty
                    </span>

                    <div className='flex gap-5'>
                        <div
                            onClick={() => setCurrentDifficulty(Easy)}
                            className={`${
                                currentDifficulty === Easy
                                    ? 'bg-green-500 text-zinc-100'
                                    : ''
                            } flex h-44 w-32 cursor-pointer items-center justify-center border-2 border-green-500 text-xl text-green-500 hover:-translate-y-2`}
                        >
                            <span>{Easy}</span>
                        </div>
                        <div
                            onClick={() => setCurrentDifficulty(Medium)}
                            className={`${
                                currentDifficulty === Medium
                                    ? 'bg-yellow-500 text-zinc-100'
                                    : ''
                            } flex h-44 w-32 cursor-pointer items-center justify-center border-2 border-yellow-500 text-xl text-yellow-500 hover:-translate-y-2`}
                        >
                            <span>{Medium}</span>
                        </div>
                        <div
                            onClick={() => setCurrentDifficulty(Hard)}
                            className={`${
                                currentDifficulty === Hard
                                    ? 'bg-rose-500 text-zinc-100'
                                    : ''
                            } flex h-44 w-32 cursor-pointer items-center justify-center border-2 border-rose-500 text-xl text-rose-500 hover:-translate-y-2`}
                        >
                            <span>{Hard}</span>
                        </div>
                    </div>

                    <p>{`Guess a number between 1-${maxNumbers[currentDifficulty]} in 20 seconds`}</p>

                    <button
                        onClick={() => startGame()}
                        className='border-2 px-5 py-2 text-xl hover:bg-zinc-100 hover:text-zinc-950 active:translate-y-2'
                    >
                        Start
                    </button>
                </main>
            )}

            {hasStarted && (
                <GameArea maxNumber={maxNumbers[currentDifficulty]} />
            )}
        </>
    );
}

export default App;
