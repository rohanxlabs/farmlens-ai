import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import analyzeRouter from './routes/analyze.js';
import chatRouter from './routes/chat.js';
import weatherRouter from './routes/weather.js';
import authRouter from './routes/auth.js';
import { initDB, getScans } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'FarmLens API running' 
  });
});

// Mount analyze route
app.use('/api/analyze', analyzeRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);

app.get('/api/scans', async (_req, res) => {
  try {
    const scans = await getScans();
    res.json(scans);
  } catch (err) {
    console.error('Error fetching scans:', err);
    res.status(500).json({
      error: 'Failed to fetch scan history'
    });
  }
});

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(
    path.join(__dirname, '../../client/dist')
  ));
  app.get('*', (_req, res) => {
    res.sendFile(
      path.join(__dirname, '../../client/dist/index.html')
    );
  });
}

// Start server
app.listen(PORT, async () => {
  await initDB();
  console.log(
    `🚀 FarmLens AI server running on http://localhost:${PORT}`
  );
  console.log(
    `📡 API endpoints available at http://localhost:${PORT}/api`
  );
});