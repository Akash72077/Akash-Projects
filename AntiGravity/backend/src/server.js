import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/database.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import contractorRoutes from './routes/contractorRoutes.js';
import userRoutes from './routes/userRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Connect to MongoDB Atlas
connectDB();

// CORS — allow frontend origin
app.use(
  cors({
    origin: [CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Request body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serve uploaded static images
const uploadsDir = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/contractors', contractorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root redirect
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'CivicVerify Backend API v2.0',
    documentation: 'See README.md for API endpoint reference',
    health: '/api/health',
  });
});

// Error handlers — must be last
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║   CivicVerify Backend API — Running on Port ${PORT}    ║
║   Environment: ${(process.env.NODE_ENV || 'development').padEnd(33)}║
║   Health Check: http://localhost:${PORT}/api/health    ║
║   CORS Origin:  ${CLIENT_URL.padEnd(36)}║
╚══════════════════════════════════════════════════════╝
  `);
});

export default app;
