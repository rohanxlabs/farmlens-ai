import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import analyzeRouter from './routes/analyze.js';

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
app.listen(PORT, () => {
  console.log(`🚀 FarmLens AI server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
