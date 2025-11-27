@echo off
echo Starting Event Management System...

:: Start the backend server
cd server
start "Backend Server" cmd /k "npm start"

:: Start the frontend development server
cd ../client
start "Frontend Server" cmd /k "npm run dev"

echo Both servers started. Check the new command prompt windows for logs.
pause