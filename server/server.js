require('dotenv').config(); // Load environment variables
const authRoutes = require('./routes/authRoutes');
const express = require('express');
const mongoose = require('mongoose');


const app = express();

// Log the MongoDB URI to check if it's being read correctly
console.log("MongoDB URI:", process.env.MONGODB_URI); // Debugging line

const uri = process.env.MONGODB_URI; // Get the URI from the environment variable

// Check if the uri is undefined
if (!uri) {
  console.error('MongoDB URI is undefined. Please check your .env file.');
  process.exit(1); // Exit the application if the URI is undefined
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.error('MongoDB connection error:', error));

// Middleware to parse JSON bodies
app.use(express.json()); // Add this line to parse JSON requests

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API!'); // Response for root URL
});

// Use the authentication routes
app.use('/api/auth', authRoutes);
const transactionRoutes = require('./routes/transactionRoutes');

// Use transaction routes
app.use('/api/transactions', transactionRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

