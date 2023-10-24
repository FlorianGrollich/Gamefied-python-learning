#!/bin/bash

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi

echo "Running npm audit..."
npm audit

if [ $? -ne 0 ]; then
    echo "Security vulnerabilities found!"
fi

echo "Checking for outdated packages..."
npm outdated

echo "Dependency checks passed!"
exit 0
