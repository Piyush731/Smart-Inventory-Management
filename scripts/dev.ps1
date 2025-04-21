# Check prerequisites
Write-Host "Checking prerequisites..."
$requiredCommands = @("docker", "docker-compose", "mvn", "npm")
foreach ($cmd in $requiredCommands) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        Write-Error "$cmd is not installed or not in PATH. Please install it and try again."
        exit 1
    }
}

# Start the backend services
Write-Host "Starting backend services..."
try {
    docker-compose up -d postgres redis zookeeper kafka
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to start backend services"
    }
} catch {
    Write-Error "Error starting backend services: $_"
    exit 1
}

# Wait for services to be ready
Write-Host "Waiting for services to be ready..."
Start-Sleep -Seconds 10

# Start the backend application
Write-Host "Starting backend application..."
try {
    Set-Location backend
    if (-not (Test-Path "pom.xml")) {
        throw "Backend directory does not contain pom.xml"
    }
    $backendProcess = Start-Process -NoNewWindow -FilePath "mvn" -ArgumentList "spring-boot:run" -PassThru
} catch {
    Write-Error "Error starting backend application: $_"
    exit 1
}

# Start the frontend application
Write-Host "Starting frontend application..."
try {
    Set-Location ../frontend
    if (-not (Test-Path "package.json")) {
        throw "Frontend directory does not contain package.json"
    }
    $frontendProcess = Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start" -PassThru
} catch {
    Write-Error "Error starting frontend application: $_"
    exit 1
}

# Keep the script running and handle cleanup
Write-Host "Press Ctrl+C to stop all services..."
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host "Cleaning up..."
    if ($backendProcess) { Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue }
    if ($frontendProcess) { Stop-Process -Id $frontendProcess.Id -Force -ErrorAction SilentlyContinue }
    docker-compose down
} 