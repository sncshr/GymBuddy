@echo off
echo This script will help you move the GymBuddyMobile project to a shorter path.
echo Current path: %CD%
echo.
echo The build is failing due to Windows path length limitations.
echo.
set /p new_path="Enter a shorter path (e.g., C:\Projects\GymBuddy): "

if not exist "%new_path%" mkdir "%new_path%"

echo.
echo Moving project to %new_path%...
xcopy /E /I /H /Y "%CD%" "%new_path%"

echo.
echo Project moved to %new_path%
echo Please navigate to the new location and try building again.
echo.
pause 