import express from 'express';
import routes from './routes/index';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Add middleware to parse JSON request bodies

// Load routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
