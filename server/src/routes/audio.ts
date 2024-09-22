import express, { Router, Request, Response } from 'express';
import { transcribeAudio } from '../controllers/transcriptionHandler';

const audioRouter = express.Router()

audioRouter.post('/transcribe', async (req: Request, res: Response) => {
    const transcription = await transcribeAudio(req);
    res.status(200).json({
        message: 'Data received successfully'
    });
});

audioRouter.post('/upload', async (req: UploadAudioRequest<UploadAudioRequestBody>, res: Response) => {
    
    res.status(200).json({
        message: 'Successfully uploaded audio'
    });
});

export { audioRouter };