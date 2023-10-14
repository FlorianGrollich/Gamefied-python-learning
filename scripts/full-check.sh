#!/bin/bash

cleanup() {
    echo "Caught Signal ... shutting down."
    if [ ! -z "$SERVER_PID" ]; then
        if kill -0 $SERVER_PID 2>/dev/null; then
            echo "Killing server process with PID $SERVER_PID"
            kill $SERVER_PID
        else
            echo "No process found with PID $SERVER_PID"
        fi
    fi
    exit 1
}

trap cleanup SIGINT SIGTERM

./dependency-check.sh
if [ $? -ne 0 ]; then
    exit 1
fi

./app-startup-check.sh &

SERVER_PID=$!

echo "All checks passed! Server is running in the background."

wait
