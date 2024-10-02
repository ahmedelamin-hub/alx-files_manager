// worker.js
import Bull from 'bull';
import dbClient from './utils/db';
import fs from 'fs';
import imageThumbnail from 'image-thumbnail';
import { promises as fsp } from 'fs';

// Create the Bull queue
const fileQueue = new Bull('fileQueue');

// Process jobs from the queue
fileQueue.process(async (job) => {
  const { fileId, userId } = job.data;

  if (!fileId) throw new Error('Missing fileId');
  if (!userId) throw new Error('Missing userId');

  // Retrieve the file from the database
  const file = await dbClient.db.collection('files').findOne({
    _id: dbClient.getObjectId(fileId),
    userId: dbClient.getObjectId(userId),
  });

  if (!file) throw new Error('File not found');
  if (file.type !== 'image') throw new Error('File is not an image');

  const sizes = [500, 250, 100];

  try {
    for (const size of sizes) {
      const thumbnail = await imageThumbnail(file.localPath, { width: size });
      const thumbnailPath = `${file.localPath}_${size}`;

      // Save the thumbnail
      await fsp.writeFile(thumbnailPath, thumbnail);
      console.log(`Thumbnail of size ${size} created at ${thumbnailPath}`);
    }
  } catch (error) {
    console.error(`Error processing thumbnails for fileId ${fileId}:`, error);
    throw new Error('Failed to generate thumbnails');
  }
});
