import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Proficiency API 🚀');
});

export default app;