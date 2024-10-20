const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv'); // For environment variables

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const CONNECTION_STRING = process.env.CONNECTION_STRING; // Use environment variable for security
const DATABASENAME = "Expensetracker";
let database;

// Connect to MongoDB
async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    database = client.db(DATABASENAME);
    console.log("MongoDB Connection Successful");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the application on connection failure
  }
}

// API endpoint to sign up a new user
app.post('/api/expensetracker/signup', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send('Email is required');
    }

    // Check if user already exists
    const existingUser = await database.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Create a new user document in the users collection
    const newUser = { email, profile: { income: 0, expenses: [], categories: [] } };
    await database.collection("users").insertOne(newUser);

    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).send("Internal Server Error");
  }
});

// API endpoint to update user profile (income, expenses, categories)
app.post('/api/expensetracker/profile', async (req, res) => {
  try {
    const { email, income, expenses, categories } = req.body;

    if (!email) {
      return res.status(400).send('Email is required');
    }

    // Find user and update their profile data
    const updatedProfile = {
      "profile.income": income,
      "profile.expenses": expenses,
      "profile.categories": categories
    };

    const result = await database.collection("users").updateOne(
      { email },
      { $set: updatedProfile }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

// API endpoint to get a user's profile by email
app.get('/api/expensetracker/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const user = await database.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user.profile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start Express server
app.listen(5038, async () => {
  await connectToDatabase(); // Ensure the DB is connected before starting the server
  console.log("Server is running on port 5038");
});
