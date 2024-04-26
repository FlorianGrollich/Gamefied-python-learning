import React, { useEffect, useState } from 'react'
import CodeEditor from './components/CodeEditor'
import GameGrid from './components/GameGrid'
import {useDispatch, useSelector} from 'react-redux'
import { selectCode } from './slices/codeSlice'
import {move, selectPlayerPosition} from "./slices/playerSlice";

const MainPage: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const playerPosition = useSelector(selectPlayerPosition);
  const dispatch = useDispatch();
  const code = useSelector(selectCode)
  useEffect(() => {
    const socket = new WebSocket(`${process.env.REACT_APP_WS_URL}`)

    socket.addEventListener('open', function (event) {})

    socket.addEventListener('message', function (event) {
      console.log('Message from server: ', event.data)
      if (event.data === 'Move') {
        dispatch(move())
      }
    })

    setSocket(socket)

    return () => socket.close()
  }, [])

  return (
    <div className="grid grid-cols-2">
      <div className="col-start-1 col-end-2 p-4">
        <button
          className="h-20 w-20 bg-white text-black hover:text-white hover:bg-black"
          onClick={() => {
            if (socket) {
              console.log(code)
              socket.send(code)
            }
          }}
        >
          Play
        </button>
        <CodeEditor />
      </div>
      <div className="col-start-2 col-end-3 p-4">
        <GameGrid cubePositions={playerPosition} />
      </div>
    </div>
  )
}

export default MainPage
