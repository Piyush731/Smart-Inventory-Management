#!/bin/bash

# Build and start all services
echo "Building and starting all services..."
docker-compose up -d --build

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 30

# Check if all services are running
echo "Checking service status..."
docker-compose ps

# Print access information
echo "
Application deployed successfully!

Access the application at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

To stop the application, run:
docker-compose down
" 