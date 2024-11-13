import React, { useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import GameGrid from './components/GameGrid';
import { useDispatch, useSelector } from 'react-redux';
import { selectCode } from './slices/sessionSlice';
import { selectPlayerPosition } from './slices/playerSlice';
import PlayButton from '../MainPage/components/PlayButton';
import { WebSocketActionType } from './utils/enums';
import { createNewSession, selectId } from './slices/sessionSlice';
import { AppDispatch } from 'store';
import { useNavigate, useParams } from 'react-router-dom';

const MainPage: React.FC = () => {
  const playerPosition = useSelector(selectPlayerPosition);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id?: string }>();
  const sessionId = useSelector(selectId);
  const code = useSelector(selectCode);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch({ type: WebSocketActionType.SOCKET_CONNECT });
    if (id === undefined) {
      dispatch(createNewSession());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (sessionId && id === undefined) {
      // Navigate to the URL with the new session ID
      navigate(`/game/${sessionId}`);
    }
  }, [sessionId, id, navigate]);



  const handlePlayClick = () => {
    console.log(code);
    dispatch({ type: WebSocketActionType.SOCKET_SEND, socketMsg: { type: 'code', code: code } });
  };

  return (
    <div className="grid grid-cols-2">
      <div className="col-start-1 col-end-2 p-4">
        <PlayButton onClick={handlePlayClick} />
        <CodeEditor sessionId={id} />
      </div>
      <div className="col-start-2 col-end-3 p-4">
        <GameGrid cubePositions={playerPosition} />
      </div>
    </div>
  );
};

export default MainPage;
