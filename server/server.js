import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(cors());


// Handle CORS manually
// FIXED: change port from 5000 to 3001
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // Handle preflight
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   next();
// });

app.use(express.json());

app.get('/', async(req, res) => {
  res.status(200).send({
    message: 'hello'
  })
})

app.post('/', async(req, res) => {
  try {
    const prompt = req.body.prompt;

    /**
     * OpenAI Chat Completion API 參數說明
     *
     * @param {number} temperature - 設得越高 → 回答越有創意、越大膽、越不確定；設得越低（例如 0）→ 回答越精準、可控、可預測。
     * @param {number} max_tokens - 限制模型最多能產生多少 token（詞片段）。Token ≠ 字數。英文大約 1 token ≈ 0.75 字。中文大約 1 token ≈ 1 字。👉 用來控制回答長度，避免回覆過長造成費用或跑版。
     * @param {number} top_p - nucleus sampling 核採樣，和 temperature 一樣是控制「創意 vs 精準」。top_p = 1 表示不限制，採樣範圍最大。常見設定：希望更保守 → top_p = 0.5 ~ 0.9。⚠️ 一般建議：不要同時調高 temperature 和 top_p，選一個即可。
     * @param {number} frequency_penalty - 頻率懲罰（-2 到 2）數值越高 → 越不會重複出現已經說過的內容。
     * @param {number} presence_penalty - 話題懲罰（-2 到 2）數值越高 → 模型越不會停留在同一主題，會「鼓勵它談新話題」。例：設 >0：適合 brainstorm、想點子。設 0：保持自然、不強迫換話題。
     */
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.choices[0].message.content
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({ error })

  }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))