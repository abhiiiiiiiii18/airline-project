import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get all flights
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM flights ORDER BY departure_time ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search flights
router.get('/search', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    
    let query = 'SELECT * FROM flights WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (from) {
      query += ` AND from_airport ILIKE $${paramCount}`;
      params.push(`%${from}%`);
      paramCount++;
    }

    if (to) {
      query += ` AND to_airport ILIKE $${paramCount}`;
      params.push(`%${to}%`);
      paramCount++;
    }

    if (date) {
      query += ` AND DATE(departure_time) = $${paramCount}`;
      params.push(date);
      paramCount++;
    }

    query += ' ORDER BY departure_time ASC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get flight by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM flights WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new flight (admin)
router.post('/', async (req, res) => {
  try {
    const { flight_number, airline, from_airport, to_airport, departure_time, arrival_time, price, available_seats } = req.body;
    
    const result = await pool.query(
      `INSERT INTO flights (flight_number, airline, from_airport, to_airport, departure_time, arrival_time, price, available_seats) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [flight_number, airline, from_airport, to_airport, departure_time, arrival_time, price, available_seats]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update flight (admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { flight_number, airline, from_airport, to_airport, departure_time, arrival_time, price, available_seats, status } = req.body;
    
    const result = await pool.query(
      `UPDATE flights 
       SET flight_number = $1, airline = $2, from_airport = $3, to_airport = $4, 
           departure_time = $5, arrival_time = $6, price = $7, available_seats = $8, status = $9
       WHERE id = $10 RETURNING *`,
      [flight_number, airline, from_airport, to_airport, departure_time, arrival_time, price, available_seats, status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete flight (admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM flights WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    
    res.json({ message: 'Flight deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
