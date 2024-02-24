import React from "react";
import CodeEditor from "./components/CodeEditor";

const MainPage: React.FC = () => {
    return (
        <div className="grid grid-cols-2">
            <div className="col-start-1 col-end-2 p-4">
                    <CodeEditor />
            </div>
            <div>

            </div>
        </div>
    )
}

export default MainPage;