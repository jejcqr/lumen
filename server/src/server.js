import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatbotRouter from './routes/lumen.routes.js';
import dsinIntroRouter from './routes/dsinIntro.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/chatbot', chatbotRouter);
app.use('/api/dsin-intro', dsinIntroRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API chatbot sur http://localhost:${PORT}`);
});
