# EMEXA Backend Connection Test
Write-Host "=================================================="  -ForegroundColor Cyan
Write-Host "EMEXA Backend Connection Test" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$baseUrl = "http://127.0.0.1:5000"

# Test 1: Health Check
Write-Host "`n1. Testing API Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/" -Method Get -UseBasicParsing
    Write-Host "   Status: SUCCESS" -ForegroundColor Green
    Write-Host "   Message: $($response.message)"
    Write-Host "   Version: $($response.version)"
    Write-Host "   ✅ Backend is running!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Register
Write-Host "`n2. Testing User Registration..." -ForegroundColor Yellow
try {
    $registerData = @{
        fullName = "Test Student"
        email = "test@emexa.com"
        password = "password123"
        accountType = "student"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method Post -Body $registerData -ContentType "application/json" -UseBasicParsing
    Write-Host "   Status: SUCCESS" -ForegroundColor Green
    Write-Host "   Message: $($response.message)"
    Write-Host "   User: $($response.user.full_name) ($($response.user.email))"
    Write-Host "   Token: $($response.token.Substring(0, 20))..."
    Write-Host "   ✅ Registration works!" -ForegroundColor Green
    $global:token = $response.token
} catch {
    $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "   ⚠️ $($errorDetails.message)" -ForegroundColor Yellow
}

# Test 3: Login  
Write-Host "`n3. Testing User Login..." -ForegroundColor Yellow
try {
    $loginData = @{
        email = "test@emexa.com"
        password = "password123"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginData -ContentType "application/json" -UseBasicParsing
    Write-Host "   Status: SUCCESS" -ForegroundColor Green
    Write-Host "   User: $($response.user.full_name) ($($response.user.email))"
    Write-Host "   Token: $($response.token.Substring(0, 20))..."
    Write-Host "   ✅ Login works!" -ForegroundColor Green
} catch {
    $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "   ❌ Error: $($errorDetails.message)" -ForegroundColor Red
}

# Test 4: Forgot Password
Write-Host "`n4. Testing Forgot Password..." -ForegroundColor Yellow
try {
    $forgotData = @{
        email = "test@emexa.com"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/forgot-password" -Method Post -Body $forgotData -ContentType "application/json" -UseBasicParsing
    Write-Host "   Status: SUCCESS" -ForegroundColor Green
    Write-Host "   Message: $($response.message)"
    Write-Host "   ✅ Forgot password works!" -ForegroundColor Green
} catch {
    $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "   ❌ Error: $($errorDetails.message)" -ForegroundColor Red
}

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "Test Complete!" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Check database
Write-Host "`n5. Checking Database..." -ForegroundColor Yellow
if (Test-Path "c:\Users\nipun\Desktop\EMEXA\backend\instance\emexa.db") {
    Write-Host "   ✅ Database file exists: emexa.db" -ForegroundColor Green
    $dbSize = (Get-Item "c:\Users\nipun\Desktop\EMEXA\backend\instance\emexa.db").Length
    Write-Host "   Size: $dbSize bytes"
} else {
    Write-Host "   ❌ Database file not found!" -ForegroundColor Red
}
