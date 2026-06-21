# 🌿 FarmLens AI

> Upload a crop photo. Get an instant AI-powered disease diagnosis and treatment plan.

FarmLens AI is an agriculture-focused AI SaaS that helps farmers identify crop diseases early and get actionable treatment recommendations — powered by Google Gemini Vision.

---

## 🚀 Live Demo

Coming soon → `https://farmlens-ai.onrender.com`

---

## 🎯 The Problem

Farmers lose 20–40% of their yield every season due to late or wrong crop disease diagnosis. Most rely on guesswork or wait days for an agronomist visit. By then, the disease has spread.

## ✅ The Solution

Upload a photo of your crop → FarmLens AI identifies the disease, confidence level, and gives a precise treatment recommendation in seconds.

---

## ✨ Features

### v1 — Core (Current)
- 📸 **Crop Disease Scanner** — Upload any crop photo, get instant AI diagnosis
- 🔬 **Confidence Score** — Know how certain the AI is
- 💊 **Treatment Plan** — Specific pesticide, dosage, and schedule
- 📱 **Mobile-first UI** — Works on any device, no app install needed

### v2 — Planned
- 🤖 AI Farm Advisor Chat
- 🌦️ Weather-based sowing recommendations
- 📊 Scan history dashboard
- 🔐 User accounts

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| AI Vision | Google Gemini 1.5 Flash |
| Deployment | Render |

---

## 📁 Project Structure

```
farmlens-ai/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadCard.tsx      # Image upload UI
│   │   │   ├── ResultCard.tsx      # Disease result display
│   │   │   └── LoadingScanner.tsx  # Scanning animation
│   │   ├── pages/
│   │   │   └── Home.tsx            # Main page
│   │   └── App.tsx
│   └── index.html
├── server/                   # Express backend
│   ├── routes/
│   │   └── analyze.ts        # POST /api/analyze
│   ├── services/
│   │   └── gemini.ts         # Gemini Vision API logic
│   └── index.ts
├── .env                      # API keys (never commit)
├── .gitignore
└── README.md
```

---

## ⚙️ Setup & Run Locally

### Prerequisites
- Node.js 18+
- A free [Google Gemini API key](https://aistudio.google.com)

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/farmlens-ai.git
cd farmlens-ai
```

### 2. Set up environment variables
```bash
cp .env.example .env
```

Fill in your `.env`:
```env
GEMINI_API_KEY=your_gemini_key_here
PORT=5000
```

### 3. Install dependencies
```bash
# Install server deps
cd server && npm install

# Install client deps
cd ../client && npm install
```

### 4. Run locally
```bash
# Terminal 1 — start backend
cd server && npm run dev

# Terminal 2 — start frontend
cd client && npm run dev
```

Open → `http://localhost:5173`

---

## 🔌 API Reference

### `POST /api/analyze`

Analyzes a crop image and returns disease diagnosis.

**Request**
```
Content-Type: multipart/form-data
Body: image (file)
```

**Response**
```json
{
  "disease": "Late Blight",
  "confidence": 94,
  "severity": "High",
  "affectedArea": "~30% of leaf area",
  "treatment": {
    "pesticide": "Mancozeb",
    "dosage": "2g per litre of water",
    "schedule": "Spray every 7 days for 3 weeks"
  },
  "description": "Late blight is a serious disease caused by Phytophthora infestans..."
}
```

---

## 🗺️ Roadmap

- [x] Project scaffold
- [ ] Image upload + Gemini Vision integration
- [ ] Disease result card UI
- [ ] Loading / scanning animation
- [ ] AI advisor chat
- [ ] Weather-based recommendations
- [ ] Scan history with Neon PostgreSQL
- [ ] User authentication
- [ ] Deploy to Render

---

## 🧠 How It Works

```
User uploads crop photo
        ↓
React frontend sends image to Express backend
        ↓
Express sends image + prompt to Gemini 1.5 Flash Vision API
        ↓
Gemini returns structured diagnosis (disease, confidence, treatment)
        ↓
Backend parses and returns JSON
        ↓
Frontend displays animated result card
```

---

## 🌱 Why FarmLens?

- **No hardware needed** — works on any smartphone camera
- **Free to use** — powered by Gemini's free tier
- **Instant results** — diagnosis in under 3 seconds
- **Actionable** — not just "what it is" but "what to do"

---

## 👨‍💻 Built By

**Eren** — Student developer & founder of [LearnPath AI](https://learnpath-ai.com)

Building at the intersection of AI and real-world problems.

---

## 📄 License

MIT License — free to use, modify, and distribute.
