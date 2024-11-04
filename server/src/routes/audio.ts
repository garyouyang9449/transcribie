import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import { transcribeAudio } from '../controllers/transcriptionHandler';

const audioRouter = express.Router()
const upload = multer();

audioRouter.post('/transcribe', upload.single('file'), async (req: Request, res: Response) => {
    try {
        console.log("Received audio transcription request");
        const transcription = await transcribeAudio(req);
        console.log("Transcription: ", transcription);
        res.status(200).json({
            message: transcription.text
        });
    } catch (error) {
        console.error("Error transcribing audio:", error);
        res.status(500).json({
            message: "Error transcribing audio"
        });
    }
});

audioRouter.post('/test', async (req: Request, res: Response) => {
    try {
        const transcription = await transcribeAudio(req);
        console.log("Transcription: ", transcription);
        res.status(200).json({
            message: transcription
        });
    } catch (error) {
        console.error("Error transcribing audio:", error);
        res.status(500).json({
            message: "Error transcribing audio"
        });
    }
});

export { audioRouter };