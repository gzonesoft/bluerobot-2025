@echo off
echo Starting BlueRobot QuadAlign X Admin Panel...
echo.
cd /d C:\project\bluerobot\002
echo Current directory: %cd%
echo.
echo Starting HTTP server on port 8001...
echo Access URL: http://localhost:8001
echo.
echo Test Accounts:
echo - Admin: admin@bluerobot.co.kr / admin123!
echo - Marketing: marketing@bluerobot.co.kr / marketing123!
echo - Sales: sales@bluerobot.co.kr / sales123!
echo.
echo Press Ctrl+C to stop the server
echo.
timeout /t 2 /nobreak >nul
start http://localhost:8001
python -m http.server 8001
pause