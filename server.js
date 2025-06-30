require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Lead = require('./models/Lead');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://crm-backend2-fhi5.onrender.com'
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    mongoose.connection.on('connected', () => {
      console.log('🟢 Mongoose connected to DB');
    });
    mongoose.connection.on('error', (err) => {
      console.log('🔴 Mongoose connection error:', err);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('🟡 Mongoose disconnected from DB');
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

// --- Lead Routes ---

// Create
app.post('/leads', async (req, res) => {
  try {
    const leadData = req.body;
    leadData.status = 'NEW';
    const newLead = new Lead(leadData);
    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Failed to create lead', error: error.message });
  }
});

// Read all
app.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Failed to fetch leads', error: error.message });
  }
});

// Read one
app.get('/leads/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    console.error('Error loading lead details:', error);
    res.status(500).json({ message: 'Failed to load lead details', error: error.message });
  }
});

// Update
app.patch('/leads/:id', async (req, res) => {
  try {
    const updates = req.body;
    if (updates.status) updates.status = updates.status.toUpperCase();
    const updated = await Lead.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json({ message: 'Lead updated', lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ message: 'Failed to update lead', error: error.message });
  }
});

// Delete
app.delete('/leads/:id', async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ message: 'Failed to delete lead', error: error.message });
  }
});

// --- UI Routes ---

// Lead Manager route
app.get('/leads-dashboard', (req, res) => {
  console.log('➡️ Serving lead-manager.html');
  res.sendFile(path.join(__dirname, 'public', 'lead-manager.html'));
});

// Admin dashboard as default
app.get('/', (req, res) => {
  console.log('➡️ Serving admin.html as default');
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
