require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const Lead = require('./models/Lead'); // Make sure this file exists

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Debug: show if URI exists
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI ? "exists" : "missing");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ DB Connection Error:', err));

// Mongoose connection events
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to DB');
});
mongoose.connection.on('error', (err) => {
  console.log('🔴 Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected from DB');
});

// ✅ Test route
app.get('/test', (req, res) => {
  res.send('Test route works!');
});

// ✅ Create a new lead
app.post('/leads', async (req, res) => {
  try {
    const leadData = req.body;
    const newLead = new Lead(leadData);
    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Failed to create lead', error: error.message });
  }
});

// ✅ Get all leads (newest first)
app.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Failed to fetch leads', error: error.message });
  }
});

// ✅ Default homepage route
app.get('/', (req, res) => {
  res.send('CRM Backend is running.');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
