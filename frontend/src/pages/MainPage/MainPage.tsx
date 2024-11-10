import React, { useEffect, useState } from 'react';
import CodeEditor from './components/CodeEditor';
import GameGrid from './components/GameGrid';
import { useDispatch, useSelector } from 'react-redux';
import { selectCode } from './slices/codeSlice';
import { doActions, selectPlayerPosition } from './slices/playerSlice';
import PlayButton from '../MainPage/components/PlayButton';
import { WebSocketActionType, WebSocketEventType } from './utils/enums';

const MainPage: React.FC = () => {
  const playerPosition = useSelector(selectPlayerPosition);
  const dispatch = useDispatch();
  const code = useSelector(selectCode);

  useEffect(() => {
    dispatch({type: WebSocketActionType.SOCKET_CONNECT});
  }, []);

  const handlePlayClick = () => {
    console.log(code);
  };

  return (
    <div className="grid grid-cols-2">
      <div className="col-start-1 col-end-2 p-4">
        <PlayButton onClick={handlePlayClick} />
        <CodeEditor />
      </div>
      <div className="col-start-2 col-end-3 p-4">
        <GameGrid cubePositions={playerPosition} />
      </div>
    </div>
  );
};

export default MainPage;
