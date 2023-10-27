import React from 'react';
import Cell from './Cell';

interface GridProps {
    gridArray: string[][];
}

const Grid: React.FC<GridProps> = ({ gridArray }) => {
    return (
        <div className="grid">
            {gridArray.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((char, cellIndex) => (
                        <Cell key={cellIndex} char={char} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
