@echo off
:: Check if a backup file was provided
if "%~1"=="" (
    echo Please provide a backup file path
    echo Usage: restore.bat backup_file.sql
    exit /b 1
)

:: Set path to MySQL executable
set "MYSQL=C:\Program Files\MariaDB 11.7\bin\mysql.exe"

:: Restore the database
echo Restoring database from %~1
"%MYSQL%" -u hairdo_user -p"hairdo_user22" hairdo_db < "%~1"

:: Display completion message
if %ERRORLEVEL% EQU 0 (
    echo Restore completed successfully
) else (
    echo Restore failed
)

:: To Run
:: cd into ~/src/ReactNative-CLI/HairDo-DB/hairDoDb/src/database
:: run -> ./restore.bat backups/hairdo_db_20240320_104224.sql
:: hairdo_db_20240320_104224.sql should be name of backup file