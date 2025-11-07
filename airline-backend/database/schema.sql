-- Airline Reservation System Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Flights table
CREATE TABLE IF NOT EXISTS flights (
    id SERIAL PRIMARY KEY,
    flight_number VARCHAR(10) UNIQUE NOT NULL,
    airline VARCHAR(100) NOT NULL,
    from_airport VARCHAR(100) NOT NULL,
    to_airport VARCHAR(100) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    available_seats INTEGER NOT NULL,
    total_seats INTEGER NOT NULL,
    aircraft_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    flight_id INTEGER REFERENCES flights(id) ON DELETE CASCADE,
    booking_reference VARCHAR(10) UNIQUE NOT NULL,
    passenger_name VARCHAR(200) NOT NULL,
    passenger_email VARCHAR(255) NOT NULL,
    passenger_phone VARCHAR(20),
    num_passengers INTEGER DEFAULT 1,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed',
    seat_number VARCHAR(10),
    checked_in BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample flights
INSERT INTO flights (flight_number, airline, from_airport, to_airport, departure_time, arrival_time, price, available_seats, total_seats, aircraft_type, status)
VALUES
    ('AI-2156', 'Air India', 'Delhi (DEL)', 'Mumbai (BOM)', CURRENT_DATE + INTERVAL '2 days' + TIME '06:00', CURRENT_DATE + INTERVAL '2 days' + TIME '08:30', 4500.00, 150, 180, 'Boeing 737', 'scheduled'),
    ('6E-3421', 'IndiGo', 'Mumbai (BOM)', 'Bangalore (BLR)', CURRENT_DATE + INTERVAL '1 day' + TIME '09:15', CURRENT_DATE + INTERVAL '1 day' + TIME '11:00', 3800.00, 120, 150, 'Airbus A320', 'scheduled'),
    ('SG-8745', 'SpiceJet', 'Bangalore (BLR)', 'Delhi (DEL)', CURRENT_DATE + INTERVAL '3 days' + TIME '14:30', CURRENT_DATE + INTERVAL '3 days' + TIME '17:00', 5200.00, 100, 150, 'Boeing 737', 'scheduled'),
    ('UK-5432', 'Vistara', 'Delhi (DEL)', 'Goa (GOI)', CURRENT_DATE + INTERVAL '2 days' + TIME '11:00', CURRENT_DATE + INTERVAL '2 days' + TIME '13:30', 6500.00, 80, 100, 'Airbus A321', 'scheduled'),
    ('AI-9876', 'Air India', 'Mumbai (BOM)', 'Delhi (DEL)', CURRENT_DATE + INTERVAL '1 day' + TIME '16:45', CURRENT_DATE + INTERVAL '1 day' + TIME '19:00', 4800.00, 140, 180, 'Boeing 787', 'scheduled'),
    ('6E-7834', 'IndiGo', 'Bangalore (BLR)', 'Hyderabad (HYD)', CURRENT_DATE + INTERVAL '2 days' + TIME '07:30', CURRENT_DATE + INTERVAL '2 days' + TIME '08:30', 2500.00, 130, 150, 'Airbus A320', 'scheduled'),
    ('SG-4521', 'SpiceJet', 'Delhi (DEL)', 'Kolkata (CCU)', CURRENT_DATE + INTERVAL '4 days' + TIME '12:00', CURRENT_DATE + INTERVAL '4 days' + TIME '14:30', 4200.00, 110, 150, 'Boeing 737', 'scheduled'),
    ('UK-1234', 'Vistara', 'Mumbai (BOM)', 'Chennai (MAA)', CURRENT_DATE + INTERVAL '3 days' + TIME '18:00', CURRENT_DATE + INTERVAL '3 days' + TIME '20:15', 5500.00, 90, 120, 'Airbus A320', 'scheduled')
ON CONFLICT (flight_number) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_flights_departure ON flights(departure_time);
CREATE INDEX IF NOT EXISTS idx_flights_route ON flights(from_airport, to_airport);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_flight ON bookings(flight_id);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(booking_reference);
