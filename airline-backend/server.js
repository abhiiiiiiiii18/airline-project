import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import flightRoutes from './routes/flights.js';
import bookingRoutes from './routes/bookings.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

dotenv.config();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('⚠️ Uncaught Exception:', error);
});

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Airline API is running' });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🌐 Server is also accessible on http://0.0.0.0:${PORT}`);
  console.log(`📡 Listening on all network interfaces`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please close the other application or use a different port.`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

// Keep the process alive
setInterval(() => {
  // This interval keeps the Node.js event loop running
}, 1000);
