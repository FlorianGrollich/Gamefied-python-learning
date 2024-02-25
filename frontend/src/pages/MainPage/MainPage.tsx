import React from "react";
import CodeEditor from "./components/CodeEditor";
import GameGrid from "./components/GameGrid";

const MainPage: React.FC = () => {
    return (
        <div className="grid grid-cols-2">
            <div className="col-start-1 col-end-2 p-4">
                    <CodeEditor />
            </div>
            <div className="col-start-2 col-end-3 p-4">
                <GameGrid />

            </div>
        </div>
    )
}

export default MainPage;