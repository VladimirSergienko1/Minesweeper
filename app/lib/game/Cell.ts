import {CellData, CellState} from "@/app/lib/game/types";

export class Cell implements CellData {
    row: number;
    col: number;
    isMine: boolean;
    state: CellState;
    adjacentMines: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.isMine = false;
        this.state = 'hidden';
        this.adjacentMines = 0;
    }

    reveal(): boolean {
        if (this.state !== 'hidden') return false;
        this.state = 'revealed';
        return true;
    }

    toggleFlag(): boolean {
        if (this.state === 'revealed') return false;
        this.state = this.state === 'flagged' ? 'hidden' : 'flagged';
        return true;
    }

    reset(): void {
        this.isMine = false;
        this.state = 'hidden';
        this.adjacentMines = 0;
    }
}
