import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 PocketPilot API is running!',
    version: '1.0.0'
  });
});

// Start server
const PORT = process.env.PORT || 5000; // Get PORT from .env file, or use 5000 if not set
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

