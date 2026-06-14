import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    match: [/.+\@.+\..+/, 'Please provide a valid email address.'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number.'],
  },
  type: {
    type: String,
    enum: ['enquiry', 'site-visit'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pipeline', 'Contacted', 'Closed'],
    default: 'Pipeline',
  },
  isAgent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
