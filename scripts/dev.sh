#!/bin/bash

# Start the backend services
echo "Starting backend services..."
docker-compose up -d postgres redis zookeeper kafka

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Start the backend application
echo "Starting backend application..."
cd backend
mvn spring-boot:run &
BACKEND_PID=$!

# Start the frontend application
echo "Starting frontend application..."
cd ../frontend
npm start &
FRONTEND_PID=$!

# Function to handle cleanup
cleanup() {
    echo "Stopping applications..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    docker-compose down
    exit 0
}

# Trap SIGINT and SIGTERM signals and call cleanup
trap cleanup SIGINT SIGTERM

# Wait for both processes to finish
wait $BACKEND_PID $FRONTEND_PID 