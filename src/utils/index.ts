const waveFile = require('wavefile');

export const calculateRecordingLength = (buffer: Buffer): string => {
  try {
    const wave = waveFile.fromBuffer(buffer);
    const durationInSeconds = wave.duration / wave.sampleRate;
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.round(durationInSeconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  } catch (error) {
    // Handle parsing errors (e.g., unsupported format)
    console.error('Error parsing audio:', error);
    return 'Unknown';
  }
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
