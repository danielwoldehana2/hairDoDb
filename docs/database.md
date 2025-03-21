## Backup and Restore Procedures

### Creating a Backup

```bash
# Run the backup script
./src/database/backup.sh
```

### Restoring from Backup

```bash
# Run the restore script with backup file
./src/database/restore.sh ./backups/hairdo_db_20240320_101735.sql.gz
```

````

4. Add backups directory to .gitignore:
```gitignore
# Database backups
src/database/backups/
````

Would you like me to explain the backup strategy or shall we mark this ticket as complete?
