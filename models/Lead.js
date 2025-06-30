const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true, lowercase: true },
  phone:     { type: String, required: true, trim: true },
  tortType:  { type: String, required: true, trim: true },
  status:    { 
    type: String, 
    default: 'NEW', 
    enum: ['NEW', 'CONTACTED', 'VERIFIED', 'SUBMITTED', 'CLOSED'] 
  },

  // 🆕 Added Fields
  address:   { type: String, trim: true },
  city:      { type: String, trim: true },
  zip:       { type: String, trim: true },
  dob:       { type: Date },
  notes:     { type: String, trim: true },
  documents: [{ type: String }]  // URLs or file paths for uploaded files
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
