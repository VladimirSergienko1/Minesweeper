import React, { memo } from 'react';
import { CellData } from '@/app/lib/game/types';

interface CellProps {
  cell: CellData;
  onReveal: (row: number, col: number) => void;
  onFlag: (row: number, col: number) => void;
  onRevealAdjacent: (row: number, col: number) => void;
  isGameOver: boolean;
}

export const Cell = memo(function Cell({
  cell,
  onReveal,
  onFlag,
  onRevealAdjacent,
  isGameOver,
}: CellProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isGameOver) return;

    if (e.button === 0) {
      onReveal(cell.row, cell.col);
    } else if (e.button === 1) {
      onRevealAdjacent(cell.row, cell.col);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isGameOver) return;

    onFlag(cell.row, cell.col);
  };

  const getCellContent = () => {
    if (cell.state === 'flagged') {
      return '🚩';
    }

    if (cell.state === 'revealed') {
      if (cell.isMine) {
        return '💣';
      }
      if (cell.adjacentMines > 0) {
        return cell.adjacentMines.toString();
      }
    }

    return '';
  };

  const getCellClassName = () => {
    const base =
      'w-8 h-8 border border-gray-400 flex items-center justify-center text-sm font-bold cursor-pointer select-none';

    if (cell.state === 'revealed') {
      if (cell.isMine) {
        return `${base} bg-red-500 text-white`;
      }
      return `${base} bg-gray-200 text-${getNumberColor()}`;
    }

    if (cell.state === 'flagged') {
      return `${base} bg-gray-300`;
    }

    return `${base} bg-gray-300 hover:bg-gray-400`;
  };

  const getNumberColor = () => {
    const colors = [
      '',
      'blue-600',
      'green-600',
      'red-600',
      'purple-600',
      'yellow-600',
      'pink-600',
      'gray-900',
      'gray-900',
    ];
    return colors[cell.adjacentMines] || 'gray-900';
  };

  return (
    <button
      className={getCellClassName()}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onMouseDown={(e) => e.button === 1 && e.preventDefault()}
      disabled={isGameOver && cell.state === 'hidden'}
    >
      {getCellContent()}
    </button>
  );
});
