import React, {useEffect, useState} from "react";
import CodeEditor from "./components/CodeEditor";
import GameGrid from "./components/GameGrid";
import {useSelector} from "react-redux";
import {selectCode} from "./slices/codeSlice";

const MainPage: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const code = useSelector(selectCode);
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.addEventListener('open', function (event) {
        });

        socket.addEventListener('message', function (event) {
            console.log('Message from server: ', event.data);
        });

        setSocket(socket);

        return () => socket.close();
    }, []);

    return (
        <div className="grid grid-cols-2">
            <div className="col-start-1 col-end-2 p-4">
                <button className="h-20 w-20 bg-white text-black hover:text-white hover:bg-black" onClick={() => {
                    if (socket) {
                        console.log(code)
                        socket.send(code);
                    }
                }}>Play</button>
                <CodeEditor/>
            </div>
            <div className="col-start-2 col-end-3 p-4">
                <GameGrid/>

            </div>
        </div>
    )
}

export default MainPage;