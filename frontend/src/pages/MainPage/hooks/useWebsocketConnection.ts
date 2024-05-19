import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {connectWebSocket, disconnectWebSocket} from "../middleware/websocketMiddleware";

const useWebSocketConnection = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectWebSocket());

        return () => {
            dispatch(disconnectWebSocket());
        };
    }, [dispatch]);
}

export default useWebSocketConnection;