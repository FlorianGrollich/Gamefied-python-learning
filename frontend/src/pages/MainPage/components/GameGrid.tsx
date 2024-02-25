import React from 'react';
import BananaSVG from "assets/svg_component";

const GameGrid: React.FC = () => {
    const rows = Array.from({length: 16});

    return (
        <div className="bg-slate-800  p-4 rounded-2xl">
            <div className="grid grid-cols-16 grid-rows-16 bg-slate-800 w-full h-screen">
                {rows.map((_, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {rows.map((_, colIndex) => (
                            <div key={colIndex} className="bg-gray-800 border border-gray-700 h-full w-full"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default GameGrid;
