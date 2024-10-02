// server.js
import express from 'express';
import routes from './routes/index';

const app = express();

// Add middleware to parse JSON requests
app.use(express.json());

// Load routes
app.use('/', routes);

// Define the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
