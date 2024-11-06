import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

// Define state types
interface TranscriptionResponse {
    message: string;
}

const TranscribeAudio: React.FC = () => {
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [transcription, setTranscription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [displayedText, setDisplayedText] = useState<string>('');

    // Add useEffect to handle gradual text display
    useEffect(() => {
        if (!transcription) {
            setDisplayedText('');
            return;
        }

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex <= transcription.length) {
                setDisplayedText(transcription.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 50); // Adjust speed by changing interval time

        return () => clearInterval(intervalId);
    }, [transcription]);

    // Handle file selection
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAudioFile(event.target.files[0]);
        }
    };

    // Handle form submission
    const handleTranscribe = async (event: FormEvent) => {
        event.preventDefault();

        // Clear previous transcription results
        setTranscription('');
        setDisplayedText('');

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
                    <p>{displayedText}</p>
                </div>
            )}
        </div>
    );
};

export default TranscribeAudio;