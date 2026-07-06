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

  let aiClient: GoogleGenAI | null = null;
  function getAiClient() {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }
      aiClient = new GoogleGenAI({ apiKey: key });
    }
    return aiClient;
  }

  // API route
  app.post('/api/ai-coach', async (req, res) => {
    try {
      const { userQuestion, profile, dailyLog, totalSetsCompleted } = req.body;

      if (!userQuestion) {
        return res.status(400).json({ error: "userQuestion is required" });
      }

      // System instruction as requested by the user
      const systemInstruction = `Siz "Gantel Mashqlari va 5 Mahal Ovqatlanish" ilovasining aqlli fitness va parhez bo'yicha yordamchisiz. Foydalanuvchilarga vazn yig'ish, to'g'ri ovqatlanish va gantellar bilan bajariladigan mashqlar bo'yicha aniq, motivatsion va ilmiy maslahatlar bering. Javoblaringiz qisqa, tushunarli va o'zbek tilida (iloji boricha sodda va samimiy tilda) bo'lsin.`;

      // Prompt template as requested by the user
      const prompt = `
[Foydalanuvchi Profili]
Ism va Familiya: ${profile?.name || 'Sportchi'} ${profile?.lastName || ''}
Yosh: ${profile?.age || ''}
Bo'y: ${profile?.height || ''} sm
Hozirgi vazn: ${profile?.weight || ''} kg
Maqsadli vazn: ${profile?.targetWeight || ''} kg
Jins: ${profile?.gender || ''}
Faollik darajasi: ${profile?.activityLevel || ''}
Maqsadi: ${profile?.goal || ''}
Kunlik kaloriya maqsadi: ${profile?.targetCalories || ''} kcal
Kunlik oqsillar maqsadi: ${profile?.targetProtein || ''} g
Kunlik uglevodlar maqsadi: ${profile?.targetCarbs || ''} g
Kunlik yog'lar maqsadi: ${profile?.targetFats || ''} g

[Bugungi Kunlik Ko'rsatkichlar]
Suv iste'moli: ${dailyLog?.waterIntake || 0} ml / 3000 ml
Yegan taomlari (5 mahal): ${dailyLog?.mealsEaten?.length || 0} ta yeyildi
Bajarilgan mashq to'plamlari soni: ${totalSetsCompleted || 0} ta set

[Foydalanuvchi Savoli]
${userQuestion}
`;

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("AI Coach API error:", error);
      res.status(500).json({ 
        error: "Internal Server Error", 
        message: error.message || String(error) 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
