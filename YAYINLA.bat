@echo off
title SBF TERMINAL YAYINLAYICI
echo ===================================================
echo   SBF DIJITAL TERMINAL - YAYINLAMA ARACI
echo ===================================================
echo.
echo [1/2] Firebase oturumu kontrol ediliyor...
echo.
call firebase login
echo.
echo [2/2] Dosyalar yukleniyor...
echo.
call firebase deploy --only hosting
echo.
if %errorlevel% neq 0 (
    echo.
    echo [HATA] Yayinlama sirasinda bir sorun olustu!
    echo Lutfen su komutu manuel calistirin: firebase init
) else (
    echo.
    echo [OK] YAYINLAMA BASARIYLA TAMAMLANDI!
)
echo ===================================================
pause
