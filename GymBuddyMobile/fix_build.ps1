Write-Host "GymBuddy Mobile Build Fix Script" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Function to run a command and check its exit code
function Run-Command {
    param (
        [string]$Command,
        [string]$Description
    )
    
    Write-Host "Running: $Description..." -ForegroundColor Yellow
    Invoke-Expression $Command
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Command failed with exit code $LASTEXITCODE" -ForegroundColor Red
        return $false
    }
    
    Write-Host "Command completed successfully" -ForegroundColor Green
    return $true
}

# Step 1: Clean installation
Write-Host "Step 1: Cleaning installation..." -ForegroundColor Cyan

$cleanNodeModules = Read-Host "Do you want to delete node_modules and reinstall? (y/n)"
if ($cleanNodeModules -eq "y") {
    Write-Host "Removing node_modules folder..." -ForegroundColor Yellow
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force "node_modules"
    }
    
    Write-Host "Cleaning npm cache..." -ForegroundColor Yellow
    Run-Command "npm cache clean --force" "Clean npm cache"
    
    Write-Host "Reinstalling dependencies..." -ForegroundColor Yellow
    Run-Command "npm install" "Reinstall dependencies"
}

# Step 2: Clean Android build
Write-Host "Step 2: Cleaning Android build..." -ForegroundColor Cyan

$cleanAndroid = Read-Host "Do you want to clean the Android build? (y/n)"
if ($cleanAndroid -eq "y") {
    Push-Location "android"
    Run-Command ".\gradlew.bat clean" "Clean Android build"
    Pop-Location
}

# Step 3: Try building with shorter paths
Write-Host "Step 3: Building with shorter paths enabled..." -ForegroundColor Cyan
Write-Host "We've already added android.enableShortenPaths=true to gradle.properties" -ForegroundColor Yellow
Write-Host "We've also added reanimated_disable_worklets=true to gradle.properties" -ForegroundColor Yellow
Write-Host "We've also increased memory allocation for Gradle" -ForegroundColor Yellow

$buildAndroid = Read-Host "Do you want to try building the Android app now? (y/n)"
if ($buildAndroid -eq "y") {
    Run-Command "npm run android" "Build Android app"
}

# Step 4: Temporarily remove problematic dependencies
Write-Host "Step 4: Temporarily remove problematic dependencies (if needed)..." -ForegroundColor Cyan
Write-Host "If the build is still failing, you can temporarily remove these dependencies:" -ForegroundColor Yellow
Write-Host "1. react-native-reanimated" -ForegroundColor Yellow
Write-Host "2. react-native-vision-camera" -ForegroundColor Yellow

$removeReanimated = Read-Host "Do you want to temporarily remove react-native-reanimated? (y/n)"
if ($removeReanimated -eq "y") {
    Write-Host "Editing package.json to remove react-native-reanimated..." -ForegroundColor Yellow
    $packageJson = Get-Content "package.json" -Raw
    $packageJson = $packageJson -replace '"react-native-reanimated": "[^"]+",\r?\n', ''
    Set-Content "package.json" $packageJson
    
    Write-Host "Running npm install..." -ForegroundColor Yellow
    Run-Command "npm install" "Reinstall dependencies"
}

$removeVisionCamera = Read-Host "Do you want to temporarily remove react-native-vision-camera? (y/n)"
if ($removeVisionCamera -eq "y") {
    Write-Host "Editing package.json to remove react-native-vision-camera..." -ForegroundColor Yellow
    $packageJson = Get-Content "package.json" -Raw
    $packageJson = $packageJson -replace '"react-native-vision-camera": "[^"]+",\r?\n', ''
    Set-Content "package.json" $packageJson
    
    Write-Host "Running npm install..." -ForegroundColor Yellow
    Run-Command "npm install" "Reinstall dependencies"
}

# Step 5: Enable Windows long paths if needed
Write-Host "Step 5: Enable Windows long paths (if needed)..." -ForegroundColor Cyan
Write-Host "Windows 10 has a feature to enable long path support:" -ForegroundColor Yellow
Write-Host "1. Open Registry Editor (regedit)" -ForegroundColor Yellow
Write-Host "2. Navigate to HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem" -ForegroundColor Yellow
Write-Host "3. Set LongPathsEnabled to 1" -ForegroundColor Yellow
Write-Host "4. Restart your computer" -ForegroundColor Yellow

$enableLongPaths = Read-Host "Do you want to enable long paths in Windows registry? (y/n)"
if ($enableLongPaths -eq "y") {
    Write-Host "Enabling long paths in Windows registry..." -ForegroundColor Yellow
    try {
        Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -Type DWord
        Write-Host "Long paths enabled successfully. Please restart your computer." -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to enable long paths. Please run this script as Administrator or make the change manually." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Build fix script completed. If you're still having issues, please refer to BUILD_FIX.md for more solutions." -ForegroundColor Green 