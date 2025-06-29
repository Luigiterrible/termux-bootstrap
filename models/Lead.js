const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true, lowercase: true },
  phone:     { type: String, required: true, trim: true },
  tortType:  { type: String, required: true, trim: true },
  status:    { type: String, default: 'new', enum: ['new', 'contacted', 'verified', 'submitted', 'closed'] },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Lead', leadSchema);
