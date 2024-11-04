import dotenv from 'dotenv';

dotenv.config(); // Loads environment variables from .env file

// Export specific environment variables for convenience if needed
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

