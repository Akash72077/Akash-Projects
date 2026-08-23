import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';

import { connectDatabase } from './config/database.js';

import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contractorRoutes from './routes/contractorRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// --------------------------------------------------
// Paths
// --------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// backend/
const backendDir = path.resolve(__dirname, '..');

// --------------------------------------------------
// Load local .env file
// --------------------------------------------------
// Render provides environment variables directly,
// so this is only needed for local development.

function loadEnv() {
  const envPath = path.join(backendDir, '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnv();

// --------------------------------------------------
// Working directory
// --------------------------------------------------

process.chdir(backendDir);

// --------------------------------------------------
// Upload directory
// --------------------------------------------------

const uploadDirectory = path.join(backendDir, 'uploads');

fs.mkdirSync(uploadDirectory, {
  recursive: true
});

// --------------------------------------------------
// Database
// --------------------------------------------------

await connectDatabase();

// --------------------------------------------------
// Express application
// --------------------------------------------------

const app = express();

// --------------------------------------------------
// CORS
// --------------------------------------------------
// For initial deployment this allows requests from
// your frontend. We can restrict this to the exact
// Vercel domain after deployment.

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// --------------------------------------------------
// Body parser
// --------------------------------------------------

app.use(
  express.json({
    limit: '2mb'
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '2mb'
  })
);

// --------------------------------------------------
// Static uploaded files
// --------------------------------------------------

app.use(
  '/uploads',
  express.static(uploadDirectory)
);

// --------------------------------------------------
// Routes
// --------------------------------------------------

app.use('/api/health', healthRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/complaints', complaintRoutes);

app.use('/api/users', userRoutes);

app.use('/api/contractors', contractorRoutes);

app.use('/api/analytics', analyticsRoutes);

// --------------------------------------------------
// 404 handler
// --------------------------------------------------

app.use(notFound);

// --------------------------------------------------
// Global error handler
// --------------------------------------------------

app.use(errorHandler);

// --------------------------------------------------
// Server
// --------------------------------------------------

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ CivicPulse AI backend running on port ${PORT}`);
});