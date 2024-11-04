import express, { Request, Response } from "express";
import { audioRouter } from './routes/audio';
import cors from 'cors';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/audio', audioRouter);

app.listen(PORT, () => {
  const apiKey = process.env.OPENAI_API_KEY || 'default_key';
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});