import express, { Request } from 'express';
import { OPENAI_API_KEY } from '../config';

export const transcribeAudio = async (req: Request) => {
    console.log("Transcribing audio");
    
    if (!req.file) {
        throw new Error('No file uploaded');
    }
    
    const formData = new FormData();
    formData.append('file', new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname);
    formData.append('model', 'whisper-1');
    const transcription = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: formData,
    });
    
    return transcription.json();
}