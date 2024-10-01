import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  /**
   * POST /users
   * Creates a new user in the database.
   * Request must contain an email and password.
   * Responds with { "id": userId, "email": userEmail } on success, or an error message.
   */
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists in the users collection
    const existingUser = await dbClient.db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password using SHA1
    const hashedPassword = sha1(password);

    // Insert new user into the database
    const result = await dbClient.db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    // Respond with the newly created user ID and email
    return res.status(201).json({
      id: result.insertedId,
      email,
    });
  }
}

export default UsersController;
