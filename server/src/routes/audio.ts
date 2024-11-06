import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import { transcribeAudio } from '../controllers/transcriptionHandler';

const audioRouter = express.Router()
const upload = multer();

// Cache object to store transcriptions
const transcriptionCache: { [key: string]: string } = {};

audioRouter.post('/transcribe', upload.single('file'), async (req: Request, res: Response) => {
    try {
        console.log("Received audio transcription request");
        const fileName = req.file?.originalname; // Get the file name
        if (fileName && transcriptionCache[fileName]) {
            // Return cached transcription if it exists
            console.log("Returning cached transcription for: ", fileName);
            return res.status(200).json({
                message: transcriptionCache[fileName]
            });
        }
        const transcription = await transcribeAudio(req);
        console.log("Transcription: ", transcription);
        // Cache the transcription
        if (fileName) {
            transcriptionCache[fileName] = transcription.text;
        }
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

export { audioRouter };