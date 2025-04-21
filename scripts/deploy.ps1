# Check prerequisites
Write-Host "Checking prerequisites..."
$requiredCommands = @("docker", "docker-compose")
foreach ($cmd in $requiredCommands) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        Write-Error "$cmd is not installed or not in PATH. Please install it and try again."
        exit 1
    }
}

# Check if docker-compose.yml exists
if (-not (Test-Path "docker-compose.yml")) {
    Write-Error "docker-compose.yml not found in current directory"
    exit 1
}

# Build and start all services
Write-Host "Building and starting all services..."
try {
    docker-compose up -d --build
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to build and start services"
    }
} catch {
    Write-Error "Error building and starting services: $_"
    exit 1
}

# Wait for services to be ready
Write-Host "Waiting for services to be ready..."
Start-Sleep -Seconds 30

# Check if all services are running
Write-Host "Checking service status..."
try {
    $services = docker-compose ps --format "{{.Name}} {{.Status}}"
    if (-not $services) {
        throw "No services are running"
    }
    Write-Host "Running services:"
    $services | ForEach-Object { Write-Host "  $_" }
} catch {
    Write-Error "Error checking service status: $_"
    exit 1
}

# Print access information
Write-Host @"
Application deployed successfully!

Access the application at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

To stop the application, run:
docker-compose down
"@ 