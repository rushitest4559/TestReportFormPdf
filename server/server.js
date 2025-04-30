// backend/server.js
import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './config/database.js'; // Import the database connection function
import customerRoutes from './routes/customerRoutes.js';
import userRoutes from './routes/userRoutes.js';

config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// Database Connection
connectDB(); // Connect to the database

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});