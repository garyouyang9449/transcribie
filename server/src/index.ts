import express, { Request, Response } from "express";
import { audioRouter } from './routes/audio';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/audio', audioRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});