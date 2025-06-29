const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true, lowercase: true },
  phone:     { type: String, required: true, trim: true },
  tortType:  { type: String, required: true, trim: true },
  status: {
    type: String,
    default: 'NEW',
    enum: ['NEW', 'CONTACTED', 'VERIFIED', 'SUBMITTED', 'CLOSED'],
    set: v => v.toUpperCase()
  },
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

module.exports = mongoose.model('Lead', leadSchema);
