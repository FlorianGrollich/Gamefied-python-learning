#!/bin/bash

./dependency-check.sh

if [ $? -ne 0 ]; then
    exit 1
fi

./app-startup-check.sh

if [ $? -ne 0 ]; then
    exit 1
fi

echo "All checks passed!"
