import React, {useEffect, useState} from 'react'
import CodeEditor from './components/CodeEditor'
import GameGrid from './components/GameGrid'
import {useDispatch, useSelector} from 'react-redux'
import {selectCode} from './slices/codeSlice'
import {doActions, selectPlayerPosition} from "./slices/playerSlice";
import useWebSocketConnection from "./hooks/useWebsocketConnection";
import {sendMessage} from "../../middleware/websocketMiddleware";



const MainPage: React.FC = () => {
    const playerPosition = useSelector(selectPlayerPosition);
    const dispatch = useDispatch();
    const code = useSelector(selectCode)

    useWebSocketConnection();

    return (
        <div className="grid grid-cols-2">
            <div className="col-start-1 col-end-2 p-4">
                <button
                    className="h-20 w-20 bg-white text-black hover:text-white hover:bg-black"
                    onClick={() => {
                        console.log(code);
                        dispatch(sendMessage(code))
                    }}
                >
                    Play
                </button>
                <CodeEditor/>
            </div>
            <div className="col-start-2 col-end-3 p-4">
                <GameGrid cubePositions={playerPosition}/>
            </div>
        </div>
    )
}

export default MainPage
