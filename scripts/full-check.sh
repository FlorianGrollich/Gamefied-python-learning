#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

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

$DIR/dependency-check.sh
if [ $? -ne 0 ]; then
    exit 1
fi

$DIR/app-startup-check.sh &

SERVER_PID=$!

echo "All checks passed! Server is running in the background."

wait
