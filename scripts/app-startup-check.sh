#!/bin/bash

echo "Starting the application..."
npm start &

APP_PID=$!
echo "Application started with PID: $APP_PID"

sleep 10

curl -fs http://localhost:3000 > /dev/null 

if [ $? -ne 0 ]; then
    echo "Error: Application failed to start"
    kill $APP_PID
    exit 2
fi

echo "Application is running and endpoint reachable!"
wait $APP_PID
