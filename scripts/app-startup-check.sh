#!/bin/bash

echo "Starting the application..."
npm start &

sleep 10

curl -fs http://localhost:3000 > /dev/null 

if [ $? -ne 0 ]; then
    echo "Error: Application failed to start"
    exit 2
fi

echo "Application is running and endpoint reachable!"
exit 0
