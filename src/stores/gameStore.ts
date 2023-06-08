import { create } from 'zustand';

interface GameStore {
    hasStarted: boolean;
    startGame: () => void;
    stopGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
    hasStarted: false,
    startGame: () => set({ hasStarted: true }),
    stopGame: () => set({ hasStarted: false }),
}));
