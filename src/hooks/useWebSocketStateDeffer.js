import { useEffect, useRef, useState } from "react";

export const useWebSocketState = (wssURL, minSendInterval) => {
    const [state, setState] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const webSocket = useRef(null);
    const minTimeoutRef = useRef(null);

    useEffect(() => {

        webSocket.current = new WebSocket(wssURL);

        webSocket.current.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
            setIsError(false);
            setError(null);
        };

        webSocket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("WebSocket message:", data);
            if (isLoading) setIsLoading(false);
            setState(data);
        };

        webSocket.current.onerror = (error) => {
            console.error("WebSocket error: ", error);
            setIsError(true);
            setError(error);
        };

        webSocket.current.onclose = () => {
            console.log("WebSocket closed");
            setIsConnected(false);
            setIsError(false);
            setError(null);
        };

        return () => {
            if (webSocket.current) webSocket.current.close();
        };
    }, [wssURL]);

    const sendData = useRef((data) => {
        if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
            webSocket.current.send(JSON.stringify(data));
        }
    });

    const updateState = (newState) => {
        if (typeof newState === "function") {
            setState((previousValue) => {
                const newValue = newState(previousValue);
                clearTimeout(minTimeoutRef.current);
                minTimeoutRef.current = setTimeout(() => {
                    sendData.current(newValue);
                }, minSendInterval);
                return newValue;
            });
        } else {
            setState(newState);
            clearTimeout(minTimeoutRef.current);
            minTimeoutRef.current = setTimeout(() => {
                sendData.current(newState);
            }, minSendInterval);
        }
    }

    return [state, updateState, {isConnected, isLoading, isError, error}];
}