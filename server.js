require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Lead = require('./models/Lead'); // Make sure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static HTML (for frontend UI)
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Debug logs for environment
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("Connecting to MongoDB...");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

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

    // Start the server only after DB connects
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Create a new lead
app.post('/leads', async (req, res) => {
  try {
    const leadData = req.body;
    leadData.status = 'NEW'; // Default status
    const newLead = new Lead(leadData);
    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Failed to create lead', error: error.message });
  }
});

// Get all leads
app.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Failed to fetch leads', error: error.message });
  }
});

// Update lead (inline editing)
app.patch('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.status) {
      updates.status = updates.status.toUpperCase(); // Normalize to uppercase
    }

    const updated = await Lead.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: 'Lead updated', lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ message: 'Failed to update lead', error: error.message });
  }
});

// Delete a lead
app.delete('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Lead.findByIdAndDelete(id);
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ message: 'Failed to delete lead', error: error.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
