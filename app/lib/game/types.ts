export type CellState = 'hidden' | 'revealed' | 'flagged';
export type GameState = 'idle' | 'playing' | 'won' | 'lost';
export type Difficulty = 'beginner' | 'intermediate' | 'expert' | 'custom';

export interface CellData {
    row: number;
    col: number;
    isMine: boolean;
    state: CellState;
    adjacentMines: number;
}

export interface BoardConfig {
    width: number;
    height: number;
    mines: number;
}

export interface GameConfig extends BoardConfig {
    difficulty: Difficulty;
}

export interface GameStats {
    time: number;
    moves: number;
    flagsUsed: number;
}
