// controllers/AppController.js
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  // GET /status - Return Redis and MongoDB status
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  // GET /stats - Return the count of users and files in the database
  static async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    
    res.status(200).json({
      users: usersCount,
      files: filesCount,
    });
  }
}

export default AppController;
