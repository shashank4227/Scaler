# PowerShell script to start Aiven MySQL service
# This script uses Aiven CLI to start the paused service

# Configuration - Update these with your Aiven details
$PROJECT_NAME = "default"  # Replace with your Aiven project name
$SERVICE_NAME = "mysql-38ea5d17-shashank4227-1249"  # Your service name (without .f.aivencloud.com)

# Check if Aiven CLI is installed
if (-not (Get-Command avn -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Aiven CLI is not installed!" -ForegroundColor Red
    Write-Host "Install it from: https://github.com/aiven/aiven-client" -ForegroundColor Yellow
    Write-Host "Or run: pip install aiven-client" -ForegroundColor Yellow
    exit 1
}

Write-Host "Checking Aiven service status..." -ForegroundColor Cyan

# Check if already logged in, if not, prompt for login
$loginStatus = avn user info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Not logged in to Aiven CLI. Please login first:" -ForegroundColor Yellow
    Write-Host "   avn user login" -ForegroundColor White
    exit 1
}

# Check service status
Write-Host "Checking status of service: $SERVICE_NAME" -ForegroundColor Cyan
$status = avn service get $SERVICE_NAME --project $PROJECT_NAME --format json 2>&1 | ConvertFrom-Json

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Service not found or access denied" -ForegroundColor Red
    Write-Host "   Make sure PROJECT_NAME and SERVICE_NAME are correct in this script" -ForegroundColor Yellow
    exit 1
}

$serviceState = $status.state

if ($serviceState -eq "RUNNING") {
    Write-Host "✅ Service is already running!" -ForegroundColor Green
    exit 0
}

if ($serviceState -eq "PAUSED" -or $serviceState -eq "POWEROFF") {
    Write-Host "⚠️  Service is $serviceState. Starting service..." -ForegroundColor Yellow
    avn service start $SERVICE_NAME --project $PROJECT_NAME
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Service start command sent successfully!" -ForegroundColor Green
        Write-Host "⏳ Waiting for service to start (this may take 1-3 minutes)..." -ForegroundColor Cyan
        
        # Wait for service to become RUNNING (max 5 minutes)
        $maxWait = 300  # 5 minutes
        $elapsed = 0
        $interval = 10  # Check every 10 seconds
        
        while ($elapsed -lt $maxWait) {
            Start-Sleep -Seconds $interval
            $elapsed += $interval
            
            $status = avn service get $SERVICE_NAME --project $PROJECT_NAME --format json 2>&1 | ConvertFrom-Json
            if ($status.state -eq "RUNNING") {
                Write-Host "✅ Service is now RUNNING!" -ForegroundColor Green
                Write-Host "🌐 Hostname: $($status.service_uri_params.host)" -ForegroundColor Cyan
                Write-Host "🔌 Port: $($status.service_uri_params.port)" -ForegroundColor Cyan
                exit 0
            }
            
            Write-Host "   Status: $($status.state) (waited $elapsed seconds)..." -ForegroundColor Gray
        }
        
        Write-Host "⚠️  Service is starting but not yet RUNNING after 5 minutes" -ForegroundColor Yellow
        Write-Host "   Check Aiven dashboard for current status" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Failed to start service" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⚠️  Service is in state: $serviceState" -ForegroundColor Yellow
    Write-Host "   Cannot auto-start from this state. Check Aiven dashboard." -ForegroundColor Yellow
    exit 1
}
