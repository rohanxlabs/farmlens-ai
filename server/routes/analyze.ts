import express from 'express';
import multer from 'multer';
import { analyzeImage } from '../services/openrouter.js';
import { saveScan } from '../db.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /api/analyze
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    // Call OpenRouter service to analyze the image
    const result = await analyzeImage(imageBuffer, mimeType);

    // Try to save scan to DB (don't block response)
    try {
      await saveScan(result);
      console.log('✅ Scan saved to database');
    } catch (err) {
      console.error('Failed to save scan:', err);
    }

    res.json(result);
  } catch (error: any) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ 
      error: 'Failed to analyze image',
      details: error.message 
    });
  }
});

export default router;