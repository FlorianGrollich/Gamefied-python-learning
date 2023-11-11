import React from 'react';
import Cell from './Cell';
import useFetchGrid from "./hooks/useGameGrid";
import Navbar from "../Navbar/NavBar";
import {useStoreGrid} from "./hooks/useStoreGrid";



const Grid: React.FC = () => {
    const { gridData, loading, error } = useFetchGrid("http://localhost:3200/api/grid/initial");
    const { postData, response, error: postError, isLoading: isPostLoading } = useStoreGrid();

    const handleButtonClick = async () => {
        await postData("http://localhost:3200/api/grid/create", gridData);
    };

    if (loading || isPostLoading) return <div>Loading...</div>;
    if (error || postError) return <div>Error: {error?.message || postError?.message}</div>;
    if (!gridData) return <div>No grid data</div>;

    return (
        <div className="bg-slate-800">
            <div className="p-8 mt-16 rounded-2xl m-16 bg-slate-950 inline-block">
                {gridData.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((char, cellIndex) => (
                            <Cell key={cellIndex} char={char} />
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={handleButtonClick} className="p-2 mt-4 bg-blue-500 text-white rounded">Post Data</button>
            {response && <div>Response: {JSON.stringify(response)}</div>}
        </div>
    );
};

export default Grid;
