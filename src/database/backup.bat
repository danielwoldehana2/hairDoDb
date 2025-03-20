@echo off
:: Get current date and time for filename
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YYYY=%dt:~0,4%"
set "MM=%dt:~4,2%"
set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%"
set "Min=%dt:~10,2%"
set "Sec=%dt:~12,2%"

set "timestamp=%YYYY%%MM%%DD%_%HH%%Min%%Sec%"

:: Set paths
set "BACKUP_DIR=%~dp0backups"
set "BACKUP_FILE=%BACKUP_DIR%\hairdo_db_%timestamp%.sql"
set "MYSQLDUMP=C:\Program Files\MariaDB 11.7\bin\mysqldump.exe"

:: Create backup directory if it doesn't exist
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

:: Perform the backup
"%MYSQLDUMP%" -u hairdo_user -p"hairdo_user22" hairdo_db > "%BACKUP_FILE%"

:: Display completion message
echo Backup completed: %BACKUP_FILE%

:: To Run
:: cd into ~/src/ReactNative-CLI/HairDo-DB/hairDoDb/src/database
:: run -> ./backup.bat