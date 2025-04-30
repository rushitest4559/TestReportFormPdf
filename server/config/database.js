// backend/config/database.js
import { connect } from 'mongoose';
import { config } from 'dotenv';

config(); // Load environment variables from .env file (if you haven't already)

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;