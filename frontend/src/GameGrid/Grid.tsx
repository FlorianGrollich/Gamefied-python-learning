import React from 'react';
import Cell from './Cell';
import useFetchGrid from "./hooks/useGameGrid";

const Grid: React.FC = () => {
    const {gridData, loading, error} = useFetchGrid("http://localhost:3200/api/grid/initial");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error?.message}</div>;
    if (!gridData) return <div>No grid data</div>;

    return (
        <div className="bg-slate-800">
            <div className="p-8 mt-16 rounded-2xl m-16 bg-slate-950 inline-block">
                {gridData.map((row, rowIndex) => (
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
