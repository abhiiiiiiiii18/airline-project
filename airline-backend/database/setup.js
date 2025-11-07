import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Setting up database...');
    
    // Read and execute schema.sql
    const schemaSQL = fs.readFileSync(join(__dirname, 'schema.sql'), 'utf8');
    await client.query(schemaSQL);
    
    console.log('✅ Database schema created successfully');
    console.log('✅ Sample data inserted');
    
    // Verify tables
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('\n📋 Created tables:');
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
    // Check flights count
    const flightsCount = await client.query('SELECT COUNT(*) FROM flights');
    console.log(`\n✈️  Flights in database: ${flightsCount.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase();
