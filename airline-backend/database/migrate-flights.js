import pg from 'pg';
import dotenv from 'dotenv';
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

// Airlines data for better variety
const airlines = ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'AirAsia India', 'GoAir'];

// Airport codes mapping (common Indian airports)
const airportCodes = {
  'Delhi': 'DEL',
  'Mumbai': 'BOM',
  'Bangalore': 'BLR',
  'Bengaluru': 'BLR',
  'Kolkata': 'CCU',
  'Chennai': 'MAA',
  'Hyderabad': 'HYD',
  'Ahmedabad': 'AMD',
  'Pune': 'PNQ',
  'Kochi': 'COK',
  'Goa': 'GOI',
  'Jaipur': 'JAI',
  'Lucknow': 'LKO',
  'Chandigarh': 'IXC',
  'Thiruvananthapuram': 'TRV',
  'Bhubaneswar': 'BBI',
  'Visakhapatnam': 'VTZ',
  'Varanasi': 'VNS',
  'Udaipur': 'UDR',
  'Indore': 'IDR',
  'Patna': 'PAT',
  'Ranchi': 'IXR',
  'Imphal': 'IMF',
  'Raipur': 'RPR',
  'Mangalore': 'IXE',
  // International
  'Dubai': 'DXB',
  'London': 'LHR',
  'Bangkok': 'BKK',
  'Singapore': 'SIN',
  'Doha': 'DOH',
  'Kathmandu': 'KTM',
  'Colombo': 'CMB'
};

function getAirportCode(cityName) {
  const city = cityName.trim();
  return airportCodes[city] || city.substring(0, 3).toUpperCase();
}

function generateFlightNumber(airportCode) {
  const airline = airlines[Math.floor(Math.random() * airlines.length)];
  const prefix = airline === 'Air India' ? 'AI' : 
                 airline === 'IndiGo' ? '6E' :
                 airline === 'SpiceJet' ? 'SG' :
                 airline === 'Vistara' ? 'UK' :
                 airline === 'AirAsia India' ? 'I5' : 'G8';
  const number = Math.floor(1000 + Math.random() * 9000);
  return { flightNumber: `${prefix}-${number}`, airline };
}

function calculatePrice(from, to, flightType) {
  const basePrice = flightType === 'International' ? 15000 : 3000;
  const variation = Math.random() * 0.4 + 0.8; // 80% to 120%
  return Math.round(basePrice * variation);
}

function getAircraftType(flightType) {
  const domestic = ['Boeing 737', 'Airbus A320', 'ATR 72'];
  const international = ['Boeing 787', 'Airbus A350', 'Boeing 777', 'Airbus A330'];
  const types = flightType === 'International' ? international : domestic;
  return types[Math.floor(Math.random() * types.length)];
}

async function migrateFlights() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Starting Migration...\n');
    
    // Step 1: Backup current flights table
    console.log('📦 Step 1: Creating backup of current flights table...');
    await client.query('DROP TABLE IF EXISTS flights_backup');
    await client.query('CREATE TABLE flights_backup AS SELECT * FROM flights');
    const backupCount = await client.query('SELECT COUNT(*) FROM flights_backup');
    console.log(`✅ Backed up ${backupCount.rows[0].count} existing records\n`);
    
    // Step 2: Clear current flights table (keep structure)
    console.log('🗑️  Step 2: Clearing flights table...');
    await client.query('TRUNCATE TABLE flights RESTART IDENTITY CASCADE');
    console.log('✅ Table cleared\n');
    
    // Step 3: Migrate data from flight + route tables
    console.log('🔄 Step 3: Migrating data from flight + route tables...');
    
    const joinedData = await client.query(`
      SELECT 
        f.flight_id,
        f.arrival_time,
        f.departure_time,
        f.flight_date,
        f.airp_code,
        r.take_off_point,
        r.destination,
        r.a_type
      FROM flight f
      JOIN route r ON f.route_id = r.route_id
      ORDER BY f.flight_id
    `);
    
    console.log(`📊 Found ${joinedData.rows.length} flights to migrate\n`);
    
    let migratedCount = 0;
    let skippedCount = 0;
    
    for (const row of joinedData.rows) {
      try {
        const { flightNumber, airline } = generateFlightNumber(row.airp_code);
        const fromAirportCode = getAirportCode(row.take_off_point);
        const toAirportCode = getAirportCode(row.destination);
        const price = calculatePrice(row.take_off_point, row.destination, row.a_type);
        const aircraftType = getAircraftType(row.a_type);
        
        // Combine date and time into timestamp
        const departureTimestamp = new Date(row.flight_date);
        const [depHours, depMinutes, depSeconds] = row.departure_time.split(':');
        departureTimestamp.setHours(parseInt(depHours), parseInt(depMinutes), parseInt(depSeconds));
        
        const arrivalTimestamp = new Date(row.flight_date);
        const [arrHours, arrMinutes, arrSeconds] = row.arrival_time.split(':');
        arrivalTimestamp.setHours(parseInt(arrHours), parseInt(arrMinutes), parseInt(arrSeconds));
        
        // If arrival is earlier than departure, it's next day
        if (arrivalTimestamp < departureTimestamp) {
          arrivalTimestamp.setDate(arrivalTimestamp.getDate() + 1);
        }
        
        const availableSeats = Math.floor(50 + Math.random() * 150);
        const totalSeats = Math.floor(availableSeats * 1.2);
        
        await client.query(`
          INSERT INTO flights (
            flight_number, airline, from_airport, to_airport,
            departure_time, arrival_time, price, available_seats,
            total_seats, aircraft_type, status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [
          flightNumber,
          airline,
          `${row.take_off_point} (${fromAirportCode})`,
          `${row.destination} (${toAirportCode})`,
          departureTimestamp,
          arrivalTimestamp,
          price,
          availableSeats,
          totalSeats,
          aircraftType,
          'scheduled'
        ]);
        
        migratedCount++;
        
        if (migratedCount % 50 === 0) {
          console.log(`   ⏳ Migrated ${migratedCount} flights...`);
        }
      } catch (err) {
        skippedCount++;
        // Skip duplicates or errors
      }
    }
    
    console.log(`\n✅ Migration completed!`);
    console.log(`   ✔️  Successfully migrated: ${migratedCount} flights`);
    console.log(`   ⚠️  Skipped: ${skippedCount} flights\n`);
    
    // Step 4: Verify migration
    console.log('🔍 Step 4: Verifying migration...');
    const newCount = await client.query('SELECT COUNT(*) FROM flights');
    const sampleFlights = await client.query('SELECT * FROM flights LIMIT 5');
    
    console.log(`✅ Total flights in table: ${newCount.rows[0].count}`);
    console.log('\n📋 Sample migrated flights:');
    console.log('===========================');
    sampleFlights.rows.forEach((flight, idx) => {
      console.log(`\n${idx + 1}. ${flight.flight_number} - ${flight.airline}`);
      console.log(`   Route: ${flight.from_airport} → ${flight.to_airport}`);
      console.log(`   Departure: ${new Date(flight.departure_time).toLocaleString()}`);
      console.log(`   Price: ₹${flight.price}`);
      console.log(`   Aircraft: ${flight.aircraft_type}`);
    });
    
    // Step 5: Get unique cities
    const cities = await client.query(`
      SELECT DISTINCT from_airport as city FROM flights
      UNION
      SELECT DISTINCT to_airport as city FROM flights
      ORDER BY city
    `);
    
    console.log(`\n✈️  Available cities: ${cities.rows.length}`);
    console.log('Cities:', cities.rows.slice(0, 10).map(r => r.city).join(', '), '...\n');
    
    console.log('🎉 Migration completed successfully!');
    console.log('💡 Your old data is safe in "flights_backup" table');
    console.log('💡 Old "flight" and "route" tables are still intact\n');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.log('\n🔄 Rolling back...');
    try {
      await client.query('TRUNCATE TABLE flights');
      await client.query('INSERT INTO flights SELECT * FROM flights_backup');
      console.log('✅ Rollback successful - original data restored');
    } catch (rollbackErr) {
      console.error('❌ Rollback failed:', rollbackErr);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

migrateFlights();
