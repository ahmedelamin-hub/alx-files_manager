// controllers/UsersController.js

import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  // POST /users
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Ensure the MongoDB connection is ready
    if (!dbClient.isAlive()) {
      return res.status(500).json({ error: 'MongoDB connection is not ready' });
    }

    // Check if the email already exists in the database
    const usersCollection = dbClient.db.collection('users');
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password using SHA1
    const hashedPassword = sha1(password);

    // Insert the new user into the database
    const newUser = await usersCollection.insertOne({
      email,
      password: hashedPassword,
    });

    // Return the new user's id and email
    return res.status(201).json({
      id: newUser.insertedId,
      email,
    });
  }
}

export default UsersController;
