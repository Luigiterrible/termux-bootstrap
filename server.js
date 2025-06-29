require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Lead = require('./models/Lead');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve index.html

// Debug logs for environment
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI ? "exists" : "missing");
console.log('Starting MongoDB connection...');

// Connect to MongoDB and start server only on success
mongoose.connect(process.env.MONGODB_URI, {
  // Note: These options are deprecated but safe to remove if you want
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');

  mongoose.connection.on('connected', () => console.log('🟢 Mongoose connected'));
  mongoose.connection.on('error', err => console.log('🔴 Mongoose error:', err));
  mongoose.connection.on('disconnected', () => console.log('🟡 Mongoose disconnected'));

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ DB Connection Error:', err);
  process.exit(1);
});

// Routes

// Test route (optional)
app.get('/test', (req, res) => {
  res.send('Test route works!');
});

// Create a new lead
app.post('/leads', async (req, res) => {
  try {
    const leadData = req.body;
    if (leadData.status) {
      leadData.status = leadData.status.toUpperCase(); // normalize status
    }
    const newLead = new Lead(leadData);
    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Failed to create lead', error: error.message });
  }
});

// Get all leads (newest first)
app.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Failed to fetch leads', error: error.message });
  }
});

// Update a lead (PATCH)
app.patch('/leads/:id', async (req, res) => {
  try {
    const update = req.body;
    if (update.status) {
      update.status = update.status.toUpperCase(); // ensure uppercase
    }
    const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(lead);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ message: 'Failed to update lead', error: error.message });
  }
});

// Delete a lead
app.delete('/leads/:id', async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ message: 'Failed to delete lead', error: error.message });
  }
});
