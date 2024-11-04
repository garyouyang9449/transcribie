import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define state types
interface TranscriptionResponse {
    message: string;
}

const TranscribeAudio: React.FC = () => {
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [transcription, setTranscription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Handle file selection
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAudioFile(event.target.files[0]);
        }
    };

    // Handle form submission
    const handleTranscribe = async (event: FormEvent) => {
        event.preventDefault();

        if (!audioFile) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('file', audioFile);

        try {
            const response = await fetch('http://localhost:8080/audio/transcribe', {
                method: 'POST',
                body: formData,
            });

            const data: TranscriptionResponse = await response.json();
            setTranscription(data.message);
        } catch (error) {
            console.error('Error during transcription:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Transcribe Audio</h2>
            <form onSubmit={handleTranscribe}>
                <input type="file" accept="audio/*" onChange={handleFileChange} />
                <button type="submit" disabled={!audioFile || loading}>
                    {loading ? 'Transcribing...' : 'Transcribe'}
                </button>
            </form>

            {transcription && (
                <div>
                    <h3>Transcription Result</h3>
                    <p>{transcription}</p>
                </div>
            )}
        </div>
    );
};

export default TranscribeAudio;