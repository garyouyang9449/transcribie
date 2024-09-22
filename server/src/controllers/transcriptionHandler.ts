import express, { Router, Request, Response } from 'express';
import OpenAI from "openai";

const openai = new OpenAI(); 

export const transcribeAudio = async (req: Request) => {
    return await openai.audio.transcriptions.create({
        file: f,
        model: "whisper-1",
        response_format: "text"
    });
}