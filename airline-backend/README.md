# Airline Reservation System - Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env` (already done)
- Update database credentials if needed

3. Start the server:
```bash
npm run dev  # Development with auto-reload
npm start    # Production
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/search?from=&to=&date=` - Search flights
- `GET /api/flights/:id` - Get flight by ID
- `POST /api/flights` - Create flight (admin)
- `PUT /api/flights/:id` - Update flight (admin)
- `DELETE /api/flights/:id` - Delete flight (admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/reference/:reference` - Get booking by reference
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id/checkin` - Check-in
- `PATCH /api/bookings/:id/cancel` - Cancel booking

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Database Schema

See `schema.sql` for complete database structure.

## Server runs on
`http://localhost:5000`
