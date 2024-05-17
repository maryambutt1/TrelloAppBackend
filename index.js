const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/trello-clone';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define port
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
