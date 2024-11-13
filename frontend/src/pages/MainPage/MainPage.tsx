import React, { useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import GameGrid from './components/GameGrid';
import { useDispatch, useSelector } from 'react-redux';
import { selectCode } from './slices/codeSlice';
import { selectPlayerPosition } from './slices/playerSlice';
import PlayButton from '../MainPage/components/PlayButton';
import { WebSocketActionType } from './utils/enums';
import { createNewSession } from './slices/sessionSlice';
import { AppDispatch } from 'store';
import { useParams } from 'react-router-dom';

const MainPage: React.FC = () => {
  const playerPosition = useSelector(selectPlayerPosition);
  const dispatch = useDispatch<AppDispatch>();
  const code = useSelector(selectCode);
  const { id } = useParams<{ id?: string }>();


  useEffect(() => {
    if (id === undefined) {
      dispatch(createNewSession());
    } else {
    }

    dispatch({ type: WebSocketActionType.SOCKET_CONNECT });
  }, []);

  const handlePlayClick = () => {
    console.log(code);
    dispatch({ type: WebSocketActionType.SOCKET_SEND, socketMsg: { type: 'code', code: code } });
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
