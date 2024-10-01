import { MongoClient } from 'mongodb';

// Retrieve environment variables or use default values
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    const url = `mongodb://${DB_HOST}:${DB_PORT}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.db = this.client.db(DB_DATABASE);
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
    });
  }

  /**
   * Checks if the connection to the MongoDB server is alive.
   * @returns {boolean} True if the client is connected, false otherwise.
   */
  isAlive() {
    return this.client && this.client.isConnected();
  }

  /**
   * Retrieves the number of documents in the users collection.
   * @returns {Promise<number>} Number of users.
   */
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  /**
   * Retrieves the number of documents in the files collection.
   * @returns {Promise<number>} Number of files.
   */
  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

// Export a single instance of DBClient
const dbClient = new DBClient();
export default dbClient;
