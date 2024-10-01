// utils/db.js

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}`;
    
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.connected = false;

    // Connect to the MongoDB server
    this.client.connect().then(() => {
      this.db = this.client.db(database);
      this.connected = true;
      console.log('MongoDB connected successfully');
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
    });
  }

  // Check if MongoDB client is connected
  isAlive() {
    return this.connected;
  }

  // Get the number of documents in the users collection
  async nbUsers() {
    if (!this.connected) throw new Error('MongoDB not connected');
    const usersCollection = this.db.collection('users');
    return usersCollection.countDocuments();
  }

  // Get the number of documents in the files collection
  async nbFiles() {
    if (!this.connected) throw new Error('MongoDB not connected');
    const filesCollection = this.db.collection('files');
    return filesCollection.countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
