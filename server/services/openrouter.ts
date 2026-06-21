import axios from 'axios';

interface DiseaseAnalysis {
  disease: string;
  confidence: number;
  severity: string;
  affectedArea: string;
  treatment: {
    pesticide: string;
    dosage: string;
    schedule: string;
  };
  description: string;
}

export async function analyzeImage(
  imageBuffer: Buffer,
  mimeType: string
): Promise<DiseaseAnalysis> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not configured in environment variables');
  }

  // Convert buffer to base64
  const base64Image = imageBuffer.toString('base64');
  const dataUrl = `data:${mimeType};base64,${base64Image}`;

  // Exact prompt as specified
  const prompt = `You are an expert agricultural plant pathologist. Analyze this crop image and respond ONLY with a valid JSON object in this exact format, no extra text:
{
  "disease": "disease name or Healthy",
  "confidence": 92,
  "severity": "Low | Medium | High | None",
  "affectedArea": "estimated % or description",
  "treatment": {
    "pesticide": "name or none required",
    "dosage": "amount per litre",
    "schedule": "how often and for how long"
  },
  "description": "2 sentence explanation of the disease"
}`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openrouter/free',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: dataUrl
                }
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0]?.message?.content || '';
    
    // Parse JSON response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const result: DiseaseAnalysis = JSON.parse(jsonMatch[0]);
    return result;

  } catch (error: any) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    throw new Error('Failed to analyze image with AI');
  }
}
