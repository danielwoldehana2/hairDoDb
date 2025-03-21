const db = require('../utils/db');

async function testConnection() {
  try {
    // Test basic connection
    const connectionTest = await db.query('SELECT 1');
    console.log('\n=== Database Connection Test ===');
    console.log('✅ Basic connection successful!\n');

    // Get current user and database
    const [userInfo] = await db.query(
      'SELECT CURRENT_USER() as user, DATABASE() as database',
    );
    console.log('=== Current Session Info ===');
    console.log('👤 Current User:', userInfo.user);
    console.log('📁 Current Database:', userInfo.database);

    // Get server information
    const [serverInfo] = await db.query('SELECT VERSION() as version');
    console.log('\n=== Server Information ===');
    console.log('🖥️  MariaDB Version:', serverInfo.version);

    // Get server status
    const [{status}] = await db.query('SHOW STATUS LIKE "Uptime"');
    const uptimeHours = Math.floor(status / 3600);
    const uptimeMinutes = Math.floor((status % 3600) / 60);
    console.log(
      '⏱️  Server Uptime:',
      `${uptimeHours} hours, ${uptimeMinutes} minutes`,
    );

    // Get database tables
    const tables = await db.query('SHOW TABLES');
    console.log('\n=== Database Tables ===');
    if (tables.length === 0) {
      console.log('❌ No tables found in current database');
    } else {
      console.log('📋 Available Tables:');
      tables.forEach(table => {
        const tableName = Object.values(table)[0];
        console.log(`   - ${tableName}`);
      });
    }

    // Get database size
    const [dbSize] = await db.query(`
      SELECT 
        table_schema as 'Database',
        ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) as 'Size (MB)'
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      GROUP BY table_schema
    `);
    console.log('\n=== Database Size ===');
    console.log('💾 Size:', dbSize['Size (MB)'] + ' MB');

    console.log('\n=== Connection Pool Status ===');
    const pool = await db.getConnection();
    console.log('✅ Connection pool is active');
    pool.release();

    return true;
  } catch (error) {
    console.error('\n❌ Database Connection Error:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   → Check your database credentials in .env file');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   → Make sure MariaDB server is running');
    }
    return false;
  }
}

// Run the test
console.log('🔍 Starting Database Connection Test...');
testConnection()
  .then(() => console.log('\n✨ Database test completed\n'))
  .catch(err => console.error('\n❌ Test failed with error:', err));
