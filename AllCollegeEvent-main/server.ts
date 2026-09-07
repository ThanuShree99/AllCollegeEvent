import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily/safely
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'allcollegeevent-app',
        },
      },
    });
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Fest Mate Concierge API
  app.post('/api/gemini/concierge', async (req, res) => {
    try {
      const { userPrompt, studentContext, selectedEvents } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.status(200).json({
          reply: `Hey! I'm your ACE Fest Mate 🤖. (Note: GEMINI_API_KEY is not configured yet, so I'm giving you an instant quick tip!).\n\nTo make the most of campus events, check out the trending Tech Hackathons and Cultural Music Fests, build a squad with referral perks, and don't forget to claim your daily XP! 🚀`,
        });
      }

      const systemInstruction = `You are "ACE Fest Mate" — an energetic, intelligent Gen Z campus event concierge and fest guide for AllCollegeEvent.com.
Your tone is friendly, inspiring, clever, and concise (using modern clean language and appropriate emojis 🔥, 🚀, 🎧, 👑).
You give top-tier advice on campus events, hackathons, cultural fests, team formation, career networking, and managing fest schedules.
Student context: ${JSON.stringify(studentContext || {})}
Events user is interested in: ${JSON.stringify(selectedEvents || [])}
Keep responses under 200 words, formatted with bullet points where appropriate.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "Sorry, I couldn't generate a response right now. Try again!";
      res.json({ reply });
    } catch (error: any) {
      console.error('Error calling Gemini Concierge API:', error);
      res.status(500).json({
        error: 'Failed to process AI query',
        details: error?.message || 'Unknown error',
      });
    }
  });

  // AI Itinerary Generator Endpoint
  app.post('/api/gemini/itinerary', async (req, res) => {
    try {
      const { collegeName, preferences, durationHours, availableEvents } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          itinerary: [
            { time: "10:00 AM", title: "Morning Kickoff & Keynote", location: "Main Auditorium", tip: "Arrive 15 mins early for front row seats!" },
            { time: "11:30 AM", title: "AI & Tech Expo / Hackathon Pitches", location: "Tech Park Block B", tip: "Great networking spot with industry mentors." },
            { time: "01:00 PM", title: "Squad Lunch & Memory Drop", location: "Food Court Lawn", tip: "Upload a vibe photo to claim 50 XP." },
            { time: "02:30 PM", title: "Cultural Battle of the Bands / Gaming Fest", location: "Open Air Theatre", tip: "Cheer for your college team!" },
            { time: "05:00 PM", title: "Grand Awards Ceremony & Concert", location: "Main Ground", tip: "Show your QR Pass for VIP lounge access." }
          ]
        });
      }

      const systemInstruction = `You are a Fest Itinerary Architect for AllCollegeEvent.com.
Generate a realistic, fun, time-blocked 1-day or multi-hour fest itinerary based on the student's college: "${collegeName || 'Campus General'}" and preferences: ${JSON.stringify(preferences || [])}.
Available events reference: ${JSON.stringify(availableEvents || [])}.
Return JSON only matching the schema: an array of itinerary items with fields:
- time (string e.g. "10:00 AM")
- title (string e.g. "AI Hackathon Demo & Pitch")
- location (string e.g. "Tech Park Auditorium 2")
- category (string e.g. "Tech" | "Cultural" | "Gaming" | "Networking")
- tip (string e.g. "Pro tip: Bring sticker swag to trade!")`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Create a custom ${durationHours || 6}-hour fest itinerary for ${collegeName || 'our campus'}.`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });

      let jsonData = [];
      try {
        jsonData = JSON.parse(response.text || '[]');
      } catch (err) {
        console.error("Failed to parse JSON itinerary from Gemini:", err);
      }

      res.json({ itinerary: jsonData });
    } catch (error: any) {
      console.error('Error generating itinerary:', error);
      res.status(500).json({ error: 'Failed to generate itinerary' });
    }
  });

  // Vite Middleware in Dev, Static Files in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AllCollegeEvent server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
