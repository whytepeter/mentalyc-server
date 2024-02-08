const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const path = require('path');

exports.randomeRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

exports.convertToMP3 = (filename) => {
  const uploadDir = path.join(__dirname, '../uploads/audios');
  const inputFilePath = path.join(__dirname, '../uploads', filename);
  const outputFilePath = path.join(uploadDir, `${filename}.mp3`);

  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .toFormat('mp3')
      .on('end', () => resolve(outputFilePath))
      .on('error', (err) => reject(err))
      .save(outputFilePath);
  });
};
