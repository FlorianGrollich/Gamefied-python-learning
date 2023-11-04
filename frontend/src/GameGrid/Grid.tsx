import React from 'react';
import Cell from './Cell';
import Navbar from "../Navbar/Navbar";

interface GridProps {
    gridArray: string[][];
}

const Grid: React.FC<GridProps> = ({gridArray}) => {
    return (
        <div className="bg-slate-800">
            <Navbar />
            <div className="p-8 mt-16 rounded-2xl m-16 bg-slate-950 inline-block">
                {gridArray.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((char, cellIndex) => (
                            <Cell key={cellIndex} char={char}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Grid;
