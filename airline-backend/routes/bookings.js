import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, f.flight_number, f.airline, f.from_airport, f.to_airport, 
             f.departure_time, f.arrival_time
      FROM bookings b
      JOIN flights f ON b.flight_id = f.id
      ORDER BY b.booking_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get bookings by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(`
      SELECT b.*, f.flight_number, f.airline, f.from_airport, f.to_airport, 
             f.departure_time, f.arrival_time
      FROM bookings b
      JOIN flights f ON b.flight_id = f.id
      WHERE b.user_id = $1
      ORDER BY b.booking_date DESC
    `, [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get booking by reference
router.get('/reference/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    const result = await pool.query(`
      SELECT b.*, f.flight_number, f.airline, f.from_airport, f.to_airport, 
             f.departure_time, f.arrival_time, u.email, u.phone
      FROM bookings b
      JOIN flights f ON b.flight_id = f.id
      JOIN users u ON b.user_id = u.id
      WHERE b.booking_reference = $1
    `, [reference]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new booking
router.post('/', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { user_id, flight_id, passenger_name, seat_number, total_price } = req.body;
    
    // Generate booking reference
    const booking_reference = 'BKG' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Check if flight has available seats
    const flightCheck = await client.query(
      'SELECT available_seats FROM flights WHERE id = $1',
      [flight_id]
    );
    
    if (flightCheck.rows.length === 0) {
      throw new Error('Flight not found');
    }
    
    if (flightCheck.rows[0].available_seats <= 0) {
      throw new Error('No available seats');
    }
    
    // Create booking
    const bookingResult = await client.query(
      `INSERT INTO bookings (user_id, flight_id, booking_reference, passenger_name, seat_number, total_price, status) 
       VALUES ($1, $2, $3, $4, $5, $6, 'Confirmed') RETURNING *`,
      [user_id, flight_id, booking_reference, passenger_name, seat_number, total_price]
    );
    
    // Update available seats
    await client.query(
      'UPDATE flights SET available_seats = available_seats - 1 WHERE id = $1',
      [flight_id]
    );
    
    await client.query('COMMIT');
    
    res.status(201).json(bookingResult.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  } finally {
    client.release();
  }
});

// Check-in
router.patch('/:id/checkin', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'UPDATE bookings SET checked_in = true WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel booking
router.patch('/:id/cancel', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    
    // Get booking details
    const bookingResult = await client.query(
      'SELECT * FROM bookings WHERE id = $1',
      [id]
    );
    
    if (bookingResult.rows.length === 0) {
      throw new Error('Booking not found');
    }
    
    const booking = bookingResult.rows[0];
    
    // Update booking status
    await client.query(
      'UPDATE bookings SET status = $1 WHERE id = $2',
      ['Cancelled', id]
    );
    
    // Restore available seats
    await client.query(
      'UPDATE flights SET available_seats = available_seats + 1 WHERE id = $1',
      [booking.flight_id]
    );
    
    await client.query('COMMIT');
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  } finally {
    client.release();
  }
});

export default router;
