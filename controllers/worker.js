import Queue from 'bull';
import imageThumbnail from 'image-thumbnail';
import fs from 'fs';
import dbClient from './utils/db';
import { promisify } from 'util';

const fileQueue = new Queue('fileQueue');

const writeFile = promisify(fs.writeFile);

fileQueue.process(async (job, done) => {
  const { userId, fileId } = job.data;

  if (!fileId) {
    throw new Error('Missing fileId');
  }
  if (!userId) {
    throw new Error('Missing userId');
  }

  const file = await dbClient.db.collection('files').findOne({
    _id: dbClient.ObjectId(fileId),
    userId: dbClient.ObjectId(userId),
  });

  if (!file) {
    throw new Error('File not found');
  }

  const filePath = file.localPath;

  if (!fs.existsSync(filePath)) {
    throw new Error('File not found on disk');
  }

  const thumbnailSizes = [500, 250, 100];
  for (const size of thumbnailSizes) {
    const thumbnail = await imageThumbnail(filePath, { width: size });
    const thumbnailPath = `${filePath}_${size}`;
    await writeFile(thumbnailPath, thumbnail);
  }

  done();
});

export { fileQueue };
